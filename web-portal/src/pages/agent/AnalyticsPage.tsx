import MainLayout from "../../components/layout/MainLayout";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Eye,
  Users,
  Calendar,
  Target,
  Download,
} from "lucide-react";
import {
  monthlyViews,
  leadConversion,
} from "../../mock/analytics";

const COLORS = ["#3b82f6", "#f59e0b", "#ef4444"];

export default function AnalyticsPage() {
  return (
    <MainLayout role="agent" title="Analytics">
      <div className="animate-slide-up space-y-8 font-sans text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-800">
              Performance Analytics
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Detailed breakdown of listings views, lead sources, and conversion ratios.
            </p>
          </div>

          <button className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm active:scale-95 self-start sm:self-auto">
            <Download size={14} />
            Export PDF Report
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { label: "Property Views", val: "12,542", change: "+18% this month", icon: Eye, color: "text-blue-600 bg-blue-50/50" },
            { label: "Total Leads", val: "1,248", change: "+12% this month", icon: Users, color: "text-emerald-600 bg-emerald-50/50" },
            { label: "Viewing Requests", val: "324", change: "+9% this month", icon: Calendar, color: "text-amber-500 bg-amber-50/50" },
            { label: "Shortlisted", val: "412", change: "+15% this month", icon: TrendingUp, color: "text-violet-600 bg-violet-50/50" },
            { label: "Conversion Rate", val: "68%", change: "+4% this month", icon: Target, color: "text-rose-500 bg-rose-50/50" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <div className={`p-2 rounded-xl ${item.color}`}>
                    <Icon size={14} />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold font-heading text-slate-800">
                    {item.val}
                  </h3>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-1">
                    {item.change}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Graphs section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly views line chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-base text-slate-800 font-heading">
                  Monthly Property Views
                </h3>
                <p className="text-[11px] text-slate-400">Visitor traffic trends over the last 6 months</p>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                Last 6 Months
              </span>
            </div>

            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyViews} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "11px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Lead conversion pie chart */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-800 font-heading mb-1">
                Lead Status
              </h3>
              <p className="text-[11px] text-slate-400 mb-6">Conversion distribution ratios</p>

              <div className="h-56 w-full flex items-center justify-center text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadConversion}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      label
                    >
                      {leadConversion.map((_entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "11px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex justify-center gap-4 text-[10px] font-semibold text-slate-500 mt-2">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Converted (68%)</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Pending (22%)</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Lost (10%)</span>
            </div>
          </div>
        </div>

        {/* Lead Funnel */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-800 font-heading">
                Lead Conversion Funnel
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">Conversion drop-off along the client journey</p>
            </div>
            <span className="text-[11px] text-slate-400 font-semibold">User Journey Stages</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { val: "12,542", lbl: "Property Views", pct: "100% Reach", bg: "bg-blue-50/30 text-blue-700 border border-blue-100/30" },
              { val: "1,248", lbl: "Leads Generated", pct: "9.9% Conversion", bg: "bg-emerald-50/30 text-emerald-700 border border-emerald-100/30" },
              { val: "324", lbl: "Viewing Schedules", pct: "25.9% Action", bg: "bg-amber-50/30 text-amber-700 border border-amber-100/30" },
              { val: "96", lbl: "Closed Contracts", pct: "29.6% Success", bg: "bg-slate-900 text-white shadow-sm" },
            ].map((funnel, idx) => (
              <div key={idx} className={`rounded-2xl p-5 text-center ${funnel.bg}`}>
                <h4 className="text-2xl font-bold font-heading">{funnel.val}</h4>
                <p className="text-xs font-semibold mt-1 opacity-90">{funnel.lbl}</p>
                <span className="inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded bg-black/5 opacity-85">{funnel.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table top performers */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-800 font-heading">
                Top Performing Listings
              </h3>
              <p className="text-[11px] text-slate-400">Listings driving the most visitor and lead traffic</p>
            </div>
            <button className="text-blue-600 text-xs font-semibold hover:underline">
              View All Performance Logs
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-500 font-semibold text-left">
                  <th className="px-6 py-3">Property</th>
                  <th className="px-6 py-3">Views</th>
                  <th className="px-6 py-3">Leads</th>
                  <th className="px-6 py-3">Shortlisted</th>
                  <th className="px-6 py-3">Conversion Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Luxury Villa - Hyderabad", views: "3,250", leads: "186", short: "94", ratio: "72%", color: "text-emerald-600" },
                  { name: "Skyline Apartment", views: "2,980", leads: "164", short: "82", ratio: "68%", color: "text-emerald-600" },
                  { name: "Green Valley Plot", views: "2,100", leads: "118", short: "54", ratio: "59%", color: "text-amber-500" },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{item.name}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{item.views}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{item.leads}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{item.short}</td>
                    <td className={`px-6 py-4 font-bold ${item.color}`}>{item.ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Metrics cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Best Performing Listing", desc: "Luxury Villa - Hyderabad", detail: "Highest engagement, inquiries, and conversion among all active listings." },
            { title: "Highest Lead Source", desc: "Marketplace Search", detail: "Organic site queries generate 58% of total inquiries received across listings." },
            { title: "Average Response Time", desc: "18 Minutes", detail: "Faster response speeds than platform averages are boosting conversion by 12%." },
          ].map((metric, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {metric.title}
              </h4>
              <p className="font-bold text-sm text-slate-800 mt-3 font-heading">
                {metric.desc}
              </p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}