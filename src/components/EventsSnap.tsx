"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

interface EventsSnapProps {
  eventSnap: {
    snap_vs_no_snap: { snap: string; sales: number; revenue: number }[];
    event_vs_no_event: { has_event: string; sales: number; revenue: number }[];
    by_event_type: { event_type_1: string; sales: number; revenue: number }[];
    top_events: { event_name_1: string; sales: number; revenue: number }[];
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

export default function EventsSnap({ eventSnap }: EventsSnapProps) {
  const topEvents = eventSnap.top_events.slice(0, 15);

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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-orange-500" /> SNAP vs Non-SNAP (Avg per item/day)
          </h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventSnap.snap_vs_no_snap} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis dataKey="snap" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "var(--foreground)", fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} width={50} />
                <Tooltip cursor={{ fill: 'var(--border)', opacity: 0.4 }} content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="sales" name="Sales" fill="var(--chart-4)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="revenue" name="Revenue" fill="var(--chart-5)" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-purple-500" /> Event vs Non-Event (Avg per item/day)
          </h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventSnap.event_vs_no_event} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis dataKey="has_event" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "var(--foreground)", fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} width={50} />
                <Tooltip cursor={{ fill: 'var(--border)', opacity: 0.4 }} content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="sales" name="Sales" fill="var(--chart-1)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="revenue" name="Revenue" fill="var(--chart-2)" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-rose-500" /> Avg Sales by Event Type
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventSnap.by_event_type} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis dataKey="event_type_1" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} width={50} />
                <Tooltip cursor={{ fill: 'var(--border)', opacity: 0.4 }} content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="sales" name="Sales" fill="var(--chart-4)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="revenue" name="Revenue" fill="var(--chart-5)" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-emerald-500" /> Top Events by Avg Sales
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topEvents} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} />
                <YAxis type="category" dataKey="event_name_1" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} width={160} />
                <Tooltip cursor={{ fill: 'var(--border)', opacity: 0.4 }} content={<CustomTooltip />} />
                <Bar dataKey="sales" name="Sales" fill="var(--chart-3)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
    </motion.div>
  );
}
