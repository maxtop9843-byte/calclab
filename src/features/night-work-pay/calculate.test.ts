import Decimal from "decimal.js";
import { describe, it, expect } from "vitest";
import { calculateNightWorkPay } from "./calculate";
describe("night work", () =>
  it("adds 50 percent premium", () =>
    expect(
      calculateNightWorkPay({
        hourlyWage: new Decimal(12000),
        nightHours: new Decimal(8),
        premiumRate: new Decimal(50),
      }).totalPay.toNumber(),
    ).toBe(144000)));
