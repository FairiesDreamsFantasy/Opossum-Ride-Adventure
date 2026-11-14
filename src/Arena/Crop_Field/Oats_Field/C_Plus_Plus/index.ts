/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const OatsFieldCPP = {
  computePanicleShimmerFreq: (windVelocity: number): number => Number((1900 + windVelocity * 55).toFixed(2))
};
