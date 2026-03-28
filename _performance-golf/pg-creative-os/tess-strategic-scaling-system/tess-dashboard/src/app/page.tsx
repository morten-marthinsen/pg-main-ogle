"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  Card,
  Metric,
  Text,
  Grid,
  Title,
  DonutChart,
  BarChart,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
} from "@tremor/react";
import type { AdSummaryResponse } from "@/lib/types";

function daysAgoStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

function formatCurrency(val: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);
}

function classificationColor(c: string): string {
  switch (c) {
    case "winner": return "emerald";
    case "potential": return "amber";
    case "underperformer": return "rose";
    case "testing": return "slate";
    default: return "slate";
  }
}

const PRESETS = [
  { key: "7d", days: 7 },
  { key: "14d", days: 14 },
  { key: "30d", days: 30 },
  { key: "60d", days: 60 },
  { key: "90d", days: 90 },
];

export default function ExecutiveSummary() {
  const [appliedFrom, setAppliedFrom] = useState(daysAgoStr(30));
  const [appliedTo, setAppliedTo] = useState(daysAgoStr(1));
  const [draftFrom, setDraftFrom] = useState("2026-01-01");
  const [draftTo, setDraftTo] = useState(daysAgoStr(1));
  const [showCustom, setShowCustom] = useState(false);
  const [activePreset, setActivePreset] = useState("30d");

  function applyPreset(key: string, days: number) {
    setActivePreset(key);
    setShowCustom(false);
    setAppliedFrom(daysAgoStr(days));
    setAppliedTo(daysAgoStr(1));
  }

  function applyCustom() {
    setActivePreset("custom");
    setAppliedFrom(draftFrom);
    setAppliedTo(draftTo);
  }

  const { data, isLoading, error, isFetching } = useQuery<AdSummaryResponse>({
    queryKey: ["summary", appliedFrom, appliedTo],
    queryFn: () =>
      fetch(`/api/domo/summary?from=${appliedFrom}&to=${appliedTo}`)
        .then((r) => {
          if (!r.ok) throw new Error(`API error: ${r.status}`);
          return r.json();
        }),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  if (isLoading && !data) return <LoadingSkeleton />;
  if (error && !data) return <ErrorState message={(error as Error).message} />;
  if (!data) return null;

  const ads = data.ads;
  const totalSpend = ads.reduce((sum, a) => sum + a.spend, 0);
  const classifiedAds = ads.filter((a) => a.classification !== "testing");
  const winners = ads.filter((a) => a.classification === "winner");
  const testing = ads.filter((a) => a.classification === "testing");
  const weightedRoas = totalSpend > 0
    ? ads.reduce((sum, a) => sum + a.net_roas * a.spend, 0) / totalSpend
    : 0;
  const winRate = classifiedAds.length > 0
    ? (winners.length / classifiedAds.length) * 100
    : 0;

  const classificationCounts = [
    { name: "Winners", value: winners.length },
    { name: "Potential", value: ads.filter((a) => a.classification === "potential").length },
    { name: "Underperformers", value: ads.filter((a) => a.classification === "underperformer").length },
    { name: "Testing", value: testing.length },
  ];

  const funnelSpend = new Map<string, number>();
  ads.forEach((a) => {
    const f = a.offer_name || a.funnel || "Other";
    funnelSpend.set(f, (funnelSpend.get(f) ?? 0) + a.spend);
  });
  const topFunnels = Array.from(funnelSpend.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, spend]) => ({ name, Spend: Math.round(spend) }));

  const topPerformers = ads
    .filter((a) => a.spend >= 2500 && !isNaN(a.net_roas))
    .sort((a, b) => b.net_roas - a.net_roas)
    .slice(0, 20);

  return (
    <div className={`space-y-8 transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-pg-mist">
            Executive Summary
          </h1>
          <p className="text-sm text-pg-stone mt-1">
            TESS Strategic Scaling System — live from Domo
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-1">
            {PRESETS.map(({ key, days }) => (
              <button
                key={key}
                onClick={() => applyPreset(key, days)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  activePreset === key
                    ? "bg-pg-orange text-pg-mist"
                    : "bg-surface-alt text-pg-stone hover:text-pg-mist hover:border-pg-orange border border-border"
                }`}
              >
                {key}
              </button>
            ))}
            <button
              onClick={() => setShowCustom(!showCustom)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                activePreset === "custom"
                  ? "bg-pg-orange text-pg-mist"
                  : showCustom
                    ? "bg-surface-alt text-pg-mist border border-border-light"
                    : "bg-surface-alt text-pg-stone hover:text-pg-mist border border-border"
              }`}
            >
              Custom
            </button>
          </div>
          {showCustom && (
            <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-3 py-2">
              <input
                type="date"
                value={draftFrom}
                onChange={(e) => setDraftFrom(e.target.value)}
                className="px-2 py-1 text-xs font-mono border border-border rounded-lg bg-surface-alt text-pg-mist focus:border-pg-orange focus:outline-none"
              />
              <span className="text-pg-stone text-xs">to</span>
              <input
                type="date"
                value={draftTo}
                onChange={(e) => setDraftTo(e.target.value)}
                className="px-2 py-1 text-xs font-mono border border-border rounded-lg bg-surface-alt text-pg-mist focus:border-pg-orange focus:outline-none"
              />
              <button
                onClick={applyCustom}
                className="px-3 py-1 text-xs font-medium bg-pg-orange text-pg-mist rounded-lg hover:bg-pg-dark-orange transition-colors"
              >
                Apply
              </button>
            </div>
          )}
          <span className="text-xs text-pg-ui-gray font-mono">
            {data.meta.date_from} — {data.meta.date_to} {isFetching && "· loading..."}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <Grid numItemsMd={3} numItemsLg={6} className="gap-4">
        <Card className="rounded-xl border border-border">
          <Text className="text-pg-ui-gray text-xs uppercase tracking-widest">Total Ads</Text>
          <Metric className="font-heading">{data.meta.total_ads.toLocaleString()}</Metric>
        </Card>
        <Card className="rounded-xl border border-border">
          <Text className="text-pg-ui-gray text-xs uppercase tracking-widest">Total Spend</Text>
          <Metric className="font-heading">{formatCurrency(totalSpend)}</Metric>
        </Card>
        <Card className="rounded-xl border border-border">
          <Text className="text-pg-ui-gray text-xs uppercase tracking-widest">Portfolio ROAS</Text>
          <Metric className="font-heading">{(weightedRoas * 100).toFixed(0)}%</Metric>
        </Card>
        <Card className="rounded-xl border border-border">
          <Text className="text-pg-ui-gray text-xs uppercase tracking-widest">Winners</Text>
          <Metric className="font-heading text-pg-orange">{winners.length}</Metric>
        </Card>
        <Card className="rounded-xl border border-border">
          <Text className="text-pg-ui-gray text-xs uppercase tracking-widest">Testing</Text>
          <Metric className="font-heading">{testing.length}</Metric>
        </Card>
        <Card className="rounded-xl border border-border">
          <Text className="text-pg-ui-gray text-xs uppercase tracking-widest">Win Rate</Text>
          <Metric className="font-heading">{winRate.toFixed(1)}%</Metric>
        </Card>
      </Grid>

      {/* Charts Row */}
      <Grid numItemsMd={2} className="gap-6">
        <Card className="rounded-xl border border-border">
          <Title className="font-heading">Classification Breakdown</Title>
          <DonutChart
            data={classificationCounts}
            category="value"
            index="name"
            className="mt-4 h-52"
            colors={["orange", "amber", "rose", "slate"]}
          />
        </Card>

        <Card className="rounded-xl border border-border">
          <Title className="font-heading">Spend by Offer</Title>
          <BarChart
            data={topFunnels}
            index="name"
            categories={["Spend"]}
            className="mt-4 h-52"
            colors={["orange"]}
            valueFormatter={(v) => formatCurrency(v)}
          />
        </Card>
      </Grid>

      {/* Top Performers Table */}
      <Card className="rounded-xl border border-border">
        <Title className="font-heading">
          Top 20 Performers
          <span className="text-pg-ui-gray text-sm font-normal ml-2">(Spend &ge; $2,500)</span>
        </Title>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Ad</TableHeaderCell>
              <TableHeaderCell>Offer</TableHeaderCell>
              <TableHeaderCell>Expansion</TableHeaderCell>
              <TableHeaderCell className="text-right">Spend</TableHeaderCell>
              <TableHeaderCell className="text-right">Net ROAS</TableHeaderCell>
              <TableHeaderCell>Class</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topPerformers.map((ad, i) => (
              <TableRow key={i}>
                <TableCell className="font-mono text-sm max-w-[300px] truncate">
                  {ad.ad_name}
                </TableCell>
                <TableCell className="text-sm">{ad.offer_name || ad.funnel || "—"}</TableCell>
                <TableCell>
                  {ad.expansion_type && ad.expansion_type !== "xx" ? (
                    <Badge color="orange" size="sm">{ad.expansion_type}</Badge>
                  ) : (
                    <span className="text-pg-ui-gray text-xs">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">{formatCurrency(ad.spend)}</TableCell>
                <TableCell className="text-right font-mono text-sm font-medium">
                  {isNaN(ad.net_roas) ? "—" : `${(ad.net_roas * 100).toFixed(0)}%`}
                </TableCell>
                <TableCell>
                  <Badge color={classificationColor(ad.classification)} size="sm">
                    {ad.classification}
                  </Badge>
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
    <div className="space-y-8">
      <div>
        <div className="h-8 w-48 bg-surface-alt rounded-xl animate-pulse" />
        <div className="h-4 w-72 bg-surface rounded-lg animate-pulse mt-2" />
      </div>
      <Grid numItemsMd={3} numItemsLg={6} className="gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="rounded-xl border border-border">
            <div className="h-4 w-20 bg-surface-alt rounded-lg animate-pulse" />
            <div className="h-8 w-24 bg-surface-alt rounded-lg animate-pulse mt-2" />
          </Card>
        ))}
      </Grid>
      <Grid numItemsMd={2} className="gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="rounded-xl border border-border">
            <div className="h-4 w-40 bg-surface-alt rounded-lg animate-pulse" />
            <div className="h-52 bg-surface-alt rounded-lg animate-pulse mt-4" />
          </Card>
        ))}
      </Grid>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <Card className="border-2 border-pg-orange rounded-xl">
      <Title>Connection Error</Title>
      <Text className="text-pg-orange mt-2">{message}</Text>
      <Text className="mt-2 text-pg-ui-gray">Check that Domo credentials are configured in .env.local</Text>
    </Card>
  );
}
