import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateAverageWage } from "./calculate";
describe("calculateAverageWage", () => {
  it("keeps full precision for the statutory daily divisor", () => {
    const result = calculateAverageWage({
      wageTotal: new Decimal(9_000_000),
      calendarDays: new Decimal(92),
    });
    expect(result.averageDailyWage.mul(92).eq(9_000_000)).toBe(true);
    expect(result.thirtyDayWage.eq(result.averageDailyWage.mul(30))).toBe(true);
  });
});
