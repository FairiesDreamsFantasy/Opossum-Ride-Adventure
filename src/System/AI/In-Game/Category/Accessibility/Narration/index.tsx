/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceResolver } from "../../../../../Engine/Resolver";
import { OpossumCharacter } from "../../../../../../types";

export interface SceneNarrationContext {
  levelId: number;
  levelName?: string;
  placeId: string;
  surfaceType?: string;
  theme?: string;
  longDescription?: string;
  isFoyer?: boolean;
  foyerPrompt?: string;
  foyerReverb?: string;
  foyerExtended?: string;
  settings?: {
    announceReverb?: boolean;
    extendedInfo?: boolean;
    announceDoors?: boolean;
    chatterNotifications?: boolean;
  };
}

export class InGameLocalNarrationEngine {
  /**
   * Generates a complete, offline scene description without external cloud latency.
   */
  public static compileSceneDescription(ctx: SceneNarrationContext): string {
    if (ctx.isFoyer || ctx.placeId === "floor_foyer") {
      let desc = ctx.foyerPrompt || "You are inside the grand Floor Foyer of the Manor.";
      if (ctx.settings?.announceReverb && ctx.foyerReverb) {
        desc += ` The reverb profile is ${ctx.foyerReverb}.`;
      }
      if (ctx.settings?.extendedInfo && ctx.foyerExtended) {
        desc += ` ${ctx.foyerExtended}`;
      }
      return desc;
    }

    const resolvedPlace = PlaceResolver.resolvePlace(ctx.placeId, ctx.levelName);
    const name = ctx.levelName || resolvedPlace.name || "Unknown Arena";
    const surface = ctx.surfaceType || resolvedPlace.surfaceType || "natural terrain";
    const atmosphere = ctx.theme || resolvedPlace.ambientNoise || "Serene";
    const longDesc = ctx.longDescription || resolvedPlace.longDescription || resolvedPlace.description || "";

    const base = `You are currently at ${name}. This is a ${surface} environment. The atmosphere is ${atmosphere}.`;
    return longDesc ? `${base} ${longDesc}` : base;
  }

  /**
   * Generates a position announcement combining progress, level name, and compass direction.
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
    if (levelId === 0) {
      const px = Math.round(foyerX);
      const py = Math.round(foyerY);
      return `You are at position ${px}, ${py} of the floor foyer, facing ${foyerDirection}.`;
    }

    const resolvedPlace = PlaceResolver.resolvePlace(placeId, levelName);
    const activeName = levelName || resolvedPlace.name || "Course";
    return `You are at ${formattedDistance} of ${activeName} via a course path, facing ${segmentDirection.toLowerCase()}.`;
  }

  /**
   * Generates a rider profile description for the active opossum.
   */
  public static compileRiderProfile(op: OpossumCharacter): string {
    const isMale = op.gender === "Male" || (op.gender as string) === "Jack" || op.sex === "Jack";
    const sub = isMale ? "He" : "She";

    if (op.description && typeof op.description === "string" && op.description.length > 50) {
      return `You are riding ${op.name}. ${op.description}`;
    }

    const shoulderHeight = op.shoulderHeight || (op.size ? `${(op.size * 5.25).toFixed(2)} feet` : "5 feet and 3 inches");
    const width = op.width || 36;
    const length = op.length || 86;
    const fur = op.color;
    const eyes = op.eyeColor || "Blue";
    const nose = op.noseColor || "Pink";
    const tail = op.tailColor || "Pink";
    const innerEars = op.innerEarColor || "Pink";
    const head = op.headOrientation || "perched on top of her neck";

    return `You are riding ${op.name}, a ${op.gender || op.sex} opossum. ${sub} has a shoulder height of ${shoulderHeight}. ${sub} is ${width} inches wide and ${length} inches long. Fur color: ${fur}. Eyes: ${eyes}. Nose: ${nose}. Tail: ${tail}. Inner ears: ${innerEars}. Head orientation is ${head}.`;
  }
}

export const InGameNarration = InGameLocalNarrationEngine;
export default InGameNarration;
