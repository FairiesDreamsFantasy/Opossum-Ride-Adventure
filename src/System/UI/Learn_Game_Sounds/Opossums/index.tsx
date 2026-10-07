/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SURFACE_TROT_BUTTONS, SurfaceTrotButtonItem } from "./Conventional/General";
import { SoundService } from "../../../Sound";
export * from "./General";

export const OpossumsSoundsView: React.FC = () => {
  const [activeBtnId, setActiveBtnId] = useState<string | null>(null);

  const handlePlaySurfaceTrot = (btn: SurfaceTrotButtonItem) => {
    setActiveBtnId(btn.id);
    try {
      SoundService.playFootstep(btn.surfaceKey);
    } catch (e) {
      console.warn("Error playing surface trot:", e);
    }
    setTimeout(() => {
      setActiveBtnId((prev) => (prev === btn.id ? null : prev));
    }, 500);
  };

  const handlePlayJump = () => {
    setActiveBtnId("opossum_jump");
    try {
      SoundService.playOpossumJump("Jill");
    } catch (e) {
      console.warn("Error playing jump:", e);
    }
    setTimeout(() => {
      setActiveBtnId((prev) => (prev === "opossum_jump" ? null : prev));
    }, 600);
  };

  return (
    <div
      id="Learn_Game_Sounds_Opossums_Panel"
      role="tabpanel"
      aria-labelledby="tab-btn-opossums"
      tabIndex={0}
      className="space-y-6 focus:outline-none"
    >
      <div className="bg-zinc-900/90 border border-amber-400/40 rounded-xl p-4 sm:p-6 shadow-xl backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-400/30 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-300 tracking-wide flex items-center gap-2">
            <span>🐾</span> Opossum Movement & Surface Footstep Synthesizers
          </h2>
          <span className="text-xs font-mono px-2.5 py-1 bg-amber-400/20 text-amber-200 border border-amber-400/40 rounded-full w-fit">
            Movement Surfaces & Jump Mechanics
          </span>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          Test opossum movement and footstep acoustics across diverse indoor and outdoor architectural surfaces (including 30cm × 30cm ceramic tea room tiles, polished marble, hardwood, porch decking, and garden gravel), along with dynamic jump acoustics.
        </p>

        {/* Featured Jump Sound */}
        <div className="bg-gradient-to-r from-amber-950/80 via-zinc-900/90 to-amber-950/80 border-2 border-amber-400 rounded-xl p-4 shadow-[0_0_15px_rgba(251,191,36,0.2)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
              Acrobatic Lift
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              Opossum Parabolic Jump Sweep
            </h3>
            <p className="text-xs text-zinc-300">
              Synthesizes an upward frequency swoop and atmospheric displacement during jump maneuvers.
            </p>
          </div>
          <button
            id="btn-play-opossum-jump"
            type="button"
            onClick={handlePlayJump}
            aria-label="Play opossum parabolic jump sweep sound"
            className={`cursor-pointer px-6 py-2.5 rounded-lg font-bold text-sm tracking-wide uppercase transition-all duration-200 min-h-[44px] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
              activeBtnId === "opossum_jump"
                ? "bg-amber-300 text-zinc-950 scale-[0.98] shadow-[0_0_20px_rgba(251,191,36,0.8)]"
                : "bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
            }`}
          >
            <span>{activeBtnId === "opossum_jump" ? "🦘 Jumping... (Playing)" : "🦘 Hear Opossum Jump"}</span>
          </button>
        </div>

        {/* Surface Trotting Sub-Grid */}
        <div>
          <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>👣</span> Movement Across Surfaces ({SURFACE_TROT_BUTTONS.length} Architectural Materials)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SURFACE_TROT_BUTTONS.map((item) => {
              const isPlaying = activeBtnId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-zinc-950/80 border-2 border-zinc-700/80 hover:border-amber-400/80 rounded-lg p-3.5 flex flex-col justify-between transition-all duration-200 shadow-md group"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                      Surface: {item.surfaceKey}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-zinc-100 mt-1.5 group-hover:text-amber-200 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-normal">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-zinc-800">
                    <button
                      id={`btn-trot-${item.id}`}
                      type="button"
                      onClick={() => handlePlaySurfaceTrot(item)}
                      aria-label={item.ariaLabel}
                      className={`w-full py-2 px-3 rounded font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                        isPlaying
                          ? "bg-amber-400 text-zinc-950 scale-[0.98] shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                          : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 hover:border-amber-400"
                      }`}
                    >
                      <span>{isPlaying ? "🔊 Trotting..." : "🐾 Hear Trot Step"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpossumsSoundsView;

