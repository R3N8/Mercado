// This utility function renders star icons based on a given rating. 
// It uses the react-icons library to display filled and outlined stars. 
// The function takes a rating as input and returns a JSX element containing the appropriate number of filled and outlined stars.

import { FaStar, FaRegStar } from "react-icons/fa";

export function renderStars(rating: number) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= Math.floor(rating) ? (
          <FaStar key={star} style={{ color: "var(--color-accent)" }} />
        ) : (
          <FaRegStar key={star} style={{ color: "var(--color-accent)" }} />
        )
      )}
    </div>
  );
}