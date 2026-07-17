import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SocialInsuranceCalculator } from "./social-insurance-calculator";

Element.prototype.scrollIntoView = vi.fn();
describe("SocialInsuranceCalculator", () => {
  it("renders empty mobile-safe inputs and calculates a localized breakdown", () => {
    render(<SocialInsuranceCalculator locale="ko" />);
    const pay = screen.getByLabelText("월 보수");
    expect(pay).toHaveValue("");
    expect(pay).toHaveAttribute("placeholder", "예: 3,500,000");
    expect(pay).toHaveClass("text-base");
    fireEvent.change(pay, { target: { value: "3500000" } });
    fireEvent.change(screen.getByLabelText("월 비과세 급여"), {
      target: { value: "200000" },
    });
    fireEvent.change(screen.getByLabelText("산재보험 요율"), {
      target: { value: "0.7" },
    });
    fireEvent.click(screen.getByRole("button", { name: "4대보험 계산하기" }));
    expect(screen.getByText("국민연금")).toBeInTheDocument();
    expect(screen.getByText("산재보험")).toBeInTheDocument();
  });
  it("shows English validation instead of creating a result", () => {
    render(<SocialInsuranceCalculator locale="en" />);
    fireEvent.change(screen.getByLabelText("Monthly pay"), {
      target: { value: "." },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate contributions" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Check the highlighted values.",
    );
  });
});
