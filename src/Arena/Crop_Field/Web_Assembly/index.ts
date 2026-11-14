/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CropFieldRaycastWASM = {
  id: "crop_field_raycast_wasm",
  detectTriangularStoneFenceAhead: (playerZ: number, fenceZList: number[]): number | null => {
    for (let i = 0; i < fenceZList.length; i++) {
      const dist = fenceZList[i] - playerZ;
      if (dist > 0 && dist <= 120) {
        return Number(dist.toFixed(2));
      }
    }
    return null;
  }
};

export default CropFieldRaycastWASM;
