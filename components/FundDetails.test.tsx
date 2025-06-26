import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FundDetails from "./FundDetails";

const mockData = {
  quote: {
    name: "Test Fund",
    sectorName: "Test Sector",
    currency: "GBP",
    lastPrice: 100.5,
    lastPriceDate: "2027-11-08",
    ongoingCharge: 0.55,
  },
  profile: {
    objective: "Test objective for the fund.",
  },
  ratings: {
    analystRating: 3,
    SRRI: 4,
  },
  documents: [
    { id: "1", type: "Factsheet", url: "https://example.com/fundstatus.pdf" },
  ],
  portfolio: {
    asset: [
      { label: "Stock", value: 50 },
      { label: "Bond", value: 50 },
    ],
  },
};

describe("FundDetails", () => {
  it("should render all fund sections correctly", () => {
    render(<FundDetails data={mockData} />);

    expect(screen.getByText("Test Fund")).toBeInTheDocument();
    expect(screen.getByText(/Sector: Test Sector/i)).toBeInTheDocument();
    expect(screen.getByText(/Currency: GBP/i)).toBeInTheDocument();
    expect(screen.getByText(/Ongoing Charge: 0.55%/)).toBeInTheDocument();
    expect(screen.getByText(/Ratings/)).toBeInTheDocument();
    expect(screen.getByText(/Fund Objective/)).toBeInTheDocument();
    expect(screen.getByText(/Test objective/)).toBeInTheDocument();
    expect(screen.getByText(/Documents/)).toBeInTheDocument();
    expect(screen.getByText(/Factsheet/)).toBeInTheDocument();
    expect(screen.getByText(/Asset Allocation/)).toBeInTheDocument();
  });

  it("should render components with missing data", () => {
    render(<FundDetails data={{}} />);

    expect(screen.getAllByText("-").length).toBeGreaterThan(0);
    expect(screen.getByText(/SRRI not available/)).toBeInTheDocument();
    expect(screen.getByText("No objective provided.")).toBeInTheDocument();
  });
});
