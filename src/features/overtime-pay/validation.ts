import Decimal from "decimal.js";
import type { OvertimePayInput } from "./calculate";
export type OvertimePayValues = {
  hourlyWage: string;
  overtimeHours: string;
  premiumRate: string;
};
export type OvertimePayErrors = Partial<
  Record<keyof OvertimePayValues, string>
>;
const NUMBER = /^\d+(?:\.\d+)?$/;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
export function validateOvertimePay(
  values: OvertimePayValues,
  locale: "ko" | "en",
): { data?: OvertimePayInput; errors: OvertimePayErrors } {
  const errors: OvertimePayErrors = {};
  let hourlyWage: Decimal | null = null,
    overtimeHours: Decimal | null = null,
    premiumRate: Decimal | null = null;
  const wage = values.hourlyWage.trim(),
    hours = values.overtimeHours.trim(),
    rate = values.premiumRate.trim();
  if (MONEY.test(wage)) hourlyWage = new Decimal(wage.replaceAll(",", ""));
  if (!hourlyWage || hourlyWage.lte(0) || hourlyWage.gt(10_000_000))
    errors.hourlyWage =
      locale === "ko"
        ? "0보다 큰 올바른 시급을 입력해 주세요."
        : "Enter a valid hourly wage greater than zero.";
  if (NUMBER.test(hours)) overtimeHours = new Decimal(hours);
  if (!overtimeHours || overtimeHours.lte(0) || overtimeHours.gt(168))
    errors.overtimeHours =
      locale === "ko"
        ? "0보다 크고 168시간 이하로 입력해 주세요."
        : "Enter more than 0 and no more than 168 hours.";
  if (NUMBER.test(rate)) premiumRate = new Decimal(rate);
  if (!premiumRate || premiumRate.lt(0) || premiumRate.gt(200))
    errors.premiumRate =
      locale === "ko"
        ? "0~200% 범위로 입력해 주세요."
        : "Enter a premium from 0% to 200%.";
  return Object.keys(errors).length ||
    !hourlyWage ||
    !overtimeHours ||
    !premiumRate
    ? { errors }
    : { errors, data: { hourlyWage, overtimeHours, premiumRate } };
}
