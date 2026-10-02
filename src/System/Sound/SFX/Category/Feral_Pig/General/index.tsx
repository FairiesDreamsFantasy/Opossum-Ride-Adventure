/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeralPigSquealSound } from "../Squeal";
import { FeralPigSnortSound } from "../Snort";
import { FeralPigMovementSound } from "../Movements";
import { FeralPigVocalSound } from "../Vocals";
import { FeralPigSmashSound } from "../Smash";
import { FeralPigStereoCalibrator, FeralPigSpatialParameters } from "../Spatial";

export type FeralPigSFXType = "squeal" | "snort" | "trot" | "charge" | "vocal_grunt" | "smash";

export interface FeralPigSoundOptions {
  pitchOffset?: number;
  gender?: "Boar" | "Sow";
  spatial?: FeralPigSpatialParameters;
}

export class FeralPigSoundDispatcher {
  public static play(
    type: FeralPigSFXType,
    context: AudioContext,
    destination: AudioNode,
    options: FeralPigSoundOptions = {}
  ) {
    const pitch = options.pitchOffset ?? (options.gender === "Sow" ? 1.15 : 0.95);

    // Ultra-precise stereophonic spatial routing:
    // If spatial parameters are provided, dynamically construct and route through the
    // calibrated stereophonic / atmospheric air absorption subchain.
    const targetDestination = options.spatial
      ? FeralPigStereoCalibrator.createSpatialSubchain(context, destination, options.spatial)
      : destination;

    switch (type) {
      case "squeal":
        return FeralPigSquealSound.play(context, targetDestination, pitch);
      case "snort":
        return FeralPigSnortSound.play(context, targetDestination, pitch);
      case "trot":
      case "charge":
        return FeralPigMovementSound.playTrot(context, targetDestination, pitch);
      case "vocal_grunt":
        return FeralPigVocalSound.playGrunt(context, targetDestination, pitch);
      case "smash":
        return FeralPigSmashSound.playSmash(context, targetDestination, pitch);
    }
  }
}
