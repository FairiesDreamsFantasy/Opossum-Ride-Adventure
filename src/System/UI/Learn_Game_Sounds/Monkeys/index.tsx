/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MONKEY_PLAYABLE_SOUNDS, MonkeyPlayableSound } from "./General";
import { SoundService } from "../../../Sound";
export * from "./General";

export const MonkeysSoundsView: React.FC = () => {
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);

  const handlePlayMonkeySound = (sound: MonkeyPlayableSound) => {
    setActiveSoundId(sound.id);
    try {
      if (sound.actionType === "jump") {
        SoundService.playMonkeyJump(1 + sound.pitchOffset, 1.0);
      } else if (sound.actionType === "screech") {
        SoundService.playMonkeyModularVocal("screech", 1 + sound.pitchOffset);
      } else if (sound.actionType === "pant_hoot") {
        SoundService.playMonkeyModularVocal("pant_hoot", 1 + sound.pitchOffset);
      } else if (sound.actionType === "alarm") {
        SoundService.playMonkeyModularVocal("alarm", 1 + sound.pitchOffset);
      } else if (sound.actionType === "coo") {
        SoundService.playMonkeyModularVocal("coo", 1 + sound.pitchOffset);
      } else {
        SoundService.playMonkeyChatter(sound.pitchOffset);
      }
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
    setTimeout(() => {
      setActiveSoundId((prev) => (prev === sound.id ? null : prev));
    }, 600);
  };

  return (
    <div
      id="Learn_Game_Sounds_Monkeys_Panel"
      role="tabpanel"
      aria-labelledby="tab-btn-monkeys"
      tabIndex={0}
      className="space-y-6 focus:outline-none"
    >
      <div className="bg-zinc-900/90 border border-amber-400/40 rounded-xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-400/30 pb-3 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-300 tracking-wide flex items-center gap-2">
            <span>🐒</span> Monkey Vocalization, Jump & Chatter Synthesizers
          </h2>
          <span className="text-xs font-mono px-2.5 py-1 bg-amber-400/20 text-amber-200 border border-amber-400/40 rounded-full w-fit">
            {MONKEY_PLAYABLE_SOUNDS.length} Synthesized Sounds Available
          </span>
        </div>

        <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
          Monkeys in Opossum Ride Adventure feature procedurally generated vocal fold sweeps, FM frequency cross-modulation, custom branch-rebound jump acoustics, and resonant canopy chatter synthesizers. Activate any button below to trigger the real-time Web Audio API sound generator.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MONKEY_PLAYABLE_SOUNDS.map((sound) => {
            const isPlaying = activeSoundId === sound.id;
            return (
              <div
                key={sound.id}
                className="bg-zinc-950/80 border-2 border-zinc-700/80 hover:border-amber-400/80 rounded-lg p-4 flex flex-col justify-between transition-all duration-200 shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                      {sound.vocalType}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {sound.gender} ({sound.pitchOffset >= 0 ? `+${Math.round(sound.pitchOffset * 100)}%` : `${Math.round(sound.pitchOffset * 100)}%`})
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-zinc-100 group-hover:text-amber-200 transition-colors">
                    {sound.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-normal">
                    {sound.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80">
                  <button
                    id={`btn-play-monkey-${sound.id}`}
                    type="button"
                    onClick={() => handlePlayMonkeySound(sound)}
                    aria-label={`Play sound: ${sound.name}`}
                    className={`w-full py-2.5 px-4 rounded-md font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                      isPlaying
                        ? "bg-amber-400 text-zinc-950 scale-[0.98] shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                        : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 hover:border-amber-400"
                    }`}
                  >
                    <span>{isPlaying ? "🔊 Playing..." : "▶ Hear Monkey Sound"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonkeysSoundsView;
