import type Decimal from "decimal.js";

export type SocialInsuranceLocale = "ko" | "en";
export type SocialInsuranceFormValues = {
  monthlyPay: string;
  nonTaxablePay: string;
  accidentRate: string;
};
export type SocialInsuranceInput = {
  monthlyPay: Decimal;
  nonTaxablePay: Decimal;
  accidentRate: Decimal;
};
export type SocialInsuranceErrors = Partial<
  Record<keyof SocialInsuranceFormValues, string>
>;
export type SocialInsuranceResult = {
  contributionBase: Decimal;
  employee: {
    pension: Decimal;
    health: Decimal;
    longTermCare: Decimal;
    employment: Decimal;
    total: Decimal;
  };
  employer: {
    pension: Decimal;
    health: Decimal;
    longTermCare: Decimal;
    employment: Decimal;
    industrialAccident: Decimal;
    total: Decimal;
  };
  combinedTotal: Decimal;
};
