/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EugeneRoseColorPalette } from "../Color_Palette";

interface EugeneRose2DProps {
  width?: number;
  height?: number;
  className?: string;
}

export const EugeneRose2DAnimation: React.FC<EugeneRose2DProps> = ({
  width = 120,
  height = 90,
  className = ""
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 120 90" className={className}>
      {/* Body */}
      <ellipse cx="60" cy="55" rx="35" ry="22" fill={EugeneRoseColorPalette.bodyFur} />
      {/* Furry Face */}
      <polygon points="25,55 5,50 25,42" fill={EugeneRoseColorPalette.bodyFur} />
      {/* Pink Nose */}
      <circle cx="5" cy="50" r="3.5" fill={EugeneRoseColorPalette.nose} />
      {/* Green Eye */}
      <circle cx="22" cy="46" r="3" fill={EugeneRoseColorPalette.eye} />
      {/* Upright Dark Gray Outer Ear */}
      <ellipse cx="38" cy="30" rx="7" ry="12" fill={EugeneRoseColorPalette.outerEar} />
      {/* Upright Pink Inner Ear */}
      <ellipse cx="38" cy="30" rx="4" ry="8" fill={EugeneRoseColorPalette.innerEar} />
      {/* White Paws */}
      <rect x="35" y="72" width="7" height="10" rx="3" fill={EugeneRoseColorPalette.paw} />
      <rect x="75" y="72" width="7" height="10" rx="3" fill={EugeneRoseColorPalette.paw} />
      {/* Pink Tail */}
      <path d="M 95 55 Q 110 50 115 65" stroke={EugeneRoseColorPalette.tail} strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
};
