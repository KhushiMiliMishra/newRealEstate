import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="h-full w-full bg-white flex items-center justify-between px-6 md:px-8">
      {/* LEFT: PAGE TITLE */}
      <div className="flex flex-col">
        <h2 className="text-lg md:text-xl font-bold font-heading text-slate-800">
          {title}
        </h2>
        <p className="text-[11px] text-slate-400 hidden md:block">
          PropVault Portal &bull; {isAdmin ? "Administration Console" : "Agent Operations Panel"}
        </p>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* SEARCH */}
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            placeholder="Search listings, clients, reports..."
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-500 transition-all placeholder:text-slate-400 bg-slate-50/50"
          />
        </div>

        {/* NOTIFICATIONS */}
        <button className="relative p-2.5 rounded-xl hover:bg-slate-100/80 text-slate-600 transition-colors border border-slate-100">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          {/* Avatar */}
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-md ${
            isAdmin 
              ? "bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-indigo-500/20" 
              : "bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-blue-500/20"
          }`}>
            {isAdmin ? "AD" : "AG"}
          </div>

          {/* Info */}
          <div className="hidden md:block leading-tight text-left">
            <p className="font-semibold text-xs text-slate-800">
              {isAdmin ? "Sarah Admin" : "Alex Agent"}
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              {isAdmin ? "System Administrator" : "Premium Partner"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}