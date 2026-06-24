export type InstitutionalMetric = {
  value: string;
  label: string;
  description?: string;
};

type InstitutionalMetricsProps = {
  items: InstitutionalMetric[];
};

export function InstitutionalMetrics({ items }: InstitutionalMetricsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <div className="rounded-2xl border border-[#E0E0E0] bg-[#F5F5F5] p-6" key={item.label}>
          <p className="font-heading text-2xl text-[#1A2A3A]">{item.value}</p>
          <p className="mt-2 text-sm font-semibold text-[#4A4A4A]">{item.label}</p>
          {item.description ? (
            <p className="mt-3 text-sm leading-7 text-[#4A4A4A]">{item.description}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
