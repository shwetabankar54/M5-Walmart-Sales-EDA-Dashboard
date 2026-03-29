"use client";

import { motion } from "framer-motion";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  delay?: number;
}

export default function KpiCard({ title, value, subtitle, delay = 0 }: KpiCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="glass-card p-5 group flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
      
      <p className="text-sm font-medium text-muted-foreground mb-3">{title}</p>
      
      <div>
        <h3 className="text-3xl font-bold tracking-tight text-foreground mb-1 group-hover:scale-[1.02] transition-transform origin-left">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground font-medium">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
