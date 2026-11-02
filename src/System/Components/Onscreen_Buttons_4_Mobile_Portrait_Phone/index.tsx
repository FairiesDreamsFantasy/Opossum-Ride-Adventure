/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { triggerOnscreenHaptic, OnscreenButtonsProps } from "./General";

export const Onscreen_Buttons_4_Mobile_Portrait_Phone: React.FC<OnscreenButtonsProps> = ({
  onMoveLeft,
  onMoveRight,
  onJump,
  onMoveUpStart,
  onMoveUpEnd,
  onMoveDownStart,
  onMoveDownEnd,
  onSetCruiseLowStop,
  onSetCruiseHigh,
  className = "",
  showVisualButtons = true
}) => {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // If tapping inside a button or controls cluster, let button handlers take priority
    const target = e.target as HTMLElement;
    if (target && target.closest("button")) return;

    if (e.touches.length > 0) {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("button")) return;

      if (!touchStartRef.current || e.changedTouches.length === 0) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const duration = Date.now() - touchStartRef.current.time;

      touchStartRef.current = null;

      // Quick tap / swipe discrimination
      if (absY > 30 && dy < -20 && absY > absX) {
        triggerOnscreenHaptic([10, 30, 10]);
        onJump();
      } else if (absX > 25 && absX > absY) {
        triggerOnscreenHaptic(15);
        if (dx > 0) {
          onMoveRight();
        } else {
          onMoveLeft();
        }
      } else if (duration < 250 && absX < 15 && absY < 15) {
        // Tap screen side: left half vs right half
        const screenWidth = window.innerWidth;
        if (touch.clientX < screenWidth / 3) {
          triggerOnscreenHaptic(12);
          onMoveLeft();
        } else if (touch.clientX > (screenWidth * 2) / 3) {
          triggerOnscreenHaptic(12);
          onMoveRight();
        } else {
          triggerOnscreenHaptic([10, 20]);
          onJump();
        }
      }
    },
    [onMoveLeft, onMoveRight, onJump]
  );

  const handleUpStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerOnscreenHaptic(10);
    onMoveUpStart?.();
  };

  const handleUpEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMoveUpEnd?.();
  };

  const handleDownStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerOnscreenHaptic(10);
    onMoveDownStart?.();
  };

  const handleDownEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMoveDownEnd?.();
  };

  return (
    <div
      className={`touch-none  relative w-full h-full flex flex-col justify-end ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Touch Game Controller"
      role="region"
    >
      {showVisualButtons && (
        <div className="w-full px-4 pb-4 flex items-center justify-between pointer-events-auto gap-2">
          {/* Scientific Directional Pad (D-Pad) */}
          <div className="grid grid-cols-3 gap-1 w-32 h-32 relative  bg-zinc-900/40 p-1.5 rounded-2xl border border-zinc-800/50">
            {/* Row 1 */}
            <div />
            <button
              type="button"
              id="Touch_Button_Up"
              onTouchStart={handleUpStart}
              onTouchEnd={handleUpEnd}
              onMouseDown={handleUpStart}
              onMouseUp={handleUpEnd}
              onMouseLeave={handleUpEnd}
              className="w-9 h-9 rounded bg-zinc-950 active:bg-green-700 border border-green-500/80 text-green-300 active:text-white flex items-center justify-center shadow transition-all active:scale-95 touch-manipulation "
              aria-label="Move Up / Accelerate"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <div />

            {/* Row 2 */}
            <button
              type="button"
              id="Touch_Button_Left"
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerOnscreenHaptic(15);
                onMoveLeft();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerOnscreenHaptic(15);
                onMoveLeft();
              }}
              className="w-9 h-9 rounded bg-zinc-950 active:bg-green-700 border border-green-500/80 text-green-300 active:text-white flex items-center justify-center shadow transition-all active:scale-95 touch-manipulation "
              aria-label="Move Left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 flex items-center justify-center text-[7px] font-mono font-bold text-green-800  bg-zinc-950/85 rounded border border-green-950">
              PAD
            </div>
            <button
              type="button"
              id="Touch_Button_Right"
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerOnscreenHaptic(15);
                onMoveRight();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerOnscreenHaptic(15);
                onMoveRight();
              }}
              className="w-9 h-9 rounded bg-zinc-950 active:bg-green-700 border border-green-500/80 text-green-300 active:text-white flex items-center justify-center shadow transition-all active:scale-95 touch-manipulation "
              aria-label="Move Right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Row 3 */}
            <div />
            <button
              type="button"
              id="Touch_Button_Down"
              onTouchStart={handleDownStart}
              onTouchEnd={handleDownEnd}
              onMouseDown={handleDownStart}
              onMouseUp={handleDownEnd}
              onMouseLeave={handleDownEnd}
              className="w-9 h-9 rounded bg-zinc-950 active:bg-green-700 border border-green-500/80 text-green-300 active:text-white flex items-center justify-center shadow transition-all active:scale-95 touch-manipulation "
              aria-label="Move Down / Reverse / Brake"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
            <div />
          </div>

          {/* Cruise Control Console (Center Column) */}
          <div className="flex flex-col items-center justify-center bg-zinc-950/70 p-2 rounded-xl border border-zinc-800/80 max-w-[125px] flex-1 gap-1">
            <div className="text-[8px] font-mono tracking-widest text-zinc-500 font-bold uppercase ">CRUISE</div>
            <div className="flex flex-col gap-1 w-full">
              <button
                type="button"
                id="Touch_Button_Cruise_LowStop"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerOnscreenHaptic([10, 20]);
                  onSetCruiseLowStop?.();
                }}
                className="w-full py-1.5 rounded bg-zinc-900 active:bg-amber-900/60 border border-amber-600 text-amber-400 active:text-amber-200 font-bold font-mono text-[8px] uppercase tracking-wider text-center shadow transition-all active:scale-95 touch-manipulation "
                aria-label="Cruise Control Low or Stop"
              >
                LOW/STOP
              </button>
              <button
                type="button"
                id="Touch_Button_Cruise_High"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerOnscreenHaptic([10, 20]);
                  onSetCruiseHigh?.();
                }}
                className="w-full py-1.5 rounded bg-zinc-900 active:bg-emerald-900/60 border border-emerald-500 text-emerald-400 active:text-emerald-200 font-bold font-mono text-[8px] uppercase tracking-wider text-center shadow transition-all active:scale-95 touch-manipulation "
                aria-label="Cruise Control High"
              >
                HIGH
              </button>
            </div>
          </div>

          {/* Jump Action Button (Right Column) */}
          <div>
            <button
              type="button"
              id="Touch_Button_Jump"
              onClick={(e) => {
                e.stopPropagation();
                triggerOnscreenHaptic([15, 30]);
                onJump();
              }}
              className="w-16 h-16 min-w-[54px] min-h-[54px] rounded-full bg-green-600/90 active:bg-green-400 border-2 border-green-300 text-black font-extrabold flex flex-col items-center justify-center shadow-xl transition-all active:scale-95 touch-manipulation "
              aria-label="Jump"
            >
              <ArrowUp className="w-6 h-6 stroke-[3]" />
              <span className="text-[10px] uppercase tracking-wider font-mono">JUMP</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
