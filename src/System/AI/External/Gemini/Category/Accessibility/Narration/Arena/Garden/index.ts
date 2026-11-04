/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GeminiGardenGenerativeNarration = {
  id: "gemini_garden_generative",
  name: "Gemini Generative Garden Narration",
  compileGenerativeScene: (gardenPrompt?: string): string => {
    const base = gardenPrompt || "You are riding through the expansive Garden Arena.";
    return `[Gemini AI Live Narrative]: ${base} Natural canopy breezes and rich soil acoustics hum in real time.`;
  }
};

export default GeminiGardenGenerativeNarration;
