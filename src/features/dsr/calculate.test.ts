import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateDsr } from "./calculate";

describe("calculateDsr", () => {
  it("calculates DSR from existing and new annual debt service", () => {
    const result = calculateDsr({
      annualIncome: new Decimal(60_000_000),
      existingAnnualDebtService: new Decimal(6_000_000),
      newLoanPrincipal: new Decimal(120_000_000),
      annualInterestRate: new Decimal(0),
      termYears: new Decimal(20),
    });
    expect(result.monthlyPayment.toNumber()).toBe(500_000);
    expect(result.totalAnnualDebtService.toNumber()).toBe(12_000_000);
    expect(result.dsrRate.toNumber()).toBe(20);
  });

  it("uses a monthly amortizing payment without premature rounding", () => {
    const result = calculateDsr({
      annualIncome: new Decimal(80_000_000),
      existingAnnualDebtService: new Decimal(0),
      newLoanPrincipal: new Decimal(100_000_000),
      annualInterestRate: new Decimal(4),
      termYears: new Decimal(10),
    });
    expect(result.monthlyPayment.toDecimalPlaces(0).toNumber()).toBe(1_012_451);
    expect(
      result.dsrRate.eq(result.newAnnualDebtService.div(80_000_000).mul(100)),
    ).toBe(true);
  });
});
