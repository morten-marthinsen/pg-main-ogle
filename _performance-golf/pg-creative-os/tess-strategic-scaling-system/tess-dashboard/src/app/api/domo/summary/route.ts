/**
 * GET /api/domo/summary
 *
 * Fetches ad performance data from Domo, enriches with Beast Mode metrics,
 * classifies each ad, and returns the full dataset.
 *
 * Query params:
 *   from: Start date (YYYY-MM-DD), default: 30 days ago
 *   to: End date (YYYY-MM-DD), default: yesterday
 *
 * Response: AdSummaryResponse (see types.ts)
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchAdPerformance } from "@/lib/domo-client";
import { enrich } from "@/lib/enrichment";
import { getCached, setCache, ttlForRange } from "@/lib/cache";
import type { AdSummaryResponse } from "@/lib/types";

function defaultDateFrom(): string {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().split("T")[0];
}

function defaultDateTo(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateFrom = searchParams.get("from") || defaultDateFrom();
    const dateTo = searchParams.get("to") || defaultDateTo();

    // Check cache — historical ranges stay cached for 24h
    const cacheKey = `summary:${dateFrom}:${dateTo}`;
    const cached = getCached<AdSummaryResponse>(cacheKey);
    if (cached) {
      return NextResponse.json(cached.data);
    }

    // Fetch from Domo
    const rawRows = await fetchAdPerformance(dateFrom, dateTo);

    // Enrich (aggregation + Beast Modes + classification)
    const ads = enrich(rawRows);

    const response: AdSummaryResponse = {
      ads,
      meta: {
        date_from: dateFrom,
        date_to: dateTo,
        total_ads: ads.length,
        cached_at: new Date().toISOString(),
      },
    };

    // Cache with TTL based on date range freshness
    setCache(cacheKey, response, ttlForRange(dateTo));

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[/api/domo/summary]", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
