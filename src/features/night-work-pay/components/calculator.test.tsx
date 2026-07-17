import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NightWorkPayCalculator } from "./calculator";
Element.prototype.scrollIntoView = vi.fn();
describe("calculator", () =>
  it("calculates", () => {
    render(<NightWorkPayCalculator locale="ko" />);
    fireEvent.change(screen.getByLabelText("통상시급"), {
      target: { value: "12000" },
    });
    fireEvent.change(screen.getByLabelText("야간근로시간"), {
      target: { value: "8" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "야간근로수당 계산하기" }),
    );
    expect(screen.getByText("가산 적용 시급")).toBeVisible();
  }));
