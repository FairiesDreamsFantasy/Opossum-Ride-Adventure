/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Botanical Maze Hedge Corridor Reflection Kernel
 * Native C++ High-Precision Subarena Bridge
 */

export const BotanicalMazeAcousticsCPP = {
  hedgeHeightFeet: 10.0,
  corridorWidthFeet: 4.0,

  computeCorridorReverbDelayMs: (): number => {
    // 4 feet corridor sound bouncing delay calculation
    return Number(((4.0 * 0.3048) / 343.0 * 1000.0).toFixed(2));
  }
};

export default BotanicalMazeAcousticsCPP;
