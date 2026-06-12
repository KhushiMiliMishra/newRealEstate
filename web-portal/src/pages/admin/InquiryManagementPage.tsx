import MainLayout from "../../components/layout/MainLayout";
import {
  Search,
  Eye,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const inquiries = [
  {
    id: 1001,
    customer: "John David",
    property: "Luxury Villa - Hyderabad",
    agent: "Alex Realty",
    date: "12 Jun 2026",
    status: "New",
  },
  {
    id: 1002,
    customer: "Priya Sharma",
    property: "Premium Apartment - Bangalore",
    agent: "Urban Homes",
    date: "11 Jun 2026",
    status: "In Progress",
  },
  {
    id: 1003,
    customer: "Rahul Verma",
    property: "Commercial Space - Chennai",
    agent: "Elite Realty",
    date: "10 Jun 2026",
    status: "Resolved",
  },
];

export default function InquiryManagementPage() {
  return (
    <MainLayout role="admin" title="Inquiry Management">
      <div className="animate-slide-up space-y-6 font-sans text-left">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-800">
            Platform Lead Audits
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Audit customer leads, follow-up timelines, and broker response metrics.
          </p>
        </div>

        {/* Summary panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Platform Inquiries", value: "8,421", color: "text-slate-800" },
            { label: "Unassigned / New", value: "148", color: "text-blue-600" },
            { label: "In Active Negotiations", value: "67", color: "text-amber-500" },
            { label: "Successfully Resolved", value: "8,206", color: "text-emerald-600" },
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
              placeholder="Search audit trail by client, property, broker..."
              className="w-full border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm transition-all">
              All
            </button>
            {["New", "In Progress", "Responded", "Resolved"].map((status) => (
              <button key={status} className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all">
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiry Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-premium-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-100">
                <tr className="text-slate-500 font-semibold text-left">
                  <th className="px-6 py-4">Inquiry ID</th>
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Property Context</th>
                  <th className="px-6 py-4">Broker Assigned</th>
                  <th className="px-6 py-4">Date Received</th>
                  <th className="px-6 py-4">Current Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      #INQ-{inquiry.id}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {inquiry.customer}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">
                      {inquiry.property}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {inquiry.agent}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {inquiry.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          inquiry.status === "New"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : inquiry.status === "In Progress"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-emerald-50 text-emerald-600 border-emerald-100"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 justify-end">
                        <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors" title="Read conversation logs">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-blue-100 bg-blue-50/20 hover:bg-blue-50 text-blue-600 transition-colors" title="Send moderator warning">
                          <MessageSquare size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50 text-emerald-600 transition-colors" title="Mark as resolved">
                          <CheckCircle size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-rose-100 bg-rose-50/20 hover:bg-rose-50 text-rose-600 transition-colors" title="Flag dispute">
                          <AlertTriangle size={14} />
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