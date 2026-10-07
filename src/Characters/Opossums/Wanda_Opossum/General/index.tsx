/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WANDA_OPOSSUM_DESCRIPTION, WANDA_OPOSSUM_DIMENSIONS } from "../Description";
import { WandaAnimations } from "../Animations";
import { playWandaChatter } from "../Sounds/Elegant_Chatter";

export class WandaOpossumGeneralEngine {
  public static readonly characterId = "wanda";
  public static readonly characterName = "Wanda Opossum";

  public static getProfile() {
    return {
      id: "wanda",
      name: "Wanda Opossum",
      gender: "Female",
      sex: "Female",
      shoulderHeight: WANDA_OPOSSUM_DIMENSIONS.shoulderHeightText,
      width: WANDA_OPOSSUM_DIMENSIONS.bodyWidthInches,
      length: WANDA_OPOSSUM_DIMENSIONS.bodyLengthInches,
      headWidth: WANDA_OPOSSUM_DIMENSIONS.headWidthInches,
      headHeight: WANDA_OPOSSUM_DIMENSIONS.headHeightInches,
      color: "Light Amber",
      eyeColor: "Indigo",
      noseColor: "Red",
      tailColor: "Red",
      innerEarColor: "Reddish-brown",
      outerEarColor: "Light-Amber",
      pawColor: "Saffron",
      headOrientation: "perched on top of her neck",
      description: WANDA_OPOSSUM_DESCRIPTION,
      strideFrequency: 3.4,
      chatterStartFreq: 1109.75,
      chatterEndFreq: 366.70,
      chatterVolume: 0.194225,
      isBabylonFree: true,
      furryFacePercentage: WANDA_OPOSSUM_DIMENSIONS.furryFacePercentage
    };
  }

  public static render(ctx: CanvasRenderingContext2D, x: number, y: number, is3D: boolean = true): void {
    if (is3D) {
      WandaAnimations.draw3D(ctx, x, y);
    } else {
      WandaAnimations.draw2D(ctx, x, y);
    }
  }

  public static vocalize(ctx: AudioContext, destination?: AudioNode): void {
    playWandaChatter(ctx, false, destination);
  }
}

export default WandaOpossumGeneralEngine;
