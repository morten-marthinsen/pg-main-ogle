/**
 * Creative Performance Spreadsheet Registry.
 *
 * Maps funnel codes to their Google Spreadsheet IDs.
 * Source of truth for root angle names and variation IDs until
 * the unified Asset Registry tab is built.
 */

export const FUNNEL_TO_SPREADSHEET: Record<string, { id: string; name: string }> = {
  // Digital Products
  dqfe: { id: "1mb4PBXEH-bwgPtASrO--8k-zh_yrN0MgsC5vmO0O_xg", name: "DQFE (SSTS/WPSS Quiz)" },
  dqfe1: { id: "11CRt2A6vZm7pQIfpj4_cJjXTNd3_y_Y3psgFsCadO6g", name: "DQFE1 (PG1 Quiz)" },
  ssts: { id: "1KM-KZae17Kmmwxo0tg1i-D8WGprFdn2WthAlj7r1PA0", name: "Simple Strike Sequence" },
  ossf: { id: "1osaqCjvxim7-_vr8bDC76w7IW_e0ImBIa-AWxQNPudc", name: "One Shot Slice Fix" },
  pgf: { id: "1Pa7Yc_5qRlvsYhrhRj7W3nhO5K--x9oSTEsax5gwWqM", name: "PG Fitness" },
  htkt: { id: "1PsHwHxYeS2M3cc0zPhD6VpyXGwN9UlxaA9qtWlUmy54", name: "High Ticket Golf School" },
  pg1: { id: "1A-jY_Wz_dz3QOZc5q7eJPKQ_xZ-T6qlUyUoPXWCcxAc", name: "PG Mobile App" },
  pgb: { id: "1oBtJ4W7AanZdi6lgskbTvDU2GBN_ARp6EAOKcoLbIAE", name: "Beginners Program" },
  // Physical Products
  "357": { id: "1kHWciP5tLYUh96Gx4X-L0yFgOEJPCGVs8T86sebbWP4", name: "357 Fairway Hybrid" },
  sf1: { id: "1_5BgNNQgkouBSVF0TSWJ1kEysof8FDO_-4m6iiuS_xo", name: "SF1 Driver" },
  sf2: { id: "1fHcMtpHO_oNNdxRdG0LmKkt2fsvrObavGyDcbhPtHPQ", name: "SF2 Driver" },
  wdg1: { id: "1AJllFezb3mWGSP6yXR6i0cuAcVCaQCmVod4jIj1HNcg", name: "ONE.1 Wedge" },
  ssp: { id: "1kOvFQl_w_YJDzaNRd3Un0QBhSqczLdMExbjTbednRLs", name: "SwingSmooth PRO" },
  clst: { id: "1LcN8ltDBFJ4R1PeYeWcfkExO9FUeAOsT7Pxo-F0RuW8", name: "Click Stick" },
  spd: { id: "1_iqT3wY9YvrENKaCENI3HnnPWDtglekh18ZfEoD08JI", name: "SpeedTrac" },
  df1: { id: "1_xJ9zwLjZgVSRrNZfwt6rdD6yAP9JqfGKmLYcMyekvs", name: "DrawForce" },
};
