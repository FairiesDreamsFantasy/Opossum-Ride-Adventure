/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeralPigSquealSound } from "../Squeal";
import { FeralPigSnortSound } from "../Snort";
import { FeralPigMovementSound, FeralPigSurfaceAcoustic } from "../Movements";
import { FeralPigVocalSound } from "../Vocals";
import { FeralPigSmashSound } from "../Smash";
import { FeralPigStereoCalibrator, FeralPigSpatialParameters } from "../Spatial";

export type FeralPigSFXType =
  | "squeal"
  | "snort"
  | "walk"
  | "trot"
  | "gallop"
  | "charge"
  | "vocal_grunt"
  | "lane_grunt"
  | "forage_snuffle"
  | "alert_chuff"
  | "stunned"
  | "smash";

export interface FeralPigSoundOptions {
  pitchOffset?: number;
  gender?: "Boar" | "Sow";
  surface?: FeralPigSurfaceAcoustic;
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
    const surface = options.surface ?? "soil";

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
      case "walk":
        return FeralPigMovementSound.playWalk(context, targetDestination, pitch, surface);
      case "trot":
        return FeralPigMovementSound.playTrot(context, targetDestination, pitch, surface);
      case "gallop":
        return FeralPigMovementSound.playGallop(context, targetDestination, pitch, surface);
      case "charge":
        return FeralPigMovementSound.playCharge(context, targetDestination, pitch, surface, options.gender ?? "Boar");
      case "vocal_grunt":
        return FeralPigVocalSound.playGrunt(context, targetDestination, pitch);
      case "lane_grunt":
        return FeralPigVocalSound.playLaneSwitchGrunt(
          context,
          targetDestination,
          options.gender ?? "Boar",
          options.pitchOffset ?? 1.0
        );
      case "forage_snuffle":
        return FeralPigVocalSound.playForageSnuffle(
          context,
          targetDestination,
          options.gender ?? "Boar",
          options.pitchOffset ?? 1.0
        );
      case "alert_chuff":
        return FeralPigVocalSound.playAlertChuff(
          context,
          targetDestination,
          options.gender ?? "Boar",
          options.pitchOffset ?? 1.0
        );
      case "stunned":
        return FeralPigVocalSound.playStunned(
          context,
          targetDestination,
          options.gender ?? "Boar",
          options.pitchOffset ?? 1.0
        );
      case "smash":
        return FeralPigSmashSound.playSmash(context, targetDestination, pitch);
    }
  }
}
