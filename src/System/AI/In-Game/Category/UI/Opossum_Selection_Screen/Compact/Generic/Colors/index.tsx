/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COMPACT_OPOSSUMS_REGISTRY, CompactOpossumDefinition } from "../../../../../../../../../System/Registry/Characters/Opossums/Compact";
import { getCompactJillPreview } from "../Jills";

/**
 * Color registry mapping and lookup for the 64 generic compact coats.
 */
export const CompactColorRegistry = {
  totalCount: COMPACT_OPOSSUMS_REGISTRY.length,
  list: COMPACT_OPOSSUMS_REGISTRY,
  getPreview: (id: string) => {
    const found = COMPACT_OPOSSUMS_REGISTRY.find((o: CompactOpossumDefinition) => o.id === id);
    return found ? getCompactJillPreview(found) : null;
  }
};

export default CompactColorRegistry;
