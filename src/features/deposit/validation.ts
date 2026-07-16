import Decimal from "decimal.js";

import { GENERAL_INTEREST_TAX_RATE } from "./constants";
import { getDepositDictionary, type DepositLocale } from "./i18n";
import type {
  DepositFormValues,
  DepositInput,
  DepositValidationErrors,
} from "./types";

const MONEY_PATTERN = /^(?:\d+|\d{1,3}(?:,\d{3})+)$/;
const DECIMAL_PATTERN = /^\d+(?:\.\d+)?$/;

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

export function validateDepositForm(
  values: DepositFormValues,
  locale: DepositLocale = "ko",
): {
  data?: DepositInput;
  errors: DepositValidationErrors;
} {
  const errors: DepositValidationErrors = {};
  const copy = getDepositDictionary(locale).validation;
  const amount = parseDecimal(values.depositAmount, MONEY_PATTERN);
  const period = parseDecimal(values.depositPeriod, /^\d+$/);
  const rate = parseDecimal(values.annualInterestRate, DECIMAL_PATTERN);
  const customTax = parseDecimal(values.customTaxRate, DECIMAL_PATTERN);

  if (!amount || amount.lt(10000) || amount.gt("1000000000000")) {
    errors.depositAmount = copy.amount;
  }
  if (!period || !period.isInteger() || period.lt(1)) {
    errors.depositPeriod = copy.period;
  }
  if (!(values.periodUnit === "months" || values.periodUnit === "years")) {
    errors.periodUnit = copy.periodUnit;
  }
  if (!rate || rate.isNegative() || rate.gt(100)) {
    errors.annualInterestRate = copy.rate;
  }
  if (!(
    values.interestMethod === "simple" || values.interestMethod === "compound"
  )) {
    errors.interestMethod = copy.method;
  }
  if (
    !(["tax-free", "general", "custom"] as string[]).includes(values.taxOption)
  ) {
    errors.taxOption = copy.tax;
  }
  if (
    values.taxOption === "custom" &&
    (!customTax || customTax.isNegative() || customTax.gt(100))
  ) {
    errors.customTaxRate = copy.customTax;
  }

  const months = period
    ? period.mul(values.periodUnit === "years" ? 12 : 1)
    : null;
  if (months && months.gt(1200)) {
    errors.depositPeriod = copy.maxPeriod;
  }

  if (!values.depositAmount.trim()) errors.depositAmount = copy.requiredAmount;
  if (!values.depositPeriod.trim()) errors.depositPeriod = copy.requiredPeriod;
  if (!values.annualInterestRate.trim())
    errors.annualInterestRate = copy.requiredRate;
  if (Object.keys(errors).length) return { errors };

  const taxRate =
    values.taxOption === "tax-free"
      ? "0"
      : values.taxOption === "general"
        ? GENERAL_INTEREST_TAX_RATE
        : customTax!.toString();

  return {
    errors,
    data: {
      principal: amount!.toString(),
      months: months!.toNumber(),
      annualInterestRate: rate!.toString(),
      interestMethod: values.interestMethod,
      taxRate,
      taxOption: values.taxOption,
    },
  };
}
