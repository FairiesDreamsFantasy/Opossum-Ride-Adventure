/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardLayoutType } from "../../../../../../types";

export interface KeyTapEventHistory {
  key: string;
  timestamp: number;
}

export interface InGameKeyTapState {
  history: KeyTapEventHistory[];
  doubleTapTimer: any;
  shiftZCount: number;
  shiftZTimer: any;
}

export class InGameKeyTapManager {
  private state: InGameKeyTapState = {
    history: [],
    doubleTapTimer: null,
    shiftZCount: 0,
    shiftZTimer: null
  };

  /**
   * Resets all timers and histories.
   */
  public reset(): void {
    if (this.state.doubleTapTimer) clearTimeout(this.state.doubleTapTimer);
    if (this.state.shiftZTimer) clearTimeout(this.state.shiftZTimer);
    this.state.history = [];
    this.state.doubleTapTimer = null;
    this.state.shiftZCount = 0;
    this.state.shiftZTimer = null;
  }

  /**
   * Handles Shift+Z double tap for TTS Muting.
   * Returns true if a double tap toggle was successfully completed.
   */
  public handleShiftZTtsToggle(e: KeyboardEvent): boolean {
    const key = e.key;
    if (e.shiftKey && (key === "Z" || key === "z")) {
      const now = Date.now();
      const recentZ = this.state.history.filter(
        (item) => (item.key === "Z" || item.key === "z") && now - item.timestamp < 1000
      );
      recentZ.push({ key: "Z", timestamp: now });

      this.state.history = [
        ...this.state.history.filter((item) => item.key !== "Z" && item.key !== "z"),
        { key: "Z", timestamp: now }
      ];

      if (recentZ.length >= 2) {
        this.state.history = this.state.history.filter((item) => item.key !== "Z" && item.key !== "z");
        return true;
      }
    }
    return false;
  }

  /**
   * Evaluates 'a' or 'u' multi-tap sequence.
   * On double-tap, fires onDoubleTap callback after the timeout window.
   * On triple-tap, immediately cancels double-tap timer and fires onTripleTap callback.
   */
  public handleMultiTapKey(
    key: string,
    layout: KeyboardLayoutType,
    onDoubleTap: () => void,
    onTripleTap: () => void,
    windowMs: number = 350
  ): boolean {
    const pressedKey = key.toLowerCase();
    const isTargetKey =
      (pressedKey === "a" && layout === KeyboardLayoutType.CEDELLA) ||
      (pressedKey === "u" && layout === KeyboardLayoutType.ARDEN_DENIS);

    if (!isTargetKey) return false;

    const now = Date.now();
    const recent = this.state.history.filter(
      (item) => item.key === pressedKey && now - item.timestamp < 1200
    );
    recent.push({ key: pressedKey, timestamp: now });

    this.state.history = [
      ...this.state.history.filter((item) => item.key !== pressedKey),
      ...recent
    ];

    if (recent.length === 2) {
      if (this.state.doubleTapTimer) clearTimeout(this.state.doubleTapTimer);
      this.state.doubleTapTimer = setTimeout(() => {
        onDoubleTap();
        this.state.history = this.state.history.filter((item) => item.key !== pressedKey);
        this.state.doubleTapTimer = null;
      }, windowMs);
      return true;
    } else if (recent.length >= 3) {
      if (this.state.doubleTapTimer) {
        clearTimeout(this.state.doubleTapTimer);
        this.state.doubleTapTimer = null;
      }
      this.state.history = this.state.history.filter((item) => item.key !== pressedKey);
      onTripleTap();
      return true;
    }

    return false;
  }
}

export const InGameKeyTaps = InGameKeyTapManager;
export default InGameKeyTaps;
