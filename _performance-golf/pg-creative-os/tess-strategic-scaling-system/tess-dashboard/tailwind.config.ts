import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Tremor — include both symlink and .nosync paths
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    "./node_modules.nosync/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  // Safelist Tremor chart color classes that get generated at runtime
  safelist: [
    // Orange (primary chart color)
    { pattern: /^(bg|fill|stroke|text|border)-orange-(50|100|200|300|400|500|600|700|800|900)$/ },
    // Amber
    { pattern: /^(bg|fill|stroke|text|border)-amber-(50|100|200|300|400|500|600|700|800|900)$/ },
    // Rose
    { pattern: /^(bg|fill|stroke|text|border)-rose-(50|100|200|300|400|500|600|700|800|900)$/ },
    // Stone
    { pattern: /^(bg|fill|stroke|text|border)-stone-(50|100|200|300|400|500|600|700|800|900)$/ },
    // Emerald
    { pattern: /^(bg|fill|stroke|text|border)-emerald-(50|100|200|300|400|500|600|700|800|900)$/ },
    // Slate
    { pattern: /^(bg|fill|stroke|text|border)-slate-(50|100|200|300|400|500|600|700|800|900)$/ },
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        border: "var(--border)",
        "border-light": "var(--border-light)",
        // Override Tailwind's orange palette → PG Orange
        // Tremor uses fill-orange-500, bg-orange-500 etc. from this
        orange: {
          50: "#FFF5F2",
          100: "#FFE6DE",
          200: "#FFBFAD",
          300: "#FF8F73",
          400: "#FD5533",
          500: "#FD3300",  // PG Orange — Tremor's default pick
          600: "#DB2C00",  // PG Dark Orange
          700: "#B32400",
          800: "#8A1C00",
          900: "#611400",
          950: "#3D0C00",
        },
        // Override amber → PG Hi-Vis for Potential classification
        amber: {
          50: "#FDFDE8",
          100: "#FAFBC5",
          200: "#F5F88E",
          300: "#EDF44D",
          400: "#E4F222",  // PG Hi-Vis
          500: "#E4F222",
          600: "#B5C11B",
          700: "#879114",
          800: "#5A610E",
          900: "#2D3007",
          950: "#161808",
        },
        // Override rose → PG Stone for Underperformers
        rose: {
          50: "#FAF9F8",
          100: "#ECEAE8",
          200: "#DFD9D5",
          300: "#CCC4BE",
          400: "#B3AAA3",  // PG Stone
          500: "#B3AAA3",
          600: "#8F8880",
          700: "#6B665F",
          800: "#48443F",
          900: "#242220",
          950: "#121110",
        },
        pg: {
          orange: "#FD3300",
          "dark-orange": "#DB2C00",
          black: "#1D1A1A",
          "ui-gray": "#7B726C",
          stone: "#B3AAA3",
          pebble: "#DFD9D5",
          sand: "#ECE9E4",
          fog: "#F4F2F0",
          mist: "#FCFAFA",
          "hi-vis": "#E4F222",
          grass: "#BCE9B1",
          forest: "#2E4734",
          sky: "#B2C6EB",
          indigo: "#4F41D5",
        },
      },
      fontFamily: {
        heading: ["Repro", "DM Sans", "system-ui", "sans-serif"],
        display: ["GT Super Text", "Georgia", "serif"],
        mono: ["Repro Mono", "DM Mono", "Courier New", "monospace"],
      },
      borderRadius: {
        sm: "2px",
        base: "4px",
        md: "8px",
        lg: "12px",
        xl: "12px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(29, 26, 26, 0.05)",
        base: "0 1px 3px 0 rgba(29, 26, 26, 0.1)",
        orange: "0 4px 14px 0 rgba(253, 51, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
