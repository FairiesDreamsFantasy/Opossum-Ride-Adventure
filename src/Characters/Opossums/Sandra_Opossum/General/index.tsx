/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SANDRA_OPOSSUM_DESCRIPTION, SANDRA_OPOSSUM_DIMENSIONS } from "../Description";
import { SandraAnimations } from "../Animations";
import { playSandraChatter } from "../Sounds/Elegant_Chatter";

export class SandraOpossumGeneralEngine {
  public static readonly characterId = "sandra";
  public static readonly characterName = "Sandra Opossum";

  public static getProfile() {
    return {
      id: "sandra",
      name: "Sandra Opossum",
      gender: "Female",
      sex: "Female",
      shoulderHeight: SANDRA_OPOSSUM_DIMENSIONS.shoulderHeightText,
      width: SANDRA_OPOSSUM_DIMENSIONS.bodyWidthInches,
      length: SANDRA_OPOSSUM_DIMENSIONS.bodyLengthInches,
      headWidth: SANDRA_OPOSSUM_DIMENSIONS.headWidthInches,
      headHeight: SANDRA_OPOSSUM_DIMENSIONS.headHeightInches,
      color: "Lavender",
      eyeColor: "Dark-Blue",
      noseColor: "Pink",
      tailColor: "Pink",
      innerEarColor: "Pink",
      outerEarColor: "Lavender",
      pawColor: "Light-Pink",
      skinColor: "Light Brown",
      headOrientation: "perched on top of her neck",
      description: SANDRA_OPOSSUM_DESCRIPTION,
      strideFrequency: 3.4,
      chatterStartFreq: 1150,
      chatterEndFreq: 380,
      chatterVolume: 0.198,
      isBabylonFree: true,
      isFancyOpossum: true,
      furryFacePercentage: SANDRA_OPOSSUM_DIMENSIONS.furryFacePercentage
    };
  }

  public static render(ctx: CanvasRenderingContext2D, x: number, y: number, is3D: boolean = true): void {
    if (is3D) {
      SandraAnimations.draw3D(ctx, x, y);
    } else {
      SandraAnimations.draw2D(ctx, x, y);
    }
  }

  public static vocalize(ctx: AudioContext, destination?: AudioNode): void {
    playSandraChatter(ctx, false, destination);
  }
}

export default SandraOpossumGeneralEngine;
