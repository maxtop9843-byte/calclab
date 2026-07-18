import { describe, expect, it } from "vitest";
import { validateDsr } from "./validation";

describe("validateDsr", () => {
  it("accepts safe comma-formatted inputs", () => {
    const result = validateDsr(
      {
        annualIncome: "60,000,000",
        existingAnnualDebtService: "0",
        newLoanPrincipal: "100,000,000",
        annualInterestRate: "4.5",
        termYears: "20",
      },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.annualIncome.toNumber()).toBe(60_000_000);
  });

  it("rejects an invalid term and missing debt service", () => {
    const result = validateDsr(
      {
        annualIncome: "60000000",
        existingAnnualDebtService: "",
        newLoanPrincipal: "100000000",
        annualInterestRate: "4",
        termYears: "20.5",
      },
      "en",
    );
    expect(result.data).toBeUndefined();
    expect(result.errors.existingAnnualDebtService).toBeTruthy();
    expect(result.errors.termYears).toBeTruthy();
  });
});
