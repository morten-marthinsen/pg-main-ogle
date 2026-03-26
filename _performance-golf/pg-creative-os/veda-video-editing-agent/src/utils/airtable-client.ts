/**
 * Airtable Client — thin read/write abstraction for expansion agent workflows.
 *
 * Used by the environment expansion agent for approval gates, cost tracking,
 * and multi-scene record management. Follows the same optional-dep pattern
 * as IconikClient and SheetsReader.
 *
 * Requires: AIRTABLE_TOKEN + AIRTABLE_BASE_ID in .env
 */

// ── Types ────────────────────────────────────────────────────────────────────

export interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
  createdTime?: string;
}

export interface AirtableClient {
  /** Fetch records from a table, optionally filtered by Airtable formula. */
  getRecords(tableName: string, filterFormula?: string): Promise<AirtableRecord[]>;
  /** Create a single record in a table. Returns the created record with ID. */
  createRecord(tableName: string, fields: Record<string, unknown>): Promise<AirtableRecord>;
  /** Update fields on an existing record. */
  updateRecord(tableName: string, recordId: string, fields: Record<string, unknown>): Promise<void>;
}

// ── Implementation ───────────────────────────────────────────────────────────

export class AirtableHttpClient implements AirtableClient {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(config: { token: string; baseId: string }) {
    this.baseUrl = `https://api.airtable.com/v0/${config.baseId}`;
    this.headers = {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    };
  }

  async getRecords(tableName: string, filterFormula?: string): Promise<AirtableRecord[]> {
    const params = new URLSearchParams();
    if (filterFormula) {
      params.set("filterByFormula", filterFormula);
    }

    const url = `${this.baseUrl}/${encodeURIComponent(tableName)}?${params.toString()}`;
    const allRecords: AirtableRecord[] = [];
    let offset: string | undefined;

    // Paginate through all results
    do {
      const pageUrl = offset ? `${url}&offset=${offset}` : url;
      const resp = await fetch(pageUrl, { headers: this.headers });

      if (!resp.ok) {
        const body = await resp.text();
        throw new Error(`Airtable getRecords failed (${resp.status}): ${body.slice(0, 300)}`);
      }

      const data = (await resp.json()) as {
        records: AirtableRecord[];
        offset?: string;
      };

      allRecords.push(...data.records);
      offset = data.offset;
    } while (offset);

    return allRecords;
  }

  async createRecord(tableName: string, fields: Record<string, unknown>): Promise<AirtableRecord> {
    const url = `${this.baseUrl}/${encodeURIComponent(tableName)}`;
    const resp = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ fields }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      throw new Error(`Airtable createRecord failed (${resp.status}): ${body.slice(0, 300)}`);
    }

    return (await resp.json()) as AirtableRecord;
  }

  async updateRecord(tableName: string, recordId: string, fields: Record<string, unknown>): Promise<void> {
    const url = `${this.baseUrl}/${encodeURIComponent(tableName)}/${recordId}`;
    const resp = await fetch(url, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ fields }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      throw new Error(`Airtable updateRecord failed (${resp.status}): ${body.slice(0, 300)}`);
    }
  }
}

// ── Factory ──────────────────────────────────────────────────────────────────

/** Create an AirtableClient from environment variables. Returns null if not configured. */
export function createAirtableClientFromEnv(): AirtableClient | null {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    return null;
  }

  return new AirtableHttpClient({ token, baseId });
}
