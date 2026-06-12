





import MainLayout from "../../components/layout/MainLayout";
import KpiCard from "../../components/dashboard/KpiCard";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import { useNavigate } from "react-router-dom";
import { Home, Calendar, Plus, ChevronRight, BarChart3, MessageSquare, Clock } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const recentProperties = [
  {
    id: 1,
    title: "Luxury Villa - Hyderabad",
    status: "Active",
    price: "₹2.5 Cr",
  },
  {
    id: 2,
    title: "Skyline Apartment",
    status: "Pending Approval",
    price: "₹98 Lakhs",
  },
  {
    id: 3,
    title: "Commercial Space",
    status: "Draft",
    price: "₹1.8 Cr",
  },
];

const upcomingViewings = [
  {
    id: 1,
    customer: "John David",
    property: "Luxury Villa",
    time: "Today • 10:00 AM",
  },
  {
    id: 2,
    customer: "Priya Sharma",
    property: "Skyline Apartment",
    time: "Tomorrow • 02:00 PM",
  },
  {
    id: 3,
    customer: "Rahul Verma",
    property: "Commercial Space",
    time: "Friday • 11:30 AM",
  },
];

const performanceData = [
  { name: "Mon", views: 420, leads: 24 },
  { name: "Tue", views: 550, leads: 32 },
  { name: "Wed", views: 480, leads: 28 },
  { name: "Thu", views: 700, leads: 45 },
  { name: "Fri", views: 650, leads: 38 },
  { name: "Sat", views: 900, leads: 52 },
  { name: "Sun", views: 820, leads: 48 },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <MainLayout role="agent" title="Dashboard">
      <div className="animate-slide-up space-y-8">
        {/* WELCOME BANNER */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 p-8 text-white overflow-hidden shadow-lg shadow-indigo-600/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl font-bold font-heading">Good Morning, Alex Agent</h2>
            <p className="text-sm text-indigo-100 mt-1.5">
              Here is what's happening with your property listings and customer leads today. You have 2 viewing requests pending approval.
            </p>
            <button 
              onClick={() => navigate("/properties/new")}
              className="mt-5 bg-white text-blue-600 hover:bg-slate-50 transition-colors px-4 py-2 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <Plus size={14} /> Add New Listing
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Active Listings" value="128" growth="+12%" />
          <KpiCard title="New Leads" value="54" growth="+18%" />
          <KpiCard title="Scheduled Viewings" value="87" growth="+8%" />
          <KpiCard title="Property Views" value="4,862" growth="+22%" />
        </div>

        {/* Performance + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-base text-slate-800 font-heading">
                  Performance Weekly
                </h3>
                <p className="text-[11px] text-slate-400">Visitor traffic & inquiry conversion metrics</p>
              </div>
              <button 
                onClick={() => navigate("/analytics")}
                className="text-blue-600 text-xs font-semibold hover:underline"
              >
                View Detailed Report
              </button>
            </div>

            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01}/>
                    </linearGradient>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ background: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "11px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViews)" name="Views" />
                  <Area type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLeads)" name="Leads" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <ActivityFeed />
        </div>

        {/* Properties + Viewings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Properties */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="font-bold text-base text-slate-800 font-heading">
                    Recent Listings
                  </h3>
                  <p className="text-[11px] text-slate-400">Recently drafted or activated properties</p>
                </div>
                <button 
                  onClick={() => navigate("/properties")}
                  className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-0.5"
                >
                  View All <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-4">
                {recentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100">
                        <Home size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-slate-800">
                          {property.title}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Price: {property.price}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        property.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : property.status === "Pending Approval"
                          ? "bg-amber-50 text-amber-600 border border-amber-100"
                          : "bg-slate-50 text-slate-500 border border-slate-100"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Viewings */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="font-bold text-base text-slate-800 font-heading">
                    Upcoming Viewings
                  </h3>
                  <p className="text-[11px] text-slate-400">Schedule of client appointments</p>
                </div>
                <button 
                  onClick={() => navigate("/viewings")}
                  className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-0.5"
                >
                  View Schedule <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-4">
                {upcomingViewings.map((viewing) => (
                  <div
                    key={viewing.id}
                    className="flex justify-between items-start border-b border-slate-50 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 flex-shrink-0 mt-0.5">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-slate-800">
                          {viewing.customer}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Property: {viewing.property}
                        </p>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                      <Clock size={10} />
                      {viewing.time.split(" • ")[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft">
          <h3 className="font-bold text-base text-slate-800 font-heading mb-5">
            Quick Hub Actions
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate("/properties/new")}
              className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 text-blue-700 transition-all font-semibold text-xs text-left active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" /> Add Property
            </button>

            <button 
              onClick={() => navigate("/properties")}
              className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100/50 text-emerald-700 transition-all font-semibold text-xs text-left active:scale-[0.98]"
            >
              <Home className="h-5 w-5" /> Manage Listings
            </button>

            <button 
              onClick={() => navigate("/inquiries")}
              className="flex items-center gap-3 p-4 rounded-2xl bg-violet-50/50 hover:bg-violet-50 border border-violet-100/50 text-violet-700 transition-all font-semibold text-xs text-left active:scale-[0.98]"
            >
              <MessageSquare className="h-5 w-5" /> View Inquiries
            </button>

            <button 
              onClick={() => navigate("/analytics")}
              className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50/50 hover:bg-amber-50 border border-amber-100/50 text-amber-700 transition-all font-semibold text-xs text-left active:scale-[0.98]"
            >
              <BarChart3 className="h-5 w-5" /> Performance Stats
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}