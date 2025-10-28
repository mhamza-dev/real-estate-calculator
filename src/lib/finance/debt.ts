import { LoanParams } from './types';

/**
 * Calculate monthly payment for amortizing loan
 * Uses the standard mortgage payment formula
 */
export function calculateMonthlyPayment(params: LoanParams): number {
  const { loanAmount, interestRate, amortizationYears } = params;

  if (loanAmount === 0) return 0;
  if (interestRate === 0) {
    // No interest, just principal over time
    return loanAmount / (amortizationYears * 12);
  }

  const monthlyRate = interestRate / 12;
  const numPayments = amortizationYears * 12;

  const payment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  return payment;
}

/**
 * Calculate interest-only monthly payment
 */
export function calculateInterestOnlyPayment(params: LoanParams): number {
  const { loanAmount, interestRate } = params;
  return (loanAmount * interestRate) / 12;
}

/**
 * Calculate annual debt service
 * Handles interest-only period if specified
 */
export function calculateAnnualDebtService(params: LoanParams): number {
  const { interestOnlyYears, amortizationYears } = params;

  let annualDebtService = 0;

  if (interestOnlyYears && interestOnlyYears > 0) {
    // Interest-only period
    const monthlyIO = calculateInterestOnlyPayment(params);
    annualDebtService += monthlyIO * 12 * interestOnlyYears;

    // Remaining amortization period
    const remainingYears = amortizationYears - interestOnlyYears;
    if (remainingYears > 0) {
      const remainingParams: LoanParams = {
        ...params,
        amortizationYears: remainingYears,
      };
      const monthlyAmort = calculateMonthlyPayment(remainingParams);
      annualDebtService += monthlyAmort * 12 * remainingYears;
    }

    // Return average annual debt service
    return annualDebtService / amortizationYears;
  } else {
    // Straight amortization
    const monthlyPayment = calculateMonthlyPayment(params);
    return monthlyPayment * 12;
  }
}

/**
 * Calculate Debt Service Coverage Ratio (DSCR)
 * DSCR = NOI / Annual Debt Service
 */
export function calculateDSCR(noi: number, annualDebtService: number): number {
  if (annualDebtService === 0) return Infinity;
  return noi / annualDebtService;
}

/**
 * Calculate Loan-to-Value (LTV)
 * LTV = Loan Amount / Purchase Price
 */
export function calculateLTV(loanAmount: number, purchasePrice: number): number {
  if (purchasePrice === 0) return 0;
  return loanAmount / purchasePrice;
}

/**
 * Calculate full amortization schedule
 */
export function amortizationSchedule(params: LoanParams): Array<{
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}> {
  const schedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }> = [];

  const { loanAmount, interestRate, amortizationYears, interestOnlyYears } = params;
  const monthlyRate = interestRate / 12;
  const totalMonths = amortizationYears * 12;
  let balance = loanAmount;

  // Interest-only period
  if (interestOnlyYears && interestOnlyYears > 0) {
    const ioMonths = interestOnlyYears * 12;
    const ioPayment = balance * monthlyRate;

    for (let month = 1; month <= ioMonths; month++) {
      schedule.push({
        month,
        payment: ioPayment,
        principal: 0,
        interest: ioPayment,
        balance,
      });
    }
  }

  // Calculate amortizing payment
  const payment = calculateMonthlyPayment(params);

  // Amortization period
  const startMonth = interestOnlyYears ? interestOnlyYears * 12 + 1 : 1;
  for (let month = startMonth; month <= totalMonths; month++) {
    const interest = balance * monthlyRate;
    const principal = payment - interest;

    balance -= principal;

    schedule.push({
      month,
      payment,
      principal,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return schedule;
}
