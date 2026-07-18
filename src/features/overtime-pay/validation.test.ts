import { describe, expect, it } from "vitest";
import { validateOvertimePay } from "./validation";
describe("validateOvertimePay", () => {
  it("accepts decimal hours", () => {
    expect(
      validateOvertimePay(
        {
          hourlyWage: "12,000",
          overtimeHours: "10.5",
          premiumRate: "50",
          workplaceSize: "fiveOrMore",
        },
        "ko",
      ).errors,
    ).toEqual({});
  });
  it.each(["", " ", ".", "-", "bad"])("rejects unsafe input %j", (v) => {
    expect(() =>
      validateOvertimePay(
        {
          hourlyWage: v,
          overtimeHours: v,
          premiumRate: v,
          workplaceSize: "fiveOrMore",
        },
        "en",
      ),
    ).not.toThrow();
    expect(
      validateOvertimePay(
        {
          hourlyWage: v,
          overtimeHours: v,
          premiumRate: v,
          workplaceSize: "fiveOrMore",
        },
        "en",
      ).data,
    ).toBeUndefined();
  });
  it("rejects a premium below 50 percent for five or more employees", () => {
    expect(
      validateOvertimePay(
        {
          hourlyWage: "12000",
          overtimeHours: "1",
          premiumRate: "49",
          workplaceSize: "fiveOrMore",
        },
        "en",
      ).data,
    ).toBeUndefined();
  });
  it.each(["50", "100"])(
    "accepts %s percent for five or more employees",
    (premiumRate) => {
      expect(
        validateOvertimePay(
          {
            hourlyWage: "12000",
            overtimeHours: "1",
            premiumRate,
            workplaceSize: "fiveOrMore",
          },
          "ko",
        ).data,
      ).toBeDefined();
    },
  );
  it("accepts a contractual premium below five employees and rejects unknown workplace size", () => {
    expect(
      validateOvertimePay(
        {
          hourlyWage: "12000",
          overtimeHours: "1.5",
          premiumRate: "0",
          workplaceSize: "underFive",
        },
        "ko",
      ).data,
    ).toBeDefined();
    expect(
      validateOvertimePay(
        {
          hourlyWage: "12000",
          overtimeHours: "1",
          premiumRate: "0",
          workplaceSize: "other",
        },
        "en",
      ).data,
    ).toBeUndefined();
  });
});
