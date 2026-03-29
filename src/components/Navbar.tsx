"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Store, Tag, Calendar, Package } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TABS = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Stores", icon: Store },
  { name: "Categories", icon: Tag },
  { name: "Events & SNAP", icon: Calendar },
  { name: "Products", icon: Package },
];

export default function Navbar({
  activeTab,
  onTabChange,
}: {
  activeTab: number;
  onTabChange: (index: number) => void;
}) {
  return (
    <nav className="fixed left-0 top-0 right-0 h-16 md:h-20 flex items-center justify-between glass-card border-b border-border z-50 px-4 md:px-8 bg-white/70">
      <div className="flex items-center gap-3 w-auto md:w-48 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-blue-500 shadow-lg shadow-primary/20 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">M5</span>
        </div>
        <h1 className="text-xl font-bold text-gradient hidden md:block">Analytics</h1>
      </div>

      <div className="flex flex-1 justify-center items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
        {TABS.map((tab, idx) => {
          const isActive = activeTab === idx;
          const Icon = tab.icon;

          return (
            <button
              key={tab.name}
              onClick={() => onTabChange(idx)}
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition-colors duration-200 group text-sm font-medium whitespace-nowrap",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-slate-100/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-bg"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className={cn("relative z-10 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              <span className="relative z-10 hidden lg:block">{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Placeholder to balance the logo so tabs are perfectly centered on desktop */}
      <div className="hidden md:block w-48 shrink-0"></div>
    </nav>
  );
}
