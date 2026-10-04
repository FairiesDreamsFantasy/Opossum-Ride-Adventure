/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import { AIOpossum } from "../../../General/AI_State";
import { OPOSSUM_PALETTES } from "../../../General";

interface AIGeneratedPagesProps {
  opossums: AIOpossum[];
  loading: boolean;
  isPaid: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNavigateToPrompt?: () => void;
}

export const AIGeneratedPages: React.FC<AIGeneratedPagesProps> = ({ 
  opossums, 
  loading, 
  isPaid, 
  selectedId, 
  onSelect,
  onNavigateToPrompt
}) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-green-950 pb-1">
        <span>DYNAMIC CATALOG ({opossums.length} Synthesized)</span>
        {onNavigateToPrompt && (
          <button
            onClick={onNavigateToPrompt}
            className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>+ Generate New</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-green-900">
        {opossums.map((op) => {
          const isJill = op.sex === "Jill";
          const palette = isJill ? OPOSSUM_PALETTES.JILL : OPOSSUM_PALETTES.JACK;
          const isActive = op.id === selectedId;
          const isCloud = op.vocalSource === "Cloud Network Synthesis";

          return (
            <button
              key={op.id}
              onClick={() => onSelect(op.id)}
              className={`aspect-square bg-black border rounded p-1.5 flex flex-col items-center justify-between transition-all relative cursor-pointer
                ${isJill ? "border-green-800 hover:border-green-400" : "border-blue-800 hover:border-blue-400"}
                ${isActive ? (isJill ? "ring-2 ring-green-400 border-green-400 scale-105 z-10 shadow-[0_0_12px_rgba(34,197,94,0.3)]" : "ring-2 ring-blue-400 border-blue-400 scale-105 z-10 shadow-[0_0_12px_rgba(59,130,246,0.3)]") : ""}
              `}
              title={`${op.sex}: ${op.name} (${op.vocalSource})`}
              aria-pressed={isActive}
            >
              <div className="w-full flex items-center justify-between">
                <span className={`text-[7px] font-mono px-1 py-0.2 rounded ${isJill ? "bg-green-950 text-green-300 border border-green-800" : "bg-blue-950 text-blue-300 border border-blue-800"}`}>
                  {op.sex}
                </span>
                {isCloud ? (
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" title="Cloud Synthesis" />
                ) : (
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" title="Offline Synth" />
                )}
              </div>

              <div className="my-auto text-center w-full">
                <p className={`text-[9px] font-bold uppercase truncate w-full ${isJill ? "text-green-300" : "text-blue-300"}`}>
                  {op.name}
                </p>
                <p className="text-[7px] text-zinc-500 font-mono truncate">{op.color}</p>
              </div>

              <div className="w-full flex justify-between items-center text-[7px] font-mono text-zinc-600">
                <span>{(op.size * 100).toFixed(0)}%</span>
                <span>{op.rides}R</span>
              </div>
            </button>
          );
        })}

        {loading && (
          <div className="aspect-square bg-zinc-950 border border-amber-500 rounded p-1.5 flex flex-col items-center justify-center animate-pulse">
            <span className="text-[8px] font-mono text-amber-400 uppercase text-center font-bold">Synthesizing...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGeneratedPages;
