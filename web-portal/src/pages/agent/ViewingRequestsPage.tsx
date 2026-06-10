import MainLayout from "../../components/layout/MainLayout";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";

const requests = [
  {
    id: 1,
    customer: "Rahul Sharma",
    property: "Luxury Villa - Hyderabad",
    date: "15 Jun 2026",
    time: "10:00 AM",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Priya Verma",
    property: "Skyline Apartment",
    date: "14 Jun 2026",
    time: "03:30 PM",
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Arjun Kumar",
    property: "Premium Commercial Space",
    date: "13 Jun 2026",
    time: "11:00 AM",
    status: "Completed",
  },
  {
    id: 4,
    customer: "Sneha Reddy",
    property: "Lake View Villa",
    date: "16 Jun 2026",
    time: "05:00 PM",
    status: "Rescheduled",
  },
];

export default function ViewingRequestsPage() {
  return (
    <MainLayout role="agent" title="Viewing Requests">
      <div className="animate-slide-up space-y-6 font-sans text-left">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-800">
            Viewing Requests
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Coordinate and monitor customer site visits and property tours.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Requests", value: "128", color: "text-slate-800" },
            { label: "Pending Reviews", value: "24", color: "text-amber-500" },
            { label: "Confirmed Schedules", value: "61", color: "text-green-600" },
            { label: "Completed Tours", value: "43", color: "text-blue-600" },
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
              placeholder="Search tours by client name, property..."
              className="w-full border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm transition-all">
              All
            </button>
            {["Pending", "Confirmed", "Rescheduled", "Completed"].map((status) => (
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
                  <th className="text-left px-6 py-4">Client Name</th>
                  <th className="text-left px-6 py-4">Property Address</th>
                  <th className="text-left px-6 py-4">Tour Date</th>
                  <th className="text-left px-6 py-4">Session Time</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {request.customer}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">
                      {request.property}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {request.date}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {request.time}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          request.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : request.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : request.status === "Completed"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-purple-50 text-purple-600 border-purple-100"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 justify-end">
                        <button className="p-1.5 rounded-lg border border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50 text-emerald-600 transition-colors" title="Confirm schedule">
                          <CheckCircle size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-blue-100 bg-blue-50/20 hover:bg-blue-50 text-blue-600 transition-colors" title="Reschedule tour">
                          <Calendar size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-rose-100 bg-rose-50/20 hover:bg-rose-50 text-rose-600 transition-colors" title="Cancel tour">
                          <XCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium-soft">
          <h3 className="font-bold text-slate-800 text-sm mb-4 font-heading">
            Immediate Action Required
          </h3>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 gap-3">
              <div className="text-left">
                <p className="font-semibold text-xs text-slate-800">
                  Luxury Villa - Hyderabad
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Client: Rahul Sharma &bull; Site inspection
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 items-center font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-400" />
                  15 Jun 2026
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  10:00 AM
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  Site Visit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}