/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface TabletPortraitTheme {
  bezelBg: string;
  bezelBorder: string;
  leafColor: string;
  leafAccent: string;
  deckBg: string;
  deckBorder: string;
  buttonDpadBg: string;
  buttonDpadBorder: string;
  buttonDpadText: string;
  buttonActionBg: string;
  buttonActionBorder: string;
  buttonActionText: string;
  buttonCenterBg: string;
  buttonCenterBorder: string;
  buttonCenterText: string;
}

export const TABLET_PORTRAIT_THEME: TabletPortraitTheme = {
  bezelBg: "bg-stone-950",
  bezelBorder: "border-emerald-800/80",
  leafColor: "#059669",
  leafAccent: "#10b981",
  deckBg: "bg-stone-900/95",
  deckBorder: "border-stone-800",
  buttonDpadBg: "bg-emerald-950/90",
  buttonDpadBorder: "border-emerald-700/80",
  buttonDpadText: "text-emerald-300",
  buttonActionBg: "bg-amber-950/90",
  buttonActionBorder: "border-amber-700/80",
  buttonActionText: "text-amber-300",
  buttonCenterBg: "bg-zinc-900/90",
  buttonCenterBorder: "border-zinc-700/80",
  buttonCenterText: "text-zinc-200"
};

/**
 * Botanical Leaf SVG decorative ornament for tablet bezel framing.
 */
export const LeafBezelOrnament: React.FC<{ side: "left" | "right"; className?: string }> = ({ side, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-around h-full py-4 opacity-75 select-none pointer-events-none ${className}`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <svg
          key={i}
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={i % 2 === 0 ? "#10b981" : "#059669"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transform transition-transform ${side === "right" ? "scale-x-[-1]" : ""} ${
            i % 2 === 0 ? "rotate-12" : "-rotate-12"
          }`}
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      ))}
    </div>
  );
};
