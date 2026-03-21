"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import Image from "next/image";
import data from "@/data/aov-data.json";
import FunnelFlow from "@/components/FunnelFlow";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtK = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : fmt(n);
const fmtPct = (n: number) => `${(n * 100).toFixed(1)}%`;
const fmtInt = (n: number) => n.toLocaleString("en-US");

/* ------------------------------------------------------------------ */
/*  KPI Card                                                           */
/* ------------------------------------------------------------------ */
function KPI({ label, value, sub, accent, delay }: { label: string; value: string; sub?: string; accent?: boolean; delay?: string }) {
  return (
    <div className={`glass-card rounded-2xl p-6 animate-in ${delay ?? ""} ${accent ? "glow-orange border-pg-orange/20" : ""}`}>
      <p className="text-xs uppercase tracking-widest text-pg-stone mb-3 font-medium">{label}</p>
      <p className={`metric-value text-3xl font-bold ${accent ? "text-pg-orange" : "text-pg-mist"}`}>{value}</p>
      {sub && <p className="text-xs text-pg-ui-gray mt-2 font-mono">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Header                                                     */
/* ------------------------------------------------------------------ */
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-pg-mist tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-pg-ui-gray mt-1">{subtitle}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom Tooltip                                                     */
/* ------------------------------------------------------------------ */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg px-4 py-3 border border-pg-stone/10 shadow-xl">
      <p className="text-xs text-pg-stone mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="metric-value text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {fmt(entry.value)}
        </p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function Dashboard() {
  /* Waterfall data */
  const waterfallData = [
    { name: "Primary", value: data.primary.aovContribution, fill: "#FD3300" },
    { name: "UP1 Reg", value: data.upsells[0].regular.aovContribution, fill: "#DB2C00" },
    { name: "UP1 DS", value: data.upsells[0].downsell!.aovContribution, fill: "#B3AAA3" },
    { name: "UP2 Reg", value: data.upsells[1].regular.aovContribution, fill: "#4F41D5" },
    { name: "UP2 DS", value: data.upsells[1].downsell!.aovContribution, fill: "#7B726C" },
    { name: "UP3", value: data.upsells[2].regular.aovContribution, fill: "#B2C6EB" },
  ];

  /* SKU mix data */
  const skuMixData = data.primary.skus.map((s) => ({
    name: `${s.units} Bottle${s.units > 1 ? "s" : ""}`,
    value: s.orders,
    pct: s.pctOfStep,
  }));
  const skuColors = ["#B3AAA3", "#DB2C00", "#FD3300"];

  /* Take rate data */
  const takeRateData = [
    { name: "UP1", client: data.upsells[0].combinedTakeRate, brain: data.benchmarks.brainNiche.up1TakeRate, sugar: data.benchmarks.bloodSugar.up1TakeRate },
    { name: "UP2", client: data.upsells[1].combinedTakeRate, brain: data.benchmarks.brainNiche.up2TakeRate, sugar: data.benchmarks.bloodSugar.up2TakeRate },
    { name: "UP3", client: data.upsells[2].combinedTakeRate, brain: data.benchmarks.brainNiche.up3TakeRate, sugar: data.benchmarks.bloodSugar.up3TakeRate },
  ];

  /* Benchmark AOV comparison */
  const benchmarkData = [
    { name: "SSP", primary: data.meta.primaryAOV, total: data.meta.totalAOV },
    { name: "Brain Niche", primary: data.benchmarks.brainNiche.primaryAOV, total: data.benchmarks.brainNiche.totalAOV },
    { name: "Blood Sugar", primary: data.benchmarks.bloodSugar.primaryAOV, total: data.benchmarks.bloodSugar.totalAOV },
  ];

  /* Funnel steps table */
  const funnelSteps = [
    { step: "Primary", orders: data.primary.totalOrders, revenue: data.primary.totalRevenue, aov: data.primary.aovContribution, pct: data.primary.aovPct, takeRate: null as number | null },
    { step: "UP1 Regular", orders: data.upsells[0].regular.totalOrders, revenue: data.upsells[0].regular.totalRevenue, aov: data.upsells[0].regular.aovContribution, pct: data.upsells[0].regular.aovContribution / data.meta.totalAOV, takeRate: data.upsells[0].regular.takeRate },
    { step: "UP1 Downsell", orders: data.upsells[0].downsell!.totalOrders, revenue: data.upsells[0].downsell!.totalRevenue, aov: data.upsells[0].downsell!.aovContribution, pct: data.upsells[0].downsell!.aovContribution / data.meta.totalAOV, takeRate: data.upsells[0].downsell!.takeRate },
    { step: "UP2 Regular", orders: data.upsells[1].regular.totalOrders, revenue: data.upsells[1].regular.totalRevenue, aov: data.upsells[1].regular.aovContribution, pct: data.upsells[1].regular.aovContribution / data.meta.totalAOV, takeRate: data.upsells[1].regular.takeRate },
    { step: "UP2 Downsell", orders: data.upsells[1].downsell!.totalOrders, revenue: data.upsells[1].downsell!.totalRevenue, aov: data.upsells[1].downsell!.aovContribution, pct: data.upsells[1].downsell!.aovContribution / data.meta.totalAOV, takeRate: data.upsells[1].downsell!.takeRate },
    { step: "UP3 Gift Cards", orders: data.upsells[2].regular.totalOrders, revenue: data.upsells[2].regular.totalRevenue, aov: data.upsells[2].regular.aovContribution, pct: data.upsells[2].regular.aovContribution / data.meta.totalAOV, takeRate: data.upsells[2].regular.takeRate },
  ];

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
      {/* ============================================================ */}
      {/*  HEADER                                                      */}
      {/* ============================================================ */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 animate-in">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <Image src="/logos/PER-Symbol-White.svg" alt="Performance Golf" width={48} height={18} className="opacity-90" />
            <div className="w-px h-5 bg-pg-stone/20" />
            <Image src="/logos/PER-Logotype-White.svg" alt="Performance Golf" width={140} height={12} className="opacity-60" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-pg-mist tracking-tight">
            SwingSmooth Pro
          </h1>
          <p className="text-pg-ui-gray text-sm mt-1">AOV Intelligence Dashboard</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="glass-card rounded-lg px-3 py-1.5 text-xs font-mono text-pg-stone">
            {data.meta.dateRange.start} → {data.meta.dateRange.end}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-pg-ui-gray">Updated {data.meta.lastUpdated}</span>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/*  KPI ROW                                                     */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        <KPI label="Total AOV" value={fmt(data.meta.totalAOV)} sub={`${fmtPct(data.meta.upsellBoostPct)} upsell boost`} accent delay="delay-1" />
        <KPI label="Primary AOV" value={fmt(data.meta.primaryAOV)} sub={`${fmtPct(data.primary.aovPct)} of total`} delay="delay-2" />
        <KPI label="Upsell Boost" value={`+${fmt(data.meta.upsellBoost)}`} sub={`+${fmtPct(data.meta.upsellBoostPct)} over primary`} delay="delay-3" />
        <KPI label="Total Revenue" value={fmtK(data.meta.totalRevenue)} sub={`${fmtInt(data.meta.totalOrders)} orders`} delay="delay-4" />
        <KPI label="UP1 Take Rate" value={fmtPct(data.upsells[0].combinedTakeRate)} sub={`${fmtInt(data.upsells[0].regular.totalOrders + data.upsells[0].downsell!.totalOrders)} of ${fmtInt(data.meta.totalOrders)} orders`} delay="delay-5" />
      </div>

      {/* ============================================================ */}
      {/*  AOV WATERFALL + FUNNEL                                      */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Waterfall */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 animate-in delay-2">
          <SectionHeader title="AOV Contribution by Step" subtitle="How each funnel step builds the total AOV" />
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterfallData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(179,170,163,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#7B726C", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "rgba(179,170,163,0.1)" }} tickLine={false} />
                <YAxis tick={{ fill: "#7B726C", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(253,51,0,0.04)" }} />
                <Bar dataKey="value" name="AOV Contribution" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {waterfallData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Conversion */}
        <div className="glass-card rounded-2xl p-6 animate-in delay-3">
          <SectionHeader title="Funnel Conversion" subtitle="Take rates at each step" />
          <div className="space-y-5 mt-4">
            {[
              { label: "Primary", rate: 1, orders: data.primary.totalOrders, color: "#FD3300" },
              { label: "Upsell 1", rate: data.upsells[0].combinedTakeRate, orders: data.upsells[0].regular.totalOrders + data.upsells[0].downsell!.totalOrders, color: "#DB2C00" },
              { label: "Upsell 2", rate: data.upsells[1].combinedTakeRate, orders: data.upsells[1].regular.totalOrders + data.upsells[1].downsell!.totalOrders, color: "#4F41D5" },
              { label: "Upsell 3", rate: data.upsells[2].combinedTakeRate, orders: data.upsells[2].regular.totalOrders, color: "#B2C6EB" },
            ].map((step) => (
              <div key={step.label}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-sm text-pg-pebble">{step.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="metric-value text-sm font-semibold text-pg-mist">{fmtPct(step.rate)}</span>
                    <span className="metric-value text-xs text-pg-ui-gray">{fmtInt(step.orders)}</span>
                  </div>
                </div>
                <div className="h-2.5 bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${step.rate * 100}%`, backgroundColor: step.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  SKU MIX + BENCHMARK + TAKE RATES                           */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* SKU Mix */}
        <div className="glass-card rounded-2xl p-6 animate-in delay-3">
          <SectionHeader title="Primary SKU Mix" subtitle="Order distribution by package" />
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skuMixData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {skuMixData.map((_, index) => (
                    <Cell key={index} fill={skuColors[index]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as { name: string; value: number; pct: number };
                    return (
                      <div className="glass-card rounded-lg px-4 py-3 border border-pg-stone/10">
                        <p className="text-xs text-pg-stone">{d.name}</p>
                        <p className="metric-value text-sm font-semibold text-pg-mist">{fmtInt(d.value)} orders ({fmtPct(d.pct)})</p>
                      </div>
                    );
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  formatter={(value: string) => <span className="text-xs text-pg-stone">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-2">
            {data.primary.skus.map((s, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: skuColors[i] }} />
                  <span className="text-pg-stone">{s.units} Bottle{s.units > 1 ? "s" : ""}</span>
                </div>
                <span className="metric-value text-pg-pebble">{fmtInt(s.orders)} ({fmtPct(s.pctOfStep)})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benchmark Comparison */}
        <div className="glass-card rounded-2xl p-6 animate-in delay-4">
          <SectionHeader title="AOV vs Benchmarks" subtitle="Primary and total AOV comparison" />
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(179,170,163,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#7B726C", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "rgba(179,170,163,0.1)" }} tickLine={false} />
                <YAxis tick={{ fill: "#7B726C", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(253,51,0,0.04)" }} />
                <Bar dataKey="primary" name="Primary AOV" fill="#DB2C00" radius={[4, 4, 0, 0]} maxBarSize={36} />
                <Bar dataKey="total" name="Total AOV" fill="#FD3300" radius={[4, 4, 0, 0]} maxBarSize={36} />
                <Legend
                  verticalAlign="bottom"
                  formatter={(value: string) => <span className="text-xs text-pg-stone">{value}</span>}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upsell Take Rates vs Benchmarks */}
        <div className="glass-card rounded-2xl p-6 animate-in delay-5">
          <SectionHeader title="Upsell Take Rates" subtitle="SSP vs competitive benchmarks" />
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={takeRateData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(179,170,163,0.06)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#7B726C", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#7B726C", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="glass-card rounded-lg px-4 py-3 border border-pg-stone/10">
                        <p className="text-xs text-pg-stone mb-1">{label}</p>
                        {payload.map((entry, i) => (
                          <p key={i} className="metric-value text-sm" style={{ color: entry.color }}>
                            {entry.name}: {fmtPct(entry.value as number)}
                          </p>
                        ))}
                      </div>
                    );
                  }}
                  cursor={{ fill: "rgba(253,51,0,0.04)" }}
                />
                <Bar dataKey="client" name="SSP" fill="#FD3300" radius={[0, 4, 4, 0]} maxBarSize={20} />
                <Bar dataKey="brain" name="Brain Niche" fill="#4F41D5" radius={[0, 4, 4, 0]} maxBarSize={20} />
                <Bar dataKey="sugar" name="Blood Sugar" fill="#B2C6EB" radius={[0, 4, 4, 0]} maxBarSize={20} />
                <Legend
                  verticalAlign="bottom"
                  formatter={(value: string) => <span className="text-xs text-pg-stone">{value}</span>}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  FUNNEL FLOW (SANKEY)                                        */}
      {/* ============================================================ */}
      <div className="glass-card rounded-2xl p-6 mb-10 animate-in delay-2">
        <SectionHeader title="Buyer Flow Map" subtitle="Hover any path to see how many buyers took that route through the funnel" />
        <FunnelFlow
          nodes={data.funnelFlow.nodes}
          links={data.funnelFlow.links}
        />
      </div>

      {/* ============================================================ */}
      {/*  DETAIL TABLE                                                */}
      {/* ============================================================ */}
      <div className="glass-card rounded-2xl p-6 mb-10 animate-in delay-3">
        <SectionHeader title="Funnel Step Detail" subtitle="Complete breakdown with AOV contribution and take rates" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pg-stone/10">
                {["Step", "Orders", "Revenue", "AOV Contrib.", "% of AOV", "Take Rate"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs uppercase tracking-widest text-pg-stone font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {funnelSteps.map((row, i) => (
                <tr key={i} className="border-b border-pg-stone/5 hover:bg-surface-hover/50 transition-colors">
                  <td className="py-3 px-4 text-pg-pebble font-medium">{row.step}</td>
                  <td className="py-3 px-4 metric-value text-pg-mist">{fmtInt(row.orders)}</td>
                  <td className="py-3 px-4 metric-value text-pg-mist">{fmtK(row.revenue)}</td>
                  <td className="py-3 px-4 metric-value text-pg-orange font-semibold">{fmt(row.aov)}</td>
                  <td className="py-3 px-4 metric-value text-pg-mist">{fmtPct(row.pct)}</td>
                  <td className="py-3 px-4 metric-value text-pg-mist">{row.takeRate !== null ? fmtPct(row.takeRate) : "—"}</td>
                </tr>
              ))}
              <tr className="bg-surface-elevated/50">
                <td className="py-3 px-4 text-pg-mist font-bold">Total</td>
                <td className="py-3 px-4 metric-value text-pg-mist font-bold">{fmtInt(data.meta.totalOrders)}</td>
                <td className="py-3 px-4 metric-value text-pg-mist font-bold">{fmtK(data.meta.totalRevenue)}</td>
                <td className="py-3 px-4 metric-value text-pg-orange font-bold">{fmt(data.meta.totalAOV)}</td>
                <td className="py-3 px-4 metric-value text-pg-mist font-bold">100.0%</td>
                <td className="py-3 px-4" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  SKU DETAIL TABLE                                            */}
      {/* ============================================================ */}
      <div className="glass-card rounded-2xl p-6 mb-10 animate-in delay-4">
        <SectionHeader title="Primary SKU Detail" subtitle="OTP vs Subscription breakdown" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pg-stone/10">
                {["SKU", "Type", "Units", "$/Unit", "Total Price", "Orders", "% of Total"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs uppercase tracking-widest text-pg-stone font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.skuDetail.primaryBreakdown.map((row, i) => (
                <tr key={i} className="border-b border-pg-stone/5 hover:bg-surface-hover/50 transition-colors">
                  <td className="py-3 px-4 text-pg-pebble">{row.name}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${row.type === "Subscription" ? "bg-pg-indigo/15 text-pg-sky" : "bg-pg-forest/20 text-green-400"}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 metric-value text-pg-mist">{row.units}</td>
                  <td className="py-3 px-4 metric-value text-pg-mist">{fmt(row.pricePerUnit)}</td>
                  <td className="py-3 px-4 metric-value text-pg-mist">{fmt(row.totalPrice)}</td>
                  <td className="py-3 px-4 metric-value text-pg-orange font-semibold">{fmtInt(row.orders)}</td>
                  <td className="py-3 px-4 metric-value text-pg-mist">{fmtPct(row.orders / data.meta.totalOrders)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  ORDER STATUS + SHIPPING                                     */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="glass-card rounded-2xl p-6 animate-in delay-4">
          <SectionHeader title="Order Status" />
          <div className="space-y-3">
            {[
              { label: "Complete", value: data.orderStatus.complete, color: "#2E4734", pct: data.orderStatus.complete / data.meta.totalOrders },
              { label: "Refunded", value: data.orderStatus.refunded, color: "#FD3300", pct: data.orderStatus.refunded / data.meta.totalOrders },
              { label: "Cancelled", value: data.orderStatus.cancelled, color: "#7B726C", pct: data.orderStatus.cancelled / data.meta.totalOrders },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
                  <span className="text-sm text-pg-pebble">{s.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="metric-value text-sm text-pg-mist">{fmtInt(s.value)}</span>
                  <span className="metric-value text-xs text-pg-ui-gray w-12 text-right">{fmtPct(s.pct)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 animate-in delay-5">
          <SectionHeader title="Paid Shipping" subtitle={`${fmtInt(data.shipping.totalOrders)} orders • ${fmt(data.shipping.totalRevenue)} revenue`} />
          <div className="space-y-3">
            {data.shipping.methods.map((m) => (
              <div key={m.name} className="flex items-center justify-between">
                <span className="text-sm text-pg-pebble">{m.name}</span>
                <div className="flex items-center gap-4">
                  <span className="metric-value text-xs text-pg-ui-gray">{fmtInt(m.orders)} orders</span>
                  <span className="metric-value text-sm text-pg-mist">{fmt(m.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-pg-ui-gray mt-4 italic">Shipping revenue excluded from AOV calculations</p>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="text-center py-8 border-t border-pg-stone/5">
        <p className="text-xs text-pg-ui-gray">
          Performance Golf — SwingSmooth Pro AOV Intelligence
        </p>
        <p className="text-xs text-pg-stone/40 mt-1">
          Data source: NLS AOV Benchmarks • All orders (gross) • Benchmarks: Brain Niche &amp; Blood Sugar Niche
        </p>
      </footer>
    </div>
  );
}
