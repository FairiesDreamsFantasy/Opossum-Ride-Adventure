/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TabControl } from "./Tab_Control";
import { FeralPigsSoundsView } from "./Feral_Pigs";
import { MonkeysSoundsView } from "./Monkeys";
import { MooseSoundsView } from "./Moose";
import { ObstacleCollisionsView } from "./Obstacle_Collisions";
import { OpossumsSoundsView } from "./Opossums";
import { TEA_ROOM_CONFIG } from "./General";
import { Volume2, Music, Sparkles, ArrowLeft, Play } from "lucide-react";
export * from "./General";
export * from "./Tab_Control";
export * from "./Feral_Pigs";
export * from "./Monkeys";
export * from "./Moose";
export * from "./Obstacle_Collisions";
export * from "./Opossums";

interface LearnGameSoundsProps {
  onBackToLanding: () => void;
  onStartGame: () => void;
}

export const LearnGameSounds: React.FC<LearnGameSoundsProps> = ({
  onBackToLanding,
  onStartGame
}) => {
  const [activeTab, setActiveTab] = useState<"feral_pigs" | "monkeys" | "moose" | "obstacles" | "opossums">("opossums");

  return (
    <div
      id="Learn_Game_Sounds_Master_Container"
      className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between overflow-x-hidden font-sans selection:bg-amber-400 selection:text-zinc-950"
    >
      {/* Background Aesthetic Layer: 30ft High Tea Room Ceiling, Arched Windows, Ceramic Tiles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep Indigo Sky through upper cathedral clerestory windows */}
        <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-[#0b0c2a] via-[#141842] to-transparent opacity-90">
          {/* Moon and Stars */}
          <div className="absolute top-6 right-12 w-14 h-14 rounded-full bg-amber-100/90 shadow-[0_0_40px_rgba(254,243,199,0.7)] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#111335] translate-x-1 -translate-y-1" />
          </div>
          {/* Subtle Twinkling Star Points */}
          <div className="absolute top-10 left-20 w-1.5 h-1.5 rounded-full bg-amber-100 animate-pulse" />
          <div className="absolute top-20 left-1/4 w-1 h-1 rounded-full bg-amber-200" />
          <div className="absolute top-14 left-2/3 w-2 h-2 rounded-full bg-amber-100/80 animate-pulse" />
          <div className="absolute top-8 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-200/90" />
        </div>

        {/* Garden Mural and 30ft Cathedral Arches in the Distance */}
        <div className="absolute top-24 inset-x-0 h-80 opacity-25 flex justify-around">
          {[1, 2, 3, 4].map((arch) => (
            <div
              key={arch}
              className="w-48 sm:w-64 h-80 border-t-8 border-x-4 border-amber-500/40 rounded-t-full bg-gradient-to-b from-emerald-950/40 to-transparent"
            />
          ))}
        </div>

        {/* 30cm x 30cm Red and Green Ceramic Floor Tiles with Gold Borders */}
        <div
          className="absolute bottom-0 inset-x-0 h-[65%] opacity-35"
          style={{
            backgroundImage: `
              linear-gradient(45deg, ${TEA_ROOM_CONFIG.tileColors.primary} 25%, transparent 25%),
              linear-gradient(-45deg, ${TEA_ROOM_CONFIG.tileColors.primary} 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, ${TEA_ROOM_CONFIG.tileColors.secondary} 75%),
              linear-gradient(-45deg, transparent 75%, ${TEA_ROOM_CONFIG.tileColors.secondary} 75%)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
            borderTop: `4px solid ${TEA_ROOM_CONFIG.tileColors.border}`
          }}
        />

        {/* Ambient Room Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/85 to-zinc-950/95" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
        
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b-2 border-amber-400/50 bg-zinc-950/70 backdrop-blur-md rounded-xl p-4 shadow-lg mb-6">
          <div className="flex items-center gap-3">
            <button
              id="btn-return-landing-header"
              type="button"
              onClick={onBackToLanding}
              aria-label="Return to Opossum Ride Adventure Landing Page"
              className="cursor-pointer group px-4 py-2.5 rounded-lg bg-zinc-900 border-2 border-amber-400/60 hover:border-amber-300 text-amber-300 hover:text-amber-200 transition-all duration-200 min-h-[44px] flex items-center gap-2 text-sm font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Opossum Ride Adventure</span>
            </button>
            <span className="hidden sm:inline-block text-zinc-600">|</span>
            <div className="hidden sm:block">
              <h1 className="text-xl font-extrabold text-amber-300 tracking-wide flex items-center gap-2">
                <span>🍵</span> The Sanctuary Tea Room: Learn Game Sounds
              </h1>
              <p className="text-xs text-zinc-400">
                Interactive Acoustic Demonstrations & Bio-Mechanic Sound Synthesizers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-start-game-header"
              type="button"
              onClick={onStartGame}
              aria-label="Start Opossum Ride Adventure Game"
              className="cursor-pointer px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-extrabold text-sm tracking-wide uppercase transition-all duration-200 min-h-[44px] flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.35)] focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Game</span>
            </button>
          </div>
        </header>

        {/* Ambient Tea Room Characters Banner (5 Cinderella Jills, 3 Rastafarian Jills, 3 Onesie Jacks) */}
        <section
          aria-label="Tea Room Gathering & Setting"
          className="mb-6 bg-gradient-to-r from-amber-950/60 via-zinc-900/80 to-emerald-950/60 border border-amber-400/40 rounded-xl p-4 sm:p-5 shadow-lg backdrop-blur-md"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-amber-300">
                  The Grand Tea Room Gathering
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Beneath a 30-foot cathedral ceiling with gold-trimmed ceramic tiles and arched garden murals, 11 opossum companions gather:
                <strong className="text-amber-200"> 5 Jill Opossums</strong> in Cinderella-style ballgowns and serving aprons,
                <strong className="text-emerald-300"> 3 Jill Opossums</strong> in vibrant "Babylon-Free" Rastafarian red, gold, and green knit crowns, and
                <strong className="text-amber-300"> 3 Jack Opossums</strong> in yellow, blue, and red onesie jumpsuits with black slippers.
              </p>
            </div>

            {/* Character Visual Badges */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded bg-blue-950/80 text-blue-200 border border-blue-400/40">
                👗 5 Cinderella Gowns
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-200 border border-emerald-400/40">
                👑 3 Rasta Babylon-Free
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-950/80 text-amber-200 border border-amber-400/40">
                👘 3 Colored Onesies
              </span>
            </div>
          </div>
        </section>

        {/* Sound Activation Demonstration Table (White Cloth with Gold Edges) */}
        <main
          id="Learn_Game_Sounds_Interactive_Table"
          className="flex-1 bg-gradient-to-b from-zinc-100 via-zinc-50 to-zinc-100 text-zinc-950 rounded-2xl p-4 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)] border-4 border-amber-400 relative"
          style={{
            boxShadow: "0 0 0 3px #18181b, 0 10px 40px rgba(0,0,0,0.8)"
          }}
        >
          {/* Gold Decorative Corner Accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600" />

          {/* Table Header Banner */}
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold tracking-widest uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Interactive Sound Activation Table
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-2 tracking-tight">
              Acoustic Learning & Sound Synthesizer Grid
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 max-w-2xl mx-auto mt-1">
              Select any category tab below to test the game's audio synthesizers in real-time. All sounds are generated locally with zero cloud lag.
            </p>
          </div>

          {/* Tab Navigation */}
          <TabControl activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content Views */}
          <div className="mt-6">
            {activeTab === "feral_pigs" && <FeralPigsSoundsView />}
            {activeTab === "opossums" && <OpossumsSoundsView />}
            {activeTab === "monkeys" && <MonkeysSoundsView />}
            {activeTab === "moose" && <MooseSoundsView />}
            {activeTab === "obstacles" && <ObstacleCollisionsView />}
          </div>
        </main>

        {/* Bottom Bar Information */}
        <footer className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-950/80 border border-amber-400/30 rounded-xl p-4 backdrop-blur-md">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            <span>Press </span>
            <kbd className="px-1.5 py-0.5 bg-zinc-800 text-amber-300 rounded border border-zinc-700 font-mono text-[11px]">
              Ctrl
            </kbd>
            <span> at any time to immediately cancel all active speech announcements.</span>
          </div>

          <button
            id="btn-start-game-footer"
            type="button"
            onClick={onStartGame}
            aria-label="Start Playing Opossum Ride Adventure"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black text-sm tracking-wider uppercase transition-all duration-200 min-h-[44px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.4)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Game</span>
          </button>
        </footer>

      </div>
    </div>
  );
};

export default LearnGameSounds;
