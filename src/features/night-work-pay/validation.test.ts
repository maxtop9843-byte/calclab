import { describe, it, expect } from "vitest";
import { validateNightWorkPay } from "./validation";
describe("validation", () => {
  it("accepts decimals", () =>
    expect(
      validateNightWorkPay(
        { hourlyWage: "12,000", nightHours: "7.5", premiumRate: "50" },
        "ko",
      ).errors,
    ).toEqual({}));
  it.each(["", ".", "-", "bad"])("rejects %j", (v) =>
    expect(
      validateNightWorkPay(
        { hourlyWage: v, nightHours: v, premiumRate: v },
        "en",
      ).data,
    ).toBeUndefined(),
  );
});
