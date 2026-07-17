import Decimal from "decimal.js";
import type { HolidayWorkInput } from "./calculate";
export type Values = {
  hourlyWage: string;
  holidayHours: string;
  premiumRate: string;
};
const N = /^\d+(?:\.\d+)?$/,
  M = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
export function validateHolidayWorkPay(
  v: Values,
  l: "ko" | "en",
): { data?: HolidayWorkInput; errors: Partial<Record<keyof Values, string>> } {
  const errors: Partial<Record<keyof Values, string>> = {};
  let w: Decimal | null = null,
    h: Decimal | null = null,
    r: Decimal | null = null;
  if (M.test(v.hourlyWage.trim()))
    w = new Decimal(v.hourlyWage.replaceAll(",", ""));
  if (!w || w.lte(0))
    errors.hourlyWage =
      l === "ko"
        ? "올바른 시급을 입력해 주세요."
        : "Enter a valid hourly wage.";
  if (N.test(v.holidayHours.trim())) h = new Decimal(v.holidayHours);
  if (!h || h.lte(0) || h.gt(168))
    errors.holidayHours =
      l === "ko" ? "0~168시간 범위로 입력해 주세요." : "Enter 0 to 168 hours.";
  if (N.test(v.premiumRate.trim())) r = new Decimal(v.premiumRate);
  if (!r || r.lt(0) || r.gt(300))
    errors.premiumRate =
      l === "ko"
        ? "0~300% 범위로 입력해 주세요."
        : "Enter a rate from 0% to 300%.";
  return Object.keys(errors).length || !w || !h || !r
    ? { errors }
    : { errors, data: { hourlyWage: w, holidayHours: h, premiumRate: r } };
}
