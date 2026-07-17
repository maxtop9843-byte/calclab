import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MinimumWageCalculator } from "./minimum-wage-calculator";

describe("MinimumWageCalculator", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  it("shows a localized error instead of calculating invalid input", async () => {
    const user = userEvent.setup();
    render(<MinimumWageCalculator locale="ko" />);
    await user.type(screen.getByLabelText("주 소정근로시간"), "-");
    await user.click(screen.getByRole("button", { name: "최저임금 계산하기" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "주 소정근로시간을 1~40시간 범위로 입력하세요.",
    );
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName("₩0");
  });

  it("calculates 40 hours with paid weekly-holiday hours", async () => {
    const user = userEvent.setup();
    render(<MinimumWageCalculator locale="en" />);
    await user.type(screen.getByLabelText("Scheduled weekly hours"), "40");
    await user.click(
      screen.getByRole("button", { name: "Calculate minimum pay" }),
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩10,320",
    );
    expect(screen.getAllByTestId("animated-won")[1]).toHaveAccessibleName(
      "₩495,360",
    );
  });
});
