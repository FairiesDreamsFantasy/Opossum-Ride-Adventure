/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiSoundData } from "../Data";

/**
 * Wildcard module for Gemini Sound AI
 */
export const GeminiSoundWildcard = {
  ...GeminiSoundData,
  getSpatialPanning: (listenerX: number, listenerZ: number, sourceX: number, sourceZ: number): [number, number] => {
    const dx = sourceX - listenerX;
    const dz = sourceZ - listenerZ || 1;
    
    const angle = Math.atan2(dx, dz);
    const panningX = Math.sin(angle); // maps left-to-right [-1, +1]

    const angleRad = ((panningX + 1) * Math.PI) / 4;
    return [
      parseFloat(Math.cos(angleRad).toFixed(4)),
      parseFloat(Math.sin(angleRad).toFixed(4))
    ];
  }
};

export * from "../Data";
