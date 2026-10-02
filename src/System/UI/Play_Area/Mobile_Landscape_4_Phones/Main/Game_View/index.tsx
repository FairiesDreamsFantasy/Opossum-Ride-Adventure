/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { NIGHT_SKY_AMBER_SPECS } from "../../General";

export interface LandscapeGameViewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isPlaying: boolean;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onJump?: () => void;
  onMoveUpStart?: () => void;
  onMoveUpEnd?: () => void;
  onMoveDownStart?: () => void;
  onMoveDownEnd?: () => void;
  className?: string;
}

export const LandscapeGameView: React.FC<LandscapeGameViewProps> = ({
  canvasRef,
  isPlaying,
  onMoveLeft,
  onMoveRight,
  onJump,
  onMoveUpStart,
  onMoveUpEnd,
  onMoveDownStart,
  onMoveDownEnd,
  className = ""
}) => {
  const touchStartRef = React.useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const relativeY = touch.clientY - rect.top;
      const relativeHeight = rect.height;

      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };

      // Upper half tap/hold drives acceleration, lower half drives brake
      if (relativeY < relativeHeight * 0.45) {
        onMoveUpStart?.();
      } else if (relativeY > relativeHeight * 0.75) {
        onMoveDownStart?.();
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    onMoveUpEnd?.();
    onMoveDownEnd?.();

    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    touchStartRef.current = null;

    if (absY > 30 && dy < -25 && absY > absX) {
      // Swipe Up -> Jump
      onJump?.();
    } else if (absX > 25 && absX > absY) {
      // Horizontal swipe
      if (dx > 0) {
        onMoveRight?.();
      } else {
        onMoveLeft?.();
      }
    } else if (absX < 20 && absY < 20) {
      // Direct side tap
      const rect = e.currentTarget.getBoundingClientRect();
      const relativeX = touch.clientX - rect.left;
      if (relativeX < rect.width * 0.4) {
        onMoveLeft?.();
      } else if (relativeX > rect.width * 0.6) {
        onMoveRight?.();
      }
    }
  };

  return (
    <div
      id="Mobile_Landscape_Canvas_Wrapper"
      className={`relative flex items-center justify-center overflow-hidden rounded-sm ${className}`}
      style={{
        border: `3px solid ${NIGHT_SKY_AMBER_SPECS.borderPrimary}`,
        boxShadow: `0 0 14px ${NIGHT_SKY_AMBER_SPECS.borderGlow}, inset 0 0 6px ${NIGHT_SKY_AMBER_SPECS.borderSubtle}`
      }}
    >
      <canvas
        ref={canvasRef as any}
        id="Mobile_Landscape_Primary_Canvas"
        width={840}
        height={400}
        tabIndex={0}
        aria-label="Opossum Ride Adventure Game View"
        role="img"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          onMoveUpEnd?.();
          onMoveDownEnd?.();
          touchStartRef.current = null;
        }}
        className="w-full h-full object-contain block touch-none bg-black"
      />

      {!isPlaying && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center z-30 pointer-events-none">
          <p
            className="text-xl md:text-2xl font-extrabold uppercase tracking-widest animate-pulse"
            style={{ color: NIGHT_SKY_AMBER_SPECS.borderPrimary }}
          >
            Game Paused
          </p>
          <p className="text-[10px] text-amber-300/80 mt-1 font-mono">
            Press Resume or tap the canvas to continue riding
          </p>
        </div>
      )}
    </div>
  );
};
