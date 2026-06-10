import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building2, CheckCircle2 } from "lucide-react";

export default function AgentRegisterPage() {
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
    // In a real application, this registers the agent. We will navigate back to login.
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Building2 className="h-7 w-7 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold font-heading">
                PropVault Portal
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Agent Registration
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold font-heading mb-4 text-white leading-tight">
            Grow Your Business With PropVault
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-lg mb-12">
            Join a network of elite real estate professionals. Showcase listings, cultivate leads, schedule tours, and accelerate deal closures.
          </p>

          <div className="space-y-4 max-w-md">
            {[
              "List unlimited residential & commercial properties",
              "Direct CRM connection for real-time buyer inquiries",
              "Interactive calendar viewing request coordinator",
              "Detailed agent metrics and visual sales logs",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/30 p-3.5 rounded-xl">
                <CheckCircle2 className="text-blue-400 h-5 w-5 flex-shrink-0" />
                <span className="text-xs text-slate-200 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto py-12 px-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-premium-card p-8 md:p-10 transition-all hover:shadow-premium-hover">
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                Agent Registration
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Create your agent workspace and begin listing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* PERSONAL INFORMATION */}
              <div>
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100">
                  Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@agency.com"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 5"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* ACCOUNT SECURITY */}
              <div>
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100">
                  Account Security
                </h3>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      Password *
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Create password"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs pr-12 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all"
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
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      Confirm Password *
                    </label>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        placeholder="Confirm password"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs pr-12 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all"
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

              {/* AGENCY DETAILS */}
              <div>
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100">
                  Agency Details
                </h3>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      Agency Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Elite Properties"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      License Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="RE-LIC-29837A"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      Office Address *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Enter agency office address..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* AVAILABILITY */}
              <div>
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100">
                  Availability Schedule
                </h3>

                <div className="mb-5">
                  <label className="block mb-3 text-xs font-semibold text-slate-600">
                    Available Days
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableDays.map((day) => (
                      <label
                        key={day}
                        className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-3 py-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors select-none"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 h-4 w-4"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      Available From
                    </label>
                    <input
                      type="time"
                      defaultValue="09:00"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xs font-semibold text-slate-600">
                      Available To
                    </label>
                    <input
                      type="time"
                      defaultValue="18:00"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* TERMS */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 h-4 w-4"
                  />
                  <span className="text-xs text-slate-500 leading-tight">
                    I agree to the Terms & Conditions and represent that all provided information is accurate for professional verification.
                  </span>
                </label>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-xs font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-500/10"
              >
                Create Agent Account
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-400">
                  Already have an account?
                </span>
                <Link
                  to="/"
                  className="ml-2 text-blue-600 text-xs font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}