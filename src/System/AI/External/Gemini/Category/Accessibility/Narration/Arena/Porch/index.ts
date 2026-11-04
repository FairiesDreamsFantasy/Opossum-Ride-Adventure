/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GeminiPorchGenerativeNarration = {
  id: "gemini_porch_generative",
  name: "Gemini Generative Porch Narration",
  compileGenerativeScene: (prompt?: string): string => {
    const base = prompt || "You are riding along the 4,000-foot Southwest Porch perimeter walkway.";
    return `[Gemini AI Live Narrative]: ${base} Open-air veranda breezes whisper over cedar plank decking.`;
  }
};

export default GeminiPorchGenerativeNarration;
