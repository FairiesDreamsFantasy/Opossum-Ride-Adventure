/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const BarleyFieldCPP = {
  computeAwnAcousticScatter: (density: number): number => Number((density * 0.042).toFixed(4))
};
