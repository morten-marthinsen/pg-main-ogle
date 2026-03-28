"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Executive Summary" },
  { href: "/assets", label: "Asset Explorer" },
  { href: "/performance", label: "Performance" },
  { href: "/strategy", label: "Creative Strategy" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-surface border-r border-border flex flex-col">
      <div className="px-5 py-5 border-b border-border flex items-center gap-3">
        <Image
          src="/PER-Symbol-Orange.svg"
          alt="Performance Golf"
          width={28}
          height={28}
        />
        <div>
          <h1 className="text-base font-bold tracking-tight text-pg-mist">TESS</h1>
          <p className="text-[10px] text-pg-stone uppercase tracking-widest">Strategic Scaling</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                active
                  ? "bg-pg-orange/15 text-pg-orange font-medium border-l-2 border-pg-orange"
                  : "text-pg-stone hover:text-pg-mist hover:bg-border/50"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-border">
        <p className="text-[10px] text-pg-ui-gray uppercase tracking-widest">Live from Domo</p>
      </div>
    </aside>
  );
}
