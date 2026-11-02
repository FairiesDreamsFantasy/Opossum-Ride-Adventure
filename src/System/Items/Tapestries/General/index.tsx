/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface TapestrySegment {
  id: string;
  startFeet: number;
  endFeet: number;
  pattern: string;
  colors: string[];
  description: string;
}

export interface ModularTapestryProps {
  startFeet?: number;
  endFeet?: number;
  wallLocation?: string;
  segments?: TapestrySegment[];
  className?: string;
}

export const DEFAULT_MANOR_TAPESTRY_SEGMENTS: TapestrySegment[] = [
  {
    id: "tap_1",
    startFeet: 100,
    endFeet: 200,
    pattern: "Royal Opossum Crest & Forest Vines",
    colors: ["#7e22ce", "#eab308", "#15803d"],
    description: "Woven tapestry depicting the Royal Opossum Crest surrounded by golden forest vines."
  },
  {
    id: "tap_2",
    startFeet: 200,
    endFeet: 300,
    pattern: "Celestial Sky & Emerald Stars",
    colors: ["#3b82f6", "#10b981", "#f59e0b"],
    description: "Detailed textile showing five-pointed emerald stars floating over celestial purple skies."
  },
  {
    id: "tap_3",
    startFeet: 300,
    endFeet: 400,
    pattern: "Fairy-Rider & Opossum Sanctuary",
    colors: ["#ec4899", "#8b5cf6", "#fbbf24"],
    description: "Grand woven tapestry commemorating the unity of Fairy-Riders and Opossums."
  }
];

export const ModularTapestryComponent: React.FC<ModularTapestryProps> = ({
  startFeet = 100,
  endFeet = 400,
  wallLocation = "East Wall (100 to 400 feet markers)",
  segments = DEFAULT_MANOR_TAPESTRY_SEGMENTS,
  className = ""
}) => {
  return (
    <div className={`modular-tapestry-container border-2 border-amber-600/70 bg-purple-950/80 p-4 rounded-lg shadow-xl text-amber-200 ${className}`}>
      <div className="flex items-center justify-between border-b border-amber-500/40 pb-2 mb-3">
        <h3 className="text-sm font-bold tracking-wider uppercase text-amber-300">
          Modular Tapestry Decoration ({startFeet} ft - {endFeet} ft)
        </h3>
        <span className="text-xs bg-purple-900 border border-amber-500/50 px-2 py-0.5 rounded text-amber-100 font-mono">
          {wallLocation}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="bg-black/60 border border-amber-500/30 rounded p-3 flex flex-col justify-between hover:border-amber-400 transition-colors"
          >
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-1">
                <span className="text-amber-400">{segment.pattern}</span>
                <span className="text-amber-500/80 font-mono">
                  {segment.startFeet}-{segment.endFeet} ft
                </span>
              </div>
              <p className="text-xs text-amber-100/80 leading-relaxed mb-3">
                {segment.description}
              </p>
            </div>
            <div className="flex gap-1.5 mt-2">
              {segment.colors.map((c, idx) => (
                <div
                  key={idx}
                  className="h-3 flex-1 rounded-sm border border-amber-300/40"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
