/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface MobileGameViewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  className?: string;
  id?: string;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onJump?: () => void;
  onMoveUpStart?: () => void;
  onMoveUpEnd?: () => void;
  onMoveDownStart?: () => void;
  onMoveDownEnd?: () => void;
  enableDirectTouch?: boolean;
}

export const MobileGameView: React.FC<MobileGameViewProps> = ({
  canvasRef,
  className = "",
  id = "Mobile_Primary_Game_View",
  onMoveLeft,
  onMoveRight,
  onJump,
  onMoveUpStart,
  onMoveUpEnd,
  onMoveDownStart,
  onMoveDownEnd,
  enableDirectTouch = true
}) => {
  const touchStartRef = React.useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!enableDirectTouch) return;
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
    if (!enableDirectTouch) return;
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
      // Tap on left vs right side
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
      id={id}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-black ${className}`}
    >
      <canvas
        ref={canvasRef as any}
        id="Mobile_Primary_Canvas_Element"
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
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          backgroundColor: "#000000"
        }}
        className="w-full h-full object-cover block touch-none"
      />
    </div>
  );
};

