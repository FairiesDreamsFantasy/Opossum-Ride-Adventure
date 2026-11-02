/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumsAttributesGeneral } from "./General";
import { OpossumsAttributesDesign } from "./Design";

export const OpossumsAttributesRegistry = {
  id: "opossums_attributes",
  name: "Opossums Attributes",
  General: OpossumsAttributesGeneral,
  Design: OpossumsAttributesDesign,
};

export default OpossumsAttributesRegistry;
