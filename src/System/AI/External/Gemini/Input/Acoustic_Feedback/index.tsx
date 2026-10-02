/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Local sound click-trigger parameters for screen reader and input verification feedback.
 */
export const InputAcousticFeedback = {
  /**
   * Retrieves the ideal synthesizer note frequency based on keyboard directional shifts.
   */
  getFeedbackFrequency(direction: string): number {
    switch (direction.toUpperCase()) {
      case "UP":
        return 660;
      case "DOWN":
        return 440;
      case "LEFT":
        return 330;
      case "RIGHT":
        return 550;
      case "JUMP":
        return 880;
      default:
        return 400;
    }
  }
};
