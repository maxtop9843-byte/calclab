import { permanentRedirect } from "next/navigation";
import { describe, expect, it, vi } from "vitest";

import DepositRedirectPage from "./page";

vi.mock("next/navigation", () => ({ permanentRedirect: vi.fn() }));

describe("legacy deposit route", () => {
  it("permanently redirects to the canonical Korean fixed-deposit route", () => {
    DepositRedirectPage();
    expect(permanentRedirect).toHaveBeenCalledWith("/ko/finance/fixed-deposit");
  });
});
