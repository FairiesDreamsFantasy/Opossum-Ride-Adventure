/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GeminiGenerativeSceneCompiler = {
  compilePrompt: (placeId: string, levelName?: string, baseDescription?: string): string => {
    return `Generate a high-fidelity atmospheric audio description for place ${placeId} (${levelName || 'Estate'}). Base: ${baseDescription || 'Natural arena'}. Include physical acoustic reverberation, surface substrate friction, and ambient wildlife cues.`;
  }
};

export default GeminiGenerativeSceneCompiler;
