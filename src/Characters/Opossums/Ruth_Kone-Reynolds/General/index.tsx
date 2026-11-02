/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RUTH_KONE_REYNOLDS_DESCRIPTION, RUTH_KONE_REYNOLDS_DIMENSIONS } from "../Description";
import { RuthAnimations } from "../Animations";
import { playRuthChatter } from "../Sounds/Elegant_Chatter";

export class RuthKoneReynoldsGeneralEngine {
  public static readonly characterId = "ruth_kone_reynolds";
  public static readonly characterName = "Ruth Kone-Reynolds";

  public static getProfile() {
    return {
      id: "ruth_kone_reynolds",
      name: "Ruth Kone-Reynolds",
      gender: "Female",
      sex: "Female",
      shoulderHeight: RUTH_KONE_REYNOLDS_DIMENSIONS.shoulderHeightText,
      width: RUTH_KONE_REYNOLDS_DIMENSIONS.bodyWidthInches,
      length: RUTH_KONE_REYNOLDS_DIMENSIONS.bodyLengthInches,
      headWidth: RUTH_KONE_REYNOLDS_DIMENSIONS.headWidthInches,
      headHeight: RUTH_KONE_REYNOLDS_DIMENSIONS.headHeightInches,
      color: "Pink",
      eyeColor: "Sky Blue",
      noseColor: "Light Pink",
      tailColor: "Pink",
      innerEarColor: "Reddish-brown",
      outerEarColor: "Pink",
      pawColor: "Orange",
      skinColor: "Dark-Brown",
      headOrientation: "perched on top of her neck",
      description: RUTH_KONE_REYNOLDS_DESCRIPTION,
      strideFrequency: 3.4,
      chatterStartFreq: 1162.377216,
      chatterEndFreq: 402.361344,
      chatterVolume: 0.198,
      isBabylonFree: true,
      isFancyOpossum: true,
      furryFacePercentage: RUTH_KONE_REYNOLDS_DIMENSIONS.furryFacePercentage
    };
  }

  public static render(ctx: CanvasRenderingContext2D, x: number, y: number, is3D: boolean = true): void {
    if (is3D) {
      RuthAnimations.draw3D(ctx, x, y);
    } else {
      RuthAnimations.draw2D(ctx, x, y);
    }
  }

  public static vocalize(ctx: AudioContext, destination?: AudioNode): void {
    playRuthChatter(ctx, false, destination);
  }
}

export default RuthKoneReynoldsGeneralEngine;
