"use client";

import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  max?: number;
}

const RatingStars = ({ rating, max = 5 }: RatingStarsProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">
        {rating} / {max}
      </span>
    </div>
  );
};

export default RatingStars;
