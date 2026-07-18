import Decimal from "decimal.js";

export type DsrInput = {
  annualIncome: Decimal;
  existingAnnualDebtService: Decimal;
  newLoanPrincipal: Decimal;
  annualInterestRate: Decimal;
  termYears: Decimal;
};

export type DsrResult = {
  monthlyPayment: Decimal;
  newAnnualDebtService: Decimal;
  totalAnnualDebtService: Decimal;
  dsrRate: Decimal;
  annualIncome: Decimal;
  existingAnnualDebtService: Decimal;
};

export function calculateDsr(input: DsrInput): DsrResult {
  const months = input.termYears.mul(12);
  const monthlyRate = input.annualInterestRate.div(100).div(12);
  const monthlyPayment = monthlyRate.eq(0)
    ? input.newLoanPrincipal.div(months)
    : input.newLoanPrincipal
        .mul(monthlyRate)
        .div(
          new Decimal(1).minus(
            new Decimal(1).plus(monthlyRate).pow(months.neg()),
          ),
        );
  const newAnnualDebtService = monthlyPayment.mul(12);
  const totalAnnualDebtService =
    input.existingAnnualDebtService.plus(newAnnualDebtService);

  return {
    monthlyPayment,
    newAnnualDebtService,
    totalAnnualDebtService,
    dsrRate: totalAnnualDebtService.div(input.annualIncome).mul(100),
    annualIncome: input.annualIncome,
    existingAnnualDebtService: input.existingAnnualDebtService,
  };
}
