/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RiderPreviewConfig {
  scale: number;
  bobbingAmplitude: number;
  shadowColor: string;
}

export function getRiderPreviewConfig(riderId: string): RiderPreviewConfig {
  switch (riderId) {
    case "fairy_rider":
      return { scale: 1.25, bobbingAmplitude: 4, shadowColor: "rgba(34, 197, 94, 0.4)" };
    default:
      return { scale: 1.0, bobbingAmplitude: 2, shadowColor: "rgba(0, 0, 0, 0.3)" };
  }
}
