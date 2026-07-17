import { describe, expect, it } from "vitest";
import { validateSocialInsurance } from "./validation";
describe("validateSocialInsurance", () => {
  it("rejects invalid, negative, and excessive values without throwing", () => {
    expect(
      validateSocialInsurance(
        { monthlyPay: ".", nonTaxablePay: "-", accidentRate: "word" },
        "ko",
      ).data,
    ).toBeUndefined();
    expect(
      validateSocialInsurance(
        {
          monthlyPay: "3,000,000",
          nonTaxablePay: "3,000,000",
          accidentRate: "21",
        },
        "en",
      ).data,
    ).toBeUndefined();
  });
  it("accepts decimals and optional zero-value fields", () => {
    const result = validateSocialInsurance(
      { monthlyPay: "3,500,000", nonTaxablePay: "", accidentRate: "0.75" },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.accidentRate.toString()).toBe("0.75");
  });
});
