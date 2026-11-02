/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AccessoriesGeneralTemplate } from "./General";
import { TiaraTemplate } from "./Tiara";
import { PairOfEarringsTemplate } from "./Pair_Of_Earrings";
import { NecklaceAndCharmTemplate } from "./Necklace_And_Charm";

export * from "./General";
export * from "./Tiara";
export * from "./Pair_Of_Earrings";
export * from "./Necklace_And_Charm";

export const OpossumAccessoriesRegistry = {
  general: AccessoriesGeneralTemplate,
  tiara: TiaraTemplate,
  earrings: PairOfEarringsTemplate,
  necklaceAndCharm: NecklaceAndCharmTemplate
};
