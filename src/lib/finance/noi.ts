import { NOIParams } from './types';

/**
 * Calculate Net Operating Income (NOI)
 * NOI = (Annual Rent * (1 - Vacancy Rate)) - Operating Expenses
 */
export function calculateNOI(params: NOIParams): number {
  const { annualRent, operatingExpenses, vacancyRate } = params;

  const effectiveRent = annualRent * (1 - vacancyRate);
  const noi = effectiveRent - operatingExpenses;

  return Math.max(0, noi); // NOI cannot be negative
}

/**
 * Calculate Capitalization Rate (Cap Rate)
 * Cap Rate = NOI / Purchase Price
 */
export function calculateCapRate(noi: number, purchasePrice: number): number {
  if (purchasePrice === 0) return 0;
  return noi / purchasePrice;
}

/**
 * Calculate Gross Rent Multiplier (GRM)
 * GRM = Purchase Price / Annual Rent
 */
export function calculateGRM(purchasePrice: number, annualRent: number): number {
  if (annualRent === 0) return 0;
  return purchasePrice / annualRent;
}
