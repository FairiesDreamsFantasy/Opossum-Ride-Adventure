/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface MobileGameView2Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  className?: string;
  id?: string;
}

export const MobileGameView2: React.FC<MobileGameView2Props> = ({
  canvasRef,
  className = "",
  id = "Mobile_Secondary_Game_View"
}) => {
  return (
    <div
      id={id}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-black ${className}`}
    >
      <canvas
        ref={canvasRef as any}
        id="Mobile_Secondary_Canvas_Element"
        width={840}
        height={400}
        tabIndex={0}
        aria-label="Opossum Ride Adventure Sky View"
        role="img"
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
