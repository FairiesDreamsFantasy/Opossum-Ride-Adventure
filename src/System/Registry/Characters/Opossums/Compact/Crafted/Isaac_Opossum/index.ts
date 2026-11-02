/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IsaacOpossumProfile, IsaacOpossumGeneral } from "../../../../../../../Characters/Opossums/Isaac_Opossum";

export const IsaacOpossumCompactCraftedRegistry = {
  id: "isaac_opossum",
  profile: IsaacOpossumProfile,
  general: IsaacOpossumGeneral,
  category: "compact" as const,
  isCrafted: true
};

export default IsaacOpossumCompactCraftedRegistry;
