import { describe, expect, it } from "vitest";
import { createOvertimePayMetadata } from "./metadata";
describe("metadata", () => {
  it("uses localized URLs", () =>
    expect(createOvertimePayMetadata("en").alternates).toEqual({
      canonical: "/en/employment/overtime-pay",
      languages: {
        ko: "/ko/employment/overtime-pay",
        en: "/en/employment/overtime-pay",
        "x-default": "/ko/employment/overtime-pay",
      },
    }));
});
