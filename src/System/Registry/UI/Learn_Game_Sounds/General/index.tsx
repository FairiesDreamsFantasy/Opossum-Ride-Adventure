/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "../Tab_Control";
export * from "../Feral_Pigs";
export * from "../Opossums";
export * from "../Monkeys";
export * from "../Moose";
export * from "../Obstacle_Collisions";

import { LearnGameSoundsTabControlRegistry } from "../Tab_Control";
import { FeralPigSoundRegistry } from "../Feral_Pigs";
import { OpossumsSoundRegistry } from "../Opossums";
import { MonkeysSoundRegistry } from "../Monkeys";
import { MooseSoundRegistry } from "../Moose";
import { ObstacleCollisionsSoundRegistry } from "../Obstacle_Collisions";

export const LearnGameSoundsRegistryGeneral = {
  name: "Learn Game Sounds System Registry",
  description: "Comprehensive registry for all interactive sound demonstrations in Opossum Ride Adventure.",
  tabControl: LearnGameSoundsTabControlRegistry,
  feralPigs: FeralPigSoundRegistry,
  opossums: OpossumsSoundRegistry,
  monkeys: MonkeysSoundRegistry,
  moose: MooseSoundRegistry,
  obstacles: ObstacleCollisionsSoundRegistry,
  timestamp: new Date().toISOString()
};

