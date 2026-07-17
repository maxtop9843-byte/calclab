import { permanentRedirect } from "next/navigation";
import { describe, expect, it, vi } from "vitest";

import CagrRedirectPage from "./page";

vi.mock("next/navigation", () => ({ permanentRedirect: vi.fn() }));

describe("legacy CAGR route", () => {
  it("redirects permanently to the Korean canonical route", () => {
    CagrRedirectPage();
    expect(permanentRedirect).toHaveBeenCalledWith("/ko/finance/cagr");
  });
});
