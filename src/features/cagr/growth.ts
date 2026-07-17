import Decimal from "decimal.js";

import type { CagrGrowthRecord, CagrInput, CagrPeriodUnit } from "./types";

export function createCagrGrowthRecords(
  input: CagrInput,
  periodUnit: CagrPeriodUnit,
): CagrGrowthRecord[] {
  const initialValue = new Decimal(input.initialValue);
  const finalValue = new Decimal(input.finalValue);
  const totalYears = new Decimal(input.years);
  const totalSteps = totalYears
    .mul(periodUnit === "years" ? 1 : 12)
    .toDecimalPlaces(0)
    .toNumber();
  const ratio = finalValue.div(initialValue);

  return Array.from({ length: totalSteps + 1 }, (_, index) => {
    const progress = new Decimal(index).div(totalSteps);
    const value =
      index === totalSteps
        ? finalValue
        : index === 0
          ? initialValue
          : ratio.isZero()
            ? new Decimal(0)
            : initialValue.mul(ratio.pow(progress));
    return {
      index,
      years: totalYears.mul(progress).toString(),
      value: value.toString(),
      growthPercent: value.div(initialValue).minus(1).mul(100).toString(),
    };
  });
}
