import type { RetirementPensionInput } from "./calculate";

export function validateRetirementPension(input: Record<string, string>) {
  const monthlyContribution = Number(
    input.monthlyContribution.replaceAll(",", ""),
  );
  const years = Number(input.years);
  const annualReturnRate = Number(input.annualReturnRate);
  if (
    !Number.isFinite(monthlyContribution) ||
    !Number.isFinite(years) ||
    !Number.isFinite(annualReturnRate) ||
    monthlyContribution <= 0 ||
    years <= 0 ||
    years > 60 ||
    annualReturnRate < 0 ||
    annualReturnRate > 30
  ) {
    return null;
  }
  return {
    monthlyContribution,
    years,
    annualReturnRate,
  } satisfies RetirementPensionInput;
}
