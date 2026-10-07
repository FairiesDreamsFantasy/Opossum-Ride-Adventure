/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GeminiAntiBotConfigModel {
  maxPromptsPerMinute: number;
  minPromptIntervalMs: number;
  burstLimit: number;
  requireHumanCadence: boolean;
}

export const GeminiAntiBotGeneralConfig: GeminiAntiBotConfigModel = {
  maxPromptsPerMinute: 20,
  minPromptIntervalMs: 1500,
  burstLimit: 3,
  requireHumanCadence: true
};
