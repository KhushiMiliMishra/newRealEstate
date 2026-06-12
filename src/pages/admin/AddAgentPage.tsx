import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload} from "lucide-react";

export default function AddAgentPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const availableDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/admin/agents");
  };

  return (
    <MainLayout role="admin" title="Add New Agent">
      <div className="animate-slide-up max-w-5xl mx-auto space-y-6 font-sans text-left">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-800">
            Register Agent
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Provision a new agent workspace and set listing permissions.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-premium-soft space-y-8">
          {/* Profile Image */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2 border-slate-50 font-heading">
              Profile Image
            </h3>

            <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-3xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer group bg-slate-50/50">
              <Upload size={32} className="text-slate-400 mb-3 group-hover:text-blue-500 transition-colors" />
              <p className="text-xs font-semibold text-slate-600">
                Upload Agent Profile Photo
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Supports JPG, PNG up to 2MB
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2 border-slate-50 font-heading">
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alex Jones"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@agency.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2 border-slate-50 font-heading">
              Account Credentials
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Temp Password *
                </label>

                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Create temporary password"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs pr-12 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Confirm Password *
                </label>

                <div className="relative mt-1.5">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Confirm temporary password"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs pr-12 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Agency Information */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2 border-slate-50 font-heading">
              Brokerage / Office Details
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Agency Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Elite Realtors"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  License Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="REA-IND-92837"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600">
                  Office Address *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter complete brokerage office address..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2 border-slate-50 font-heading">
              Availability Hours
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {availableDays.map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5 text-xs cursor-pointer hover:bg-slate-50 transition-colors select-none"
                >
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 h-4 w-4"
                  />
                  {day}
                </label>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Available From
                </label>
                <input
                  type="time"
                  defaultValue="09:00"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600">
                  Available To
                </label>
                <input
                  type="time"
                  defaultValue="18:00"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-medium text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Verification */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2 border-slate-50 font-heading">
              Verification & Onboarding Status
            </h3>

            <select className="w-full md:w-64 border border-slate-200 rounded-xl px-4 py-3 mt-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 bg-slate-50/50 transition-all font-semibold text-slate-700">
              <option>Pending verification</option>
              <option>Verified immediately</option>
              <option>Rejected / Hold</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/admin/agents")}
              className="px-5 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-semibold transition-all text-slate-600 active:scale-95"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
              Register & Send Invite
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}