/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const WheatFieldCPP = {
  computeWheatSwayRad: (windSpeed: number, phase: number): number => Number((Math.sin(phase) * Math.min(0.25, windSpeed * 0.02)).toFixed(5))
};
