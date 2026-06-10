import MainLayout from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  MessageSquare,
  Calendar,
  Phone,
} from "lucide-react";

const inquiries = [
  {
    id: 1,
    customer: "Rahul Sharma",
    phone: "+91 98765 43210",
    property: "Luxury Villa - Hyderabad",
    date: "10 Jun 2026",
    status: "New",
  },
  {
    id: 2,
    customer: "Priya Verma",
    phone: "+91 91234 56789",
    property: "Skyline Apartment",
    date: "09 Jun 2026",
    status: "Contacted",
  },
  {
    id: 3,
    customer: "Arjun Kumar",
    phone: "+91 99887 76655",
    property: "Commercial Space",
    date: "08 Jun 2026",
    status: "Follow Up",
  },
  {
    id: 4,
    customer: "Sneha Reddy",
    phone: "+91 98712 34567",
    property: "Premium Villa",
    date: "07 Jun 2026",
    status: "Qualified",
  },
];

export default function InquiryManagementPage() {
  const navigate = useNavigate();

  return (
    <MainLayout role="agent" title="Inquiry Management">
      <div className="animate-slide-up space-y-6 font-sans text-left">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-800">
            Inquiry & Lead Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage customer inquiries, track leads, and manage communication channels.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Inquiries", value: "542", color: "text-slate-800" },
            { label: "New Leads", value: "28", color: "text-blue-600" },
            { label: "Follow Ups Needed", value: "64", color: "text-amber-500" },
            { label: "Closed Conversions", value: "312", color: "text-emerald-600" },
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
              placeholder="Search leads by customer, phone..."
              className="w-full border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm transition-all">
              All
            </button>
            {["New", "Contacted", "Follow Up", "Qualified", "Closed"].map((status) => (
              <button key={status} className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all">
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-premium-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-100">
                <tr className="text-slate-500 font-semibold">
                  <th className="text-left px-6 py-4">Customer</th>
                  <th className="text-left px-6 py-4">Phone</th>
                  <th className="text-left px-6 py-4">Property Context</th>
                  <th className="text-left px-6 py-4">Received Date</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {inquiry.customer}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {inquiry.phone}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {inquiry.property}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {inquiry.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          inquiry.status === "New"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : inquiry.status === "Contacted"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : inquiry.status === "Follow Up"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-purple-50 text-purple-600 border-purple-100"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 justify-end">
                        <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50 text-emerald-600 transition-colors">
                          <Phone size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-blue-100 bg-blue-50/20 hover:bg-blue-50 text-blue-600 transition-colors">
                          <MessageSquare size={14} />
                        </button>
                        <button 
                          onClick={() => navigate("/viewings")}
                          className="p-1.5 rounded-lg border border-purple-100 bg-purple-50/20 hover:bg-purple-50 text-purple-600 transition-colors"
                        >
                          <Calendar size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft">
          <h3 className="font-bold text-slate-800 text-sm mb-4 font-heading">
            Lead Pipeline Summary
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: "New Leads", val: "28", bg: "bg-blue-50/50 text-blue-700 border border-blue-100/30" },
              { label: "Contacted", val: "96", bg: "bg-emerald-50/50 text-emerald-700 border border-emerald-100/30" },
              { label: "Follow Up", val: "64", bg: "bg-amber-50/50 text-amber-700 border border-amber-100/30" },
              { label: "Qualified", val: "42", bg: "bg-purple-50/50 text-purple-700 border border-purple-100/30" },
              { label: "Closed Contracts", val: "312", bg: "bg-slate-900 text-white shadow-sm" },
            ].map((p, i) => (
              <div key={i} className={`rounded-2xl p-4 text-center ${p.bg}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                  {p.label}
                </p>
                <h4 className="text-xl font-bold font-heading mt-2">
                  {p.val}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}