import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AverageWageCalculator } from "./average-wage-calculator";
Element.prototype.scrollIntoView = vi.fn();
describe("AverageWageCalculator", () => {
  it("starts empty, calculates, and resets", () => {
    render(<AverageWageCalculator locale="ko" />);
    const wage = screen.getByLabelText("산정기간 임금총액");
    expect(wage).toHaveValue("");
    expect(wage).toHaveClass("text-base");
    fireEvent.change(wage, { target: { value: "9000000" } });
    fireEvent.change(screen.getByLabelText("산정기간 총일수"), {
      target: { value: "92" },
    });
    fireEvent.click(screen.getByRole("button", { name: "평균임금 계산하기" }));
    expect(screen.getByText("포함한 임금총액")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "초기화" }));
    expect(wage).toHaveValue("");
  });
  it("shows localized errors without producing a result", () => {
    render(<AverageWageCalculator locale="en" />);
    fireEvent.change(screen.getByLabelText("Total wages in period"), {
      target: { value: "." },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate average wage" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Check the highlighted values.",
    );
  });
});
