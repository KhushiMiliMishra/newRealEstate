import MainLayout from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Pencil,
  ShieldCheck,
  Ban,
  UserPlus,
} from "lucide-react";

const agents = [
  {
    id: 1,
    name: "Alex Realty",
    agency: "Prime Estates",
    experience: "8 Years",
    listings: 42,
    rating: 4.8,
    reviews: 156,
    status: "Verified",
  },
  {
    id: 2,
    name: "Urban Homes",
    agency: "Urban Group",
    experience: "5 Years",
    listings: 28,
    rating: 4.5,
    reviews: 89,
    status: "Pending",
  },
  {
    id: 3,
    name: "Elite Properties",
    agency: "Elite Realty",
    experience: "10 Years",
    listings: 67,
    rating: 4.9,
    reviews: 241,
    status: "Suspended",
  },
];

export default function AgentManagementPage() {
  const navigate = useNavigate();

  return (
    <MainLayout role="admin" title="Agent Management">
      <div className="animate-slide-up space-y-6 font-sans text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-800">
              Agent Registry
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Verify credentials, manage active listings permissions, and monitor agent ratings.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/agents/new")}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm active:scale-95 self-start sm:self-auto"
          >
            <UserPlus size={16} />
            Register Agent
          </button>
        </div>

        {/* Statistics panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Platform Agents", value: "326", color: "text-slate-800" },
            { label: "Verified Partners", value: "278", color: "text-emerald-600" },
            { label: "Verification Requests", value: "31", color: "text-amber-500" },
            { label: "Suspended Accounts", value: "17", color: "text-rose-600" },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {kpi.label}
              </p>
              <h3 className={`text-2xl font-bold font-heading mt-3 leading-none ${kpi.color}`}>
                {kpi.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium-soft flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search agents by name, agency..."
              className="w-full border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm transition-all">
              All
            </button>
            {["Verified", "Pending", "Suspended"].map((status) => (
              <button key={status} className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all">
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-premium-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-100">
                <tr className="text-slate-500 font-semibold text-left">
                  <th className="px-6 py-4">Agent Name</th>
                  <th className="px-6 py-4">Brokerage Agency</th>
                  <th className="px-6 py-4">Experience</th>
                  <th className="px-6 py-4">Active Listings</th>
                  <th className="px-6 py-4">Reviews & Rating</th>
                  <th className="px-6 py-4">Account Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold shadow-sm flex-shrink-0">
                          {agent.name.split(" ").map(w => w[0]).join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{agent.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">ID: AG-098{agent.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{agent.agency}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{agent.experience}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{agent.listings}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-700">⭐ {agent.rating}</div>
                      <div className="text-[10px] text-slate-400">{agent.reviews} clients reviews</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          agent.status === "Verified"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : agent.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 justify-end">
                        <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors" title="View Profile">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-blue-100 bg-blue-50/20 hover:bg-blue-50 text-blue-600 transition-colors" title="Edit Permissions">
                          <Pencil size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50 text-emerald-600 transition-colors" title="Verify Credentials">
                          <ShieldCheck size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-rose-100 bg-rose-50/20 hover:bg-rose-50 text-rose-600 transition-colors" title="Suspend Partner">
                          <Ban size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}