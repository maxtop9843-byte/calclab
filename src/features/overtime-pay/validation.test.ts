import { describe, expect, it } from "vitest";
import { validateOvertimePay } from "./validation";
describe("validateOvertimePay", () => {
  it("accepts decimal hours", () => {
    expect(
      validateOvertimePay(
        { hourlyWage: "12,000", overtimeHours: "10.5", premiumRate: "50" },
        "ko",
      ).errors,
    ).toEqual({});
  });
  it.each(["", " ", ".", "-", "bad"])("rejects unsafe input %j", (v) => {
    expect(() =>
      validateOvertimePay(
        { hourlyWage: v, overtimeHours: v, premiumRate: v },
        "en",
      ),
    ).not.toThrow();
    expect(
      validateOvertimePay(
        { hourlyWage: v, overtimeHours: v, premiumRate: v },
        "en",
      ).data,
    ).toBeUndefined();
  });
});
