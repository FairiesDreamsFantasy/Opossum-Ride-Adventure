/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { OBSTACLE_PLAYABLE_SOUNDS, ObstaclePlayableSound } from "./General";
import { SoundService } from "../../../Sound";
export * from "./General";

export const ObstacleCollisionsView: React.FC = () => {
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);

  const handlePlayObstacleSound = (sound: ObstaclePlayableSound) => {
    setActiveSoundId(sound.id);
    try {
      if (sound.id === "fence_collision") {
        SoundService.playObstacleCollision("fence");
      } else if (sound.id === "garden_plant_collision") {
        SoundService.playObstacleCollision("garden_plant");
      } else if (sound.id === "rock_collision") {
        SoundService.playObstacleCollision("rock");
      } else if (sound.id === "tick_chime") {
        SoundService.playTickChime();
      } else if (sound.id === "sliding_doors_open") {
        SoundService.playSlidingDoorOpen();
      } else if (sound.id === "sliding_doors_close") {
        SoundService.playSlidingDoorClose();
      } else if (sound.id === "owl_hoot") {
        SoundService.playAnimalVocal("owl");
      } else if (sound.id === "frog_croak") {
        SoundService.playAnimalVocal("frog");
      } else {
        SoundService.playObstacleCollision("fence");
      }
    } catch (e) {
      console.warn("Sound playback error:", e);
    }
    setTimeout(() => {
      setActiveSoundId((prev) => (prev === sound.id ? null : prev));
    }, 600);
  };

  return (
    <div
      id="Learn_Game_Sounds_Obstacles_Panel"
      role="tabpanel"
      aria-labelledby="tab-btn-obstacles"
      tabIndex={0}
      className="space-y-6 focus:outline-none"
    >
      <div className="bg-zinc-900/90 border border-amber-400/40 rounded-xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-400/30 pb-3 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-300 tracking-wide flex items-center gap-2">
            <span>🚧</span> Obstacles, Collisions & World SFX Synthesizers
          </h2>
          <span className="text-xs font-mono px-2.5 py-1 bg-amber-400/20 text-amber-200 border border-amber-400/40 rounded-full w-fit">
            8 Synthesized Sounds Available
          </span>
        </div>

        <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
          Physical interactions in Opossum Ride Adventure are synthesized in real-time. Experience tactile wood fractures, garden foliage brushing, solid stone impacts, crystal pickups, automated sliding portals, and ambient sanctuary wildlife.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OBSTACLE_PLAYABLE_SOUNDS.map((sound) => {
            const isPlaying = activeSoundId === sound.id;
            return (
              <div
                key={sound.id}
                className="bg-zinc-950/80 border-2 border-zinc-700/80 hover:border-amber-400/80 rounded-lg p-4 flex flex-col justify-between transition-all duration-200 shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                      {sound.type}
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
                    id={`btn-play-obstacle-${sound.id}`}
                    type="button"
                    onClick={() => handlePlayObstacleSound(sound)}
                    aria-label={`Play sound: ${sound.name}`}
                    className={`w-full py-2.5 px-4 rounded-md font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                      isPlaying
                        ? "bg-amber-400 text-zinc-950 scale-[0.98] shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                        : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 hover:border-amber-400"
                    }`}
                  >
                    <span>{isPlaying ? "🔊 Playing..." : "▶ Hear Obstacle Sound"}</span>
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

export default ObstacleCollisionsView;
