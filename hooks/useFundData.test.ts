import { vi, describe, it, expect, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFundData } from "@/hooks/useFundData";
import { fetchFundDataViaApi } from "@/lib/api";
import { FundResponse } from "@/lib/types";

vi.mock("@/lib/api", () => ({
  fetchFundDataViaApi: vi.fn(),
  fetchFundData: vi.fn(), // in case used in SSR
}));

const mockFund: FundResponse = {
  data: {
    quote: {
      name: "Test Fund",
      lastPrice: 1,
      lastPriceDate: "2024-01-01",
      currency: "GBP",
      ongoingCharge: 0.2,
      sectorName: "Sector",
      marketCode: "abc",
    },
    profile: { objective: "Objective" },
    ratings: { analystRating: 3, SRRI: 4, analystRatingLabel: "Neutral" },
    documents: [],
    portfolio: { asset: [], top10Holdings: [] },
  },
};

describe("useFundData", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return loading state initially", () => {
    (fetchFundDataViaApi as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockFund
    );
    const { result } = renderHook(() => useFundData("test-slug"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should return data after successful fetch", async () => {
    (fetchFundDataViaApi as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockFund
    );

    const { result } = renderHook(() => useFundData("test-slug"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockFund.data);
    expect(result.current.error).toBeNull();
  });

  it("should handle error on fetch failure", async () => {
    (fetchFundDataViaApi as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("fail")
    );

    const { result } = renderHook(() => useFundData("bad-slug"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("fail");
  });
});
