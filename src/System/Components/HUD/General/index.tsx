/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameLevel } from "../../../../types";

export interface HUDComponentProps {
  currentLevelId: number;
  currentLevel: GameLevel;
  playerZ: number;
  score: number;
  ticksEaten: number;
  Measured_Distance_Value: (meters: number) => string;
  getEdibleItemName: (levelId: number) => string;
  largeText?: boolean;
  themeStyle?: "default" | "storybook" | "transparent" | "quilted" | "forest";
}

export const HUDGeneral = {
  version: "1.0.0",
  type: "Modular In-Game HUD System",
  status: "ACTIVE"
};
