/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VideoCardSpecification {
  targetFPS: number;
  canvasResolutionWidth: number;
  canvasResolutionHeight: number;
  aspectRatio: string;
}

export const VideoCardRegistry: VideoCardSpecification = {
  targetFPS: 60,
  canvasResolutionWidth: 840,
  canvasResolutionHeight: 400,
  aspectRatio: "2.1:1 Landscape"
};
