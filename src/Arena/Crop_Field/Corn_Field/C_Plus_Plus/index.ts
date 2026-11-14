/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CornFieldCPP = {
  computeLeafFlutterHz: (windSpeed: number): number => Number((1.2 + windSpeed * 0.18).toFixed(4))
};
