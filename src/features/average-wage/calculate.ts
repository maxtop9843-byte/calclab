import Decimal from "decimal.js";

export type AverageWageInput = {
  wageTotal: Decimal;
  calendarDays: Decimal;
};

export type AverageWageResult = {
  wageTotal: Decimal;
  calendarDays: Decimal;
  averageDailyWage: Decimal;
  thirtyDayWage: Decimal;
  annualizedWage: Decimal;
};

export function calculateAverageWage(
  input: AverageWageInput,
): AverageWageResult {
  const averageDailyWage = input.wageTotal.div(input.calendarDays);
  return {
    ...input,
    averageDailyWage,
    thirtyDayWage: averageDailyWage.mul(30),
    annualizedWage: averageDailyWage.mul(365),
  };
}
