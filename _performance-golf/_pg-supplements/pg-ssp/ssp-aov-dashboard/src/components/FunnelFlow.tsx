"use client";

import { useState, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface FlowNode {
  name: string;
  column: number;
  value: number;
  y?: number;
  height?: number;
  color?: string;
}

interface FlowLink {
  source: string;
  target: string;
  value: number;
}

interface Props {
  nodes: FlowNode[];
  links: FlowLink[];
  width?: number;
  height?: number;
}

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */
const NODE_COLORS: Record<string, string> = {
  "1 Bottle": "#B3AAA3",
  "3 Bottles": "#DB2C00",
  "6 Bottles": "#FD3300",
  "3-Month ($147)": "#B3AAA3",
  "6-Month ($210)": "#DB2C00",
  "9-Month ($261)": "#FD3300",
  "BOGO ($49)": "#7B726C",
  "No UP1": "#2A2626",
  "KMM ($149)": "#4F41D5",
  "KMM DS ($75)": "#7B726C",
  "No UP2": "#2A2626",
  "Gift Card ($69)": "#B2C6EB",
  "No UP3": "#2A2626",
};

const COLUMN_LABELS = ["Primary SKU", "Upsell 1", "Upsell 2", "Upsell 3"];

/* ------------------------------------------------------------------ */
/*  Layout Engine                                                      */
/* ------------------------------------------------------------------ */
function layoutSankey(nodes: FlowNode[], links: FlowLink[], W: number, H: number) {
  const PAD_X = 160;
  const NODE_W = 14;
  const NODE_GAP = 8;
  const colCount = 4;
  const colWidth = (W - PAD_X * 2) / (colCount - 1);

  // Group nodes by column, sort by value desc within each column, but put "No" nodes last
  const columns: FlowNode[][] = [[], [], [], []];
  for (const n of nodes) {
    columns[n.column].push({ ...n, color: NODE_COLORS[n.name] || "#7B726C" });
  }
  for (const col of columns) {
    col.sort((a, b) => {
      const aNo = a.name.startsWith("No ") ? 1 : 0;
      const bNo = b.name.startsWith("No ") ? 1 : 0;
      if (aNo !== bNo) return aNo - bNo;
      return b.value - a.value;
    });
  }

  // Calculate heights proportionally
  const maxColValue = Math.max(...columns.map((col) => col.reduce((s, n) => s + n.value, 0)));
  const usableH = H - 80;

  for (let c = 0; c < colCount; c++) {
    const colTotal = columns[c].reduce((s, n) => s + n.value, 0);
    const totalGap = (columns[c].length - 1) * NODE_GAP;
    const scale = (usableH - totalGap) / colTotal;

    let y = 40;
    for (const node of columns[c]) {
      node.height = Math.max(node.value * scale, 3);
      node.y = y;
      y += node.height + NODE_GAP;
    }
  }

  // Build node map
  const nodeMap = new Map<string, FlowNode & { x: number }>();
  for (let c = 0; c < colCount; c++) {
    const x = PAD_X + c * colWidth;
    for (const n of columns[c]) {
      nodeMap.set(n.name, { ...n, x });
    }
  }

  // Build link paths with source/target y offsets
  const sourceOffsets = new Map<string, number>();
  const targetOffsets = new Map<string, number>();

  // Sort links by source node order then value
  const sortedLinks = [...links].sort((a, b) => {
    const sa = nodeMap.get(a.source);
    const sb = nodeMap.get(b.source);
    if (sa && sb && sa.y !== undefined && sb.y !== undefined) {
      if (sa.y !== sb.y) return sa.y - sb.y;
    }
    return b.value - a.value;
  });

  const layoutLinks = sortedLinks.map((link) => {
    const src = nodeMap.get(link.source);
    const tgt = nodeMap.get(link.target);
    if (!src || !tgt) return null;

    const srcOff = sourceOffsets.get(link.source) || 0;
    const tgtOff = targetOffsets.get(link.target) || 0;

    const srcTotal = src.value || 1;
    const tgtTotal = tgt.value || 1;

    const linkHSrc = ((link.value / srcTotal) * (src.height || 0));
    const linkHTgt = ((link.value / tgtTotal) * (tgt.height || 0));

    const y0 = (src.y || 0) + srcOff;
    const y1 = (tgt.y || 0) + tgtOff;

    sourceOffsets.set(link.source, srcOff + linkHSrc);
    targetOffsets.set(link.target, tgtOff + linkHTgt);

    const x0 = src.x + NODE_W;
    const x1 = tgt.x;
    const midX = (x0 + x1) / 2;

    return {
      ...link,
      path: `M${x0},${y0} C${midX},${y0} ${midX},${y1} ${x1},${y1} L${x1},${y1 + linkHTgt} C${midX},${y1 + linkHTgt} ${midX},${y0 + linkHSrc} ${x0},${y0 + linkHSrc} Z`,
      color: NODE_COLORS[link.source] || "#7B726C",
      isDecline: link.target.startsWith("No "),
    };
  }).filter(Boolean);

  return {
    nodes: Array.from(nodeMap.values()),
    links: layoutLinks,
    nodeW: NODE_W,
    colWidth,
    padX: PAD_X,
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function FunnelFlow({ nodes, links, width = 900, height = 420 }: Props) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const layout = useMemo(() => layoutSankey(nodes, links, width, height), [nodes, links, width, height]);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Column labels */}
        {COLUMN_LABELS.map((label, i) => (
          <text
            key={label}
            x={layout.padX + i * layout.colWidth + layout.nodeW / 2}
            y={24}
            textAnchor="middle"
            className="fill-pg-stone text-[10px] uppercase tracking-widest"
            style={{ fontFamily: "ABC Repro Mono, monospace", fontSize: "9px", letterSpacing: "0.12em" }}
          >
            {label}
          </text>
        ))}

        {/* Links */}
        {layout.links.map((link, i) => {
          if (!link) return null;
          const isHovered = hoveredLink === `${link.source}-${link.target}`;
          const isNodeHovered = hoveredNode === link.source || hoveredNode === link.target;
          const dimmed = (hoveredLink || hoveredNode) && !isHovered && !isNodeHovered;

          return (
            <path
              key={i}
              d={link.path}
              fill={link.isDecline ? "rgba(42,38,38,0.3)" : link.color}
              opacity={dimmed ? 0.06 : link.isDecline ? 0.15 : isHovered || isNodeHovered ? 0.7 : 0.25}
              className="transition-opacity duration-200 cursor-pointer"
              onMouseEnter={(e) => {
                setHoveredLink(`${link.source}-${link.target}`);
                const rect = e.currentTarget.closest("svg")?.getBoundingClientRect();
                if (rect) {
                  setTooltip({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top - 10,
                    text: `${link.source} → ${link.target}: ${link.value} orders`,
                  });
                }
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.closest("svg")?.getBoundingClientRect();
                if (rect) {
                  setTooltip({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top - 10,
                    text: `${link.source} → ${link.target}: ${link.value} orders`,
                  });
                }
              }}
              onMouseLeave={() => {
                setHoveredLink(null);
                setTooltip(null);
              }}
            />
          );
        })}

        {/* Nodes */}
        {layout.nodes.map((node) => {
          const isHovered = hoveredNode === node.name;
          const isDecline = node.name.startsWith("No ");

          return (
            <g
              key={node.name}
              onMouseEnter={() => setHoveredNode(node.name)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              <rect
                x={node.x}
                y={node.y}
                width={layout.nodeW}
                height={node.height}
                rx={3}
                fill={isDecline ? "#1F1C1C" : node.color}
                stroke={isHovered ? "#FCFAFA" : isDecline ? "rgba(179,170,163,0.1)" : "rgba(255,255,255,0.15)"}
                strokeWidth={isHovered ? 1.5 : 0.5}
                className="transition-all duration-200"
              />
              {/* Label */}
              <text
                x={node.column < 2 ? node.x - 8 : node.x + layout.nodeW + 8}
                y={(node.y || 0) + (node.height || 0) / 2 + 1}
                textAnchor={node.column < 2 ? "end" : "start"}
                dominantBaseline="middle"
                className="transition-opacity duration-200"
                style={{
                  fontFamily: "ABC Repro, sans-serif",
                  fontSize: "11px",
                  fill: isDecline ? "#7B726C" : isHovered ? "#FCFAFA" : "#DFD9D5",
                  opacity: (hoveredNode && !isHovered) ? 0.3 : 1,
                }}
              >
                {node.name}
              </text>
              {/* Value */}
              <text
                x={node.column < 2 ? node.x - 8 : node.x + layout.nodeW + 8}
                y={(node.y || 0) + (node.height || 0) / 2 + 14}
                textAnchor={node.column < 2 ? "end" : "start"}
                dominantBaseline="middle"
                style={{
                  fontFamily: "ABC Repro Mono, monospace",
                  fontSize: "9px",
                  fill: isDecline ? "#4A4444" : "#B3AAA3",
                  opacity: (hoveredNode && !isHovered) ? 0.3 : 1,
                }}
              >
                {node.value} orders
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none glass-card rounded-lg px-3 py-2 border border-pg-stone/10 shadow-xl z-50"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)" }}
        >
          <p className="text-xs text-pg-mist whitespace-nowrap" style={{ fontFamily: "ABC Repro Mono, monospace" }}>
            {tooltip.text}
          </p>
        </div>
      )}
    </div>
  );
}
