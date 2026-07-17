import Decimal from "decimal.js";
import type { NightWorkInput } from "./calculate";
export type Values = {
  hourlyWage: string;
  nightHours: string;
  premiumRate: string;
};
export type Errors = Partial<Record<keyof Values, string>>;
const N = /^\d+(?:\.\d+)?$/,
  M = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
export function validateNightWorkPay(
  v: Values,
  l: "ko" | "en",
): { data?: NightWorkInput; errors: Errors } {
  const errors: Errors = {};
  let w: Decimal | null = null,
    h: Decimal | null = null,
    r: Decimal | null = null;
  const wt = v.hourlyWage.trim(),
    ht = v.nightHours.trim(),
    rt = v.premiumRate.trim();
  if (M.test(wt)) w = new Decimal(wt.replaceAll(",", ""));
  if (!w || w.lte(0) || w.gt(10_000_000))
    errors.hourlyWage =
      l === "ko"
        ? "0보다 큰 올바른 시급을 입력해 주세요."
        : "Enter a valid hourly wage greater than zero.";
  if (N.test(ht)) h = new Decimal(ht);
  if (!h || h.lte(0) || h.gt(168))
    errors.nightHours =
      l === "ko"
        ? "0보다 크고 168시간 이하로 입력해 주세요."
        : "Enter more than 0 and no more than 168 hours.";
  if (N.test(rt)) r = new Decimal(rt);
  if (!r || r.lt(0) || r.gt(200))
    errors.premiumRate =
      l === "ko"
        ? "0~200% 범위로 입력해 주세요."
        : "Enter a premium from 0% to 200%.";
  return Object.keys(errors).length || !w || !h || !r
    ? { errors }
    : { errors, data: { hourlyWage: w, nightHours: h, premiumRate: r } };
}
