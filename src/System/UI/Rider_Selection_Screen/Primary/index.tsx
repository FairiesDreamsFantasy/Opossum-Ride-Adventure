/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { RIDER_CHARACTERS } from "../../../../Characters/Riders";
import { PrimaryRiderSelectionGeneral } from "./General";

export * from "./General";

interface PrimaryRiderSelectionProps {
  selectedRiderId: string;
  onSelect: (id: string) => void;
}

export const PrimaryRiderSelection: React.FC<PrimaryRiderSelectionProps> = ({
  selectedRiderId,
  onSelect,
}) => {
  const riders = RIDER_CHARACTERS.filter(
    (r) => r.category === "primary" || !r.category
  );

  const handleRiderClick = (rider: any) => {
    const id = rider.id || rider.name.toLowerCase();
    onSelect(id);
  };

  // Build the 8x6 (48 slots) checked quilt grid
  const totalSlots = PrimaryRiderSelectionGeneral.gridDimensions.totalSlots;
  const gridCells = Array.from({ length: totalSlots }, (_, index) => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    const isEvenCheck = (row + col) % 2 === 0;
    const rider = riders[index] || null;

    return {
      index,
      row,
      col,
      isEvenCheck,
      rider,
    };
  });

  return (
    <div className="w-full flex justify-center my-4" id="Rider_Selection_Quilt_Container">
      <div
        className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 max-w-6xl w-full p-4 rounded-xl border border-green-900/60 bg-black/80 shadow-[0_0_25px_rgba(0,0,0,0.8)]"
        id="Rider_Selection_8x6_Grid"
      >
        {gridCells.map(({ index, isEvenCheck, rider }) => {
          if (rider) {
            const riderId = rider.id || rider.name.toLowerCase();
            const isActive = selectedRiderId === riderId;
            return (
              <button
                key={riderId}
                onClick={() => handleRiderClick(rider)}
                aria-pressed={isActive}
                className={`cursor-pointer border p-3 rounded-lg text-left transition duration-150 flex flex-col justify-between min-h-[96px] relative overflow-hidden ${
                  isActive
                    ? "bg-green-500/20 border-green-400 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-[1.02]"
                    : isEvenCheck
                    ? "bg-zinc-950/90 border-green-900/50 text-green-400/80 hover:border-green-500/60 hover:text-green-300"
                    : "bg-red-950/20 border-red-900/30 text-green-400/80 hover:border-green-500/60 hover:text-green-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1 w-full">
                  <span className="font-bold text-sm md:text-base truncate">
                    {rider.name}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-green-500/90 truncate">
                  {rider.height}
                </div>
                <div className="text-[10px] text-green-600/80 truncate italic">
                  {rider.heritage || rider.outfit}
                </div>
              </button>
            );
          }

          // Decorative checked quilt tiles for the remaining 8x6 slots
          return (
            <div
              key={`quilt-tile-${index}`}
              aria-hidden="true"
              className={`border p-3 rounded-lg flex items-center justify-center min-h-[96px] transition-opacity  ${
                isEvenCheck
                  ? "bg-zinc-950/40 border-green-950/30 text-green-950/40"
                  : "bg-red-950/10 border-red-950/20 text-red-950/30"
              }`}
            >
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-40">
                ✦
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
