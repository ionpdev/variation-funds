export interface FundResponse {
  data: {
    quote: Quote;
    profile: Profile;
    ratings: Ratings;
    documents: Document[];
    portfolio: Portfolio;
  };
}

export interface Quote {
  name: string;
  marketCode: string;
  lastPrice: number;
  lastPriceDate: string;
  ongoingCharge: number;
  sectorName: string;
  currency: string;
}

export interface Profile {
  objective: string;
}

export interface Ratings {
  analystRating: number;
  analystRatingLabel: string;
  SRRI?: number;
}

export type DocumentType = "Factsheet" | "KIID" | "Prospectus";

export interface Document {
  id: string;
  type: DocumentType;
  url: string;
}

export interface Portfolio {
  asset: Asset[];
  top10Holdings: TopHolding[];
}

export interface Asset {
  label: string;
  value: number;
}

export interface TopHolding {
  name: string;
  weighting: number;
}
