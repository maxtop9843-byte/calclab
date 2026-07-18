import Decimal from "decimal.js";
export type WorkplaceSize = "fiveOrMore" | "underFive";
export type OvertimePayInput = {
  hourlyWage: Decimal;
  overtimeHours: Decimal;
  premiumRate: Decimal;
  workplaceSize: WorkplaceSize;
};
export type OvertimePayResult = {
  basePay: Decimal;
  premiumPay: Decimal;
  totalPay: Decimal;
  effectiveHourlyPay: Decimal;
  overtimeHours: Decimal;
  premiumRate: Decimal;
  workplaceSize: WorkplaceSize;
};
export function calculateOvertimePay(
  input: OvertimePayInput,
): OvertimePayResult {
  const basePay = input.hourlyWage.mul(input.overtimeHours);
  const premiumPay = basePay.mul(input.premiumRate).div(100);
  return {
    basePay,
    premiumPay,
    totalPay: basePay.plus(premiumPay),
    effectiveHourlyPay: input.hourlyWage.mul(
      input.premiumRate.div(100).plus(1),
    ),
    overtimeHours: input.overtimeHours,
    premiumRate: input.premiumRate,
    workplaceSize: input.workplaceSize,
  };
}
