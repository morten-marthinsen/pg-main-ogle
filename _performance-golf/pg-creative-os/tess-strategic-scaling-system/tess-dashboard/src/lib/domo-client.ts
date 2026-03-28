/**
 * Domo API client — TypeScript port of pg-data-service/adapters/domo_client.py.
 *
 * Server-side only. Handles OAuth2 authentication and SQL queries.
 * Credentials come from environment variables (set in Vercel).
 */

const BASE_URL = "https://api.domo.com";

let cachedToken: { token: string; expiresAt: number } | null = null;

/** Authenticate with Domo using client credentials. Token is cached in memory. */
async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const clientId = process.env.DOMO_CLIENT_ID;
  const clientSecret = process.env.DOMO_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("DOMO_CLIENT_ID and DOMO_CLIENT_SECRET must be set");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const resp = await fetch(
    `${BASE_URL}/oauth/token?grant_type=client_credentials&scope=data`,
    {
      method: "GET",
      headers: { Authorization: `Basic ${credentials}` },
    }
  );

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Domo auth failed (${resp.status}): ${text}`);
  }

  const data = await resp.json();
  // Cache token for 50 minutes (Domo tokens last ~60 min)
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + 50 * 60 * 1000,
  };

  return cachedToken.token;
}

/** Run a SQL query against a Domo dataset. Returns { columns, rows }. */
export async function queryDataset(
  datasetId: string,
  sql: string
): Promise<{ columns: string[]; rows: string[][] }> {
  const token = await getToken();

  const resp = await fetch(
    `${BASE_URL}/v1/datasets/query/execute/${datasetId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql }),
    }
  );

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Domo query failed (${resp.status}): ${text}`);
  }

  const result = await resp.json();
  return {
    columns: result.columns || [],
    rows: result.rows || [],
  };
}

/**
 * Fetch all ad performance rows for a date range.
 * Returns an array of row objects (column → value).
 */
export async function fetchAdPerformance(
  dateFrom: string,
  dateTo: string
): Promise<Record<string, string>[]> {
  const datasetId = process.env.DOMO_DATASET_ID;
  if (!datasetId) {
    throw new Error("DOMO_DATASET_ID must be set");
  }

  // Validate date format to prevent SQL injection
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateFrom) || !dateRegex.test(dateTo)) {
    throw new Error("Invalid date format. Use YYYY-MM-DD.");
  }

  const sql = `SELECT * FROM table WHERE dateCreated >= '${dateFrom}' AND dateCreated <= '${dateTo}'`;
  const { columns, rows } = await queryDataset(datasetId, sql);

  // Clean column names (strip <BR> and newlines from Domo)
  const cleanColumns = columns.map((col) =>
    col.replace(/<BR>/g, " ").replace(/\n/g, " ").trim()
  );

  // Convert to array of objects
  return rows.map((row) => {
    const obj: Record<string, string> = {};
    cleanColumns.forEach((col, i) => {
      obj[col] = row[i] ?? "";
    });
    return obj;
  });
}
