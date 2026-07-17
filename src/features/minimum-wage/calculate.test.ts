import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateMinimumWage, MINIMUM_HOURLY_WAGE_2026 } from "./calculate";

describe("minimum wage calculation", () => {
  it("uses the official 2026 hourly minimum and paid weekly-holiday hours", () => {
    const result = calculateMinimumWage({
      weeklyHours: new Decimal(40),
      includesPaidWeeklyHoliday: true,
    });
    expect(MINIMUM_HOURLY_WAGE_2026.toNumber()).toBe(10320);
    expect(result.paidWeeklyHolidayHours.toNumber()).toBe(8);
    expect(result.weeklyMinimum.toNumber()).toBe(495360);
    expect(result.monthlyMinimum.toNumber()).toBe(2152339.2);
  });

  it("does not add weekly-holiday hours when not selected", () => {
    const result = calculateMinimumWage({
      weeklyHours: new Decimal(10),
      includesPaidWeeklyHoliday: false,
    });
    expect(result.paidWeeklyHolidayHours.isZero()).toBe(true);
    expect(result.weeklyMinimum.toNumber()).toBe(103200);
  });
});
