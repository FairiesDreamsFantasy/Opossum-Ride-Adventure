/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SURFACE_TROT_BUTTONS, JACK_VOCAL_BUTTONS, SurfaceTrotButtonItem, JackVocalButtonItem } from "./General";
import { SoundService } from "../../../../Sound";
export * from "./General";

export const ConventionalOpossumsSoundSection: React.FC = () => {
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

  const handlePlayJackVocal = (btn: JackVocalButtonItem) => {
    setActiveBtnId(btn.id);
    try {
      if (btn.id === "jack_grunt") {
        SoundService.playOpossumGrunt();
      } else if (btn.id === "jack_jump") {
        SoundService.playOpossumJump();
      } else if (btn.id === "retro_arcade_chatter") {
        SoundService.playRetroArcadeChatter();
      } else {
        SoundService.playOpossumGrunt();
      }
    } catch (e) {
      console.warn("Error playing vocal sound:", e);
    }
    setTimeout(() => {
      setActiveBtnId((prev) => (prev === btn.id ? null : prev));
    }, 600);
  };

  return (
    <section aria-labelledby="conventional-opossums-heading" className="space-y-4 pt-4 border-t border-zinc-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-400/40 pb-2">
        <h3 id="conventional-opossums-heading" className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
          <span>🐾</span> Conventional Section: Terrain Surface Trots & Jack Opossum Vocals
        </h3>
        <span className="text-xs font-mono px-2.5 py-0.5 bg-amber-400/20 text-amber-200 border border-amber-400/40 rounded-full w-fit">
          11 Interactive Sound Triggers
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
        Test trotting steps across diverse indoor and outdoor architectural surfaces (including 30cmx30cm ceramic tea room tiles, polished marble, hardwood, and gravel), plus jack opossum grunt synthesizers.
      </p>

      {/* Surface Trotting Sub-Grid */}
      <div>
        <h4 className="text-sm font-bold text-amber-200 uppercase tracking-wider mb-2 flex items-center gap-2">
          <span>👣</span> Surface Trotting Footsteps (8 Materials)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SURFACE_TROT_BUTTONS.map((item) => {
            const isPlaying = activeBtnId === item.id;
            return (
              <div
                key={item.id}
                className="bg-zinc-950/80 border-2 border-zinc-700/80 hover:border-amber-400/80 rounded-lg p-3 flex flex-col justify-between transition-all duration-200 shadow-md group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                    Surface: {item.surfaceKey}
                  </span>
                  <h5 className="font-bold text-xs sm:text-sm text-zinc-100 mt-1.5 group-hover:text-amber-200 transition-colors">
                    {item.name}
                  </h5>
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

      {/* Jack Vocals Sub-Grid */}
      <div className="pt-3">
        <h4 className="text-sm font-bold text-amber-200 uppercase tracking-wider mb-2 flex items-center gap-2">
          <span>🦘</span> Jack Opossum Vocals & Jumps
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {JACK_VOCAL_BUTTONS.map((item) => {
            const isPlaying = activeBtnId === item.id;
            return (
              <div
                key={item.id}
                className="bg-zinc-950/80 border-2 border-zinc-700/80 hover:border-amber-400/80 rounded-lg p-3.5 flex flex-col justify-between transition-all duration-200 shadow-md group"
              >
                <div>
                  <h5 className="font-bold text-sm text-zinc-100 group-hover:text-amber-200 transition-colors">
                    {item.name}
                  </h5>
                  <p className="text-xs text-zinc-400 mt-1 leading-normal">
                    {item.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800">
                  <button
                    id={`btn-jack-${item.id}`}
                    type="button"
                    onClick={() => handlePlayJackVocal(item)}
                    aria-label={item.ariaLabel}
                    className={`w-full py-2 px-3 rounded font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                      isPlaying
                        ? "bg-amber-400 text-zinc-950 scale-[0.98] shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                        : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 hover:border-amber-400"
                    }`}
                  >
                    <span>{isPlaying ? "🔊 Playing..." : "▶ Hear Sound"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConventionalOpossumsSoundSection;
