"use client";

import { useEffect } from "react";

interface SaveLastVisitedFundProps {
  category: string;
  strategy: string;
}

const SaveLastVisitedFund = ({
  category,
  strategy,
}: SaveLastVisitedFundProps) => {
  useEffect(() => {
    localStorage.setItem(
      "lastVisitedFund",
      JSON.stringify({ category, strategy })
    );
  }, [category, strategy]);

  return null;
};

export default SaveLastVisitedFund;
