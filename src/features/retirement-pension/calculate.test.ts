import { describe, expect, it } from "vitest";
import { calculateRetirementPension } from "./calculate";
import { validateRetirementPension } from "./validation";
describe("retirement pension", () => {
  it("calculates compound monthly contributions", () => {
    expect(
      calculateRetirementPension({
        monthlyContribution: 500000,
        years: 20,
        annualReturnRate: 4,
      }),
    ).toMatchObject({ principal: 120000000, estimatedBalance: 183387313 });
  });
  it("rejects invalid input", () => {
    expect(
      validateRetirementPension({
        monthlyContribution: "0",
        years: "20",
        annualReturnRate: "4",
      }),
    ).toBeNull();
  });
});
