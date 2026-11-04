/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GeminiFoyerGenerativeNarration = {
  id: "gemini_foyer_generative",
  name: "Gemini Generative Floor Foyer Narration",
  compileGenerativeScene: (foyerPrompt?: string): string => {
    const base = foyerPrompt || "You are standing inside the grand 2,000 by 2,000-foot Floor Foyer.";
    return `[Gemini AI Live Narrative]: ${base} Atmospheric acoustics echo with 30-foot vault reflections over ceramic tile.`;
  }
};

export default GeminiFoyerGenerativeNarration;
