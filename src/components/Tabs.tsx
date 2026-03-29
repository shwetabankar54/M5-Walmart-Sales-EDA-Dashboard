"use client";

interface TabsProps {
  tabs: string[];
  active: number;
  onChange: (index: number) => void;
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="card flex gap-1 p-1.5 mb-8 overflow-x-auto animate-in !rounded-xl">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange(i)}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
            active === i
              ? "bg-[var(--accent)] text-white shadow-md shadow-blue-500/20"
              : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-black/[0.04]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
