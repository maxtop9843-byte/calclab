import { describe, expect, it } from "vitest";

import { createCagrGrowthRecords } from "./growth";

describe("createCagrGrowthRecords", () => {
  it("creates exact endpoints and annual geometric records", () => {
    const records = createCagrGrowthRecords(
      { initialValue: "100", finalValue: "121", years: "2" },
      "years",
    );
    expect(records).toHaveLength(3);
    expect(records[0]).toMatchObject({
      index: 0,
      value: "100",
      growthPercent: "0",
    });
    expect(records[1].value).toBe("110");
    expect(records[2]).toMatchObject({
      index: 2,
      value: "121",
      growthPercent: "21",
    });
  });

  it("creates month records and preserves a zero endpoint", () => {
    const records = createCagrGrowthRecords(
      {
        initialValue: "100",
        finalValue: "0",
        years:
          "0.083333333333333333333333333333333333333333333333333333333333333333333333333333333",
      },
      "months",
    );
    expect(records).toHaveLength(2);
    expect(records.at(-1)?.value).toBe("0");
    expect(records.at(-1)?.growthPercent).toBe("-100");
  });
});
