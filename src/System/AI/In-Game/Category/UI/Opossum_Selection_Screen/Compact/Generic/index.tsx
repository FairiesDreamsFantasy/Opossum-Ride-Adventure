/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumPreviewConfig } from "../../General";
import { COMPACT_OPOSSUMS_REGISTRY, CompactOpossumDefinition } from "../../../../../../../../System/Registry/Characters/Opossums/Compact";

export * from "./Jacks";
export * from "./Jills";
export * from "./Colors";

import { getCompactJackPreview } from "./Jacks";
import { getCompactJillPreview } from "./Jills";
import { CompactColorRegistry } from "./Colors";

/**
 * Creates dynamic AI preview parameters for generic compact steeds
 */
export function getCompactGenericPreviewConfig(def: CompactOpossumDefinition): OpossumPreviewConfig {
  if (def.sex === "Jack" || def.gender === "Male") {
    return getCompactJackPreview(def.id);
  }
  return getCompactJillPreview(def);
}

export function findCompactGenericPreview(id: string): OpossumPreviewConfig | null {
  const found = CompactColorRegistry.list.find((o: CompactOpossumDefinition) => o.id === id);
  if (!found) return null;
  return getCompactGenericPreviewConfig(found);
}

export default getCompactGenericPreviewConfig;
