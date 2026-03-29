"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProductsProps {
  products: {
    top_items: { item_id: string; cat_id: string; dept_id: string; sales: number; revenue: number }[];
    top_items_by_store: { item_id: string; store_id: string; sales: number; revenue: number }[];
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

export default function Products({ products }: ProductsProps) {
  const top20 = products.top_items.slice(0, 20);
  const top20ByStore = products.top_items_by_store.slice(0, 20).map((d) => ({
    ...d,
    label: `${d.item_id} (${d.store_id})`,
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
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-card p-6 min-h-[500px]">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-primary" /> Top 20 Items by Total Sales
          </h3>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top20} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} />
                <YAxis type="category" dataKey="item_id" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} width={160} />
                <Tooltip cursor={{ fill: 'var(--border)', opacity: 0.4 }} content={<CustomTooltip />} />
                <Bar dataKey="sales" name="Sales" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6 min-h-[500px]">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-sm bg-emerald-500" /> Top 20 Item-Store Combos
          </h3>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top20ByStore} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={fmt} />
                <YAxis type="category" dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} width={200} />
                <Tooltip cursor={{ fill: 'var(--border)', opacity: 0.4 }} content={<CustomTooltip />} />
                <Bar dataKey="sales" name="Sales" fill="var(--chart-3)" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="glass-card p-6 border border-border">
        <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
          <div className="w-2 h-6 rounded-sm bg-rose-500" /> Leading 50 Products Detailed Metrics
        </h3>
        
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-muted-foreground uppercase text-xs font-semibold">
              <tr>
                <th className="px-5 py-4 w-16">#</th>
                <th className="px-5 py-4">Item ID</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Department</th>
                <th className="px-5 py-4 text-right">Total Units</th>
                <th className="px-5 py-4 text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.top_items.slice(0, 50).map((item, i) => (
                <tr key={`${item.item_id}-${i}`} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="px-5 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-5 py-3 font-mono font-medium text-foreground">{item.item_id}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs">
                      {item.cat_id}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{item.dept_id}</td>
                  <td className="px-5 py-3 text-right font-medium text-foreground">{item.sales.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-emerald-400 font-medium">${item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </motion.div>
  );
}
