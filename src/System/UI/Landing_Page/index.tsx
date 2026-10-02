/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { playProceduralSound } from "../../Sound/TTS";
import { loadGameSave, GameSaveState } from "../../../System/Utilities/persistence";
import { ExternalAIModal } from "../../AI/External";
import { TouchscreenCommandsModal } from "../Modal/Touchscreen_Commands";
import { useMobilePortraitPhone } from "../../Keyboards_and_Controllers/Device_Detection";
import opossumRideIllustration from "../../../assets/images/Opossum_Ride_Illustration.png";

import { SystemRegistry } from "../../Registry";
import { VersionRegistry } from "../../Registry/Version";

interface LandingPageProps {
  onStartGame: () => void;
  onLearnGameSounds?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGame, onLearnGameSounds }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCommandsModal, setShowCommandsModal] = useState(false);
  const [showTouchCommandsModal, setShowTouchCommandsModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [saveState, setSaveState] = useState<GameSaveState | null>(null);
  const { isMobilePortraitPhone } = useMobilePortraitPhone();

  useEffect(() => {
    loadGameSave().then((data) => {
      setSaveState(data);
    });
  }, []);

  // Procedural retro vector landscape animation loop
  useEffect(() => {
    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Dynamic resize to fit container
      const rect = canvas.parentElement?.getBoundingClientRect();
      const width = rect?.width || 800;
      const height = rect?.height || 260;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.fillStyle = "#000000"; // Matte Ultra-Black
      ctx.fillRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = "#22c55e"; // Light Green star glows
      for (let i = 0; i < 15; i++) {
        const sx = ((i * 12345 + 500) % width);
        const sy = ((i * 54321) % (height - 80));
        ctx.fillRect(sx, sy, 2, 2);
      }

      // Draw wireframe rolling mountains/hills in background
      ctx.strokeStyle = "#166534"; // Dark forest green lines
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 10) {
        // High-precision mathematical waves
        const y = (height - 70) - Math.sin((x + offset * 1.5) * 0.006) * 35 - Math.cos((x - offset) * 0.01) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw pathway lanes receding with automated steering layout
      ctx.strokeStyle = "#22c55e"; // Light green lanes
      ctx.lineWidth = 1;
      const centerY = height - 20;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Retro grid vertical divisions
      ctx.strokeStyle = "#15803d";
      for (let x = -50; x < width + 100; x += 80) {
        const gx = x - (offset % 80);
        ctx.beginPath();
        ctx.moveTo(gx, centerY);
        ctx.lineTo(gx + 30, height);
        ctx.stroke();
      }

      // Draw a charming vector cartoon opossum running procedurally
      const opossumX = width / 2 - 40;
      const opossumY = centerY - 15 + Math.sin(offset * 0.2) * 3;
      
      // Tail (Pink, coiled)
      ctx.strokeStyle = "#ffb6c1"; // light pink
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(opossumX - 20, opossumY + 2, 10, 0, Math.PI * 1.5, false);
      ctx.stroke();

      // Body (Gray, oval)
      ctx.fillStyle = "#888888"; // Gray fur
      ctx.beginPath();
      ctx.ellipse(opossumX, opossumY, 24, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nose / snout (Pink tip)
      ctx.fillStyle = "#ffb6c1";
      ctx.beginPath();
      ctx.arc(opossumX + 32, opossumY - 2, 4, 0, Math.PI * 2);
      ctx.fill();

      // White face paint
      ctx.fillStyle = "#f3f4f6";
      ctx.beginPath();
      ctx.moveTo(opossumX + 12, opossumY - 8);
      ctx.lineTo(opossumX + 31, opossumY - 2);
      ctx.lineTo(opossumX + 16, opossumY + 8);
      ctx.closePath();
      ctx.fill();

      // Blue eye
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.arc(opossumX + 22, opossumY - 3, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Ears (Pink interior, dark edge)
      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.arc(opossumX + 2, opossumY - 14, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffb6c1";
      ctx.beginPath();
      ctx.arc(opossumX + 2, opossumY - 14, 4, 0, Math.PI * 2);
      ctx.fill();

      // Scuttling little feet
      ctx.strokeStyle = "#ffb6c1";
      ctx.lineWidth = 2.5;
      const legOffset = Math.sin(offset * 0.2) * 6;
      ctx.beginPath();
      // Front legs
      ctx.moveTo(opossumX + 10, opossumY + 12);
      ctx.lineTo(opossumX + 10 + legOffset, opossumY + 20);
      ctx.moveTo(opossumX - 10, opossumY + 12);
      ctx.lineTo(opossumX - 10 - legOffset, opossumY + 20);
      ctx.stroke();

      offset += 1.8;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const { LandingPage: registry } = SystemRegistry;

  const handleStart = () => {
    playProceduralSound("chatter");
    onStartGame();
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-sans flex flex-col p-4 md:p-8">
      {/* LANDING PAGE HEADER */}
      <header className="mb-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-green-300 uppercase leading-none filter drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
          {registry.metadata.title.split(' ').slice(0, 2).join(' ')}<br />{registry.metadata.title.split(' ').slice(2).join(' ')}
        </h1>
      </header>

      {/* NAVIGATION SECTION WITH MENUS */}
      <nav id="Navigation" className="border-y border-green-800 py-3 mb-6 bg-black">
        <ul id="Horizontal_Navigation_Bar" className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 mb-4">
          {registry.navigation.links.map((link, idx) => (
            <li key={idx} className={`list-none ${link.border ? 'border-l border-green-800 pl-4 md:pl-8' : ''}`}>
              <a
                href={link.url}
                className="text-xs md:text-sm hover:text-white transition-colors duration-150 underline decoration-green-700 hover:decoration-green-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Search form matching action and buttons */}
        <form
          id="Search_Form"
          action={registry.navigation.search.action}
          method="get"
          className="flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            if (!searchQuery.trim()) {
              e.preventDefault();
            }
          }}
        >
          <label htmlFor="search_input" className="sr-only">Search Arcade</label>
          <input
            id="search_input"
            type="search"
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={registry.navigation.search.placeholder}
            className="bg-zinc-950 border border-green-700 rounded px-3 py-1 text-xs text-white focus:outline-none focus:border-green-400 w-full sm:w-auto min-w-[200px]"
          />
          <button
            type="submit"
            className="cursor-pointer bg-green-900 border border-green-500 hover:bg-green-700 transition duration-150 px-3 py-1 rounded text-xs text-green-200 hover:text-white font-medium min-h-[32px]"
          >
            Search
          </button>
          <button
            type="reset"
            onClick={() => setSearchQuery("")}
            className="cursor-pointer bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition duration-150 px-3 py-1 rounded text-xs text-zinc-300 font-medium min-h-[32px]"
          >
            Clear
          </button>
        </form>
      </nav>

      {/* MAIN GAME INTRODUTION & STORY */}
      <main className="flex-grow max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* LANDSCAPE STILL ANIMATION LOOP */}
        <div
          id="Image_Frame"
          className="w-full relative h-[300px] border border-green-800 rounded bg-black shadow-[inset_0_0_20px_rgba(34,197,94,0.2)] overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-30" />
          <img
            src={opossumRideIllustration}
            alt="Fairy-Rider wearing a blue onesie riding on the back of an opossum in a glowing green synthwave forest"
            className="absolute inset-0 w-full h-full object-cover opacity-85 z-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 bg-black/80 border border-green-800 px-3 py-1.5 rounded z-20">
            <p className="text-[10px] font-mono tracking-wider uppercase text-green-500 font-bold">
              {registry.metadata.subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg md:text-xl font-medium text-green-200 leading-relaxed font-sans first-letter:text-3xl first-letter:font-bold first-letter:text-green-300">
            {registry.metadata.description}
          </p>
          <p className="text-green-400 font-sans leading-relaxed text-sm md:text-base">
            {registry.metadata.extendedDescription}
          </p>
          <p className="text-green-400 font-sans leading-relaxed text-sm md:text-base border-l border-green-800 pl-4 bg-zinc-950/40 py-2 rounded">
            {registry.metadata.monkeyMooseNotice.split('ANY').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-green-300 font-semibold">ANY</span>}
              </React.Fragment>
            ))}
          </p>
          <p className="text-green-400 font-sans text-sm md:text-base">
            {registry.metadata.viewOptionsNotice}
          </p>
          <div className="text-center font-mono text-xs tracking-wider text-green-400 py-3 border-y border-green-900/60 my-4 select-none flex flex-col gap-1.5 items-center justify-center">
            <div>Version: {VersionRegistry.current}</div>
            <div>Date: {VersionRegistry.date}</div>
            <div>Time: {VersionRegistry.time}</div>
          </div>
        </div>

        {/* START TRIGGER */}
        <div id="Primary_Button_Section" className="mt-4 text-center flex flex-col items-center gap-3">
          <button
            id="Start_Game_Button"
            onClick={handleStart}
            className="cursor-pointer bg-green-500 hover:bg-green-400 text-black font-bold uppercase tracking-wider px-8 py-4 rounded-md shadow-[0_0_20px_rgba(34,197,94,0.5)] transform active:scale-95 transition-all text-lg filter drop-shadow-[0_0_10px_rgba(34,197,94,0.3)] animate-pulse"
          >
            Start Game
          </button>

          <button
            id="Insert_AI_Button"
            onClick={() => {
              setShowAIModal(true);
              playProceduralSound("tick");
            }}
            className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 border border-green-500 text-green-300 font-bold uppercase tracking-wider px-8 py-3 rounded-md shadow-[0_0_15px_rgba(34,197,94,0.3)] transform active:scale-95 transition-all text-sm"
          >
            Insert AI
          </button>

          <button
            id="Learn_Game_Sounds_Button"
            onClick={() => {
              playProceduralSound("tick");
              onLearnGameSounds?.();
            }}
            className="cursor-pointer bg-amber-950/80 hover:bg-amber-900 border-2 border-amber-400 text-amber-300 hover:text-white font-bold uppercase tracking-wider px-8 py-3 rounded-md shadow-[0_0_15px_rgba(251,191,36,0.35)] transform active:scale-95 transition-all text-sm flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>🍵</span>
            <span>Learn Game Sounds</span>
          </button>
          
          <button
            id="Keyboard_Commands_Button"
            onClick={() => {
              setShowCommandsModal(true);
              playProceduralSound("tick");
            }}
            className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 border border-green-800 text-green-400 hover:text-white font-bold uppercase tracking-wider px-6 py-2.5 rounded-md transition-all text-sm font-mono"
          >
            Keyboard Commands
          </button>

          {/* Touchscreen Commands Button: Exclusive for mobile phones with touchscreens held vertically */}
          {isMobilePortraitPhone && (
            <button
              id="Touchscreen_Commands_Button"
              onClick={() => {
                setShowTouchCommandsModal(true);
                playProceduralSound("tick");
              }}
              className="cursor-pointer bg-emerald-950/80 hover:bg-emerald-900 border-2 border-emerald-400 text-emerald-200 hover:text-white font-bold uppercase tracking-wider px-6 py-3 rounded-md shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all text-sm font-mono flex items-center justify-center gap-2 animate-pulse min-h-[44px]"
            >
              <span>📱</span>
              <span>Touchscreen Commands (for mobile phones)</span>
            </button>
          )}


        </div>


      </main>

      {/* Keyboard Commands Modal */}
      {showCommandsModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-zinc-950 border-2 border-green-700 max-w-2xl w-full rounded-lg p-6 font-mono text-green-300 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <h2 className="text-xl font-bold uppercase tracking-widest text-center border-b border-green-800 pb-3 mb-4 text-green-100">
              Keyboard Controller Commands
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-left">
              {/* Column 1: Cedella Layout */}
              <div className="space-y-3 bg-black/50 p-4 rounded border border-green-950">
                <h3 className="text-sm font-extrabold uppercase text-green-400 border-b border-green-900 pb-1 mb-2">
                  Cedella Layout (Default)
                </h3>
                <ul className="space-y-2 text-green-300">
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">▲ ArrowUp</kbd> Hold to Move Forward, release to stop</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">▼ ArrowDown</kbd> Move Backward/Reverse</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">◀ / ▶</kbd> Arrow Left/Right to Strafe Lanes</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">Space</kbd> Execute Parabolic Gravity Jump</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">S</kbd> Trigger authentic Opossum Vocal Chatter</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">R</kbd> Speak current location and ridden status</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">O</kbd> Sweep &amp; Scan opponents</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">1</kbd> Toggle visual chatter popup alert window</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">Shift+7</kbd> Pause/Resume (&amp; character)</li>
                </ul>
              </div>

              {/* Column 2: Arden Denis Layout */}
              <div className="space-y-3 bg-black/50 p-4 rounded border border-green-950">
                <h3 className="text-sm font-extrabold uppercase text-green-400 border-b border-green-900 pb-1 mb-2">
                  Arden Denis Layout
                </h3>
                <ul className="space-y-2 text-green-300">
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">W</kbd> Hold W to Move Forward, release to stop</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">S</kbd> Press S to Move Reverse/Backward</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">A / D</kbd> Strafe Left / Right Lanes</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">Space</kbd> Execute Parabolic Gravity Jump</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">O</kbd> Trigger authentic Opossum Vocal Chatter</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">R</kbd> Speak current location and ridden status</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">T</kbd> Toggle View (POV Perspective / Rider 3D)</li>
                  <li><kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">1</kbd> Toggle visual chatter popup alert window</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-green-900/40 text-center text-[11px] text-green-400">
              <kbd className="bg-green-100/10 px-1.5 py-0.5 border border-green-800 rounded mr-1.5 text-white font-bold font-mono">Ctrl</kbd> Press any time to immediately stop screen-reader speech of this game.
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  setShowCommandsModal(false);
                  playProceduralSound("tick");
                }}
                className="cursor-pointer bg-green-500 hover:bg-green-400 text-black font-extrabold uppercase px-6 py-2 rounded shadow-lg tracking-wider active:scale-95 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* External AI Modal */}
      {showAIModal && (
        <ExternalAIModal onClose={() => setShowAIModal(false)} />
      )}

      {/* Touchscreen Commands Modal */}
      {showTouchCommandsModal && (
        <TouchscreenCommandsModal onClose={() => setShowTouchCommandsModal(false)} />
      )}

      {/* FOOTER USEFUL LINKS */}
      <footer className="mt-12 pt-6 border-t border-green-900 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 pb-4">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-green-300 uppercase mb-2">Useful Links</h2>
          <ul id="Footer_Links" className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
            {registry.footer.usefulLinks.map((link, idx) => (
              <li key={idx} className="list-none">
                <a href={link.url} className="text-xs text-green-500 hover:text-white underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-[10px] text-green-700 font-mono text-right">
          <p>{registry.footer.copyright}</p>
          <p>{registry.footer.craftsmanship}</p>
        </div>
      </footer>
    </div>
  );
};
