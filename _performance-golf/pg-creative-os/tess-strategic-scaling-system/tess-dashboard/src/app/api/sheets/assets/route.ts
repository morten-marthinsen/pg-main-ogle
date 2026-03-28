import { NextResponse } from "next/server";

// Mock data — replace with Google Sheets API call when credentials are configured
// See CLAUDE.md architecture: googleapis server-side → 15-min cache → response
const MOCK_DATA = {
  totalAssets: 142,
  byClassification: {
    "Scale": 28,
    "Test": 45,
    "Hold": 32,
    "Kill": 22,
    "New": 15,
  },
  byOffer: {
    "SF2": 38,
    "RS1": 31,
    "SPD": 25,
    "ONE.1": 22,
    "HH-Masterclass": 16,
    "Other": 10,
  },
  topPerformers: [
    { name: "SF2-RA01-V01", offer: "SF2", classification: "Scale", spend: 12400, roas: 4.82 },
    { name: "RS1-RA03-V02", offer: "RS1", classification: "Scale", spend: 9800, roas: 4.15 },
    { name: "SF2-RA02-V01", offer: "SF2", classification: "Scale", spend: 8200, roas: 3.91 },
    { name: "SPD-RA01-V03", offer: "SPD", classification: "Scale", spend: 7600, roas: 3.67 },
    { name: "ONE1-RA02-V01", offer: "ONE.1", classification: "Scale", spend: 6900, roas: 3.45 },
    { name: "RS1-RA01-V01", offer: "RS1", classification: "Scale", spend: 6100, roas: 3.22 },
    { name: "SF2-RA04-V02", offer: "SF2", classification: "Test", spend: 3400, roas: 3.10 },
    { name: "HH-RA01-V01", offer: "HH-Masterclass", classification: "Scale", spend: 5200, roas: 2.98 },
    { name: "SPD-RA03-V01", offer: "SPD", classification: "Test", spend: 2800, roas: 2.85 },
    { name: "RS1-RA02-V03", offer: "RS1", classification: "Test", spend: 2200, roas: 2.71 },
  ],
};

export async function GET() {
  // TODO: Replace with real Google Sheets API call
  // const sheets = google.sheets({ version: "v4", auth });
  // const response = await sheets.spreadsheets.values.get({
  //   spreadsheetId: "1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U",
  //   range: "Asset Registry!A:Z",
  // });

  return NextResponse.json(MOCK_DATA);
}
