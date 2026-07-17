import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OvertimePayCalculator } from "./overtime-pay-calculator";
Element.prototype.scrollIntoView = vi.fn();
describe("OvertimePayCalculator", () => {
  it("calculates and resets", () => {
    render(<OvertimePayCalculator locale="ko" />);
    const wage = screen.getByLabelText("통상시급");
    expect(wage).toHaveClass("text-base");
    fireEvent.change(wage, { target: { value: "12000" } });
    fireEvent.change(screen.getByLabelText("연장근로시간"), {
      target: { value: "10" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "연장근로수당 계산하기" }),
    );
    expect(screen.getByText("가산 적용 시급")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "초기화" }));
    expect(wage).toHaveValue("");
  });
});
