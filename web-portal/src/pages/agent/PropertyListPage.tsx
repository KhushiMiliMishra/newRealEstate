import MainLayout from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  BarChart3,
  Home,
  MessageSquare,
} from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Luxury Villa - Hyderabad",
    type: "Villa",
    location: "Hitech City",
    price: "₹2.5 Cr",
    views: 1248,
    inquiries: 52,
    shortlisted: 28,
    updated: "08 Jun 2026",
    status: "Active",
  },
  {
    id: 2,
    title: "Skyline Apartment",
    type: "Apartment",
    location: "Whitefield",
    price: "₹98 Lakhs",
    views: 842,
    inquiries: 34,
    shortlisted: 16,
    updated: "07 Jun 2026",
    status: "Pending Approval",
  },
  {
    id: 3,
    title: "Commercial Space",
    type: "Commercial",
    location: "OMR Chennai",
    price: "₹1.8 Cr",
    views: 516,
    inquiries: 18,
    shortlisted: 9,
    updated: "05 Jun 2026",
    status: "Draft",
  },
];

export default function PropertyListPage() {
  const navigate = useNavigate();

  return (
    <MainLayout role="agent" title="My Properties">
      <div className="animate-slide-up space-y-6 font-sans text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-800">
              My Property Listings
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Manage, monitor, and optimize your listings on the marketplace.
            </p>
          </div>

          <button
            onClick={() => navigate("/properties/new")}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm active:scale-95 self-start sm:self-auto"
          >
            <Plus size={16} />
            Add Property
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Properties", value: "128", color: "text-slate-800" },
            { label: "Active Listings", value: "96", color: "text-emerald-600" },
            { label: "Pending Approval", value: "18", color: "text-amber-500" },
            { label: "Total Property Views", value: "18.4K", color: "text-blue-600" },
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
              placeholder="Search properties by title, location..."
              className="w-full border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm transition-all">
              All
            </button>
            {["Active", "Pending", "Draft", "Sold", "Rented"].map((status) => (
              <button key={status} className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all">
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Property Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-premium-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-100">
                <tr className="text-slate-500 font-semibold">
                  <th className="text-left px-6 py-4">Property</th>
                  <th className="text-left px-6 py-4">Price</th>
                  <th className="text-left px-6 py-4">Views</th>
                  <th className="text-left px-6 py-4">Inquiries</th>
                  <th className="text-left px-6 py-4">Shortlisted</th>
                  <th className="text-left px-6 py-4">Updated</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Property Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50 flex-shrink-0">
                          <Home size={18} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 text-xs">
                            {property.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {property.type} &bull; {property.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {property.price}
                    </td>

                    {/* Views */}
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {property.views.toLocaleString()}
                    </td>

                    {/* Inquiries */}
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {property.inquiries}
                    </td>

                    {/* Shortlisted */}
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {property.shortlisted}
                    </td>

                    {/* Updated */}
                    <td className="px-6 py-4 text-slate-400">
                      {property.updated}
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          property.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : property.status === "Pending Approval"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-slate-50 text-slate-500 border-slate-100"
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 justify-end">
                        {/* View */}
                        <button
                          onClick={() => navigate("/properties")}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => navigate(`/properties/edit/${property.id}`)}
                          className="p-1.5 rounded-lg border border-blue-100 bg-blue-50/20 hover:bg-blue-50 text-blue-600 transition-colors"
                          title="Edit Listing"
                        >
                          <Pencil size={14} />
                        </button>

                        {/* Analytics */}
                        <button
                          onClick={() => navigate("/analytics")}
                          className="p-1.5 rounded-lg border border-purple-100 bg-purple-50/20 hover:bg-purple-50 text-purple-600 transition-colors"
                          title="In-depth Analytics"
                        >
                          <BarChart3 size={14} />
                        </button>

                        {/* Leads */}
                        <button
                          onClick={() => navigate("/inquiries")}
                          className="p-1.5 rounded-lg border border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50 text-emerald-600 transition-colors"
                          title="View Leads"
                        >
                          <MessageSquare size={14} />
                        </button>

                        {/* Delete */}
                        <button
                          className="p-1.5 rounded-lg border border-rose-100 bg-rose-50/20 hover:bg-rose-50 text-rose-600 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-premium-soft flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-slate-400 font-medium">
            Showing 1 - 3 of 128 properties
          </p>

          <div className="flex gap-1">
            <button className="px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-[11px] text-slate-600">
              Prev
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-xl font-semibold text-[11px]">
              1
            </button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-[11px] text-slate-600">
              2
            </button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-[11px] text-slate-600">
              3
            </button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-[11px] text-slate-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}