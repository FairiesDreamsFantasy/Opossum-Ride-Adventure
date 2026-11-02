/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KADY_ROSE_DESCRIPTION, KADY_ROSE_DIMENSIONS } from "../Description";
import { KadyAnimations } from "../Animations";
import { playKadyChatter } from "../Sounds/Elegant_Chatter";

export class KadyRoseGeneralEngine {
  public static readonly characterId = "kady_rose";
  public static readonly characterName = "Kady Rose";

  public static getProfile() {
    return {
      id: "kady_rose",
      name: "Kady Rose",
      gender: "Female",
      sex: "Female",
      shoulderHeight: KADY_ROSE_DIMENSIONS.shoulderHeightText,
      width: KADY_ROSE_DIMENSIONS.bodyWidthInches,
      length: KADY_ROSE_DIMENSIONS.bodyLengthInches,
      headWidth: KADY_ROSE_DIMENSIONS.headWidthInches,
      headHeight: KADY_ROSE_DIMENSIONS.headHeightInches,
      color: "Light Gray",
      eyeColor: "Light-Green",
      noseColor: "Red-Orange",
      tailColor: "Red-Orange",
      innerEarColor: "Reddish-brown",
      outerEarColor: "Light Gray",
      pawColor: "Saffron",
      skinColor: "Dark-Brown",
      headOrientation: "perched on top of her neck",
      description: KADY_ROSE_DESCRIPTION,
      strideFrequency: 3.4,
      chatterStartFreq: 1168.0032,
      chatterEndFreq: 404.3088,
      chatterVolume: 0.198,
      isBabylonFree: true,
      isFancyOpossum: true,
      furryFacePercentage: KADY_ROSE_DIMENSIONS.furryFacePercentage
    };
  }

  public static render(ctx: CanvasRenderingContext2D, x: number, y: number, is3D: boolean = true): void {
    if (is3D) {
      KadyAnimations.draw3D(ctx, x, y);
    } else {
      KadyAnimations.draw2D(ctx, x, y);
    }
  }

  public static vocalize(ctx: AudioContext, destination?: AudioNode): void {
    playKadyChatter(ctx, false, destination);
  }
}

export default KadyRoseGeneralEngine;
