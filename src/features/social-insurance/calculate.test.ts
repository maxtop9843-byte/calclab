import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateSocialInsurance } from "./calculate";

describe("calculateSocialInsurance", () => {
  it("calculates employee and employer contributions without rounding intermediate rates up", () => {
    const result = calculateSocialInsurance({
      monthlyPay: new Decimal(3_500_000),
      nonTaxablePay: new Decimal(200_000),
      accidentRate: new Decimal("0.7"),
    });
    expect(result.contributionBase.toNumber()).toBe(3_300_000);
    expect(result.employee.pension.toNumber()).toBe(156_750);
    expect(result.employee.health.toNumber()).toBe(118_635);
    expect(result.employee.employment.toNumber()).toBe(29_700);
    expect(result.employer.industrialAccident.toNumber()).toBe(23_100);
    expect(
      result.combinedTotal.eq(
        result.employee.total.plus(result.employer.total),
      ),
    ).toBe(true);
  });
  it("caps the national pension contribution base", () => {
    const result = calculateSocialInsurance({
      monthlyPay: new Decimal(10_000_000),
      nonTaxablePay: new Decimal(0),
      accidentRate: new Decimal(0),
    });
    expect(result.employee.pension.toNumber()).toBe(313_025);
  });
});
