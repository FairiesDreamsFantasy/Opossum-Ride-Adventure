/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { COMPACT_OPOSSUMS_REGISTRY, CompactOpossumDefinition } from "../../../../Registry/Characters/Opossums/Compact";
import { playCompactOpossumSound } from "../../../../Sound/SFX/Category/Opossum/Compact";

interface CompactOpossumSelectionProps {
  selectedOpossumId?: string;
  onSelectCompactOpossum: (opossum: CompactOpossumDefinition) => void;
}

export const CompactOpossumSelection: React.FC<CompactOpossumSelectionProps> = ({
  selectedOpossumId,
  onSelectCompactOpossum
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredList = COMPACT_OPOSSUMS_REGISTRY.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === "all") return true;
    if (activeFilter === "black_ears") return item.outerEarColor === "#1A1A1A" || item.outerEarColor.startsWith("#1");
    if (activeFilter === "cream_ears") return item.outerEarColor === "#FFFDD0" || item.outerEarColor.startsWith("#F");
    if (activeFilter === "orange_ears") return item.outerEarColor.includes("F") || item.name.includes("Orange");
    return true;
  });

  const handleSelect = (opossum: CompactOpossumDefinition) => {
    playCompactOpossumSound("snuffle");
    onSelectCompactOpossum(opossum);
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 bg-stone-900/80 border border-stone-700 rounded-xl backdrop-blur-sm">
        <div>
          <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <span>Compact Opossums (64 Colors)</span>
            <span className="text-xs bg-amber-950/80 text-amber-200 border border-amber-600/50 px-2 py-0.5 rounded-full">
              3'0" Jill Bareback Steeds
            </span>
          </h3>
          <p className="text-xs text-stone-300">
            Perched-forward aerodynamic posture & high-cadence strides. Tailored for short riders (Sean White & George Blake).
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search colors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 text-sm bg-stone-950 border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:border-amber-400 w-full md:w-48"
          />
          <div className="flex items-center space-x-1 bg-stone-950 p-1 border border-stone-700 rounded-lg text-xs">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-2.5 py-1 rounded transition-colors ${activeFilter === "all" ? "bg-amber-600 text-white font-medium" : "text-stone-300 hover:text-white"}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("black_ears")}
              className={`px-2.5 py-1 rounded transition-colors ${activeFilter === "black_ears" ? "bg-amber-600 text-white font-medium" : "text-stone-300 hover:text-white"}`}
            >
              Black Ears
            </button>
            <button
              onClick={() => setActiveFilter("cream_ears")}
              className={`px-2.5 py-1 rounded transition-colors ${activeFilter === "cream_ears" ? "bg-amber-600 text-white font-medium" : "text-stone-300 hover:text-white"}`}
            >
              Cream Ears
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 64 Compact Opossums */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[58vh] overflow-y-auto pr-1">
        {filteredList.map((op) => {
          const isSelected = selectedOpossumId === op.id;
          return (
            <button
              key={op.id}
              onClick={() => handleSelect(op)}
              className={`group relative p-3 rounded-xl border flex flex-col items-center justify-between text-center transition-all cursor-pointer ${
                isSelected
                  ? "bg-amber-950/60 border-amber-400 ring-2 ring-amber-400/50 shadow-lg shadow-amber-950/50 scale-[1.02]"
                  : "bg-stone-900/70 border-stone-800 hover:border-stone-600 hover:bg-stone-800/80"
              }`}
            >
              {/* Steed Visual Avatar Preview */}
              <div className="relative w-14 h-14 rounded-full flex items-center justify-center mb-2 shadow-inner border border-stone-700/80 overflow-hidden"
                style={{ backgroundColor: op.bodyFurColor }}
              >
                {/* Outer Ears Visual representation */}
                <div
                  className="absolute -top-1 -left-1 w-5 h-5 rounded-full border border-black/30 shadow-sm"
                  style={{ backgroundColor: op.outerEarColor }}
                />
                <div
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full border border-black/30 shadow-sm"
                  style={{ backgroundColor: op.outerEarColor }}
                />
                {/* Perched Forward Snout Silhouette */}
                <div
                  className="w-4 h-4 rounded-full border border-pink-400/40 shadow-sm mt-4"
                  style={{ backgroundColor: op.noseColor }}
                />
              </div>

              <div className="w-full">
                <span className="block text-xs font-semibold text-stone-100 truncate w-full" title={op.name}>
                  {op.name}
                </span>
                <span className="block text-[10px] text-amber-300/80 font-mono mt-0.5">
                  Jill • 3'0"
                </span>
              </div>

              {isSelected && (
                <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
