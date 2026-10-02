import React from "react";
import { OpossumId } from "../../../../../types";
import { OPOSSUM_CHARACTERS } from "../../../../../Characters/Opossums";
import { OPOSSUM_PALETTES } from "../../General";

interface OpossumSelectionCraftedProps {
  selectedId: OpossumId;
  onSelect: (id: OpossumId) => void;
  characters?: typeof OPOSSUM_CHARACTERS;
}

export const OpossumSelectionCrafted: React.FC<OpossumSelectionCraftedProps> = ({ 
  selectedId, 
  onSelect,
  characters = OPOSSUM_CHARACTERS
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-8 gap-4" id="Opossum_Selection_Grid">
      {characters.map((v) => {
        const palette = v.gender === "Female" ? OPOSSUM_PALETTES.JILL : OPOSSUM_PALETTES.JACK;
        const isActive = selectedId === v.id;
        
        return (
          <button
            key={v.id}
            onClick={() => onSelect(v.id as OpossumId)}
            className={`cursor-pointer border p-4 rounded text-left transition duration-150 flex flex-col ${
              isActive
                ? `bg-${palette.primary}/10 border-${palette.primary} text-${palette.text} shadow-[0_0_12px_${palette.shadow}]`
                : `bg-zinc-950 border-${palette.border}/40 text-${palette.text}/60 hover:border-${palette.primary}/60 hover:text-${palette.text}`
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-lg">{v.name}</span>
              <span className={`text-[10px] font-mono bg-${palette.border}/60 px-1.5 py-0.5 rounded text-${palette.text}`}>
                {v.gender}
              </span>
            </div>
            <span className="text-xs font-mono opacity-80">
              {v.width} W × {v.length} L
            </span>
            <span className="text-xs mt-1 italic block truncate">
              {v.color} Fur, {v.eyeColor} Eyes
            </span>
          </button>
        );
      })}
    </div>
  );
};
