/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GEORGE_COLORS } from "../Color_Palette";

/**
 * Low-Polygon Wireframe & Geometry Visuals for George.
 */
export const GeorgePolygons: React.FC = () => {
  return (
    <svg id="george-rider-polygons" width="60" height="70" viewBox="0 0 60 70">
      {/* Crown */}
      <polygon points="20,10 24,4 30,8 36,4 40,10 38,12 22,12" fill={GEORGE_COLORS.crown} stroke="#000000" strokeWidth="1" />
      {/* Polygonal Head */}
      <polygon points="22,12 38,12 42,24 30,30 18,24" fill={GEORGE_COLORS.skin} stroke="#000000" strokeWidth="1" />
      {/* Polygonal Torso */}
      <polygon points="18,30 42,30 46,55 14,55" fill={GEORGE_COLORS.onesieBase} stroke={GEORGE_COLORS.hexagonBorder} strokeWidth="1" />
      {/* Shoes */}
      <polygon points="14,55 26,55 24,62 12,62" fill={GEORGE_COLORS.shoes} stroke="#000000" strokeWidth="1" />
      <polygon points="34,55 46,55 48,62 36,62" fill={GEORGE_COLORS.shoes} stroke="#000000" strokeWidth="1" />
    </svg>
  );
};
