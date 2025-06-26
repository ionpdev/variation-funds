import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FUND_SLUG_MAP: Record<string, string> = {
  "growth/cautious": "BYW8RV9",
  "growth/balanced": "BYW8RX1",
  "growth/adventurous": "BYW8VG2",
  "responsible/responsible": "BN0S2V9",
};

export function getFundSlug(
  category: string,
  strategy: string
): string | undefined {
  return FUND_SLUG_MAP[`${category.toLowerCase()}/${strategy.toLowerCase()}`];
}
