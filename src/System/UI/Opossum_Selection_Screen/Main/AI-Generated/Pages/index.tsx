import React from "react";
import { AIOpossum } from "../../../General/AI_State";
import { OPOSSUM_UI_CONSTANTS, OPOSSUM_PALETTES } from "../../../General";

interface AIGeneratedPagesProps {
  opossums: AIOpossum[];
  loading: boolean;
  isPaid: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const AIGeneratedPages: React.FC<AIGeneratedPagesProps> = ({ 
  opossums, 
  loading, 
  isPaid, 
  selectedId,
  onSelect 
}) => {
  const totalSlots = OPOSSUM_UI_CONSTANTS.AI_GRID_ROWS * OPOSSUM_UI_CONSTANTS.AI_GRID_COLS;
  const gridItems = Array.from({ length: totalSlots }, (_, i) => i);

  // Filter opossums for the current view
  const displayOpossums = opossums;

  return (
    <div className="grid grid-cols-8 gap-2 py-2">
      {gridItems.map((slotIndex) => {
        const row = Math.floor(slotIndex / 8);
        const col = slotIndex % 8;
        
        let opossum: AIOpossum | undefined;
        let expectedSex: "Jill" | "Jack" = "Jill";

        // Logic for Page 1 seeding vs Dynamic Generation
        if (slotIndex < displayOpossums.length) {
          opossum = displayOpossums[slotIndex];
          expectedSex = opossum.sex;
        }

        const palette = expectedSex === "Jill" ? OPOSSUM_PALETTES.JILL : OPOSSUM_PALETTES.JACK;
        const isActive = opossum?.id === selectedId;
        const isCloud = opossum?.vocalSource === "Cloud Network Synthesis";

        return (
          <button 
            key={slotIndex} 
            onClick={() => opossum && onSelect(opossum.id)}
            disabled={!opossum}
            className={`aspect-square bg-black border rounded flex flex-col items-center justify-center transition-all relative
              ${opossum 
                ? `border-${palette.border} hover:border-${palette.primary} cursor-pointer` 
                : "border-green-900/20 cursor-default"
              }
              ${isActive ? `ring-2 ring-${palette.primary} border-${palette.primary} scale-105 z-10 shadow-[0_0_15px_${palette.shadow}]` : ""}
              ${loading && slotIndex === opossums.length ? "animate-pulse border-amber-500" : ""}
            `}
            title={opossum ? `${opossum.sex}: ${opossum.name} (${opossum.vocalSource})` : `Empty Slot ${slotIndex + 1}`}
            aria-pressed={isActive}
          >
            {opossum ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-1 relative overflow-hidden">
                 <div className={`absolute top-0 right-0 w-2 h-2 rounded-bl-sm ${expectedSex === "Jill" ? "bg-green-500" : "bg-blue-500"}`}></div>
                 
                 {/* Cloud Indicator */}
                 {isCloud && (
                   <div className="absolute top-0 left-0 p-0.5" title="Cloud Synthesis Active">
                     <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
                   </div>
                 )}

                 <span className={`text-${palette.text} text-[7px] font-bold uppercase truncate w-full text-center`}>{opossum.name}</span>
                 <span className="text-[6px] text-zinc-500 mt-1">
                   {expectedSex === "Jill" ? "CHTR" : "GRNT"}
                   {isCloud && " (C)"}
                 </span>
              </div>
            ) : (
              <span className="text-green-900/10 text-[8px] font-mono">{slotIndex + 1}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
