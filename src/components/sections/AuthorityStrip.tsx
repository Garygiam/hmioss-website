type AuthorityStripProps = {
  items: string[];
};

export function AuthorityStrip({ items }: AuthorityStripProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-[#D4AF37]/30 bg-white p-6 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1A2A3A]"
          key={item}
        >
          {item}
        </p>
      ))}
    </div>
  );
}
