export type CategoryFilter = "All" | "News" | "Events" | "Announcements";

export type CategoryFilterOption = {
  value: CategoryFilter;
  label: string;
};

type CategoryFiltersProps = {
  categories: readonly CategoryFilterOption[];
  activeCategory: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
};

export function CategoryFilters({
  categories,
  activeCategory,
  onChange,
}: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = category.value === activeCategory;

        return (
          <button
            aria-pressed={isActive}
            className={[
              "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors",
              isActive
                ? "border-[#1A2A3A] bg-[#1A2A3A] text-white"
                : "border-[#E0E0E0] bg-white text-[#1A2A3A] hover:border-[#D4AF37] hover:text-[#C41E3A]",
            ].join(" ")}
            key={category.value}
            onClick={() => onChange(category.value)}
            type="button"
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
