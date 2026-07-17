import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateOvertimePay } from "./calculate";
describe("calculateOvertimePay", () => {
  it("calculates base and 50 percent premium", () => {
    const r = calculateOvertimePay({
      hourlyWage: new Decimal(12000),
      overtimeHours: new Decimal("10.5"),
      premiumRate: new Decimal(50),
    });
    expect(r.basePay.toNumber()).toBe(126000);
    expect(r.premiumPay.toNumber()).toBe(63000);
    expect(r.totalPay.toNumber()).toBe(189000);
  });
});
