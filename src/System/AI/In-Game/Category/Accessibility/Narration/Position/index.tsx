/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArenaNarrationRegistry } from "../Arena/Registry";

export class PositionNarrationEngine {
  /**
   * Generates a position announcement combining progress, level name, and compass direction.
   * Delegates dynamically to modular arena handlers (Foyer, Garden, Cellar, Porch)
   * eliminating hard-coded coordinate branches.
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
    return ArenaNarrationRegistry.compilePosition(
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
}

export default PositionNarrationEngine;
