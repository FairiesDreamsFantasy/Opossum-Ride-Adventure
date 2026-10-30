/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, RiderCharacter } from "../../../../../../types";
import { SceneNarrationEngine, SceneNarrationContext } from "./Scene";
import { PositionNarrationEngine } from "./Position";
import { MountNarrationEngine } from "./Mount";
import { RiderNarrationEngine } from "./Rider";
import { ArenaNarration } from "./Arena";
import { WelcomeMessageEngine } from "./Welcome_Message";

export * from "./Arena";
export * from "./Welcome_Message";

/**
 * In-Game AI Local Narration System - Modular Entry Point
 * 
 * Reassembles the modularized narration engines into a single, cohesive interface.
 * Maintains 100% backward compatibility while establishing an ultra-scientific 
 * organizational structure.
 */
export class InGameLocalNarrationEngine {
  public static Arena = ArenaNarration;
  public static WelcomeMessage = WelcomeMessageEngine;
  /**
   * Generates a complete, offline scene description.
   * Migrated to: ./Scene/index.tsx
   */
  public static compileSceneDescription(ctx: SceneNarrationContext): string {
    return SceneNarrationEngine.compileSceneDescription(ctx);
  }

  /**
   * Generates a position announcement combining progress, level name, and compass direction.
   * Migrated to: ./Position/index.tsx
   */
  public static compilePositionAnnouncement(
    levelId: number,
    levelName: string | undefined,
    placeId: string,
    foyerX: number,
    foyerY: number,
    foyerDirection: string,
    playerZ: number,
    formattedDistance: string,
    segmentDirection: string
  ): string {
    return PositionNarrationEngine.compilePositionAnnouncement(
      levelId,
      levelName,
      placeId,
      foyerX,
      foyerY,
      foyerDirection,
      playerZ,
      formattedDistance,
      segmentDirection
    );
  }

  /**
   * Generates an ultra-precise description for the ridden Opossum (the animal mount) welcome.
   * Migrated to: ./Mount/index.tsx
   */
  public static compileRiddenOpossumProfile(op: OpossumCharacter): string {
    return MountNarrationEngine.compileRiddenOpossumProfile(op);
  }

  /**
   * Generates the un-diluted Selection Screen profile when 'r' key is pressed.
   * Migrated to: ./Mount/index.tsx
   */
  public static compileSelectionOpossumProfile(op: OpossumCharacter): string {
    return MountNarrationEngine.compileSelectionOpossumProfile(op);
  }

  /**
   * Generates a description for the chosen Rider character.
   * Migrated to: ./Rider/index.tsx
   */
  public static compileRiderPersonProfile(rider: RiderCharacter): string {
    return RiderNarrationEngine.compileRiderPersonProfile(rider);
  }

  /**
   * Generates a combined narrative describing both the Rider (person) and the Opossum (mount).
   */
  public static compileActiveRiderAndOpossumProfile(rider: RiderCharacter, op: OpossumCharacter): string {
    const riderText = this.compileRiderPersonProfile(rider);
    const opossumText = this.compileRiddenOpossumProfile(op);
    return `${riderText} ${opossumText}`;
  }

  /**
   * Backward-compatible alias for compileRiddenOpossumProfile.
   */
  public static compileRiderProfile(op: OpossumCharacter): string {
    return this.compileRiddenOpossumProfile(op);
  }
}

export type { SceneNarrationContext };
export const InGameNarration = InGameLocalNarrationEngine;
export default InGameNarration;
