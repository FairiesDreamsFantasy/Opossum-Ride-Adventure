/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCrashSound as playGeneralCollision } from "./General";
import { playFenceCollision } from "./Fence";
import { playGardenPlantCollision } from "./Garden_Plant";
import { playRockCollision } from "./Rock";
import { playTriangularStoneFenceCollision } from "./Triangular_Stone_Fence";

export { playGeneralCollision };
export { playFenceCollision } from "./Fence";
export { playGardenPlantCollision } from "./Garden_Plant";
export { playRockCollision } from "./Rock";
export { playTriangularStoneFenceCollision } from "./Triangular_Stone_Fence";

export const playCollisionSoundByObstacle = (type: string, context: AudioContext, destination: AudioNode) => {
  switch (type) {
    case "fence":
      return playFenceCollision(context, destination);
    case "garden_plant":
      return playGardenPlantCollision(context, destination);
    case "rock":
      return playRockCollision(context, destination);
    case "triangular_stone_fence":
      return playTriangularStoneFenceCollision(context, destination);
    default:
      return playGeneralCollision(context, destination);
  }
};
