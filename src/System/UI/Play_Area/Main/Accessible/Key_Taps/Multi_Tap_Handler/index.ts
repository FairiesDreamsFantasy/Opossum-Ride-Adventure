/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modular Multi-Tap Handler for Accessible Screen-Reader Navigation
 */

import { SystemRegistry } from "../../../../../../Registry";
import { computeForwardNavigationTarget } from "../Forward_Obstacle";

const { Measurement: MeasurementEngine, Utils: MathUtils } = SystemRegistry.Engine.Mathematics;

export interface MultiTapContext {
  currentLevel: number;
  foyerX: number;
  foyerY: number;
  foyerDirection: string;
  levelDistanceTraveled: number;
  isImperial: boolean;
  activePlaceId?: string;
  isTTSMuted: boolean;
  speakWords: (text: string, force?: boolean) => void;
  setStatusMessage: (msg: string) => void;
  setIsTTSMuted: (val: boolean | ((prev: boolean) => boolean)) => void;
  getPlaceDescription: () => string;
}

export class MultiTapNavigator {
  private keyPressCount = 0;
  private keyPressTimer: any = null;
  private shiftZCount = 0;
  private shiftZTimer: any = null;

  public handleKeyDown(e: KeyboardEvent, ctx: MultiTapContext): boolean {
    const key = e.key;

    // Shift + Z (double tap) -> Toggle TTS Mute
    if (e.shiftKey && (key === "Z" || key === "z")) {
      this.shiftZCount++;
      if (this.shiftZTimer) clearTimeout(this.shiftZTimer);
      if (this.shiftZCount === 2) {
        this.shiftZCount = 0;
        ctx.setIsTTSMuted((prev) => {
          const nextVal = !prev;
          if (!nextVal) {
            ctx.speakWords("Screen reader voice unmuted.", true);
            ctx.setStatusMessage("TTS: Unmuted");
          } else {
            window.speechSynthesis?.cancel();
            ctx.setStatusMessage("TTS: Muted");
          }
          return nextVal;
        });
      } else {
        this.shiftZTimer = setTimeout(() => {
          this.shiftZCount = 0;
        }, 300);
      }
      return true;
    }

    // "a" (Cedella layout) or "u" (Arden Denis layout)
    if (key === "a" || key === "A" || key === "u" || key === "U") {
      this.keyPressCount++;
      if (this.keyPressTimer) clearTimeout(this.keyPressTimer);

      this.keyPressTimer = setTimeout(() => {
        if (this.keyPressCount === 2) {
          // Double-tap -> Speak place description
          const desc = ctx.getPlaceDescription();
          ctx.speakWords(desc);
          ctx.setStatusMessage(`Description: ${desc.substring(0, 45)}...`);
        } else if (this.keyPressCount >= 3) {
          // Triple-tap -> Announce position & forward obstacle
          let basePositionAnnouncement = "";
          if (ctx.currentLevel === 0) {
            basePositionAnnouncement = `You are at position ${MathUtils.round(ctx.foyerX)}, ${MathUtils.round(ctx.foyerY)} of the floor foyer, facing ${ctx.foyerDirection}.`;
          } else {
            const distStr = MeasurementEngine.formatDistance(ctx.levelDistanceTraveled, ctx.isImperial, true);
            basePositionAnnouncement = `You are at ${distStr} of ${ctx.activePlaceId || "Level " + ctx.currentLevel} via a course path, facing ${ctx.foyerDirection}.`;
          }

          // Dynamic Forward Obstacle / Door Target Computation
          const forwardTarget = computeForwardNavigationTarget({
            currentLevel: ctx.currentLevel,
            foyerX: ctx.foyerX,
            foyerY: ctx.foyerY,
            foyerDirection: ctx.foyerDirection,
            isImperial: ctx.isImperial,
            courseProgressDistance: ctx.levelDistanceTraveled,
            currentPlaceName: ctx.activePlaceId
          });

          const fullAnnouncement = `${basePositionAnnouncement} ${forwardTarget}`;
          ctx.speakWords(fullAnnouncement);
          ctx.setStatusMessage(fullAnnouncement);
        }
        this.keyPressCount = 0;
      }, 300);

      return true;
    }

    return false;
  }
}

export const multiTapNavigator = new MultiTapNavigator();
export default multiTapNavigator;
