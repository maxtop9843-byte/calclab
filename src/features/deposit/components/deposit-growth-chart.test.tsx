import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { COMPOUND_ANIMATION_DURATION } from "@/features/compound-interest/components/compound-animation";

import type { DepositScheduleRow } from "../types";
import {
  createDepositGrowthData,
  DepositGrowthChart,
} from "./deposit-growth-chart";

const schedule: DepositScheduleRow[] = [
  {
    month: 1,
    principal: "1000000",
    accumulatedInterest: "10000",
    balance: "1010000",
  },
];

describe("DepositGrowthChart", () => {
  it("uses actual schedule records for three synchronized series", () => {
    expect(createDepositGrowthData(schedule)[0]).toMatchObject({
      principalNumber: 1000000,
      interestNumber: 10000,
      balanceNumber: 1010000,
    });
    render(<DepositGrowthChart schedule={schedule} animationKey={3} />);
    expect(screen.getByTestId("deposit-growth-chart")).toHaveAttribute(
      "data-animation-duration",
      String(COMPOUND_ANIMATION_DURATION),
    );
    expect(screen.getByTestId("deposit-growth-chart")).toHaveAttribute(
      "data-animation-run",
      "3",
    );
    expect(
      screen.getByLabelText("차트 범례").querySelectorAll("[data-series]"),
    ).toHaveLength(3);
  });
  it("localizes accessible chart copy", () => {
    render(<DepositGrowthChart locale="en" />);
    expect(
      screen.getByRole("heading", { name: "Fixed deposit growth chart" }),
    ).toBeVisible();
    expect(screen.getByLabelText("Chart legend")).toHaveTextContent(
      "Initial principalAccumulated interestEstimated maturity value",
    );
  });
});
