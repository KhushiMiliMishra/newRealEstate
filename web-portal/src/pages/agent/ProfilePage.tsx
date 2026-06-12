import MainLayout from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Award, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <MainLayout role="agent" title="Profile">
      <div className="animate-slide-up max-w-5xl mx-auto space-y-6 font-sans text-left">
        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-premium-soft flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-blue-500/20 flex-shrink-0">
              AG
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-800">
                Alex Agent
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Premium Real Estate Advisor
              </p>
              <div className="flex items-center gap-1.5 mt-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <ShieldCheck size={10} /> Verified Agent
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                  <Award size={10} /> Top Performer
                </span>
              </div>
            </div>
          </div>

          <button className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm active:scale-95">
            Upload New Photo
          </button>
        </div>

        {/* ================= FORM SECTION ================= */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 border-b pb-2 border-slate-50 font-heading">
                Personal Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500">Full Name</label>
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                    defaultValue="Alex Agent"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500">Email Address</label>
                  <input
                    type="email"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                    defaultValue="alex@propvault.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500">Mobile Phone</label>
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                    defaultValue="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 border-b pb-2 border-slate-50 font-heading">
                Business Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500">Brokerage Firm</label>
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                    defaultValue="Prime Real Estate Group"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500">RERA License Number</label>
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                    defaultValue="RERA-2026-4587"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500">Service Coverage Cities</label>
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                    defaultValue="Hyderabad, Chennai, Bangalore"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Active Listings", value: "42" },
              { label: "Total Leads", value: "156" },
              { label: "Scheduled Tours", value: "38" },
              { label: "Client Rating", value: "4.9★" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-premium-soft hover:border-slate-200 transition-colors">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <h3 className="text-xl font-bold font-heading text-slate-800 mt-2.5 leading-none">
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>

          {/* ================= SUBSCRIPTION ================= */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium-soft flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-xs font-heading">
                  PropVault Professional Plan
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Allows unlimited residential listings, leads exports, and detailed analytics.
                </p>
              </div>
            </div>

            <button type="button" className="bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-amber-600 transition-colors shadow-sm active:scale-95 self-start sm:self-auto">
              Upgrade Subscription
            </button>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-semibold transition-all text-slate-600 active:scale-95"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}