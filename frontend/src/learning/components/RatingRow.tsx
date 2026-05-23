import { Star } from "lucide-react";
import { learningTheme } from "../theme/tokens";

interface RatingRowProps {
  rating: number;
  reviews: number;
}

export function RatingRow({ rating, reviews }: RatingRowProps) {
  return (
    <div className="mt-1 flex items-center gap-1 text-[11px]" style={{ color: learningTheme.colors.textSecondary }}>
      <Star className="h-3 w-3 fill-current" style={{ color: learningTheme.colors.accent }} />
      <span>{rating.toFixed(1)}</span>
      <span>({reviews} reviews)</span>
    </div>
  );
}
