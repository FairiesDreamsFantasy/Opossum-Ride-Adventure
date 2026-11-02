/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
import { MONKEY_SOUND_DEFINITIONS } from "./General";

export const MonkeysSoundRegistry = {
  name: "Monkeys Sound Category Registry",
  description: "Sound activation mappings for monkey chatters, vocalizations, and opponent cries.",
  sounds: MONKEY_SOUND_DEFINITIONS,
  count: MONKEY_SOUND_DEFINITIONS.length
};
