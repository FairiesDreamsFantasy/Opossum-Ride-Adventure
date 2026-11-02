/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ANGELA_COLORS } from "../Color_Palette";

/**
 * Low-Polygon Wireframe & Geometry Visuals for Angela.
 */
export const AngelaPolygons: React.FC = () => {
  return (
    <svg id="angela-rider-polygons" width="70" height="90" viewBox="0 0 70 90">
      {/* Gem & Tiara */}
      <polygon points="35,6 38,9 35,12 32,9" fill={ANGELA_COLORS.gem} stroke="#000000" strokeWidth="0.8" />
      <polygon points="26,14 35,10 44,14 42,16 28,16" fill={ANGELA_COLORS.tiara} stroke="#000000" strokeWidth="0.8" />
      {/* Head */}
      <polygon points="28,16 42,16 46,30 35,34 24,30" fill={ANGELA_COLORS.skin} stroke="#000000" strokeWidth="0.8" />
      {/* Torso & Bodice */}
      <polygon points="24,34 46,34 50,55 20,55" fill={ANGELA_COLORS.dress} stroke="#CBD5E1" strokeWidth="0.8" />
      {/* Apron */}
      <polygon points="28,40 42,40 40,54 30,54" fill={ANGELA_COLORS.apron} stroke="#F472B6" strokeWidth="0.8" />
      {/* Flowing Skirt */}
      <polygon points="20,55 50,55 64,84 6,84" fill={ANGELA_COLORS.dress} stroke="#CBD5E1" strokeWidth="1" />
    </svg>
  );
};
