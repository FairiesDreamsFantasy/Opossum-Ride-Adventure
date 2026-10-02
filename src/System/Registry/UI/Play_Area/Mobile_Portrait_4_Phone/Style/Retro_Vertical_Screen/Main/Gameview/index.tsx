/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface RetroVerticalGameviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  className?: string;
}

export const RetroVerticalGameview: React.FC<RetroVerticalGameviewProps> = ({ canvasRef, className = "" }) => {
  return (
    <div
      id="Retro_Vertical_Gameview_Container"
      className={`absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-black ${className}`}
    >
      <canvas
        ref={canvasRef as any}
        id="Retro_Vertical_Primary_Canvas"
        className="w-full h-full object-cover block touch-none"
      />
    </div>
  );
};
