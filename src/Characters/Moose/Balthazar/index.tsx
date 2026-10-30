/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BalthazarMooseGeneral } from "./General";
import { drawBalthazar2D } from "./Animations/2-D";
import { drawBalthazarPixelations } from "./Animations/Pixelations";
import { BALTHAZAR_DIMENSIONS } from "./Description/Dimensions";

export const BalthazarCharacterDescription = {
  general: BalthazarMooseGeneral,
  dimensions: BALTHAZAR_DIMENSIONS,
  biography: `Balthazar is Saffron, Agape, Arden-Rose, Kady Rose, and Roxanne Kone-Reynolds's arch enemy who is greedy. During the early 2020s, Balthazar blew up a community garden in a city. He is a known Christian terrorist notorious for bombing arcades, public libraries, schools, shopping malls, and a hospital. He lived with parents infected in a life of crime (welfare fraud, tax evasion, money laundering, illegal weapons) and had a hard life as a calf. He refused employment, robbed banks with other malicious moose, shoplifted at Roxanne's workplace, and pirated games, movies, and books. Expelled from school for illegal gun possession and smuggling, he blew up his prison and remains on the run.`
};

export const BalthazarMoose: React.FC<{
  width?: number;
  height?: number;
  renderMode?: "2D" | "Pixelations";
}> = ({
  width = 120,
  height = 120,
  renderMode = "2D"
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (renderMode === "Pixelations") {
      drawBalthazarPixelations(ctx, 40, 20);
    } else {
      drawBalthazar2D(ctx, width / 2, height / 2);
    }
  }, [width, height, renderMode]);

  return (
    <div id="balthazar-moose-container" className="flex flex-col items-center p-2 rounded-lg bg-amber-950/40 text-amber-100 border border-amber-500/30">
      <canvas
        id="balthazar-moose-canvas"
        ref={canvasRef}
        width={width}
        height={height}
        className="drop-shadow-lg"
      />
      <div id="balthazar-moose-metadata" className="mt-2 text-center text-xs space-y-0.5">
        <p id="balthazar-moose-name" className="font-bold text-amber-300">{BalthazarMooseGeneral.name} (Gold Bull)</p>
        <p id="balthazar-moose-role" className="text-red-300">Role: Villain / Monkey Mount</p>
        <p id="balthazar-moose-height" className="text-slate-300">Height: {BALTHAZAR_DIMENSIONS.shoulderHeightFeet} ft</p>
      </div>
    </div>
  );
};

export {
  drawBalthazar2D,
  drawBalthazarPixelations
};

export default BalthazarMoose;
