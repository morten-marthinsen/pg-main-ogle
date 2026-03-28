/**
 * Server-side in-memory cache with configurable TTL.
 *
 * Historical date ranges (where dateTo is >1 day ago) get a longer TTL
 * since that data won't change. Recent ranges get 1-hour TTL.
 */

interface CacheEntry<T> {
  data: T;
  cachedAt: number;
  ttl: number;
}

const store = new Map<string, CacheEntry<unknown>>();

const DEFAULT_TTL = 60 * 60 * 1000;          // 1 hour
const HISTORICAL_TTL = 24 * 60 * 60 * 1000;  // 24 hours (data won't change)

export function getCached<T>(key: string): { data: T; cachedAt: string } | null {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() - entry.cachedAt > entry.ttl) {
    store.delete(key);
    return null;
  }
  return {
    data: entry.data,
    cachedAt: new Date(entry.cachedAt).toISOString(),
  };
}

export function setCache<T>(key: string, data: T, ttl: number = DEFAULT_TTL): string {
  const now = Date.now();
  store.set(key, { data, cachedAt: now, ttl });
  return new Date(now).toISOString();
}

/** Pick TTL based on whether the date range includes today/yesterday. */
export function ttlForRange(dateTo: string): number {
  const to = new Date(dateTo);
  const now = new Date();
  const diffDays = (now.getTime() - to.getTime()) / (1000 * 60 * 60 * 24);
  // If dateTo is more than 2 days ago, it's historical — cache longer
  return diffDays > 2 ? HISTORICAL_TTL : DEFAULT_TTL;
}

export function clearCache(key?: string): void {
  if (key) {
    store.delete(key);
  } else {
    store.clear();
  }
}
