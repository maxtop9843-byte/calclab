import Decimal from "decimal.js";

import { MAX_CAGR_MONTHS, MAX_CAGR_VALUE } from "./constants";
import { getCagrDictionary, type CagrLocale } from "./i18n";
import type { CagrFormValues, CagrInput, CagrValidationErrors } from "./types";

Decimal.set({ precision: 80, rounding: Decimal.ROUND_HALF_UP });

const VALUE_PATTERN = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;

function parseDecimal(value: string, pattern: RegExp): Decimal | null {
  const trimmed = value.trim();
  if (!pattern.test(trimmed)) return null;
  try {
    const parsed = new Decimal(trimmed.replaceAll(",", ""));
    return parsed.isFinite() ? parsed : null;
  } catch {
    return null;
  }
}

export function validateCagrForm(
  values: CagrFormValues,
  locale: CagrLocale = "ko",
): {
  data?: CagrInput;
  errors: CagrValidationErrors;
} {
  const errors: CagrValidationErrors = {};
  const copy = getCagrDictionary(locale).validation;
  const initialValue = parseDecimal(values.initialValue, VALUE_PATTERN);
  const finalValue = parseDecimal(values.finalValue, VALUE_PATTERN);
  const period = parseDecimal(values.investmentPeriod, /^\d+$/);

  if (!initialValue || initialValue.lte(0) || initialValue.gt(MAX_CAGR_VALUE)) {
    errors.initialValue = copy.initialInvalid;
  }
  if (!finalValue || finalValue.isNegative() || finalValue.gt(MAX_CAGR_VALUE)) {
    errors.finalValue = copy.finalInvalid;
  }
  if (!period || !period.isInteger() || period.lt(1)) {
    errors.investmentPeriod = copy.periodInvalid;
  }
  if (!(values.periodUnit === "years" || values.periodUnit === "months")) {
    errors.periodUnit = copy.unitInvalid;
  }

  const months = period
    ? period.mul(values.periodUnit === "years" ? 12 : 1)
    : null;
  if (months && months.gt(MAX_CAGR_MONTHS)) {
    errors.investmentPeriod = copy.periodMax;
  }
  if (!values.initialValue.trim()) errors.initialValue = copy.initialRequired;
  if (!values.finalValue.trim()) errors.finalValue = copy.finalRequired;
  if (!values.investmentPeriod.trim())
    errors.investmentPeriod = copy.periodRequired;

  if (Object.keys(errors).length) return { errors };

  return {
    errors,
    data: {
      initialValue: initialValue!.toString(),
      finalValue: finalValue!.toString(),
      years: months!.div(12).toString(),
    },
  };
}
