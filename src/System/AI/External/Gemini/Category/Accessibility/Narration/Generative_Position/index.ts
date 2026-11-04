/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GeminiGenerativePositionCompiler = {
  compilePositionAnnouncement: (x: number, y: number, z: number, facing: string, obstacleAhead?: string): string => {
    const coords = `x=${Math.round(x)}, y=${Math.round(y)}, z=${Math.round(z)}`;
    const obs = obstacleAhead ? ` Ray-marched obstacle detected: ${obstacleAhead}.` : "";
    return `[Gemini Live Spatial Navigation]: Position ${coords}, facing ${facing}.${obs}`;
  }
};

export default GeminiGenerativePositionCompiler;
