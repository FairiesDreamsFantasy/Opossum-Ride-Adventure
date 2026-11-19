/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./Drake_Kone_Reynolds";
export * from "./Rudy_Kone_Reynolds";
export * from "./Eugene_Rose";
export * from "./Arnold_Rose";
export * from "./Ivan_Opossum";
export * from "./Isaac_Opossum";

import { DRAKE_AI_PREVIEW_CONFIG } from "./Drake_Kone_Reynolds";
import { RUDY_AI_PREVIEW_CONFIG } from "./Rudy_Kone_Reynolds";
import { EUGENE_AI_PREVIEW_CONFIG } from "./Eugene_Rose";
import { ARNOLD_AI_PREVIEW_CONFIG } from "./Arnold_Rose";
import { IVAN_AI_PREVIEW_CONFIG } from "./Ivan_Opossum";
import { ISAAC_AI_PREVIEW_CONFIG } from "./Isaac_Opossum";
import { OpossumPreviewConfig } from "../../General";

export const COMPACT_CRAFTED_AI_PREVIEWS: Record<string, OpossumPreviewConfig> = {
  drake_kone_reynolds: DRAKE_AI_PREVIEW_CONFIG,
  rudy_kone_reynolds: RUDY_AI_PREVIEW_CONFIG,
  eugene_rose: EUGENE_AI_PREVIEW_CONFIG,
  arnold_rose: ARNOLD_AI_PREVIEW_CONFIG,
  ivan_opossum: IVAN_AI_PREVIEW_CONFIG,
  isaac_opossum: ISAAC_AI_PREVIEW_CONFIG
};

export function getCompactCraftedPreviewConfig(id: string): OpossumPreviewConfig | null {
  return COMPACT_CRAFTED_AI_PREVIEWS[id] || null;
}

export default COMPACT_CRAFTED_AI_PREVIEWS;
