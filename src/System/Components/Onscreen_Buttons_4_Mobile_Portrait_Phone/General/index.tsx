/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Triggers safe, native mobile device haptic vibration
 */
export function triggerOnscreenHaptic(pattern: number | number[] = 15): void {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignored if permissions or platform restricts vibration
    }
  }
}

export interface OnscreenButtonsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onJump: () => void;
  onMoveUpStart?: () => void;
  onMoveUpEnd?: () => void;
  onMoveDownStart?: () => void;
  onMoveDownEnd?: () => void;
  onSetCruiseLowStop?: () => void;
  onSetCruiseHigh?: () => void;
  className?: string;
  showVisualButtons?: boolean;
}
