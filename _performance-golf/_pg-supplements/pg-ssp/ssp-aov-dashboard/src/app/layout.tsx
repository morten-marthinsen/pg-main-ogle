import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwingSmooth Pro — AOV Intelligence Dashboard",
  description: "Performance Golf funnel analytics and AOV benchmarks for SwingSmooth Pro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen grid-bg">
        {children}
      </body>
    </html>
  );
}
