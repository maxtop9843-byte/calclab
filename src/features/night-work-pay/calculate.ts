import Decimal from "decimal.js";
export type NightWorkInput = {
  hourlyWage: Decimal;
  nightHours: Decimal;
  premiumRate: Decimal;
};
export type NightWorkResult = {
  basePay: Decimal;
  premiumPay: Decimal;
  totalPay: Decimal;
  adjustedHourlyPay: Decimal;
  nightHours: Decimal;
  premiumRate: Decimal;
};
export function calculateNightWorkPay(i: NightWorkInput): NightWorkResult {
  const basePay = i.hourlyWage.mul(i.nightHours),
    premiumPay = basePay.mul(i.premiumRate).div(100);
  return {
    basePay,
    premiumPay,
    totalPay: basePay.plus(premiumPay),
    adjustedHourlyPay: i.hourlyWage.mul(i.premiumRate.div(100).plus(1)),
    nightHours: i.nightHours,
    premiumRate: i.premiumRate,
  };
}
