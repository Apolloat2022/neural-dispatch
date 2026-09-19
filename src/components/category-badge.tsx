import { cn } from "@/lib/utils";
import { categorySlug, getCategory } from "@/lib/categories";

const DEFAULT_BADGE = "bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/30";

interface CategoryBadgeProps {
  category: string;
  className?: string;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, className, size = "md" }: CategoryBadgeProps) {
  const colorClass =
    getCategory(categorySlug(category))?.badgeClass ?? DEFAULT_BADGE;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium tracking-wide uppercase",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        colorClass,
        className
      )}
    >
      {category}
    </span>
  );
}
