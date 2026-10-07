/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MonkeyBehaviorsRegistry } from "../Behaviors";
import { MonkeyAcrobaticsRegistry } from "../Acrobatics";
import { MonkeyNavigationRegistry } from "../Navigation";

export const MonkeyAIRegistry = {
  name: "Monkey_AI_Registry",
  category: "Animal",
  species: "Monkey",
  Behaviors: MonkeyBehaviorsRegistry,
  Acrobatics: MonkeyAcrobaticsRegistry,
  Navigation: MonkeyNavigationRegistry,
  isPureScientific: true
};
