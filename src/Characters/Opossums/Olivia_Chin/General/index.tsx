/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OLIVIA_CHIN_DESCRIPTION, OLIVIA_CHIN_DIMENSIONS } from "../Description";
import { OliviaAnimations } from "../Animations";
import { playOliviaChatter } from "../Sounds/Elegant_Chatter";

export class OliviaChinGeneralEngine {
  public static readonly characterId = "olivia_chin";
  public static readonly characterName = "Olivia Chin";

  public static getProfile() {
    return {
      id: "olivia_chin",
      name: "Olivia Chin",
      gender: "Female",
      sex: "Female",
      shoulderHeight: OLIVIA_CHIN_DIMENSIONS.shoulderHeightText,
      width: OLIVIA_CHIN_DIMENSIONS.bodyWidthInches,
      length: OLIVIA_CHIN_DIMENSIONS.bodyLengthInches,
      headWidth: OLIVIA_CHIN_DIMENSIONS.headWidthInches,
      headHeight: OLIVIA_CHIN_DIMENSIONS.headHeightInches,
      color: "Blond",
      eyeColor: "Indigo",
      noseColor: "Reddish-brown",
      tailColor: "Reddish-brown",
      innerEarColor: "Reddish-brown",
      outerEarColor: "Blond",
      pawColor: "Saffron",
      headOrientation: "perched on top of her neck",
      description: OLIVIA_CHIN_DESCRIPTION,
      strideFrequency: 3.4,
      chatterStartFreq: 1312.74,
      chatterEndFreq: 454.41,
      chatterVolume: 0.19823,
      isBabylonFree: true,
      furryFacePercentage: OLIVIA_CHIN_DIMENSIONS.furryFacePercentage
    };
  }

  public static render(ctx: CanvasRenderingContext2D, x: number, y: number, is3D: boolean = true): void {
    if (is3D) {
      OliviaAnimations.draw3D(ctx, x, y);
    } else {
      OliviaAnimations.draw2D(ctx, x, y);
    }
  }

  public static vocalize(ctx: AudioContext, destination?: AudioNode): void {
    playOliviaChatter(ctx, false, destination);
  }
}

export default OliviaChinGeneralEngine;
