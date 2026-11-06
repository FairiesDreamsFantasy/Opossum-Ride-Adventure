/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Daisy Rose 3D Bone Skinning Matrix
 * Native C++ High-Precision Feature Kernel
 */

export interface ISkeletalTransformMatrix {
  m00: number; m01: number; m02: number; m03: number;
  m10: number; m11: number; m12: number; m13: number;
  m20: number; m21: number; m22: number; m23: number;
  m30: number; m31: number; m32: number; m33: number;
}

export const DaisyRoseAnimationMatrixCPP = {
  /**
   * Calculates 3D spine bone rotation matrix for Daisy Rose during trot gait:
   */
  computeSpineBoneTransform: (stridePhaseRad: number): ISkeletalTransformMatrix => {
    const pitch = Math.sin(stridePhaseRad) * 0.08;
    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);

    return {
      m00: 1, m01: 0, m02: 0, m03: 0,
      m10: 0, m11: Number(cosP.toFixed(6)), m12: Number((-sinP).toFixed(6)), m13: 0,
      m20: 0, m21: Number(sinP.toFixed(6)), m22: Number(cosP.toFixed(6)), m23: 0,
      m30: 0, m31: 0, m32: 0, m33: 1
    };
  }
};

export default DaisyRoseAnimationMatrixCPP;
