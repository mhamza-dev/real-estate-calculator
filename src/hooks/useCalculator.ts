import { useCallback } from 'react';
import { CalculatorInputs, calculateInvestmentMetrics } from '../lib/finance/calculator';

export interface CalculationResult {
  noi: number;
  capRate: number;
  grm: number;
  debtService: number;
  dscr: number;
  ltv: number;
  cashOnCashReturn: number;
  irr: number;
  cashFlows: Array<{ year: number; cashFlow: number }>;
}

interface UseCalculatorReturn {
  calculate: (inputs: CalculatorInputs) => CalculationResult | null;
}

export function useCalculator(): UseCalculatorReturn {
  const calculate = useCallback((inputs: CalculatorInputs): CalculationResult | null => {
    try {
      // Validate inputs
      if (inputs.purchasePrice <= 0) return null;
      if (inputs.annualRent < 0) return null;
      if (inputs.operatingExpenses < 0) return null;
      if (inputs.loanAmount < 0) return null;
      if (inputs.interestRate < 0 || inputs.interestRate > 1) return null;
      if (inputs.amortizationYears <= 0) return null;

      return calculateInvestmentMetrics(inputs);
    } catch (error) {
      console.error('Calculation error:', error);
      return null;
    }
  }, []);

  return { calculate };
}
