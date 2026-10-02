/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getOpossumPreviewConfig } from "../../../../../../../AI/In-Game/Category/UI/Opossum_Selection_Screen/General";

/**
 * System Registry helper mapping character IDs to their dynamic preview and UI layouts.
 */
export const SaffronRoseRegistryUIHelper = {
  getPreviewConfig: getOpossumPreviewConfig,
  registeredTraits: [
    "bodyColor",
    "scale",
    "tailColor",
    "tailHasSpiral",
    "isFurryTail",
    "hasNecklace",
    "hasHeartCharm",
    "bodyPattern"
  ]
};
