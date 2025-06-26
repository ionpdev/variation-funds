import { FundResponse } from "./types";

export async function fetchFundData(slug: string): Promise<FundResponse> {
  const CDN_BASE_URL = process.env.CDN_BASE_URL;

  if (!CDN_BASE_URL) {
    throw new Error("CDN_BASE_URL environment variable is not set");
  }
  const url = `${CDN_BASE_URL}/${slug}.json`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch fund data for ${slug}: ${res.status}`);
  }

  const json = (await res.json()) as FundResponse;

  return json;
}

export async function fetchFundDataViaApi(
  slug: string
): Promise<FundResponse | null> {
  try {
    const res = await fetch(`/api/fund/${slug}`);

    if (!res.ok) {
      console.error(`API call failed with status: ${res.status}`);
      return null;
    }

    const data = (await res.json()) as FundResponse;
    return data;
  } catch (error) {
    console.error("Error fetching via custom api route:", error);
    return null;
  }
}
