import Decimal from "decimal.js";
export type HolidayWorkInput = {
  hourlyWage: Decimal;
  holidayHours: Decimal;
  premiumRate: Decimal;
};
export type HolidayWorkResult = {
  basePay: Decimal;
  premiumPay: Decimal;
  totalPay: Decimal;
  holidayHours: Decimal;
  premiumRate: Decimal;
};
export function calculateHolidayWorkPay(
  i: HolidayWorkInput,
): HolidayWorkResult {
  const basePay = i.hourlyWage.mul(i.holidayHours),
    premiumPay = basePay.mul(i.premiumRate).div(100);
  return {
    basePay,
    premiumPay,
    totalPay: basePay.plus(premiumPay),
    holidayHours: i.holidayHours,
    premiumRate: i.premiumRate,
  };
}
