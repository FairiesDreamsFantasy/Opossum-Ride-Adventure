/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GameTTSAnnouncement {
  id: string;
  message: string;
  priority: "low" | "medium" | "high" | "critical";
  category: "encounter" | "hazard" | "score" | "navigation" | "milestone";
  timestamp: number;
}

export class InGameTTSGovernor {
  private static lastAnnouncementTime: number = 0;
  private static readonly THROTTLE_INTERVAL_MS = 2500;

  /**
   * Resolves contextual TTS announcement avoiding spam and respecting accessibility standards
   */
  public static shouldAnnounce(
    announcement: GameTTSAnnouncement,
    currentTime: number,
    screenReaderEnabled: boolean
  ): boolean {
    if (!screenReaderEnabled) return false;
    
    // Critical events bypass standard throttling
    if (announcement.priority === "critical") {
      this.lastAnnouncementTime = currentTime;
      return true;
    }

    if (currentTime - this.lastAnnouncementTime < this.THROTTLE_INTERVAL_MS) {
      return false; // Throttled
    }

    this.lastAnnouncementTime = currentTime;
    return true;
  }

  /**
   * Generates formatted announcement for feral pig encounters without hardcoding
   */
  public static formatPigEncounterMessage(
    gender: "Boar" | "Sow",
    colorName: string,
    action: "rooting" | "charging" | "smashed"
  ): string {
    switch (action) {
      case "smashed":
        return gender + " smashed! +250 score points.";
      case "charging":
        return "Watch out! " + colorName + " " + gender + " is charging!";
      case "rooting":
      default:
        return "Encountered a " + colorName + " " + gender + " rooting in the arena.";
    }
  }
}
