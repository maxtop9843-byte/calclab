import { describe, expect, it } from "vitest";
import { validateAverageWage } from "./validation";
describe("validateAverageWage", () => {
  it("accepts valid comma-formatted wages and calendar days", () => {
    const result = validateAverageWage(
      { wageTotal: "9,000,000", calendarDays: "92" },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.wageTotal.toString()).toBe("9000000");
  });
  it.each(["", " ", ".", "-", "not-a-number", "0"])(
    "rejects unsafe wage input %j",
    (wageTotal) => {
      expect(() =>
        validateAverageWage({ wageTotal, calendarDays: "90" }, "en"),
      ).not.toThrow();
      expect(
        validateAverageWage({ wageTotal, calendarDays: "90" }, "en").data,
      ).toBeUndefined();
    },
  );
  it("rejects a divisor outside the three-month range", () => {
    expect(
      validateAverageWage({ wageTotal: "1000000", calendarDays: "93" }, "ko")
        .errors.calendarDays,
    ).toBeTruthy();
  });
});
