import MainLayout from "../../components/layout/MainLayout";
import KpiCard from "../../components/dashboard/KpiCard";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { UserPlus, Users, ShieldCheck, BarChart3, ChevronRight } from "lucide-react";

const platformGrowthData = [
  { name: "Jan", properties: 1200, agents: 180 },
  { name: "Feb", properties: 1500, agents: 210 },
  { name: "Mar", properties: 1800, agents: 240 },
  { name: "Apr", properties: 2200, agents: 280 },
  { name: "May", properties: 2500, agents: 310 },
  { name: "Jun", properties: 2847, agents: 326 },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <MainLayout role="admin" title="Admin Dashboard">
      <div className="animate-slide-up space-y-8 font-sans text-left">
        
        {/* KPI SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Active Listings" value="2,847" growth="+14%" />
          <KpiCard title="Pending Reviews" value="84" growth="+7%" />
          <KpiCard title="Verified Agents" value="326" growth="+11%" />
          <KpiCard title="Today's Inquiries" value="542" growth="+22%" />
        </div>

        {/* PLATFORM OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-base text-slate-800 font-heading">
                  Platform Growth
                </h3>
                <p className="text-[11px] text-slate-400">Monthly breakdown of listings and active broker agents</p>
              </div>
              <button 
                onClick={() => navigate("/admin/analytics")}
                className="text-blue-600 text-xs font-semibold hover:underline"
              >
                Detailed Platform Insights
              </button>
            </div>

            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={platformGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProperties" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ background: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "11px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="properties" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorProperties)" name="Listings" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <ActivityFeed />
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft">
          <h3 className="font-bold text-slate-800 text-sm mb-5 font-heading">
            Administrative Control Panel
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <button 
              onClick={() => navigate("/admin/moderation")}
              className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100/50 text-indigo-700 transition-all font-semibold text-xs text-left active:scale-[0.98]"
            >
              <ShieldCheck className="h-5 w-5" /> Review Listings
            </button>

            <button 
              onClick={() => navigate("/admin/agents/new")}
              className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 text-blue-700 transition-all font-semibold text-xs text-left active:scale-[0.98]"
            >
              <UserPlus className="h-5 w-5" /> Add Agent
            </button>

            <button 
              onClick={() => navigate("/admin/agents")}
              className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100/50 text-emerald-700 transition-all font-semibold text-xs text-left active:scale-[0.98]"
            >
              <Users className="h-5 w-5" /> Manage Agents
            </button>

            <button 
              onClick={() => navigate("/admin/customers")}
              className="flex items-center gap-3 p-4 rounded-2xl bg-violet-50/50 hover:bg-violet-50 border border-violet-100/50 text-violet-700 transition-all font-semibold text-xs text-left active:scale-[0.98]"
            >
              <Users className="h-5 w-5" /> Customers
            </button>

            <button 
              onClick={() => navigate("/admin/analytics")}
              className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50/50 hover:bg-amber-50 border border-amber-100/50 text-amber-700 transition-all font-semibold text-xs text-left active:scale-[0.98]"
            >
              <BarChart3 className="h-5 w-5" /> Analytics
            </button>
          </div>
        </div>

        {/* PENDING PROPERTY REVIEWS */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-premium-soft overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-slate-800 font-heading">
                Pending Property Moderation
              </h3>
              <p className="text-[11px] text-slate-400">Listings awaiting system administrator review before public listing</p>
            </div>

            <button 
              onClick={() => navigate("/admin/moderation")}
              className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-0.5"
            >
              View Moderation Queue <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-500 font-semibold text-left">
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Submitting Agent</th>
                  <th className="px-6 py-4">Date Submitted</th>
                  <th className="px-6 py-4">Moderation Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 1, title: "Luxury Villa - Hyderabad", agent: "Rajesh Kumar", date: "12 Jun 2026" },
                  { id: 2, title: "Premium Apartment - Bangalore", agent: "Arjun Sharma", date: "11 Jun 2026" },
                ].map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{item.title}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{item.agent}</td>
                    <td className="px-6 py-4 text-slate-400">{item.date}</td>
                    <td className="px-6 py-4">
                      <span className="bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                        Awaiting Review
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate("/admin/moderation")}
                        className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
                      >
                        Inspect Listing
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT INQUIRIES */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-bold text-base text-slate-800 font-heading">
                Inquiry Monitoring Feed
              </h3>
              <p className="text-[11px] text-slate-400">Real-time audit log of customer inquiries across the platform</p>
            </div>

            <button 
              onClick={() => navigate("/admin/inquiries")}
              className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-0.5"
            >
              Audits View <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { id: 1, name: "John David", desc: "Interested in Luxury Villa - Hyderabad", time: "2 mins ago" },
              { id: 2, name: "Priya Reddy", desc: "Interested in Premium Apartment - Bangalore", time: "15 mins ago" },
              { id: 3, name: "Akash Verma", desc: "Requested physical property viewing tour", time: "45 mins ago" },
            ].map((inq) => (
              <div key={inq.id} className="flex justify-between items-center border border-slate-100 rounded-2xl p-4 hover:bg-slate-50/40 transition-colors">
                <div>
                  <h4 className="font-semibold text-xs text-slate-800">
                    {inq.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {inq.desc}
                  </p>
                </div>

                <span className="text-[10px] text-slate-400 font-medium">
                  {inq.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}