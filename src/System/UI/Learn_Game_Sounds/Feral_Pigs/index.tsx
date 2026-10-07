/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FERAL_PIG_PLAYABLE_SOUNDS, FeralPigPlayableSound } from "./General";
import { SoundService } from "../../../Sound";
import { FeralPigMovementSound } from "../../../Sound/SFX/Category/Feral_Pig/Movements";
export * from "./General";

export const FeralPigsSoundsView: React.FC = () => {
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);

  const handlePlayPigSound = (sound: FeralPigPlayableSound) => {
    setActiveSoundId(sound.id);
    try {
      if (sound.id === "pig_smashed_jump") {
        SoundService.synthesizePigSmashedExplosion("Boar", 0);
      } else if (sound.id === "sow_smashed_pop") {
        SoundService.synthesizePigSmashedExplosion("Sow", 0);
      } else if (sound.id === "boar_guttural_grunt") {
        SoundService.playPigVocal("Boar", 0);
      } else if (sound.id === "boar_sharp_snort") {
        SoundService.playPigVocal("Boar", 0);
      } else if (sound.id === "sow_high_squeal") {
        SoundService.playPigVocal("Sow", 0);
      } else if (sound.id === "feral_pig_trot") {
        SoundService.playPigTrot();
      } else {
        SoundService.playPigVocal("Boar", 0);
      }
    } catch (e) {
      console.warn("Feral pig sound playback warning:", e);
    }
    setTimeout(() => {
      setActiveSoundId((prev) => (prev === sound.id ? null : prev));
    }, 700);
  };

  return (
    <div
      id="Learn_Game_Sounds_Feral_Pigs_Panel"
      role="tabpanel"
      aria-labelledby="tab-btn-feral-pigs"
      tabIndex={0}
      className="space-y-6 focus:outline-none"
    >
      <div className="bg-zinc-900/90 border border-amber-400/40 rounded-xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-400/30 pb-3 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-300 tracking-wide flex items-center gap-2">
            <span>🐗</span> Feral Pigs Acoustic & Combat Impact Synthesizers
          </h2>
          <span className="text-xs font-mono px-2.5 py-1 bg-amber-400/20 text-amber-200 border border-amber-400/40 rounded-full w-fit">
            {FERAL_PIG_PLAYABLE_SOUNDS.length} Synthesized Sounds Available
          </span>
        </div>

        <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
          Feral pigs feature procedural bio-acoustic synthesizers generating deep 88Hz guttural boar grunts, aggressive nasal snorts, high-register sow squeals, rapid hoof trot contacts, and physics collision mechanics including successful jump smashes.
        </p>

        {/* Featured Smash Button Banner */}
        <div className="bg-gradient-to-r from-amber-950/80 via-zinc-900/90 to-amber-950/80 border-2 border-amber-400 rounded-xl p-5 mb-6 shadow-[0_0_20px_rgba(251,191,36,0.25)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                Core Combat Mechanic
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Feral Pig Smashed When Perfect Jump Is Successful
              </h3>
              <p className="text-xs text-zinc-300 max-w-2xl">
                When riding an opossum, landing a clean jump directly atop a feral pig flattens it, awarding bonus points and playing this heavy sub-bass shockwave impact with cartoon squash squeal.
              </p>
            </div>
            <button
              id="btn-pig-smashed-jump-featured"
              type="button"
              onClick={() => handlePlayPigSound(FERAL_PIG_PLAYABLE_SOUNDS[0])}
              aria-label="Feral Pig Smashed When Perfect Jump Is Successful"
              className={`cursor-pointer px-6 py-3.5 rounded-lg font-extrabold text-sm sm:text-base tracking-wide uppercase transition-all duration-200 min-h-[48px] whitespace-normal sm:whitespace-nowrap flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                activeSoundId === "pig_smashed_jump"
                  ? "bg-amber-300 text-zinc-950 scale-[0.98] shadow-[0_0_25px_rgba(251,191,36,0.8)]"
                  : "bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-[0_0_15px_rgba(251,191,36,0.4)]"
              }`}
            >
              <span>{activeSoundId === "pig_smashed_jump" ? "💥 Smashed! (Playing...)" : "💥 Feral Pig Smashed When Perfect Jump Is Successful"}</span>
            </button>
          </div>
        </div>

        {/* Full Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FERAL_PIG_PLAYABLE_SOUNDS.slice(1).map((sound) => {
            const isPlaying = activeSoundId === sound.id;
            return (
              <div
                key={sound.id}
                className="bg-zinc-950/80 border-2 border-zinc-700/80 hover:border-amber-400/80 rounded-lg p-4 flex flex-col justify-between transition-all duration-200 shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                      {sound.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {sound.pigType} Pig
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
                    id={`btn-play-pig-${sound.id}`}
                    type="button"
                    onClick={() => handlePlayPigSound(sound)}
                    aria-label={sound.buttonLabel || `Play sound: ${sound.name}`}
                    className={`w-full py-2.5 px-4 rounded-md font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                      isPlaying
                        ? "bg-amber-400 text-zinc-950 scale-[0.98] shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                        : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 hover:border-amber-400"
                    }`}
                  >
                    <span>{isPlaying ? "🔊 Playing..." : `▶ ${sound.buttonLabel || "Hear Feral Pig Sound"}`}</span>
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

export default FeralPigsSoundsView;
