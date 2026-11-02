/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CRAFTED_OPOSSUM_SOUND_BUTTONS, CraftedOpossumSoundButtonConfig } from "./General";
import { OPOSSUM_CHARACTERS } from "../../../../../Characters/Opossums";
import { SoundService } from "../../../../Sound";
export * from "./General";

export const CraftedOpossumsSoundSection: React.FC = () => {
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

  const handlePlayChatter = (cfg: CraftedOpossumSoundButtonConfig) => {
    const btnKey = `chatter-${cfg.id}`;
    setActiveButtonId(btnKey);
    const matchedChar = OPOSSUM_CHARACTERS.find((c) => c.id === cfg.id);
    try {
      if (matchedChar && matchedChar.playChatter) {
        SoundService.playOpossumChatter(matchedChar);
      } else {
        SoundService.playOpossumChatter();
      }
    } catch (e) {
      console.warn("Error playing opossum chatter:", e);
    }
    setTimeout(() => {
      setActiveButtonId((prev) => (prev === btnKey ? null : prev));
    }, 700);
  };

  const handlePlayJump = (cfg: CraftedOpossumSoundButtonConfig) => {
    const btnKey = `jump-${cfg.id}`;
    setActiveButtonId(btnKey);
    try {
      SoundService.playOpossumJump();
    } catch (e) {
      console.warn("Error playing jump:", e);
    }
    setTimeout(() => {
      setActiveButtonId((prev) => (prev === btnKey ? null : prev));
    }, 600);
  };

  return (
    <section aria-labelledby="crafted-opossums-heading" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-400/40 pb-2">
        <h3 id="crafted-opossums-heading" className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
          <span>👑</span> Crafted Section: The 16 Handcrafted Jill Opossums
        </h3>
        <span className="text-xs font-mono px-2.5 py-0.5 bg-amber-400/20 text-amber-200 border border-amber-400/40 rounded-full w-fit">
          16 Sacred Characters Verified
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
        Each handcrafted jill opossum features an authentic local Web Audio API frequency-sweep vocal chatter synthesizer generated purely client-side without any cloud dependency, accompanied by fluid parabolic jump sweeps.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {CRAFTED_OPOSSUM_SOUND_BUTTONS.map((item) => {
          const isChatterPlaying = activeButtonId === `chatter-${item.id}`;
          const isJumpPlaying = activeButtonId === `jump-${item.id}`;

          return (
            <div
              key={item.id}
              className="bg-zinc-950/90 border-2 border-zinc-700 hover:border-amber-400/90 rounded-lg p-3 flex flex-col justify-between transition-all duration-200 shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                    {item.role.split("&")[0]}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-zinc-100 group-hover:text-amber-200 transition-colors">
                  {item.name}
                </h4>
                <div className="text-[11px] text-zinc-400 mt-1 space-y-0.5">
                  <p><span className="text-zinc-500">Fur:</span> {item.furColor}</p>
                  <p><span className="text-zinc-500">Face:</span> {item.skinTone}</p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-800 space-y-1.5">
                <button
                  id={`btn-chatter-${item.id}`}
                  type="button"
                  onClick={() => handlePlayChatter(item)}
                  aria-label={item.chatterAriaLabel}
                  className={`w-full py-2 px-3 rounded font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                    isChatterPlaying
                      ? "bg-amber-400 text-zinc-950 scale-[0.98] shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                      : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 hover:border-amber-400"
                  }`}
                >
                  <span>{isChatterPlaying ? "🔊 Playing Chatter..." : "🎵 Hear Vocal Chatter"}</span>
                </button>

                <button
                  id={`btn-jump-${item.id}`}
                  type="button"
                  onClick={() => handlePlayJump(item)}
                  aria-label={item.jumpAriaLabel}
                  className={`w-full py-1.5 px-3 rounded font-medium text-xs tracking-wide transition-all duration-200 cursor-pointer min-h-[38px] flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                    isJumpPlaying
                      ? "bg-amber-300 text-zinc-950 scale-[0.98]"
                      : "bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700"
                  }`}
                >
                  <span>{isJumpPlaying ? "🦘 Jumping..." : "🦘 Parabolic Jump"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CraftedOpossumsSoundSection;
