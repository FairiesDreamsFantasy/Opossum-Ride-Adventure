/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const RiceFieldCPP = {
  computeTerraceFlowLitersSec: (areaSqM: number, pumpDuty: number): number => Number((areaSqM * pumpDuty * 0.0045).toFixed(4))
};
