import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createDepositMetadata } from "../metadata";
import { LocalizedDepositPage } from "./localized-deposit-page";

describe("LocalizedDepositPage", () => {
  it("renders Korean content and canonical metadata", () => {
    render(<LocalizedDepositPage locale="ko" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "정기예금 계산기" }),
    ).toBeVisible();
    expect(createDepositMetadata("ko").alternates).toMatchObject({
      canonical: "/ko/finance/fixed-deposit",
      languages: {
        ko: "/ko/finance/fixed-deposit",
        en: "/en/finance/fixed-deposit",
      },
    });
  });
  it("renders English content with no unintended Korean", () => {
    const { container } = render(<LocalizedDepositPage locale="en" />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Fixed Deposit Calculator",
      }),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(/[가-힣]/);
    expect(createDepositMetadata("en").alternates).toMatchObject({
      canonical: "/en/finance/fixed-deposit",
      languages: {
        ko: "/ko/finance/fixed-deposit",
        en: "/en/finance/fixed-deposit",
      },
    });
  });
});
