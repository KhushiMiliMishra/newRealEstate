import MainLayout from "../../components/layout/MainLayout";
import {
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  FileEdit,
  Building2,
  Clock3,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

const listings = [
  {
    id: 1,
    title: "Luxury Villa - Hyderabad",
    type: "Villa",
    location: "Hitech City",
    price: "₹2.5 Cr",
    agent: "Alex Realty",
    submitted: "08 Jun 2026",
    status: "Pending",
  },
  {
    id: 2,
    title: "Skyline Apartment",
    type: "Apartment",
    location: "Whitefield",
    price: "₹98 Lakhs",
    agent: "Urban Homes",
    submitted: "07 Jun 2026",
    status: "Pending",
  },
  {
    id: 3,
    title: "Commercial Space",
    type: "Commercial",
    location: "OMR Chennai",
    price: "₹1.8 Cr",
    agent: "Elite Realty",
    submitted: "06 Jun 2026",
    status: "Revision Requested",
  },
];

export default function ListingModerationPage() {

  return (
    <MainLayout role="admin" title="Listing Moderation">
      <div className="animate-slide-up space-y-6 font-sans text-left">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-800">
            Listing Moderation Queue
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review agent-submitted listings, verify specifications, and grant approval for marketplace publication.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Platform Listings", value: "12,584", icon: Building2, color: "text-blue-600 bg-blue-50/50" },
            { label: "Pending Reviews", value: "84", icon: Clock3, color: "text-amber-500 bg-amber-50/50" },
            { label: "Approved Listings", value: "11,924", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50/50" },
            { label: "Rejected / Suspended", value: "576", icon: AlertTriangle, color: "text-rose-600 bg-rose-50/50" },
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {kpi.label}
                  </span>
                  <div className={`p-2 rounded-xl ${kpi.color}`}>
                    <Icon size={14} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-800 mt-4 leading-none">
                  {kpi.value}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium-soft flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by property title, agent, location..."
              className="w-full border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm transition-all">
              All
            </button>
            {["Pending", "Approved", "Rejected", "Revision Required"].map((status) => (
              <button key={status} className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all">
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-premium-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-100">
                <tr className="text-slate-500 font-semibold text-left">
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Agent</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-slate-800">{listing.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">ID: LST-00{listing.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{listing.type}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{listing.location}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{listing.price}</td>
                    <td className="px-6 py-4 font-medium text-slate-600">{listing.agent}</td>
                    <td className="px-6 py-4 text-slate-400">{listing.submitted}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          listing.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : listing.status === "Approved"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-blue-50 text-blue-600 border-blue-100"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 justify-end">
                        <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors" title="Review documentation">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50 text-emerald-600 transition-colors" title="Approve listing">
                          <CheckCircle2 size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-rose-100 bg-rose-50/20 hover:bg-rose-50 text-rose-600 transition-colors" title="Reject listing">
                          <XCircle size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-blue-100 bg-blue-50/20 hover:bg-blue-50 text-blue-600 transition-colors" title="Request revision">
                          <FileEdit size={14} />
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