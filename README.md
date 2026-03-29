<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Recharts-3-FF6384?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel" />
</p>

<h1 align="center">📊 M5 EDA Dashboard</h1>

<p align="center">
  <b>Interactive analytics dashboard for the Walmart M5 Forecasting dataset</b><br/>
  <i>58 million rows. Too big for Tableau. So we built our own.</i>
</p>

<p align="center">
  <a href="https://m5-eda-dashboard.vercel.app" target="_blank">🔗 Live Demo</a>
</p>

<p align="center">
  <a href="https://github.com/Thir13een"><img src="https://img.shields.io/badge/Krishna-Thir13een-181717?style=for-the-badge&logo=github" /></a>
  <a href="https://github.com/shwetabankar54"><img src="https://img.shields.io/badge/Shweta-shwetabankar54-181717?style=for-the-badge&logo=github" /></a>
</p>

---

## 🧠 Why This Exists

The [M5 Forecasting](https://www.kaggle.com/competitions/m5-forecasting-accuracy) dataset contains **58,327,370 rows** of Walmart sales data across 3,049 products, 10 stores, and 3 states over 5+ years.

At this scale, **Tableau simply couldn't handle it** — it choked on imports, crashed during aggregations, and made interactive exploration impossible. Traditional BI tools aren't designed for datasets this large without a backend database.

**Our approach:** compute all aggregations and metrics upfront in Python (Jupyter notebooks), export lightweight JSON files, and render everything in a fast, responsive **Next.js** dashboard.

---

## 🔀 How This Differs from [m5-forecasting-dashboard](https://github.com/Thir13een/m5-forecasting-dashboard)

| | **This Repo** (EDA Dashboard) | **m5-forecasting-dashboard** |
|---|---|---|
| **Purpose** | Exploratory Data Analysis & visualization | End-to-end ML forecasting system |
| **Focus** | Charts, KPIs, trends, patterns | Demand prediction for shop owners |
| **Backend** | Static JSON (pre-computed) | FastAPI + PostgreSQL + LightGBM |
| **AI** | None | Qwen3-32B inventory assistant |
| **Target User** | Analysts & data scientists | Store managers & business owners |
| **Data Flow** | Notebook → JSON → Dashboard | Live predictions → API → Dashboard |

**TL;DR** — The forecasting repo *predicts the future*. This repo *explores the past*.

---

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────┐      ┌─────────────────────┐
│  data.parquet   │ ───▶ │  EDA.ipynb   │ ───▶ │  Static JSON files  │
│  (58M rows)     │      │  (pandas +   │      │  (kpis, time-series │
│                 │      │   numpy)     │      │   stores, products) │
└─────────────────┘      └──────────────┘      └────────┬────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │  Next.js App    │
                                               │  (Recharts +    │
                                               │   Tailwind +    │
                                               │   Framer Motion)│
                                               └────────┬────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │    Vercel       │
                                               └─────────────────┘
```

---

## 📈 Dashboard Sections

| Tab | What It Shows |
|---|---|
| **Overview** | KPIs (total sales, revenue, date range), daily/monthly/yearly trends, weekend vs weekday |
| **Stores** | Sales & revenue by store, by state, monthly store performance |
| **Categories** | Breakdown by category (Foods, Hobbies, Household) and department |
| **Events & SNAP** | Impact of SNAP benefits and events on sales |
| **Products** | Top 50 products by sales, top products by store |

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/Thir13een/m5-eda-dashboard.git
cd m5-eda-dashboard

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── EDA.ipynb            # Jupyter notebook — all data processing
├── public/              # Pre-computed JSON data files
│   ├── kpis.json
│   ├── time-series.json
│   ├── store-perf.json
│   ├── cat-dept.json
│   ├── event-snap.json
│   └── products.json
├── src/
│   ├── app/             # Next.js app router
│   └── components/      # Dashboard components
│       ├── Overview.tsx
│       ├── Stores.tsx
│       ├── Categories.tsx
│       ├── EventsSnap.tsx
│       ├── Products.tsx
│       ├── KpiCard.tsx
│       ├── Navbar.tsx
│       └── Tabs.tsx
└── package.json
```

---

## ⚙️ Tech Stack

- **Next.js 16** — React framework with Turbopack
- **React 19** — UI library
- **Tailwind CSS 4** — Utility-first styling
- **Recharts 3** — Composable charting library
- **Framer Motion 12** — Animations and transitions
- **Lucide React** — Icon set
- **Vercel** — Hosting and deployment

---

## 📊 Dataset

- **Source:** [Kaggle M5 Forecasting Competition](https://www.kaggle.com/competitions/m5-forecasting-accuracy)
- **Rows:** 58,327,370
- **Products:** 3,049 unique items
- **Stores:** 10 across 3 US states (CA, TX, WI)
- **Time Span:** Jan 2011 – Apr 2016

---

## 👥 Built By

<p align="center">
  Built by <b>Krishna Sonji</b> and <b>Shweta Bankar</b>
</p>

<p align="center">
  <a href="https://github.com/Thir13een"><img src="https://img.shields.io/badge/Krishna-Thir13een-181717?style=for-the-badge&logo=github" /></a>
  <a href="https://github.com/shwetabankar54"><img src="https://img.shields.io/badge/Shweta-shwetabankar54-181717?style=for-the-badge&logo=github" /></a>
</p>
