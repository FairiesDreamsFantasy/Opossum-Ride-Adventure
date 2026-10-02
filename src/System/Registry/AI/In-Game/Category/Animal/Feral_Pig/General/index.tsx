/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeralPigBehaviorsRegistry } from "../Behaviors";
import { FeralPigNavigationRegistry } from "../Navigation";
import { FeralPigCollisionRegistry } from "../Collision";
import { FeralPigIncludedViaAnyArenaRegistry } from "../Included_Via_Any_Arena";

export const FeralPigAIRegistry = {
  name: "Feral_Pig_AI_Registry",
  category: "Animal",
  species: "Feral_Pig",
  Behaviors: FeralPigBehaviorsRegistry,
  Navigation: FeralPigNavigationRegistry,
  Collision: FeralPigCollisionRegistry,
  IncludedViaAnyArena: FeralPigIncludedViaAnyArenaRegistry,
  isPureScientific: true
};
