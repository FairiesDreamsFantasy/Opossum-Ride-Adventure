/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CropFieldYieldModelPython = {
  id: "crop_field_yield_model_python",
  roboticStewardsEnabled: true,
  slaveryOrPlantationProhibited: true,
  estimateStalkWaveVector: (windVelocityMs: number, cropStiffness: number, tSec: number): number => {
    const omega = Math.max(0.5, windVelocityMs * 0.45 / Math.max(0.2, cropStiffness));
    return Number((Math.sin(omega * tSec) * Math.min(0.22, windVelocityMs * 0.018)).toFixed(5));
  }
};

export default CropFieldYieldModelPython;
