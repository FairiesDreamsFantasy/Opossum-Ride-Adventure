/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LearnGameSoundsAIConfig {
  interactiveGridEnabled: boolean;
  frequencyRangePreview: boolean;
  offlineVocalizationEngine: boolean;
  synthesizerPresetValidation: boolean;
}

export const LearnGameSoundsGeneralAIConfig: LearnGameSoundsAIConfig = {
  interactiveGridEnabled: true,
  frequencyRangePreview: true,
  offlineVocalizationEngine: true,
  synthesizerPresetValidation: true
};

export function getLearnGameSoundsAIConfig(): LearnGameSoundsAIConfig {
  return { ...LearnGameSoundsGeneralAIConfig };
}
