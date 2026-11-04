/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GeminiCellarGenerativeNarration = {
  id: "gemini_cellar_generative",
  name: "Gemini Generative Cellar Narration",
  compileGenerativeScene: (prompt?: string): string => {
    const base = prompt || "You stand in the subterranean Grand Cellar.";
    return `[Gemini AI Live Narrative]: ${base} Subterranean stone reverberation echoes deeply across masonry arches.`;
  }
};

export default GeminiCellarGenerativeNarration;
