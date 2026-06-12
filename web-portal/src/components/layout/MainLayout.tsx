import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  role: "agent" | "admin";
}

export default function MainLayout({
  children,
  title,
  role,
}: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">

      {/* Sidebar (fixed width, full height) */}
      <aside className="w-64 flex-shrink-0">
        <Sidebar role={role} />
      </aside>

      {/* Main Section */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">

        {/* Topbar */}
        <header className="h-20 flex-shrink-0 bg-white border-b border-slate-100 z-10">
          <Topbar title={title} />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F8FAFC]">

          {/* Page wrapper for consistency */}
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>

        </main>

      </div>
    </div>
  );
}