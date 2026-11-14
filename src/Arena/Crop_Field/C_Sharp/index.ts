/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CropFieldTransitionState = "CONNECTED_FROM_CATTLE_FARM" | "ACTIVE_HARVEST_PATROL" | "FENCE_APPROACH_ALERT";

export const CropFieldStateMachineCSharp = {
  currentState: "CONNECTED_FROM_CATTLE_FARM" as CropFieldTransitionState,
  validateNextFenceSpacing: (prevZ: number, nextZ: number): boolean => {
    const delta = Math.abs(nextZ - prevZ);
    return delta >= 500 && delta <= 2000;
  }
};

export default CropFieldStateMachineCSharp;
