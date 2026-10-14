/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AccessibilityEngineConfigModel {
  name: "System Accessibility Engine";
  version: "0.1.0.2";
  standard: "40,000,000,000%_ULTRA_BROAD";
  wcagAAMinimumContrastRatio: 4.5;
  wcagAAALargeContrastRatio: 7.0;
  spatialAudioChannelWidthDeg: number;
  frequencyRangeHz: { min: number; max: number };
  tactileFeedbackSampleRate: number;
}

export const AccessibilityEngineGeneralConfig: AccessibilityEngineConfigModel = {
  name: "System Accessibility Engine",
  version: "0.1.0.2",
  standard: "40,000,000,000%_ULTRA_BROAD",
  wcagAAMinimumContrastRatio: 4.5,
  wcagAAALargeContrastRatio: 7.0,
  spatialAudioChannelWidthDeg: 180,
  frequencyRangeHz: { min: 60, max: 12000 },
  tactileFeedbackSampleRate: 60
};
