/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from "react";
import {
  OpossumCharacter,
  RiderCharacter,
  KeyboardLayoutType,
  GameViewMode,
  GameLevel
} from "../../../types";

interface PlayAreaProps {
  selectedOpossum: OpossumCharacter;
  defaultRider: RiderCharacter;
  onExitGame: () => void;
  layout: KeyboardLayoutType;
  setLayout: (l: KeyboardLayoutType) => void;
  currentLevelId: number;
  setCurrentLevelId: (id: number) => void;
  currentLevel: GameLevel;
  setCurrentLevel: (level: GameLevel) => void;
  chatterNotifications: boolean;
  setChatterNotifications: (b: boolean) => void;
  announceDoors: boolean;
  setAnnounceDoors: (b: boolean) => void;
  announceReverb: boolean;
  setAnnounceReverb: (b: boolean) => void;
  extendedInfo: boolean;
  setExtendedInfo: (b: boolean) => void;
  announceSteering: boolean;
  setAnnounceSteering: (b: boolean) => void;
  announceMooseSmash: boolean;
  setAnnounceMooseSmash: (b: boolean) => void;
  musicEnabled: boolean;
  setMusicEnabled: (b: boolean) => void;
  viewMode: GameViewMode;
  setViewMode: (v: GameViewMode) => void;
  pixelation: number;
  setPixelation: (n: number) => void;
  palette: string;
  setPalette: (p: any) => void;
  is3D: boolean;
  setIs3D: (b: boolean) => void;
  wireframe: boolean;
  setWireframe: (b: boolean) => void;
}

export const PlayArea: React.FC<PlayAreaProps> = ({
  selectedOpossum,
  defaultRider,
  onExitGame,
  layout,
  currentLevel,
  viewMode,
  is3D
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid ground
      ctx.strokeStyle = "#15803d";
      ctx.lineWidth = 1;
      const time = Date.now() * 0.002;

      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Opossum & Rider avatar
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + Math.sin(time * 3) * 10;

      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${defaultRider.name} on ${selectedOpossum.name}`, cx, cy - 40);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedOpossum, defaultRider]);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-mono flex flex-col">
      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-zinc-950/80 border-b border-green-900 z-10 flex items-center justify-between text-xs text-green-300">
        <div>
          <span className="font-bold text-green-400">{currentLevel.name}</span>
          <span className="ml-4 text-green-600">Layout: {layout}</span>
        </div>
        <button
          onClick={onExitGame}
          className="bg-red-950 hover:bg-red-900 border border-red-700 text-red-200 px-4 py-1.5 rounded uppercase font-bold text-xs tracking-wider"
        >
          Exit Game
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};
