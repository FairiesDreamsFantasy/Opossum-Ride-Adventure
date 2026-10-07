/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { WIND_CHIMES_OBJECT_METADATA, CHIME_TUBE_COLORS } from "./General";

interface WindChimesProps {
  className?: string;
}

export const WindChimes: React.FC<WindChimesProps> = ({ className = "" }) => {
  return (
    <div
      id="Wind_Chimes_Item_Component"
      className={`relative flex flex-col items-center  p-4 rounded bg-zinc-950/40 border border-zinc-800/60 max-w-[120px] ${className}`}
      title={WIND_CHIMES_OBJECT_METADATA.name}
    >
      {/* Wooden support plate */}
      <div className="w-10 h-2 bg-amber-800 rounded shadow-md" />
      
      {/* Hanging string */}
      <div className="w-[1.5px] h-4 bg-zinc-600" />

      {/* Main chime hanger */}
      <div className="w-8 h-1 bg-amber-700 rounded-full" />

      {/* Hanging tubes */}
      <div className="flex justify-center items-start gap-1 h-20 px-1 mt-1">
        {CHIME_TUBE_COLORS.map((color, i) => {
          const hClass = [ "h-10", "h-12", "h-14", "h-11", "h-8" ][i];
          return (
            <div
              key={i}
              className={`w-1 rounded-b shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${hClass}`}
              style={{
                backgroundColor: color,
                transform: "rotate(0deg)",
                transformOrigin: "top center"
              }}
            />
          );
        })}
      </div>

      {/* Pendulum / Clapper */}
      <div className="absolute top-[48px] w-2.5 h-2.5 bg-amber-500 rounded-full shadow" />
      <div className="absolute top-[58px] w-[1px] h-14 bg-zinc-500" />
      <div className="absolute top-[72px] w-4 h-4 bg-amber-600 rotate-45 rounded-sm shadow-md" />

      <span className="text-[9px] text-zinc-400 font-mono font-bold mt-8 text-center uppercase tracking-wider">
        Chimes
      </span>
    </div>
  );
};
