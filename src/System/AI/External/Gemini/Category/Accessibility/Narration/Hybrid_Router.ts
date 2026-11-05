/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArenaNarrationRegistry } from "../../../../../In-Game/Category/Accessibility/Narration/Arena";
import { GeminiArenaGenerativeNarrationRegistry } from "./Arena";

export const GeminiHybridNarrationRouter = {
  /**
   * Dispatches scene narration: uses Gemini cloud generative narration when key active,
   * otherwise seamlessly falls back to offline local ArenaNarrationRegistry.
   */
  dispatchScene: (ctx: any, hasApiKey: boolean): string => {
    if (hasApiKey) {
      if (ctx.isFoyer || ctx.placeId === "floor_foyer") {
        return GeminiArenaGenerativeNarrationRegistry.Foyer.compileGenerativeScene(ctx.foyerPrompt);
      }
      if (ctx.placeId === "cellar" || ctx.placeId?.startsWith("stone_")) {
        return GeminiArenaGenerativeNarrationRegistry.Cellar.compileGenerativeScene(ctx.prompt);
      }
      if (ctx.placeId === "porch" || ctx.placeId?.includes("porch")) {
        return GeminiArenaGenerativeNarrationRegistry.Porch.compileGenerativeScene(ctx.prompt);
      }
      if (ctx.placeId === "manorsville" || ctx.placeId?.includes("dalesville")) {
        return GeminiArenaGenerativeNarrationRegistry.Manorsville.compileGenerativeScene(ctx.prompt);
      }
      return GeminiArenaGenerativeNarrationRegistry.Garden.compileGenerativeScene(ctx.gardenPrompt);
    }

    return ArenaNarrationRegistry.compileScene(ctx);
  }
};

export default GeminiHybridNarrationRouter;
