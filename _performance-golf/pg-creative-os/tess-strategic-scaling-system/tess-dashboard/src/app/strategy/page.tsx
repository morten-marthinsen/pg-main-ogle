"use client";

import { useState, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Card, Badge } from "@tremor/react";
import type { AdSummaryResponse } from "@/lib/types";
import { generateRecommendations, type Recommendation } from "@/lib/recommendation-engine";

function daysAgoStr(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

function fmt$(v: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
}

function priorityStyle(p: string) {
  switch (p) {
    case "P0": return { bg: "bg-pg-orange/15", border: "border-pg-orange", text: "text-pg-orange", badge: "orange" as const };
    case "P1": return { bg: "bg-amber-500/10", border: "border-amber-400", text: "text-amber-400", badge: "amber" as const };
    case "P2": return { bg: "bg-pg-sky/10", border: "border-pg-sky", text: "text-pg-sky", badge: "blue" as const };
    default: return { bg: "bg-surface-alt", border: "border-border", text: "text-pg-stone", badge: "slate" as const };
  }
}

export default function CreativeStrategy() {
  const [appliedFrom, setAppliedFrom] = useState("2026-01-01");
  const [appliedTo, setAppliedTo] = useState(daysAgoStr(1));
  const [draftFrom, setDraftFrom] = useState("2026-01-01");
  const [draftTo, setDraftTo] = useState(daysAgoStr(1));
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterOffer, setFilterOffer] = useState<string>("all");

  const { data, isLoading, isFetching } = useQuery<AdSummaryResponse>({
    queryKey: ["summary", appliedFrom, appliedTo],
    queryFn: () =>
      fetch(`/api/domo/summary?from=${appliedFrom}&to=${appliedTo}`)
        .then((r) => { if (!r.ok) throw new Error(`API error: ${r.status}`); return r.json(); }),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const recommendations = useMemo(() => {
    if (!data) return [];
    return generateRecommendations(data.ads);
  }, [data]);

  const offerOptions = useMemo(() => {
    const set = new Set(recommendations.map((r) => r.offer_name));
    return Array.from(set).sort();
  }, [recommendations]);

  const filtered = useMemo(() => {
    let recs = recommendations;
    if (filterPriority !== "all") recs = recs.filter((r) => r.priority === filterPriority);
    if (filterOffer !== "all") recs = recs.filter((r) => r.offer_name === filterOffer);
    return recs;
  }, [recommendations, filterPriority, filterOffer]);

  const p0Count = recommendations.filter((r) => r.priority === "P0").length;
  const p1Count = recommendations.filter((r) => r.priority === "P1").length;
  const p2Count = recommendations.filter((r) => r.priority === "P2").length;

  if (isLoading && !data) return <LoadingSkeleton />;

  return (
    <div className={`space-y-6 transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-pg-mist">Creative Strategy</h1>
          <p className="text-sm text-pg-stone mt-1">Data-driven expansion recommendations from TESS</p>
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

      {/* Summary Stats */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-2">
          <span className="text-pg-orange font-bold text-lg font-heading">{p0Count}</span>
          <span className="text-pg-stone text-xs uppercase tracking-wider">P0 — Create Now</span>
        </div>
        <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-2">
          <span className="text-amber-400 font-bold text-lg font-heading">{p1Count}</span>
          <span className="text-pg-stone text-xs uppercase tracking-wider">P1 — This Week</span>
        </div>
        <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-2">
          <span className="text-pg-sky font-bold text-lg font-heading">{p2Count}</span>
          <span className="text-pg-stone text-xs uppercase tracking-wider">P2 — When Capacity</span>
        </div>
        <span className="text-xs text-pg-ui-gray font-mono ml-auto">
          {recommendations.length} total recommendations
        </span>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1">
          {["all", "P0", "P1", "P2"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                filterPriority === p
                  ? "bg-pg-orange text-pg-mist"
                  : "bg-surface-alt text-pg-stone hover:text-pg-mist border border-border"
              }`}
            >
              {p === "all" ? "All" : p}
            </button>
          ))}
        </div>
        <select value={filterOffer} onChange={(e) => setFilterOffer(e.target.value)}
          className="px-2 py-1.5 text-xs border border-border rounded-lg bg-surface text-pg-mist focus:border-pg-orange focus:outline-none">
          <option value="all">All Offers</option>
          {offerOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="text-xs text-pg-ui-gray font-mono ml-auto">
          Showing {filtered.length} of {recommendations.length}
        </span>
      </div>

      {/* Recommendation Cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <Card className="rounded-xl border border-border">
            <p className="text-pg-stone text-center py-8">No recommendations match the current filters.</p>
          </Card>
        )}
        {filtered.map((rec, i) => (
          <RecommendationCard key={i} rec={rec} />
        ))}
      </div>
    </div>
  );
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const style = priorityStyle(rec.priority);
  const coverageUsed = rec.existing_expansions.length;
  const coverageTotal = 10;

  const cliCommand = [
    "cd ~/pg-main-ogle/_performance-golf/pg-creative-os/veda-video-editing-agent",
    `&& npx veda run --source "${rec.source_ad}"`,
    `--expansion ${rec.expansion_type}`,
    "--variations 5",
    "--auto-confirm",
  ].join(" ");

  function handleCopy() {
    navigator.clipboard.writeText(cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className={`rounded-xl border ${style.border} ${style.bg} p-5 transition-all duration-200 hover:translate-y-[-1px]`}>
        <div className="flex items-start justify-between gap-4">
          {/* Left: Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold uppercase tracking-widest ${style.text}`}>
                {rec.priority}
              </span>
              <Badge color={style.badge} size="sm">{rec.offer_name}</Badge>
              <span className="text-pg-ui-gray text-xs font-mono">
                Score: {rec.score}/100
              </span>
            </div>

            <div>
              <p className="text-pg-mist font-medium text-sm">
                Angle {rec.root_angle}
                <span className="text-pg-stone font-normal ml-2">
                  ({rec.variation_count} variations, {fmt$(rec.total_spend)} total spend)
                </span>
              </p>
              <p className="text-xs text-pg-ui-gray font-mono mt-1 truncate max-w-[500px]">
                Best: {rec.source_ad}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <span className="text-pg-ui-gray text-xs uppercase tracking-wider">Best ROAS</span>
                <p className={`text-lg font-bold font-heading ${style.text}`}>
                  {(rec.source_roas * 100).toFixed(0)}%
                </p>
              </div>
              <div>
                <span className="text-pg-ui-gray text-xs uppercase tracking-wider">Coverage</span>
                <p className="text-lg font-bold font-heading text-pg-mist">
                  {coverageUsed}/{coverageTotal}
                </p>
              </div>
              <div>
                <span className="text-pg-ui-gray text-xs uppercase tracking-wider">Existing</span>
                <div className="flex gap-1 mt-1">
                  {rec.existing_expansions.length > 0 ? rec.existing_expansions.map((e) => (
                    <span key={e} className="text-[10px] px-1.5 py-0.5 bg-surface border border-border rounded text-pg-stone">{e}</span>
                  )) : <span className="text-xs text-pg-ui-gray">none</span>}
                </div>
              </div>
            </div>

            <p className="text-sm text-pg-stone leading-relaxed">{rec.reasoning}</p>
          </div>

          {/* Right: Recommended expansion */}
          <div className="flex-shrink-0 w-56 bg-surface border border-border rounded-xl p-4 space-y-3">
            <p className="text-pg-ui-gray text-[10px] uppercase tracking-widest">Recommended Expansion</p>
            <p className={`text-lg font-bold font-heading ${style.text}`}>{rec.expansion_label}</p>
            <p className="text-xs text-pg-stone leading-relaxed">{rec.expansion_description}</p>
            <button
              onClick={() => setShowModal(true)}
              className="w-full px-4 py-2 text-xs font-medium uppercase tracking-wider bg-pg-orange text-pg-mist rounded-lg hover:bg-pg-dark-orange transition-colors"
            >
              Start in Veda
            </button>
          </div>
        </div>
      </div>

      {/* Veda Launch Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowModal(false)}>
          <div className="bg-surface border border-border rounded-xl p-6 max-w-2xl w-full mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-pg-mist font-heading">Launch Veda — {rec.expansion_label}</h3>
              <button onClick={() => setShowModal(false)} className="text-pg-stone hover:text-pg-mist text-xl">&times;</button>
            </div>

            {/* Brief */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-pg-ui-gray text-xs uppercase tracking-wider">Source Asset</span>
                <p className="text-pg-mist font-mono text-xs mt-1 break-all">{rec.source_ad}</p>
              </div>
              <div>
                <span className="text-pg-ui-gray text-xs uppercase tracking-wider">Expansion</span>
                <p className="text-pg-mist mt-1">{rec.expansion_label} ({rec.expansion_type})</p>
              </div>
              <div>
                <span className="text-pg-ui-gray text-xs uppercase tracking-wider">Offer</span>
                <p className="text-pg-mist mt-1">{rec.offer_name}</p>
              </div>
              <div>
                <span className="text-pg-ui-gray text-xs uppercase tracking-wider">Variations</span>
                <p className="text-pg-mist mt-1">5</p>
              </div>
              <div>
                <span className="text-pg-ui-gray text-xs uppercase tracking-wider">Source ROAS</span>
                <p className="text-pg-orange font-bold mt-1">{(rec.source_roas * 100).toFixed(0)}%</p>
              </div>
              <div>
                <span className="text-pg-ui-gray text-xs uppercase tracking-wider">Priority</span>
                <p className={`font-bold mt-1 ${style.text}`}>{rec.priority}</p>
              </div>
            </div>

            {/* CLI Command */}
            <div>
              <span className="text-pg-ui-gray text-xs uppercase tracking-wider">Veda CLI Command</span>
              <div className="mt-2 bg-pg-black border border-border rounded-lg p-3 font-mono text-xs text-pg-mist break-all leading-relaxed">
                {cliCommand}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className={`flex-1 px-4 py-2.5 text-sm font-medium uppercase tracking-wider rounded-lg transition-colors ${
                  copied
                    ? "bg-pg-grass/20 text-pg-grass border border-pg-grass/30"
                    : "bg-pg-orange text-pg-mist hover:bg-pg-dark-orange"
                }`}
              >
                {copied ? "Copied!" : "Copy Command"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 text-sm font-medium uppercase tracking-wider border border-border rounded-lg text-pg-stone hover:text-pg-mist transition-colors"
              >
                Close
              </button>
            </div>

            <p className="text-[10px] text-pg-ui-gray">
              Paste this command into your terminal. Veda will download the source from Iconik,
              auto-select hooks from same-offer winners, and generate 5 variations with correct naming.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-56 bg-surface-alt rounded-xl animate-pulse" />
        <div className="h-4 w-80 bg-surface rounded-lg animate-pulse mt-2" />
      </div>
      <div className="flex gap-4">
        {[...Array(3)].map((_, i) => <div key={i} className="h-12 w-40 bg-surface-alt rounded-xl animate-pulse" />)}
      </div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-48 bg-surface-alt rounded-xl animate-pulse" />
      ))}
    </div>
  );
}
