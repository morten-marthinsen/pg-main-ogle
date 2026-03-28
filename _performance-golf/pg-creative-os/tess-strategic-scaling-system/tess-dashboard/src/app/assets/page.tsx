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
  Badge,
} from "@tremor/react";
import type { AdSummaryResponse, Classification } from "@/lib/types";

function daysAgoStr(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

function formatCurrency(val: number): string {
  if (isNaN(val)) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
}

function classColor(c: string): "emerald" | "amber" | "rose" | "slate" {
  switch (c) {
    case "winner": return "emerald";
    case "potential": return "amber";
    case "underperformer": return "rose";
    default: return "slate";
  }
}

type SortKey = "ad_name" | "offer_name" | "spend" | "net_roas" | "classification" | "expansion_type" | "clicks" | "impressions" | "cpa";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 50;

const CLASSIFICATIONS: Classification[] = ["winner", "potential", "underperformer", "testing"];

export default function AssetExplorer() {
  // Date range
  const [appliedFrom, setAppliedFrom] = useState("2026-01-01");
  const [appliedTo, setAppliedTo] = useState(daysAgoStr(1));
  const [draftFrom, setDraftFrom] = useState("2026-01-01");
  const [draftTo, setDraftTo] = useState(daysAgoStr(1));

  // Filters
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState<string>("all");
  const [filterFunnel, setFilterFunnel] = useState<string>("all");
  const [filterExpansion, setFilterExpansion] = useState<string>("all");

  // Sort
  const [sortKey, setSortKey] = useState<SortKey>("spend");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Pagination
  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching } = useQuery<AdSummaryResponse>({
    queryKey: ["summary", appliedFrom, appliedTo],
    queryFn: () =>
      fetch(`/api/domo/summary?from=${appliedFrom}&to=${appliedTo}`)
        .then((r) => { if (!r.ok) throw new Error(`API error: ${r.status}`); return r.json(); }),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  // Derive filter options from data
  const funnelOptions = useMemo(() => {
    if (!data) return [];
    const set = new Set<string>();
    data.ads.forEach((a) => { if (a.offer_name) set.add(a.offer_name); });
    return Array.from(set).sort();
  }, [data]);

  const expansionOptions = useMemo(() => {
    if (!data) return [];
    const set = new Set<string>();
    data.ads.forEach((a) => { if (a.expansion_type && a.expansion_type !== "xx") set.add(a.expansion_type); });
    return Array.from(set).sort();
  }, [data]);

  // Filter + sort + paginate
  const filtered = useMemo(() => {
    if (!data) return [];
    let ads = data.ads;

    if (search) {
      const q = search.toLowerCase();
      ads = ads.filter((a) => a.ad_name.includes(q) || a.offer_name.toLowerCase().includes(q) || a.funnel.includes(q));
    }
    if (filterClass !== "all") ads = ads.filter((a) => a.classification === filterClass);
    if (filterFunnel !== "all") ads = ads.filter((a) => a.offer_name === filterFunnel);
    if (filterExpansion !== "all") ads = ads.filter((a) => a.expansion_type === filterExpansion);

    ads = [...ads].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (typeof av === "number" && typeof bv === "number") {
        const na = isNaN(av) ? -Infinity : av;
        const nb = isNaN(bv) ? -Infinity : bv;
        return sortDir === "asc" ? na - nb : nb - na;
      }
      const sa = String(av);
      const sb = String(bv);
      return sortDir === "asc" ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });

    return ads;
  }, [data, search, filterClass, filterFunnel, filterExpansion, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(0);
  }

  function applyDates() {
    setAppliedFrom(draftFrom);
    setAppliedTo(draftTo);
    setPage(0);
  }

  function exportCSV() {
    if (!filtered.length) return;
    const headers = ["Ad", "Offer", "Funnel", "Classification", "Expansion", "Asset Type", "Talent", "Editor", "Spend", "Net ROAS", "Net Revenue", "Gross Revenue", "CPA", "CPC", "CTR", "CPM", "Clicks", "Impressions", "Orders", "NC Orders", "SC Trials"];
    const rows = filtered.map((a) => [
      a.ad_name, a.offer_name, a.funnel, a.classification, a.expansion_type, a.asset_type, a.talent_name, a.editor_name,
      a.spend.toFixed(2), isNaN(a.net_roas) ? "" : (a.net_roas * 100).toFixed(0) + "%", a.net_revenue.toFixed(2), a.gross_revenue.toFixed(2),
      isNaN(a.cpa) ? "" : a.cpa.toFixed(2), isNaN(a.cpc) ? "" : a.cpc.toFixed(2), isNaN(a.ctr) ? "" : (a.ctr * 100).toFixed(2) + "%",
      isNaN(a.cpm) ? "" : a.cpm.toFixed(2), a.clicks, a.impressions, a.total_orders, a.new_customers, a.sc_trials,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tess-assets-${appliedFrom}-to-${appliedTo}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    const active = sortKey === field;
    return (
      <TableHeaderCell
        className="cursor-pointer select-none hover:text-pg-mist transition-colors"
        onClick={() => toggleSort(field)}
      >
        {label} {active ? (sortDir === "asc" ? "↑" : "↓") : ""}
      </TableHeaderCell>
    );
  }

  if (isLoading && !data) return <LoadingSkeleton />;

  return (
    <div className={`space-y-6 transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-pg-mist">Asset Explorer</h1>
          <p className="text-sm text-pg-stone mt-1">Browse, search, and filter all tracked ads</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={draftFrom} onChange={(e) => setDraftFrom(e.target.value)}
            className="px-2 py-1 text-xs font-mono border border-border rounded-lg bg-surface-alt text-pg-mist focus:border-pg-orange focus:outline-none" />
          <span className="text-pg-stone text-xs">to</span>
          <input type="date" value={draftTo} onChange={(e) => setDraftTo(e.target.value)}
            className="px-2 py-1 text-xs font-mono border border-border rounded-lg bg-surface-alt text-pg-mist focus:border-pg-orange focus:outline-none" />
          <button onClick={applyDates}
            className="px-3 py-1 text-xs font-medium bg-pg-orange text-pg-mist rounded-lg hover:bg-pg-dark-orange transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <input
          type="text"
          placeholder="Search ads..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          className="px-3 py-1.5 text-sm border border-border rounded-lg bg-surface text-pg-mist placeholder-pg-ui-gray focus:border-pg-orange focus:outline-none w-64"
        />
        {/* Classification */}
        <select value={filterClass} onChange={(e) => { setFilterClass(e.target.value); setPage(0); }}
          className="px-2 py-1.5 text-xs border border-border rounded-lg bg-surface text-pg-mist focus:border-pg-orange focus:outline-none">
          <option value="all">All Classifications</option>
          {CLASSIFICATIONS.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
        {/* Funnel */}
        <select value={filterFunnel} onChange={(e) => { setFilterFunnel(e.target.value); setPage(0); }}
          className="px-2 py-1.5 text-xs border border-border rounded-lg bg-surface text-pg-mist focus:border-pg-orange focus:outline-none">
          <option value="all">All Offers</option>
          {funnelOptions.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        {/* Expansion */}
        <select value={filterExpansion} onChange={(e) => { setFilterExpansion(e.target.value); setPage(0); }}
          className="px-2 py-1.5 text-xs border border-border rounded-lg bg-surface text-pg-mist focus:border-pg-orange focus:outline-none">
          <option value="all">All Expansions</option>
          {expansionOptions.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
        {/* Results count + Export */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs text-pg-ui-gray font-mono">{filtered.length.toLocaleString()} ads</span>
          <button onClick={exportCSV}
            className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg text-pg-stone hover:text-pg-mist hover:border-pg-orange transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <Card className="rounded-xl border border-border">
        <Table>
          <TableHead>
            <TableRow>
              <SortHeader label="Ad" field="ad_name" />
              <SortHeader label="Offer" field="offer_name" />
              <SortHeader label="Expansion" field="expansion_type" />
              <SortHeader label="Spend" field="spend" />
              <SortHeader label="Net ROAS" field="net_roas" />
              <SortHeader label="CPA" field="cpa" />
              <SortHeader label="Clicks" field="clicks" />
              <SortHeader label="Impressions" field="impressions" />
              <SortHeader label="Class" field="classification" />
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((ad, i) => (
              <TableRow key={i} className="hover:bg-surface-alt/50 transition-colors">
                <TableCell className="font-mono text-xs max-w-[280px] truncate">{ad.ad_name}</TableCell>
                <TableCell className="text-sm">{ad.offer_name || "—"}</TableCell>
                <TableCell>
                  {ad.expansion_type && ad.expansion_type !== "xx" ? (
                    <Badge color="orange" size="sm">{ad.expansion_type}</Badge>
                  ) : <span className="text-pg-ui-gray text-xs">—</span>}
                </TableCell>
                <TableCell className="font-mono text-sm text-right">{formatCurrency(ad.spend)}</TableCell>
                <TableCell className="font-mono text-sm text-right font-medium">
                  {isNaN(ad.net_roas) ? "—" : `${(ad.net_roas * 100).toFixed(0)}%`}
                </TableCell>
                <TableCell className="font-mono text-sm text-right">{isNaN(ad.cpa) ? "—" : formatCurrency(ad.cpa)}</TableCell>
                <TableCell className="font-mono text-sm text-right">{ad.clicks.toLocaleString()}</TableCell>
                <TableCell className="font-mono text-sm text-right">{ad.impressions.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge color={classColor(ad.classification)} size="sm">{ad.classification}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-pg-ui-gray font-mono">
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg text-pg-stone hover:text-pg-mist disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg text-pg-stone hover:text-pg-mist disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
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
      <div className="flex gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 w-32 bg-surface-alt rounded-lg animate-pulse" />
        ))}
      </div>
      <Card className="rounded-xl border border-border">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-10 bg-surface-alt rounded-lg animate-pulse mt-2" />
        ))}
      </Card>
    </div>
  );
}
