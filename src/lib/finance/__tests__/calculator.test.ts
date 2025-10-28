import {
  calculateNOI,
  calculateCapRate,
  calculateGRM,
  calculateAnnualDebtService,
  calculateDSCR,
  calculateLTV,
  calculateCashOnCashReturn,
  calculateIRR,
  amortizationSchedule,
} from '../index';
import { calculateInvestmentMetrics } from '../calculator';

describe('Financial Calculation Library', () => {
  describe('NOI Calculations', () => {
    it('should calculate NOI correctly', () => {
      const noi = calculateNOI({
        annualRent: 108000,
        operatingExpenses: 24000,
        vacancyRate: 0,
      });
      expect(noi).toBe(84000);
    });

    it('should account for vacancy rate', () => {
      const noi = calculateNOI({
        annualRent: 100000,
        operatingExpenses: 20000,
        vacancyRate: 0.05, // 5%
      });
      expect(noi).toBe(75000); // (100000 * 0.95) - 20000
    });

    it('should not return negative NOI', () => {
      const noi = calculateNOI({
        annualRent: 10000,
        operatingExpenses: 50000,
        vacancyRate: 0,
      });
      expect(noi).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Cap Rate and GRM', () => {
    it('should calculate Cap Rate', () => {
      const capRate = calculateCapRate(84000, 1200000);
      expect(capRate).toBeCloseTo(0.07, 4); // 7%
    });

    it('should calculate GRM', () => {
      const grm = calculateGRM(1200000, 108000);
      expect(grm).toBeCloseTo(11.111, 2);
    });
  });

  describe('Debt Service Calculations', () => {
    it('should calculate annual debt service for 30-year loan', () => {
      const annualDebtService = calculateAnnualDebtService({
        loanAmount: 780000,
        interestRate: 0.065,
        amortizationYears: 30,
      });

      // Monthly payment: ~$4,930.13
      // Annual: ~$59,161.57
      expect(annualDebtService).toBeCloseTo(59161.57, 0);
    });

    it('should handle interest-only period', () => {
      const annualDebtService = calculateAnnualDebtService({
        loanAmount: 780000,
        interestRate: 0.065,
        amortizationYears: 30,
        interestOnlyYears: 5,
      });

      // First 5 years: IO payment
      // Remaining 25 years: amortization
      // Should still return annualized average
      expect(annualDebtService).toBeGreaterThan(0);
    });

    it('should handle zero interest rate', () => {
      const annualDebtService = calculateAnnualDebtService({
        loanAmount: 100000,
        interestRate: 0,
        amortizationYears: 10,
      });
      expect(annualDebtService).toBe(10000); // 100000 / 10
    });
  });

  describe('DSCR and LTV', () => {
    it('should calculate DSCR correctly', () => {
      const dscr = calculateDSCR(84000, 59161.57);
      expect(dscr).toBeCloseTo(1.42, 2);
    });

    it('should calculate LTV correctly', () => {
      const ltv = calculateLTV(780000, 1200000);
      expect(ltv).toBeCloseTo(0.65, 4); // 65%
    });
  });

  describe('Cash-on-Cash Return', () => {
    it('should calculate Cash-on-Cash Return', () => {
      // From sample: NOI $84k, debt $59,161.57, initial cash $456k
      const cashOnCash = calculateCashOnCashReturn(84000, 59161.57, 456000);
      expect(cashOnCash).toBeCloseTo(0.0545, 3); // ~5.45%
    });
  });

  describe('Amortization Schedule', () => {
    it('should generate amortization schedule', () => {
      const schedule = amortizationSchedule({
        loanAmount: 100000,
        interestRate: 0.06,
        amortizationYears: 5,
      });

      expect(schedule.length).toBe(60); // 5 years * 12 months
      expect(schedule[0].balance).toBe(100000);
      expect(schedule[schedule.length - 1].balance).toBeCloseTo(0, 0);
    });
  });

  describe('IRR Calculation', () => {
    it('should calculate IRR for simple cash flows', () => {
      const cashFlows = [
        { year: 0, cashFlow: -1000 },
        { year: 1, cashFlow: 500 },
        { year: 2, cashFlow: 600 },
      ];

      const irr = calculateIRR(cashFlows);
      expect(irr).toBeGreaterThan(0);
      expect(irr).toBeLessThan(1);
    });

    it('should calculate IRR for complex cash flows', () => {
      // Test with initial investment and subsequent returns
      const cashFlows = [
        { year: 0, cashFlow: -1000 },
        { year: 1, cashFlow: 200 },
        { year: 2, cashFlow: 200 },
        { year: 3, cashFlow: 200 },
        { year: 4, cashFlow: 200 },
        { year: 5, cashFlow: 1200 },
      ];

      const irr = calculateIRR(cashFlows);
      expect(irr).toBeGreaterThan(0.1);
      expect(irr).toBeLessThan(0.2);
    });

    it('should handle negative IRR scenarios', () => {
      const cashFlows = [
        { year: 0, cashFlow: -1000 },
        { year: 1, cashFlow: 100 },
        { year: 2, cashFlow: 100 },
        { year: 3, cashFlow: 100 },
      ];

      const irr = calculateIRR(cashFlows);
      expect(irr).toBeLessThanOrEqual(0);
    });
  });

  describe('Full Calculator - Sample Acceptance Test', () => {
    it('should pass the provided acceptance test case', () => {
      const inputs = {
        purchasePrice: 1200000,
        annualRent: 108000,
        operatingExpenses: 24000,
        vacancyRate: 0,
        loanAmount: 780000, // 65% LTV
        interestRate: 0.065, // 6.5%
        amortizationYears: 30,
        interestOnlyYears: 0,
        closingCosts: 0.03, // 3%
        holdYears: 5,
        rentGrowthRate: 0.02, // 2%
        expenseGrowthRate: 0.02,
        exitCapRate: 0.0725, // 7.25%
        sellingCosts: 0.03, // 3%
      };

      const result = calculateInvestmentMetrics(inputs);

      // Verify key metrics
      expect(result.noi).toBe(84000);
      expect(result.capRate).toBeCloseTo(0.07, 4); // 7%
      expect(result.grm).toBeCloseTo(11.111, 2);
      expect(result.dscr).toBeCloseTo(1.42, 2);
      expect(result.ltv).toBeCloseTo(0.65, 4); // 65%
      expect(result.cashOnCashReturn).toBeCloseTo(0.0545, 3); // ~5.45%

      // IRR should be approximately 7.30%
      expect(result.irr).toBeCloseTo(0.073, 3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero rent', () => {
      const noi = calculateNOI({
        annualRent: 0,
        operatingExpenses: 10000,
        vacancyRate: 0,
      });
      expect(noi).toBeGreaterThanOrEqual(0);
    });

    it('should handle zero interest rate loan', () => {
      const debtService = calculateAnnualDebtService({
        loanAmount: 100000,
        interestRate: 0,
        amortizationYears: 10,
      });
      expect(debtService).toBe(10000);
    });

    it('should handle interest-only loan', () => {
      const debtService = calculateAnnualDebtService({
        loanAmount: 100000,
        interestRate: 0.06,
        amortizationYears: 30,
        interestOnlyYears: 30,
      });
      expect(debtService).toBe(6000); // 6% annual interest
    });
  });
});
