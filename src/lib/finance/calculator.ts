import {
  calculateNOI as calcNOI,
  calculateCapRate,
  calculateGRM,
  calculateAnnualDebtService,
  calculateDSCR,
  calculateLTV,
  calculateCashOnCashReturn,
  calculateIRR,
  buildCashFlowArray,
  NOIParams,
  LoanParams,
  IRRParams,
  CalculationResult,
  IRRCashFlow,
} from './index';

export interface CalculatorInputs {
  purchasePrice: number;
  annualRent: number;
  operatingExpenses: number;
  vacancyRate: number; // as decimal
  loanAmount: number;
  interestRate: number; // as decimal
  amortizationYears: number;
  interestOnlyYears?: number;
  closingCosts: number; // as decimal
  // IRR params
  holdYears: number;
  rentGrowthRate?: number; // as decimal
  expenseGrowthRate?: number; // as decimal
  exitCapRate?: number; // as decimal
  sellingCosts?: number; // as decimal
}

/**
 * Main calculator function
 * Computes all financial metrics for a commercial real estate investment
 */
export function calculateInvestmentMetrics(inputs: CalculatorInputs): CalculationResult {
  const {
    purchasePrice,
    annualRent,
    operatingExpenses,
    vacancyRate,
    loanAmount,
    interestRate,
    amortizationYears,
    interestOnlyYears,
    closingCosts,
    holdYears,
    rentGrowthRate = 0,
    expenseGrowthRate = 0,
    exitCapRate,
    sellingCosts = 0.03,
  } = inputs;

  // 1. Calculate NOI
  const noi = calcNOI({
    annualRent,
    operatingExpenses,
    vacancyRate,
  });

  // 2. Calculate Cap Rate
  const capRate = calculateCapRate(noi, purchasePrice);

  // 3. Calculate GRM
  const grm = calculateGRM(purchasePrice, annualRent);

  // 4. Calculate Debt Service
  const loanParams: LoanParams = {
    loanAmount,
    interestRate,
    amortizationYears,
    interestOnlyYears,
  };
  const debtService = calculateAnnualDebtService(loanParams);

  // 5. Calculate DSCR
  const dscr = calculateDSCR(noi, debtService);

  // 6. Calculate LTV
  const ltv = calculateLTV(loanAmount, purchasePrice);

  // 7. Calculate Cash-on-Cash Return
  const initialCashInvestment =
    purchasePrice * (1 - ltv) + // down payment (equity)
    purchasePrice * closingCosts; // closing costs
  const cashOnCashReturn = calculateCashOnCashReturn(noi, debtService, initialCashInvestment);

  // 8. Calculate IRR
  const irrParams: IRRParams = {
    initialInvestment: initialCashInvestment,
    annualNOI: noi,
    debtService,
    holdYears,
    rentGrowthRate,
    expenseGrowthRate,
    exitCapRate,
    sellingCosts,
    interestOnlyYears,
  };

  const cashFlows = buildCashFlowArray(irrParams);
  const irr = calculateIRR(cashFlows);

  return {
    noi,
    capRate,
    grm,
    debtService,
    dscr,
    ltv,
    cashOnCashReturn,
    irr,
    cashFlows,
  };
}

/**
 * Simplified calculation for quick NOI and Cap Rate
 */
export function quickCalculation(
  purchasePrice: number,
  annualRent: number,
  operatingExpenses: number
) {
  const noi = calcNOI({ annualRent, operatingExpenses, vacancyRate: 0 });
  const capRate = calculateCapRate(noi, purchasePrice);
  const grm = calculateGRM(purchasePrice, annualRent);

  return { noi, capRate, grm };
}
