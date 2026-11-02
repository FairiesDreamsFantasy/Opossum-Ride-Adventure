/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InGameAccessibilityConfig {
  localNarrationEnabled: boolean;
  radarProximityAlerts: boolean;
  multiTapWindowMs: number;
  speechCancelKey: string;
  defaultUnit: "Imperial" | "Metric";
}

export const DefaultInGameAccessibilityConfig: InGameAccessibilityConfig = {
  localNarrationEnabled: true,
  radarProximityAlerts: true,
  multiTapWindowMs: 350,
  speechCancelKey: "Control",
  defaultUnit: "Imperial"
};

export const InGameAccessibilityGeneral = {
  systemId: "in_game_accessibility_general",
  version: "1.0.0",
  config: DefaultInGameAccessibilityConfig,
  formatAnnouncement: (prefix: string, message: string): string => {
    return `${prefix ? prefix + ": " : ""}${message}`.trim();
  }
};

export default InGameAccessibilityGeneral;
