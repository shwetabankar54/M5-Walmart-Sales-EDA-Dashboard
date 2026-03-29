"use client";

import { motion } from "framer-motion";
import KpiCard from "./KpiCard";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface OverviewProps {
  kpis: {
    total_sales: number;
    total_revenue: number;
    date_range: { start: string; end: string };
    unique_items: number;
    unique_stores: number;
    unique_states: number;
  };
  timeSeries: {
    daily: { date: string; sales: number; revenue: number }[];
    monthly: { year: number; month: number; sales: number; revenue: number }[];
    yearly: { year: number; sales: number; revenue: number }[];
    weekend_vs_weekday: { is_weekend: string; sales: number; revenue: number }[];
  };
}

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` :
  n >= 1_000 ? `${(n / 1_000).toFixed(1)}K` :
  n.toLocaleString(undefined, { maximumFractionDigits: 1 });

const fmtCurrency = (n: number) => `$${fmt(n)}`;

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

export default function Overview({ kpis, timeSeries }: OverviewProps) {
  const monthlyData = timeSeries.monthly.map((d) => ({
    ...d,
    label: `${d.year}-${String(d.month).padStart(2, "0")}`,
  }));

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
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard title="Total Sales" value={fmt(kpis.total_sales)} subtitle="Units Sold" delay={0.1} />
        <KpiCard title="Total Revenue" value={fmtCurrency(kpis.total_revenue)} delay={0.2} />
        <KpiCard title="Items" value={kpis.unique_items.toLocaleString()} delay={0.3} />
        <KpiCard title="Stores" value={kpis.unique_stores} delay={0.4} />
        <KpiCard title="States" value={kpis.unique_states} delay={0.5} />
        <KpiCard
          title="Date Range"
          value={`${kpis.date_range.start.slice(0, 4)}–${kpis.date_range.end.slice(0, 4)}`}
          subtitle={`${kpis.date_range.start.slice(5)} to ${kpis.date_range.end.slice(5)}`}
          delay={0.6}
        />
      </div>

      {/* Main Charts - Bento Box Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Large Chart left */}
        <motion.div variants={itemVariants} className="glass-card p-6 min-h-[400px]">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-primary" /> Multi-Year Sales Trend
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} minTickGap={30} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} width={50} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sales" name="Sales" stroke="var(--chart-1)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Large Chart right */}
        <motion.div variants={itemVariants} className="glass-card p-6 min-h-[400px]">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-blue-500" /> Revenue Growth
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} minTickGap={30} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmtCurrency} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="var(--chart-3)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bottom charts row */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-emerald-500" /> Yearly Performance Breakdown
          </h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSeries.yearly} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} />
                <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} width={50} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmtCurrency} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar yAxisId="left" dataKey="sales" name="Sales" fill="var(--chart-3)" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar yAxisId="right" dataKey="revenue" name="Revenue" fill="var(--chart-4)" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-rose-500" /> Shopping Behaviour: Weekend vs Weekday
          </h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSeries.weekend_vs_weekday} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis dataKey="is_weekend" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "var(--foreground)", fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} width={50} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="sales" name="Daily Avg Sales" fill="var(--chart-1)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="revenue" name="Daily Avg Revenue" fill="var(--chart-5)" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}
