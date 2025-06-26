import { vi, describe, it, expect, beforeEach } from "vitest";
import { fetchFundData } from "./api";

describe("fetchFundData", () => {
  const mockResponse = {
    data: {
      quote: {
        name: "Test Fund",
      },
    },
  };

  beforeEach(() => {
    vi.resetAllMocks();
    process.env.CDN_BASE_URL = "https://mock-cdn.com";
  });

  it("should fetch fund data successfully", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchFundData("mock-slug");
    expect(data).toEqual(mockResponse);
  });

  it("should throw if CDN_BASE_URL is missing", async () => {
    delete process.env.CDN_BASE_URL;
    await expect(fetchFundData("slug")).rejects.toThrow(
      /CDN_BASE_URL environment variable is not set/
    );
  });

  it("should throw on bad response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(fetchFundData("slug")).rejects.toThrow(
      /Failed to fetch fund data/
    );
  });

  it("should throw if quote.name is missing", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { quote: {} } }),
    });

    await expect(fetchFundData("slug")).rejects.toThrow(
      /Invalid fund data structure/
    );
  });
});
