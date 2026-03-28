"use client";

import { useState, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  Card,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  BarChart,
  Badge,
} from "@tremor/react";
import type { AdSummaryResponse, EnrichedAd } from "@/lib/types";

function daysAgoStr(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

function fmt$(v: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
}

const TABS = [
  { key: "funnel", label: "By Offer" },
  { key: "expansion", label: "By Expansion Type" },
  { key: "asset_type", label: "By Asset Type" },
  { key: "ad_category", label: "By Ad Category" },
  { key: "talent", label: "By Talent" },
  { key: "editor", label: "By Editor" },
] as const;
type TabKey = typeof TABS[number]["key"];

interface GroupRow {
  name: string;
  total_spend: number;
  avg_roas: number;
  count: number;
  winners: number;
  win_rate: number;
}

function groupBy(ads: EnrichedAd[], keyFn: (a: EnrichedAd) => string): GroupRow[] {
  const map = new Map<string, EnrichedAd[]>();
  ads.forEach((a) => {
    const k = keyFn(a) || "Other";
    const arr = map.get(k) ?? [];
    arr.push(a);
    map.set(k, arr);
  });

  const rows: GroupRow[] = [];
  map.forEach((group, name) => {
    const total_spend = group.reduce((s, a) => s + a.spend, 0);
    const classified = group.filter((a) => a.classification !== "testing");
    const winners = group.filter((a) => a.classification === "winner");
    const weighted_roas = total_spend > 0
      ? group.reduce((s, a) => s + a.net_roas * a.spend, 0) / total_spend
      : 0;
    rows.push({
      name,
      total_spend,
      avg_roas: weighted_roas,
      count: group.length,
      winners: winners.length,
      win_rate: classified.length > 0 ? (winners.length / classified.length) * 100 : 0,
    });
  });

  return rows.sort((a, b) => b.total_spend - a.total_spend);
}

function getKeyFn(tab: TabKey): (a: EnrichedAd) => string {
  switch (tab) {
    case "funnel": return (a) => a.offer_name || a.funnel;
    case "expansion": return (a) => a.expansion_type_name || a.expansion_type || "N/A";
    case "asset_type": return (a) => a.asset_type_name || a.asset_type || "N/A";
    case "ad_category": return (a) => {
      const c = a.ad_category;
      if (c === "nn") return "Net New";
      if (c === "exv") return "Expansion (Vertical)";
      if (c === "exh") return "Expansion (Horizontal)";
      if (c === "nnmu") return "Mashup";
      if (c === "prm") return "Promo";
      if (c === "evg") return "Evergreen";
      return c || "N/A";
    };
    case "talent": return (a) => a.talent_name || a.talent_code || "N/A";
    case "editor": return (a) => a.editor_name || a.editor_initials || "N/A";
  }
}

export default function Performance() {
  const [tab, setTab] = useState<TabKey>("funnel");
  const [appliedFrom, setAppliedFrom] = useState("2026-01-01");
  const [appliedTo, setAppliedTo] = useState(daysAgoStr(1));
  const [draftFrom, setDraftFrom] = useState("2026-01-01");
  const [draftTo, setDraftTo] = useState(daysAgoStr(1));

  const { data, isLoading, isFetching } = useQuery<AdSummaryResponse>({
    queryKey: ["summary", appliedFrom, appliedTo],
    queryFn: () =>
      fetch(`/api/domo/summary?from=${appliedFrom}&to=${appliedTo}`)
        .then((r) => { if (!r.ok) throw new Error(`API error: ${r.status}`); return r.json(); }),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const grouped = useMemo(() => {
    if (!data) return [];
    return groupBy(data.ads, getKeyFn(tab));
  }, [data, tab]);

  const chartData = grouped.slice(0, 15).map((r) => ({
    name: r.name.length > 25 ? r.name.slice(0, 22) + "..." : r.name,
    Spend: Math.round(r.total_spend),
  }));

  if (isLoading && !data) return <LoadingSkeleton />;

  return (
    <div className={`space-y-6 transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-pg-mist">Performance</h1>
          <p className="text-sm text-pg-stone mt-1">Comparison views across every dimension</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={draftFrom} onChange={(e) => setDraftFrom(e.target.value)}
            className="px-2 py-1 text-xs font-mono border border-border rounded-lg bg-surface-alt text-pg-mist focus:border-pg-orange focus:outline-none" />
          <span className="text-pg-stone text-xs">to</span>
          <input type="date" value={draftTo} onChange={(e) => setDraftTo(e.target.value)}
            className="px-2 py-1 text-xs font-mono border border-border rounded-lg bg-surface-alt text-pg-mist focus:border-pg-orange focus:outline-none" />
          <button onClick={() => { setAppliedFrom(draftFrom); setAppliedTo(draftTo); }}
            className="px-3 py-1 text-xs font-medium bg-pg-orange text-pg-mist rounded-lg hover:bg-pg-dark-orange transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
              tab === key
                ? "bg-pg-orange text-pg-mist"
                : "bg-surface-alt text-pg-stone hover:text-pg-mist border border-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <Card className="rounded-xl border border-border">
        <h2 className="text-lg font-bold text-pg-mist font-heading mb-4">
          Spend {TABS.find((t) => t.key === tab)?.label}
        </h2>
        <BarChart
          data={chartData}
          index="name"
          categories={["Spend"]}
          className="h-64"
          colors={["orange"]}
          valueFormatter={(v) => fmt$(v)}
        />
      </Card>

      {/* Comparison Table */}
      <Card className="rounded-xl border border-border">
        <h2 className="text-lg font-bold text-pg-mist font-heading mb-4">
          Breakdown {TABS.find((t) => t.key === tab)?.label}
          <span className="text-pg-ui-gray text-sm font-normal ml-2">({grouped.length} groups)</span>
        </h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell className="text-right">Total Spend</TableHeaderCell>
              <TableHeaderCell className="text-right">Avg ROAS</TableHeaderCell>
              <TableHeaderCell className="text-right">Ads</TableHeaderCell>
              <TableHeaderCell className="text-right">Winners</TableHeaderCell>
              <TableHeaderCell className="text-right">Win Rate</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grouped.map((row, i) => (
              <TableRow key={i} className="hover:bg-surface-alt/50 transition-colors">
                <TableCell className="text-sm font-medium">{row.name}</TableCell>
                <TableCell className="text-right font-mono text-sm">{fmt$(row.total_spend)}</TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {isNaN(row.avg_roas) ? "—" : `${(row.avg_roas * 100).toFixed(0)}%`}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">{row.count}</TableCell>
                <TableCell className="text-right">
                  {row.winners > 0 ? (
                    <Badge color="orange" size="sm">{row.winners}</Badge>
                  ) : (
                    <span className="text-pg-ui-gray text-xs">0</span>
                  )}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {row.win_rate > 0 ? `${row.win_rate.toFixed(0)}%` : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-48 bg-surface-alt rounded-xl animate-pulse" />
        <div className="h-4 w-72 bg-surface rounded-lg animate-pulse mt-2" />
      </div>
      <div className="flex gap-1">
        {[...Array(6)].map((_, i) => <div key={i} className="h-8 w-28 bg-surface-alt rounded-lg animate-pulse" />)}
      </div>
      <Card className="rounded-xl border border-border">
        <div className="h-64 bg-surface-alt rounded-lg animate-pulse" />
      </Card>
    </div>
  );
}
