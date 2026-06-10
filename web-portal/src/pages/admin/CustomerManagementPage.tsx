import MainLayout from "../../components/layout/MainLayout";
import {
  Search,
  Eye,
  UserCheck,
  UserX,
  Activity,
} from "lucide-react";

const customers = [
  {
    id: 1,
    name: "John David",
    email: "john@example.com",
    phone: "+91 98765 43210",
    saved: 12,
    inquiries: 8,
    visits: 3,
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43211",
    saved: 7,
    inquiries: 5,
    visits: 2,
    status: "Suspended",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul@example.com",
    phone: "+91 98765 43212",
    saved: 21,
    inquiries: 14,
    visits: 5,
    status: "Active",
  },
];

export default function CustomerManagementPage() {

  return (
    <MainLayout role="admin" title="Customer Management">
      <div className="animate-slide-up space-y-6 font-sans text-left">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-800">
            Customer Directory
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitor client accounts, saved search activities, and active communication logs.
          </p>
        </div>

        {/* Summary panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Platform Customers", value: "5,482", color: "text-slate-800" },
            { label: "Active Accounts", value: "5,116", color: "text-emerald-600" },
            { label: "New Registrations", value: "248", color: "text-blue-600" },
            { label: "Suspended / Blocked", value: "118", color: "text-rose-600" },
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
              placeholder="Search customers by name, email, phone..."
              className="w-full border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm transition-all">
              All
            </button>
            {["Active", "Suspended", "New Users"].map((status) => (
              <button key={status} className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all">
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-premium-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-100">
                <tr className="text-slate-500 font-semibold text-left">
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Phone Number</th>
                  <th className="px-6 py-4">Saved Properties</th>
                  <th className="px-6 py-4">Inquiries Made</th>
                  <th className="px-6 py-4">Site Visits</th>
                  <th className="px-6 py-4">Account Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-sm flex-shrink-0">
                          {customer.name.split(" ").map(w => w[0]).join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{customer.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">ID: CST-889{customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{customer.email}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{customer.phone}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{customer.saved} listings</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{customer.inquiries} leads</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{customer.visits} tours</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          customer.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 justify-end">
                        <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors" title="Inspect profile logs">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-blue-100 bg-blue-50/20 hover:bg-blue-50 text-blue-600 transition-colors" title="Audit operations activity">
                          <Activity size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50 text-emerald-600 transition-colors" title="Verify User">
                          <UserCheck size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-rose-100 bg-rose-50/20 hover:bg-rose-50 text-rose-600 transition-colors" title="Suspend User Access">
                          <UserX size={14} />
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