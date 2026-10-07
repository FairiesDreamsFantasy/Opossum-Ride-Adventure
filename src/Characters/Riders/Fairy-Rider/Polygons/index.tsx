/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FAIRY_RIDER_COLORS } from "../Color_Palette";

/**
 * Low-Polygon Visuals for Fairy-Rider.
 */
export const FairyRiderPolygons: React.FC = () => {
  return (
    <svg id="fairy-rider-polygons" width="60" height="80" viewBox="0 0 60 80">
      {/* Polygonal Head */}
      <polygon points="30,5 45,15 40,30 20,30 15,15" fill={FAIRY_RIDER_COLORS.skin} stroke="black" strokeWidth="1" />
      {/* Polygonal Body */}
      <polygon points="20,30 40,30 50,70 10,70" fill={FAIRY_RIDER_COLORS.outfit} stroke="black" strokeWidth="1" />
    </svg>
  );
};
