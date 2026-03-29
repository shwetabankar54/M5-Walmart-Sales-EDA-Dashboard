"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, LineChart, Line,
} from "recharts";

interface StoresProps {
  storePerf: {
    by_store: { store_id: string; sales: number; revenue: number }[];
    by_state: { state_id: string; sales: number; revenue: number }[];
    by_store_monthly: { store_id: string; year: number; month: number; sales: number; revenue: number }[];
  };
}

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` :
  n >= 1_000 ? `${(n / 1_000).toFixed(1)}K` :
  n.toLocaleString(undefined, { maximumFractionDigits: 1 });

const fmtCurrency = (n: number) => `$${fmt(n)}`;

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-4 py-3 !bg-card/90 border-border shadow-xl">
        <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm font-bold text-foreground">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span>{entry.name}: </span>
            <span>{entry.name.toLowerCase().includes('revenue') ? fmtCurrency(entry.value) : fmt(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Stores({ storePerf }: StoresProps) {
  const stores = [...storePerf.by_store].sort((a, b) => b.sales - a.sales);
  const states = [...storePerf.by_state].sort((a, b) => b.sales - a.sales);

  const storeIds = [...new Set(storePerf.by_store_monthly.map((d) => d.store_id))];
  const monthlyMap = new Map<string, any>();
  storePerf.by_store_monthly.forEach((d) => {
    const key = `${d.year}-${String(d.month).padStart(2, "0")}`;
    if (!monthlyMap.has(key)) monthlyMap.set(key, { label: key });
    const entry = monthlyMap.get(key)!;
    entry[d.store_id] = d.sales;
  });
  const monthlyData = Array.from(monthlyMap.values()).sort((a, b) =>
    String(a.label).localeCompare(String(b.label))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-card p-6 min-h-[400px]">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-primary" /> Sales Volume by Store
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stores} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} />
                <YAxis type="category" dataKey="store_id" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)", fontWeight: 500 }} width={80} />
                <Tooltip cursor={{ fill: 'var(--border)', opacity: 0.4 }} content={<CustomTooltip />} />
                <Bar dataKey="sales" name="Sales" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6 min-h-[400px]">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-blue-500" /> Regional Revenue Distribution
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={states} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis dataKey="state_id" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "var(--foreground)", fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} width={50} />
                <Tooltip cursor={{ fill: 'var(--border)', opacity: 0.4 }} content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="sales" name="Sales" fill="var(--chart-3)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="revenue" name="Revenue" fill="var(--chart-4)" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="glass-card p-6">
        <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
          <div className="w-2 h-6 rounded-sm bg-purple-500" /> Historical Store Performance Trajectory
        </h3>
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} width={50} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              {storeIds.map((id, i) => (
                <Line 
                  key={id} 
                  type="monotone" 
                  dataKey={id} 
                  name={`Store ${id}`}
                  stroke={COLORS[i % COLORS.length]} 
                  dot={false} 
                  strokeWidth={2.5} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </motion.div>
  );
}
