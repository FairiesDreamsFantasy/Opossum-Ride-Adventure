/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Level Layout Graph Solver
 * Native C++ High-Precision Levels Bridge
 */

export const LevelsGraphSolverCPP = {
  /**
   * Calculates world elevation for Level 0-30 based on world number and level index:
   */
  computeLevelBaseElevationFeet: (levelNumber: number, worldNumber: number = 1): number => {
    const base = (worldNumber - 1) * 100.0;
    const tierOffset = (levelNumber % 10) * 12.5;
    return Number((base + tierOffset).toFixed(2));
  }
};

export default LevelsGraphSolverCPP;
