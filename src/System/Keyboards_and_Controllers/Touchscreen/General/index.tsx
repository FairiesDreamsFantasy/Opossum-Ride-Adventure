/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TouchVector {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startTime: number;
}

export type TouchAction = "left" | "right" | "jump" | "pause" | "none";

export interface TouchscreenConfig {
  swipeThresholdPx: number;
  tapMaxDurationMs: number;
  hapticFeedback: boolean;
}

export const DEFAULT_TOUCH_CONFIG: TouchscreenConfig = {
  swipeThresholdPx: 25,
  tapMaxDurationMs: 250,
  hapticFeedback: true
};

/**
 * Calculates gesture vector from touch coordinates
 */
export function interpretSwipeGesture(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  threshold: number = 25
): TouchAction {
  const dx = endX - startX;
  const dy = endY - startY;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);

  if (absX < threshold && absY < threshold) {
    return "none";
  }

  // Dominant vertical upward swipe
  if (dy < -threshold && absY > absX) {
    return "jump";
  }

  // Dominant horizontal swipe
  if (absX > absY) {
    return dx > 0 ? "right" : "left";
  }

  return "none";
}

/**
 * Triggers safe, native device haptic vibration
 */
export function triggerHapticFeedback(pattern: number | number[] = 15): void {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignored if permissions or platform restricts vibration
    }
  }
}
