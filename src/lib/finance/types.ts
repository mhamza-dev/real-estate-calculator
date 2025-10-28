/**
 * Types for financial calculations
 */

export interface NOIParams {
  annualRent: number;
  operatingExpenses: number;
  vacancyRate: number; // as decimal (0.05 = 5%)
}

export interface LoanParams {
  loanAmount: number;
  interestRate: number; // annual rate as decimal (0.065 = 6.5%)
  amortizationYears: number;
  interestOnlyYears?: number;
}

export interface IRRCashFlow {
  year: number;
  cashFlow: number;
}

export interface IRRParams {
  initialInvestment: number;
  annualNOI: number;
  debtService: number;
  holdYears: number;
  rentGrowthRate?: number; // annual growth as decimal
  expenseGrowthRate?: number; // annual growth as decimal
  exitCapRate?: number; // as decimal
  sellingCosts?: number; // as percentage decimal
  interestOnlyYears?: number;
}

export interface CalculationResult {
  noi: number;
  capRate: number;
  grm: number;
  debtService: number;
  dscr: number;
  ltv: number;
  cashOnCashReturn: number;
  irr: number;
  cashFlows: IRRCashFlow[];
}
