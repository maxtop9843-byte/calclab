export type RetirementPensionInput = {
  monthlyContribution: number;
  years: number;
  annualReturnRate: number;
};

export function calculateRetirementPension({
  monthlyContribution,
  years,
  annualReturnRate,
}: RetirementPensionInput) {
  const months = years * 12;
  const monthlyRate = annualReturnRate / 100 / 12;
  const principal = monthlyContribution * months;
  const estimatedBalance =
    monthlyRate === 0
      ? principal
      : monthlyContribution *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return {
    principal,
    estimatedBalance: Math.round(estimatedBalance),
    investmentGain: Math.round(estimatedBalance - principal),
  };
}
