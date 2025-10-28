import { NOIParams, LoanParams, IRRCashFlow, IRRParams } from './types';
import { calculateNOI } from './noi';
import { calculateAnnualDebtService } from './debt';

/**
 * Calculate Cash-on-Cash Return
 * Cash-on-Cash = (NOI - Annual Debt Service) / Initial Cash Investment
 */
export function calculateCashOnCashReturn(
  noi: number,
  annualDebtService: number,
  initialCashInvestment: number
): number {
  if (initialCashInvestment === 0) return 0;
  const cashFlow = noi - annualDebtService;
  return cashFlow / initialCashInvestment;
}

/**
 * Calculate Present Value
 * PV = FV / (1 + r)^n
 */
export function presentValue(futureValue: number, rate: number, periods: number): number {
  return futureValue / Math.pow(1 + rate, periods);
}

/**
 * Calculate Future Value
 * FV = PV * (1 + r)^n
 */
export function futureValue(presentValue: number, rate: number, periods: number): number {
  return presentValue * Math.pow(1 + rate, periods);
}

/**
 * Calculate IRR using Newton-Raphson method with safe fallbacks
 * Returns annualized IRR as decimal (e.g., 0.073 for 7.3%)
 */
export function calculateIRR(cashFlows: IRRCashFlow[]): number {
  if (cashFlows.length < 2) return 0;

  // Extract the cash flow amounts
  const amounts = cashFlows.map((cf) => cf.cashFlow);

  // Check if all cash flows are non-negative or all non-positive
  const allNonNegative = amounts.every((amount) => amount >= 0);
  const allNonPositive = amounts.every((amount) => amount <= 0);

  if (allNonNegative || allNonPositive) {
    // Check for return of initial investment
    const total = amounts.reduce((sum, val) => sum + val, 0);
    if (total >= 0) return 0; // Not a profitable investment
    // If all positive, no real IRR
    return -0.99; // Indicate loss
  }

  // Newton-Raphson method
  let rate = 0.1; // Initial guess
  const maxIterations = 100;
  const tolerance = 0.0001;

  for (let i = 0; i < maxIterations; i++) {
    const [npv, npvDerivative] = calculateNPVandDerivative(amounts, rate);

    if (Math.abs(npv) < tolerance) {
      return rate;
    }

    if (Math.abs(npvDerivative) < 0.0001) {
      // Derivative too small, try different approach
      break;
    }

    const newRate = rate - npv / npvDerivative;

    // Guard against overflow
    if (!isFinite(newRate) || newRate < -0.99 || newRate > 10) {
      break;
    }

    if (Math.abs(newRate - rate) < tolerance) {
      return newRate;
    }

    rate = newRate;
  }

  // Fallback: Bisection method
  return bisectionIRR(amounts);
}

/**
 * Helper: Calculate NPV and its derivative
 */
function calculateNPVandDerivative(amounts: number[], rate: number): [number, number] {
  let npv = 0;
  let npvDerivative = 0;

  for (let i = 0; i < amounts.length; i++) {
    const discountFactor = Math.pow(1 + rate, i);
    npv += amounts[i] / discountFactor;

    if (i > 0) {
      npvDerivative -= (i * amounts[i]) / (discountFactor * (1 + rate));
    }
  }

  return [npv, npvDerivative];
}

/**
 * Fallback: Bisection method for IRR
 */
function bisectionIRR(amounts: number[]): number {
  let lower = -0.99;
  let upper = 1.0;
  const tolerance = 0.0001;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    const mid = (lower + upper) / 2;
    const npv = amounts.reduce((sum, amount, idx) => {
      return sum + amount / Math.pow(1 + mid, idx);
    }, 0);

    if (Math.abs(npv) < tolerance) {
      return mid;
    }

    if (npv > 0) {
      lower = mid;
    } else {
      upper = mid;
    }

    if (upper - lower < tolerance) {
      return mid;
    }
  }

  return (lower + upper) / 2;
}

/**
 * Build annual cash flow array for IRR calculation
 */
export function buildCashFlowArray(params: IRRParams): IRRCashFlow[] {
  const {
    initialInvestment,
    annualNOI,
    debtService,
    holdYears,
    rentGrowthRate = 0,
    expenseGrowthRate = 0,
    exitCapRate,
    sellingCosts = 0,
  } = params;

  const cashFlows: IRRCashFlow[] = [];

  // Initial investment (negative cash flow at year 0)
  cashFlows.push({ year: 0, cashFlow: -initialInvestment });

  // Annual cash flows during hold period
  // Assume NOI grows with rent growth minus expense growth
  // Simplified: NOI growth = (rent growth - expense impact)
  for (let year = 1; year < holdYears; year++) {
    // Project NOI with growth
    const projectedNOI = annualNOI * Math.pow(1 + rentGrowthRate, year);
    const netCashFlow = projectedNOI - debtService;
    cashFlows.push({ year, cashFlow: netCashFlow });
  }

  // Final year includes sale proceeds
  const finalYear = holdYears;
  const finalNOI = annualNOI * Math.pow(1 + rentGrowthRate, finalYear);
  const annualCashFlow = finalNOI - debtService;

  let totalFinalCashFlow = annualCashFlow;

  // Add sale proceeds if exit cap rate is provided
  if (exitCapRate && exitCapRate > 0) {
    const salePrice = finalNOI / exitCapRate;
    const afterSellingCosts = salePrice * (1 - sellingCosts);
    totalFinalCashFlow += afterSellingCosts;
  }

  cashFlows.push({ year: finalYear, cashFlow: totalFinalCashFlow });

  return cashFlows;
}

/**
 * Helper to calculate NOI with growth over time
 */
export function calculateProjectedNOI(
  baseNOI: number,
  year: number,
  rentGrowthRate: number,
  expenseGrowthRate: number
): number {
  const projectedRent = baseNOI * Math.pow(1 + rentGrowthRate, year);
  const projectedExpenses = baseNOI * Math.pow(1 + expenseGrowthRate, year);
  return projectedRent - projectedExpenses;
}
