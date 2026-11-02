/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ItemsGeneralRegistry } from "./General";
import { EdibleTreatsRegistry } from "./Edible_Treats";
import { EdibleTreatsTemplatesRegistry } from "./Edible_Treats/Templates";

export * from "./General";
export * from "./Edible_Treats";
export * from "./Edible_Treats/Templates";

export const SystemItemsRegistry = {
  general: ItemsGeneralRegistry,
  edibleTreats: EdibleTreatsRegistry,
  edibleTreatsTemplates: EdibleTreatsTemplatesRegistry
};
