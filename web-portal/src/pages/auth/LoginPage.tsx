import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Building2, ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState("AGENT");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white flex-col justify-center px-16 relative overflow-hidden">
        {/* Subtle background graphics */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Building2 className="text-white h-7 w-7" />
            </div>

            <div>
              <h1 className="text-2xl font-bold font-heading tracking-tight">
                PropVault Platform
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Enterprise Real Estate System
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold font-heading mb-4 text-white leading-tight">
            Streamline Your Real Estate Operations
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-lg mb-12">
            Manage properties, process viewings, monitor leads, and orchestrate approvals from a unified premium console built for growth.
          </p>

          <div className="space-y-4 max-w-md">
            {[
              "Property CRUD & Lifecycle Status",
              "CRM Inquiry & Customer Timelines",
              "Viewing Schedule Coordinators",
              "Advanced Platform & Agent Analytics",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/30 p-3.5 rounded-xl backdrop-blur-sm">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                  ✓
                </div>
                <span className="text-xs text-slate-200 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-premium-card p-8 md:p-10 transition-all hover:shadow-premium-hover">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold font-heading text-slate-900">
              Welcome Back
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Please enter your credentials to login
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block mb-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Select Portal Access
              </label>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-1 rounded-2xl border border-slate-100">
                <button
                  type="button"
                  onClick={() => setRole("AGENT")}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    role === "AGENT"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  🏠 Agent Portal
                </button>

                <button
                  type="button"
                  onClick={() => setRole("ADMIN")}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    role === "ADMIN"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  🛡 Admin Portal
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-xs font-semibold text-slate-600">
                Email Address
              </label>

              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@propvault.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-600">
                  Password
                </label>
                <button
                  type="button"
                  className="text-blue-600 text-xs font-medium hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-12 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 bg-slate-50/50 transition-all placeholder:text-slate-400"
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

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2.5 text-xs text-slate-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 h-4 w-4"
                />
                Remember this session
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-500/10"
            >
              Sign In to Workspace
            </button>
          </form>

          {/* Registration Links */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Need platform access?
            </p>

            <div className="flex justify-center gap-5 mt-4">
              <Link to="/register" className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-1.5">
  🏠 Register as Agent
</Link>

<span className="text-slate-400 text-xs flex items-center gap-1.5">
  <ShieldCheck size={14} />
  Admin access is restricted
</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}