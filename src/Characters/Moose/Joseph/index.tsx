/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { JosephMooseGeneral } from "./General";
import { drawJoseph2D } from "./Animations/2-D";
import { drawJoseph3D } from "./Animations/3-D";
import { drawJosephPolygons } from "./Animations/Polygons";
import { drawJosephPixelations } from "./Animations/Pixelations";
import { JOSEPH_DIMENSIONS } from "./Description/Dimensions";
import { JOSEPH_COLOR_PALETTE } from "./Animations/Color_Palette/Pattern_Palette";

export const JosephCharacterDescription = {
  general: JosephMooseGeneral,
  dimensions: JOSEPH_DIMENSIONS,
  colors: JOSEPH_COLOR_PALETTE,
  biography: `Joseph is Angelica's brother who is once a Catholic school student turned Evangelical. However; during his childhood; he was raised as a Catholic via his mother who used to work in the factory where they process beef for a restaurant that is located outside of this city where a family of opossums live. Joseph is technically Angelica's brother in law! When Joseph grew up as an older moose; he started seeking employment as a way to support his mother who is trying to get back to work,--after their beef supply has gone dry,--due to banning of factory farming of animals. Well, most of his family opposed factory farming, but they do own their own cattle farm where they farm cattle mainly for beef. Joseph did worked in a factory where they received demand for feral hog meat, and he became a skilled chef who grills feral hog meat during events at a church. When a factory for feral hog meat preparation has experienced an overload... Joseph has to switch to working at a restaurant to keep his chef skills current. However; he exclusively cooks for Evangelicals!`
};

export const JosephMoose: React.FC<{
  width?: number;
  height?: number;
  renderMode?: "2D" | "3D" | "Polygons" | "Pixelations";
  isBreathingFire?: boolean;
  isMonkeyMounted?: boolean;
}> = ({
  width = 120,
  height = 120,
  renderMode = "3D",
  isBreathingFire = false,
  isMonkeyMounted = false
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (renderMode === "2D") {
      drawJoseph2D(ctx, width / 2, height * 0.9, width * 0.8, height * 0.8);
    } else if (renderMode === "Polygons") {
      drawJosephPolygons(ctx, width / 2, height * 0.9, width * 0.8, height * 0.8);
    } else if (renderMode === "Pixelations") {
      drawJosephPixelations(ctx, width / 2, height * 0.9, width * 0.8, height * 0.8);
    } else {
      drawJoseph3D(ctx, width / 2, height * 0.9, width * 0.8, height * 0.8, isBreathingFire, isMonkeyMounted);
    }
  }, [width, height, renderMode, isBreathingFire, isMonkeyMounted]);

  return (
    <div id="joseph-moose-character-container" className="flex flex-col items-center p-2 rounded-lg bg-slate-900/40 text-slate-100">
      <canvas
        id="joseph-moose-canvas"
        ref={canvasRef}
        width={width}
        height={height}
        className="drop-shadow-md"
      />
      <div id="joseph-moose-metadata" className="mt-2 text-center text-xs space-y-0.5">
        <p id="joseph-moose-name" className="font-bold text-amber-200">{JosephMooseGeneral.name} ({JosephMooseGeneral.gender})</p>
        <p id="joseph-moose-height" className="text-slate-300">Height: {JOSEPH_DIMENSIONS.shoulderHeightFeet} ft (1.5% taller than Angelica)</p>
        <p id="joseph-moose-religion" className="text-emerald-300">{JosephMooseGeneral.religion}</p>
      </div>
    </div>
  );
};

export {
  drawJoseph2D,
  drawJoseph3D,
  drawJosephPolygons,
  drawJosephPixelations
};

export default JosephMoose;
