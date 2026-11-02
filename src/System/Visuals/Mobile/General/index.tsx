/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MobileViewportMetrics {
  width: number;
  height: number;
  devicePixelRatio: number;
  isPortrait: boolean;
  isPhablet: boolean;
  aspectRatio: number;
}

export const MOBILE_VISUAL_DEFAULTS = {
  minTouchTargetPx: 48,
  portraitFovMultiplier: 1.25,
  retroScanlineOpacity: 0.12,
  doubleScreenSplitRatio: 0.52 // Upper screen ~52%, Lower touch deck ~48%
};

/**
 * Accurately analyzes the client viewport dimensions
 */
export function getMobileViewportMetrics(): MobileViewportMetrics {
  if (typeof window === "undefined") {
    return {
      width: 390,
      height: 844,
      devicePixelRatio: 2,
      isPortrait: true,
      isPhablet: false,
      aspectRatio: 390 / 844
    };
  }

  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = window.devicePixelRatio || 1;
  const isPortrait = h >= w;
  const isPhablet = isPortrait ? w >= 420 && w <= 768 : h >= 420 && h <= 768;

  return {
    width: w,
    height: h,
    devicePixelRatio: dpr,
    isPortrait,
    isPhablet,
    aspectRatio: w / (h || 1)
  };
}
