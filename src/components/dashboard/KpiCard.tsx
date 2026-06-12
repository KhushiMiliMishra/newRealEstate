interface KpiCardProps {
  title: string;
  value: string;
  growth: string;
}

export default function KpiCard({
  title,
  value,
  growth,
}: KpiCardProps) {
  const isPositive = growth.startsWith("+");
  
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft hover:shadow-premium-card hover:border-slate-200/50 transition-all duration-300">
      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
        {title}
      </p>

      <div className="mt-4 flex items-end justify-between">
        <h3 className="text-2xl font-bold font-heading text-slate-800 leading-none">
          {value}
        </h3>

        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          isPositive 
            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
            : "bg-rose-50 text-rose-600 border border-rose-100"
        }`}>
          {growth}
        </span>
      </div>
    </div>
  );
}