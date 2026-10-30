/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../../../../../types";
import { OpossumPreviewConfig } from "../General";
import { OpossumsAttributesDesign } from "../../../../../../../System/Registry/Characters/Opossums/Attributes/Design";

/**
 * Preview configurations for crafted Jill steeds resolved dynamically from the design registry.
 */
export function getCraftedOpossumPreviewConfig(id: OpossumId | string, defaultConfig: OpossumPreviewConfig): OpossumPreviewConfig | null {
  const mapping = OpossumsAttributesDesign.Visual_Mapping.getByOpossumId(id as string);
  
  if (mapping) {
    return {
      ...defaultConfig,
      ...mapping
    };
  }

  return null;
}

export default getCraftedOpossumPreviewConfig;
