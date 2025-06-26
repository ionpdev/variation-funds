import { describe, it, expect } from "vitest";
import { getFundSlug } from "./utils";

describe("getFundSlug", () => {
  it("should return correct slug for known strategy", () => {
    expect(getFundSlug("growth", "cautious")).toBe("BYW8RV9");
    expect(getFundSlug("responsible", "responsible")).toBe("BN0S2V9");
  });

  it("should return undefined for unknown input", () => {
    expect(getFundSlug("growth", "unknown")).toBeUndefined();
  });
});
