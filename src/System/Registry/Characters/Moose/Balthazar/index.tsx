/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import BalthazarMoose from "../../../../../Characters/Moose/Balthazar";
import { BalthazarMooseGeneral } from "../../../../../Characters/Moose/Balthazar/General";

/**
 * System Registry entry for Balthazar the Gold Moose Villain.
 */
export const SystemRegistryBalthazarMoose = {
  registryKey: "character.moose.balthazar",
  description: "System registry mapping for Balthazar, the 7-foot gold villain moose ridden by malicious monkeys.",
  character: BalthazarMoose,
  general: BalthazarMooseGeneral,
  immutableContract: true
};

export default SystemRegistryBalthazarMoose;
