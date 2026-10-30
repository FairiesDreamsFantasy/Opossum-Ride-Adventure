/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IvanOpossumProfile, IvanOpossumGeneral } from "../../../../../../../Characters/Opossums/Ivan_Opossum";

export const IvanOpossumCompactCraftedRegistry = {
  id: "ivan_opossum",
  profile: IvanOpossumProfile,
  general: IvanOpossumGeneral,
  category: "compact" as const,
  isCrafted: true
};

export default IvanOpossumCompactCraftedRegistry;
