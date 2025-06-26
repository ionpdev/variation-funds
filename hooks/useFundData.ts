import { useEffect, useState } from "react";
import type { FundResponse } from "@/lib/types";
import { fetchFundData, fetchFundDataViaApi } from "@/lib/api";

export const useFundData = (slug: string) => {
  const [data, setData] = useState<FundResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const fetchFn =
        typeof window === "undefined" ? fetchFundData : fetchFundDataViaApi;

      try {
        const response = await fetchFn(slug);
        if (!cancelled) {
          setData(response?.data ?? null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Failed to fetch fund data";
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { data, loading, error };
};
