/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MONKEY_TROOPS, MonkeyTroopInfo } from "./General";
export * from "./General";

export const MonkeyTroopsRegistry = {
  id: "monkey-troops-registry",
  name: "Monkey Troops Registry",
  troops: MONKEY_TROOPS,
  troopList: ["Chandler","Andrews","Chapman","Curtis","Edgar","Finch","Gerard","Gilbert","Goring","Gray","Middleton","Williams"],
  version: "1.0.0-scientific",
  timestamp: new Date().toISOString()
};
