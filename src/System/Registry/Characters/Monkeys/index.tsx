/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MonkeyTroopsRegistry } from "./Troops";
import { KendraCurtisRegistry } from "./Kendra_Curtis";
import { JaredAndrewsRegistry } from "./Jared_Andrews";
import { ColtGrayRegistry } from "./Colt_Gray";

export const MonkeysSystemRegistry = {
  category: "System Characters",
  Troops: MonkeyTroopsRegistry,
  Kendra_Curtis: KendraCurtisRegistry,
  Jared_Andrews: JaredAndrewsRegistry,
  Colt_Gray: ColtGrayRegistry,
  // Aliases
  Kendra: KendraCurtisRegistry,
  Jared: JaredAndrewsRegistry,
  Colt: ColtGrayRegistry
};

export * from "./General";
export * from "./Templates";
export * from "./Troops";
export * from "./Kendra_Curtis";
export * from "./Jared_Andrews";
export * from "./Colt_Gray";
