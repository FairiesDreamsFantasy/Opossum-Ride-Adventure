/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CropFieldAcousticsKernelCPP = {
  standard: "Sabine Crop Stalk Scattering & Slate Block Acoustic Kernel",
  computeStalkAttenuationDB: (stalkDensityPerSqM: number, moistureRatio: number, distanceM: number): number => {
    const alpha = Math.min(0.85, Math.max(0.08, 0.12 + stalkDensityPerSqM * 0.002 + moistureRatio * 0.18));
    return Number((distanceM * alpha * 0.14).toFixed(4));
  },
  computeSlateBlockKineticDecel: (speedMs: number): number => {
    const muSlate = 0.74;
    return Number((speedMs * muSlate * 0.016667).toFixed(6));
  }
};

export default CropFieldAcousticsKernelCPP;
