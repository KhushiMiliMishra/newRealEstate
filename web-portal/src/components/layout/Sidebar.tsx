import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  PlusCircle,
  MessageSquare,
  Calendar,
  BarChart3,
  User,
  Users,
  UserPlus,
  ShieldCheck,
} from "lucide-react";

interface SidebarProps {
  role: "agent" | "admin";
}

export default function Sidebar({ role }: SidebarProps) {
  const agentLinks = [
    {
      section: "MAIN",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      section: "PROPERTIES",
      items: [
        { label: "Property List", path: "/properties", icon: Home },
        { label: "Add Property", path: "/properties/new", icon: PlusCircle },
      ],
    },
    {
      section: "SALES",
      items: [
        { label: "Inquiries", path: "/inquiries", icon: MessageSquare },
        { label: "Viewing Requests", path: "/viewings", icon: Calendar },
      ],
    },
    {
      section: "INSIGHTS",
      items: [
        { label: "Analytics", path: "/analytics", icon: BarChart3 },
      ],
    },
    {
      section: "ACCOUNT",
      items: [
        { label: "Profile", path: "/profile", icon: User },
      ],
    },
  ];

  const adminLinks = [
    {
      section: "MAIN",
      items: [
        { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      section: "MANAGEMENT",
      items: [
        { label: "Add Agent", path: "/admin/agents/new", icon: UserPlus },
        { label: "Manage Agents", path: "/admin/agents", icon: Users },
        { label: "Customers", path: "/admin/customers", icon: Users },
      ],
    },
    {
      section: "LISTINGS",
      items: [
        { label: "Moderation", path: "/admin/moderation", icon: ShieldCheck },
      ],
    },
    {
      section: "SUPPORT",
      items: [
        { label: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
      ],
    },
    {
      section: "INSIGHTS",
      items: [
        { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      section: "ACCOUNT",
      items: [
        { label: "Profile", path: "/admin/profile", icon: User },
      ],
    },
  ];

  const menu = role === "agent" ? agentLinks : adminLinks;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col font-sans">
      {/* BRAND */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            PropVault
          </h1>
          <p className="text-[10px] tracking-wider text-slate-400 mt-1 uppercase font-semibold">
            {role} portal
          </p>
        </div>
        
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${
          role === "admin" 
            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
            : "bg-teal-500/10 text-teal-400 border border-teal-500/20"
        }`}>
          PRO
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {menu.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            {/* SECTION TITLE */}
            <p className="text-[10px] font-bold text-slate-500 tracking-widest pl-3 uppercase">
              {section.section}
            </p>

            {/* LINKS */}
            <div className="space-y-1">
              {section.items.map((link) => {
                const IconComponent = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 font-medium group ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }`
                    }
                  >
                    <IconComponent size={18} className="transition-transform group-hover:scale-110" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      {/* FOOTER */}
      <div className="p-4 border-t border-slate-800 text-center">
        <p className="text-[10px] text-slate-500">
          v1.0.0 • PropVault SaaS
        </p>
      </div>
    </aside>
  );
}