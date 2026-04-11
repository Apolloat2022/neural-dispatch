import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  tools: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  research: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "use cases": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  industry: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  default: "bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/30",
};

interface CategoryBadgeProps {
  category: string;
  className?: string;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, className, size = "md" }: CategoryBadgeProps) {
  const colorClass =
    categoryColors[category.toLowerCase()] ?? categoryColors.default;

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
