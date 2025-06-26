"use client";

import React from "react";
import clsx from "clsx";

interface RiskSliderProps {
  srri: number;
  max?: number;
}

const RiskSlider = ({ srri, max = 7 }: RiskSliderProps) => {
  const getColor = (index: number) => {
    if (index < 2) return "bg-green-400";
    if (index < 4) return "bg-yellow-400";
    if (index < 6) return "bg-orange-400";
    return "bg-red-500";
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm text-muted-foreground">
          Risk Level (SRRI):
        </span>
        <span className="text-sm font-medium">
          {srri} / {max}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              "h-3 flex-1 rounded",
              i < srri ? getColor(i) : "bg-gray-200"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default RiskSlider;
