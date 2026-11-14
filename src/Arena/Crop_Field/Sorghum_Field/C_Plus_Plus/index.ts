/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SorghumFieldCPP = {
  computePlumeDragCoeff: (stalkHeightM: number): number => Number((0.85 + stalkHeightM * 0.12).toFixed(4))
};
