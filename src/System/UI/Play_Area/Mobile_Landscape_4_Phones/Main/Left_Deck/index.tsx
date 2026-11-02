/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { NIGHT_SKY_AMBER_SPECS } from "../../General";

export interface LandscapeLeftDeckProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveUpStart?: () => void;
  onMoveUpEnd?: () => void;
  onMoveDownStart?: () => void;
  onMoveDownEnd?: () => void;
}

export const LandscapeLeftDeck: React.FC<LandscapeLeftDeckProps> = ({
  onMoveLeft,
  onMoveRight,
  onMoveUpStart,
  onMoveUpEnd,
  onMoveDownStart,
  onMoveDownEnd
}) => {
  return (
    <div
      id="Mobile_Landscape_Left_Deck"
      className="flex flex-col items-center justify-center p-2 "
    >
      <div className="text-[9px] font-mono text-amber-500/80 font-bold uppercase tracking-wider mb-2">
        D-Pad
      </div>
      <div className="grid grid-cols-3 gap-1.5 w-28 h-28 sm:w-32 sm:h-32">
        <div />
        {/* Up / Accelerate */}
        <button
          id="landscape-dpad-up"
          type="button"
          onTouchStart={(e) => {
            e.preventDefault();
            onMoveUpStart?.();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onMoveUpEnd?.();
          }}
          onMouseDown={() => onMoveUpStart?.()}
          onMouseUp={() => onMoveUpEnd?.()}
          className="bg-stone-900/90 border-2 border-amber-600/80 active:bg-amber-800 text-amber-300 rounded-t flex items-center justify-center min-h-[40px] shadow-md touch-manipulation"
          aria-label="Accelerate"
        >
          <ArrowUp className="w-5 h-5 text-amber-300" />
        </button>
        <div />

        {/* Left / Steer Left */}
        <button
          id="landscape-dpad-left"
          type="button"
          onClick={onMoveLeft}
          className="bg-stone-900/90 border-2 border-amber-600/80 active:bg-amber-800 text-amber-300 rounded-l flex items-center justify-center min-h-[40px] shadow-md touch-manipulation"
          aria-label="Steer left"
        >
          <ArrowLeft className="w-5 h-5 text-amber-300" />
        </button>

        {/* Center Hub */}
        <div className="bg-stone-950 border border-amber-800/40 rounded flex items-center justify-center text-[10px] text-amber-500 font-mono">
          🐾
        </div>

        {/* Right / Steer Right */}
        <button
          id="landscape-dpad-right"
          type="button"
          onClick={onMoveRight}
          className="bg-stone-900/90 border-2 border-amber-600/80 active:bg-amber-800 text-amber-300 rounded-r flex items-center justify-center min-h-[40px] shadow-md touch-manipulation"
          aria-label="Steer right"
        >
          <ArrowRight className="w-5 h-5 text-amber-300" />
        </button>

        <div />
        {/* Down / Brake */}
        <button
          id="landscape-dpad-down"
          type="button"
          onTouchStart={(e) => {
            e.preventDefault();
            onMoveDownStart?.();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onMoveDownEnd?.();
          }}
          onMouseDown={() => onMoveDownStart?.()}
          onMouseUp={() => onMoveDownEnd?.()}
          className="bg-stone-900/90 border-2 border-amber-600/80 active:bg-amber-800 text-amber-300 rounded-b flex items-center justify-center min-h-[40px] shadow-md touch-manipulation"
          aria-label="Brake"
        >
          <ArrowDown className="w-5 h-5 text-amber-300" />
        </button>
        <div />
      </div>
    </div>
  );
};
