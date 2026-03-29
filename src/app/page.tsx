"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Overview from "@/components/Overview";
import Stores from "@/components/Stores";
import Categories from "@/components/Categories";
import EventsSnap from "@/components/EventsSnap";
import Products from "@/components/Products";

interface Data {
  kpis: any;
  timeSeries: any;
  storePerf: any;
  catDept: any;
  eventSnap: any;
  products: any;
}

export default function Home() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/kpis.json").then((r) => r.json()),
      fetch("/time-series.json").then((r) => r.json()),
      fetch("/store-perf.json").then((r) => r.json()),
      fetch("/cat-dept.json").then((r) => r.json()),
      fetch("/event-snap.json").then((r) => r.json()),
      fetch("/products.json").then((r) => r.json()),
    ]).then(([kpis, timeSeries, storePerf, catDept, eventSnap, products]) => {
      setData({ kpis, timeSeries, storePerf, catDept, eventSnap, products });
    }).catch((err) => console.error("Failed to load data:", err));
  }, []);

  if (!data) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
        <Navbar activeTab={tab} onTabChange={setTab} />
        <main className="flex-1 pt-20 md:pt-24 p-6 md:p-10">
          <div className="max-w-[1600px] mx-auto animate-pulse">
            <div className="h-10 bg-white/5 rounded-lg w-64 mb-2" />
            <div className="h-4 bg-white/5 rounded-lg w-96 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-white/5 rounded-2xl border border-white/5" />
              ))}
            </div>
            <div className="h-[400px] bg-white/5 rounded-2xl border border-white/5" />
          </div>
        </main>
      </div>
    );
  }

  const renderContent = () => {
    switch (tab) {
      case 0: return <Overview kpis={data.kpis} timeSeries={data.timeSeries} />;
      case 1: return <Stores storePerf={data.storePerf} />;
      case 2: return <Categories catDept={data.catDept} />;
      case 3: return <EventsSnap eventSnap={data.eventSnap} />;
      case 4: return <Products products={data.products} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <Navbar activeTab={tab} onTabChange={setTab} />
      
      <main className="flex-1 pt-20 md:pt-24 p-6 md:p-10 overflow-x-hidden">
        <div className="max-w-[1600px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-gradient">
              Executive Summary
            </h1>
            <p className="text-muted-foreground">
              Walmart M5 Sales Analytics — {data.kpis.date_range.start} to {data.kpis.date_range.end}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
