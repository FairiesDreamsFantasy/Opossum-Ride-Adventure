/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./Crafted";
export * from "./Generic";

import { getCompactCraftedPreviewConfig } from "./Crafted";
import { findCompactGenericPreview } from "./Generic";
import { OpossumPreviewConfig } from "../General";

export function resolveCompactPreviewConfig(id: string): OpossumPreviewConfig | null {
  // Check crafted compact first (Drake, Rudy)
  const crafted = getCompactCraftedPreviewConfig(id);
  if (crafted) return crafted;

  // Check generic compact colors
  return findCompactGenericPreview(id);
}

export default resolveCompactPreviewConfig;
