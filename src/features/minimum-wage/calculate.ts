import Decimal from "decimal.js";

export const MINIMUM_HOURLY_WAGE_2026 = new Decimal(10320);
export const AVERAGE_WEEKS_PER_MONTH = new Decimal("4.345");

export type MinimumWageInput = {
  weeklyHours: Decimal;
  includesPaidWeeklyHoliday: boolean;
};

export type MinimumWageResult = {
  hourlyMinimum: Decimal;
  weeklyMinimum: Decimal;
  monthlyMinimum: Decimal;
  paidWeeklyHolidayHours: Decimal;
};

export function calculateMinimumWage(
  input: MinimumWageInput,
): MinimumWageResult {
  const paidWeeklyHolidayHours = input.includesPaidWeeklyHoliday
    ? Decimal.min(input.weeklyHours.div(5), 8)
    : new Decimal(0);
  const weeklyMinimum = MINIMUM_HOURLY_WAGE_2026.mul(
    input.weeklyHours.plus(paidWeeklyHolidayHours),
  );

  return {
    hourlyMinimum: MINIMUM_HOURLY_WAGE_2026,
    weeklyMinimum,
    monthlyMinimum: weeklyMinimum.mul(AVERAGE_WEEKS_PER_MONTH),
    paidWeeklyHolidayHours,
  };
}
