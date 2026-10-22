/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { generatePigColorCombination, PigColorProfile } from "../../Animations/Color_Palette";
import { SmashedPigMechanic, SmashedPigRenderState } from "../../Animations/Attributes/Smashed";
import { FeralPigSoundDispatcher, FeralPigSFXType } from "../../../../System/Sound/SFX/Category/Feral_Pig";

export interface FeralPigEntity {
  id: string;
  name: string;
  gender: "Boar" | "Sow";
  colorProfile: PigColorProfile;
  x: number;
  y: number;
  z: number;
  speed: number;
  direction: 1 | -1;
  isSmashed: boolean;
  smashTimestamp?: number;
  arenaType: "garden" | "cave" | "orchard" | "farm" | "trail";
}

export class FeralPigManager {
  /**
   * Spawns a procedural feral pig from over 10,000 sustainable color combinations
   */
  public static spawnFeralPig(
    seed: number,
    gender: "Boar" | "Sow",
    arenaType: FeralPigEntity["arenaType"],
    initialX: number = 0,
    initialY: number = 0
  ): FeralPigEntity {
    const colorProfile = generatePigColorCombination(seed, gender);
    return {
      id: `pig_${seed}_${gender.toLowerCase()}`,
      name: colorProfile.name,
      gender,
      colorProfile,
      x: initialX,
      y: initialY,
      z: 0,
      speed: gender === "Boar" ? 5.2 : 4.6,
      direction: (seed % 2 === 0) ? 1 : -1,
      isSmashed: false,
      arenaType
    };
  }

  /**
   * Smash execution: Triggered when player lands an opossum jump on the feral pig
   */
  public static smashPig(
    pig: FeralPigEntity,
    currentTimeMs: number,
    audioCtx?: AudioContext,
    audioDest?: AudioNode,
    listenerPos?: { x: number; y: number; z?: number }
  ) {
    if (pig.isSmashed) return;
    pig.isSmashed = true;
    pig.smashTimestamp = currentTimeMs;

    if (audioCtx && audioDest) {
      const spatial = listenerPos ? {
        pigX: pig.x,
        pigY: pig.y,
        pigZ: pig.z,
        listenerX: listenerPos.x,
        listenerY: listenerPos.y,
        listenerZ: listenerPos.z ?? 0
      } : undefined;

      FeralPigSoundDispatcher.play("smash", audioCtx, audioDest, {
        gender: pig.gender,
        spatial
      });
    }
  }

  /**
   * Evaluates if pig is ready to be erased from RAM after 3 seconds of score display
   */
  public static getSmashRenderStatus(
    pig: FeralPigEntity,
    currentTimeMs: number
  ): SmashedPigRenderState {
    if (!pig.isSmashed || !pig.smashTimestamp) {
      return SmashedPigMechanic.calculateSmashState(-1);
    }
    const elapsed = currentTimeMs - pig.smashTimestamp;
    return SmashedPigMechanic.calculateSmashState(elapsed);
  }
}
