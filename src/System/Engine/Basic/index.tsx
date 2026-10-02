/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Retro BASIC Procedural Code & Transform Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Paradigm: Line-numbered GOSUB jump frames & fast degree rotation lookups
 */

import React from "react";
import { BasicExecutionEnvironment, BasicTrigTables } from "./General";

export class RetroBasicEngine {
  private env: BasicExecutionEnvironment;

  constructor() {
    this.env = new BasicExecutionEnvironment();
  }

  /**
   * Runs a simulated, hardcoded procedural BASIC program to step a physics trajectory.
   * Emulates interpreting the following lines:
   *   10 LET X = PX : LET Y = PY : LET V = VY
   *   20 LET V = V - G * DT
   *   30 LET Y = Y + V * DT
   *   40 GOSUB 100
   *   50 RETURN
   *   100 LET Y = Y * 0.98 : RETURN (Dampen step)
   */
  public executeBasicProceduralStep(
    px: number,
    py: number,
    vy: number,
    g: number,
    dt: number
  ): { x: number; y: number; vy: number } {
    this.env.clear();

    // Register our retro procedural program
    this.env.registerLine(10, "LOAD_COORDS");
    this.env.registerLine(20, "APPLY_GRAVITY");
    this.env.registerLine(30, "APPLY_VELOCITY");
    this.env.registerLine(40, "GOSUB 100");
    this.env.registerLine(50, "END");
    this.env.registerLine(100, "DAMPEN_HEIGHT");

    let x = px;
    let y = py;
    let v = vy;

    // Emulate procedural execution counter pointer
    const lines = this.env.getOrderedLines();
    let idx = 0;

    while (idx < lines.length) {
      const lineNum = lines[idx];
      const stmt = this.env.getStatement(lineNum);

      if (stmt === "APPLY_GRAVITY") {
        v = v - (g * dt);
        idx++;
      } else if (stmt === "APPLY_VELOCITY") {
        y = y + (v * dt);
        idx++;
      } else if (stmt === "GOSUB 100") {
        this.env.gosubPush(100, 50); // Push return location
        idx = lines.indexOf(100); // Jump to line 100
      } else if (stmt === "DAMPEN_HEIGHT") {
        y = y * 0.999; // Smooth terrain grounding multiplier
        const frame = this.env.gosubPop();
        idx = lines.indexOf(frame.returnToLine); // Jump back to line 50
      } else if (stmt === "END") {
        break; // Finish program
      } else {
        idx++; // Fallthrough
      }
    }

    return { x, y, vy: v };
  }

  /**
   * Applies a retro 2D rotation matrix using degree-angle integer lookups.
   * Rotation matrix:
   *   [ x_new ] = [ cos(a)  -sin(a) ] * [ x ]
   *   [ y_new ] = [ sin(a)   cos(a) ] * [ y ]
   */
  public executeRetroDegreeRotation2D(
    x: number,
    y: number,
    angleDegrees: number
  ): [number, number] {
    const cosVal = BasicTrigTables.cosLookup(angleDegrees);
    const sinVal = BasicTrigTables.sinLookup(angleDegrees);

    const rx = x * cosVal - y * sinVal;
    const ry = x * sinVal + y * cosVal;

    return [rx, ry];
  }
}

export const RetroBasicEngineComponent: React.FC = () => {
  return null;
};
