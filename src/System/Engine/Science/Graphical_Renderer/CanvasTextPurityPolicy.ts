/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * CanvasTextPurityPolicy — Deterministic Canvas Text & Immersion Gatekeeper.
 * Ensures 3D POV and Rider views remain free of static debug clutter while
 * preserving meaningful dynamic scoring popups, doorway signage, chalkboard
 * blueprint telemetry, and pirated-cartridge enforcement banners.
 */

export type CanvasTextCategory =
  | "arcade_score_popup"
  | "doorway_signage"
  | "physical_world_sign"
  | "pirated_cart_notice"
  | "chalkboard_dynamic"
  | "blueprint_2d"
  | "opponent_indicator_tag"
  | "static_wall_marker"
  | "unconditional_zone_hud";

export interface CanvasRenderTextContext {
  is3D: boolean;
  isChalkboard: boolean;
  isPiratedCart: boolean;
  showOpponentIndicators: boolean;
  viewMode: string;
}

export class CanvasTextPurityPolicy {
  /**
   * Evaluates whether a specific category of text is scientifically permitted
   * to be drawn onto the HTML5 <canvas> surface in the current render pass.
   */
  public static shouldRenderTextCategory(
    category: CanvasTextCategory,
    ctxState: CanvasRenderTextContext
  ): boolean {
    switch (category) {
      case "arcade_score_popup":
        // Dynamic arcade point deltas (+50, feral pig / unmounted moose smash scores)
        return true;

      case "doorway_signage":
        // Signage next to/above doorways always renders in Chalkboard, 2D blueprint, and Pirated Cartridge modes
        return Boolean(ctxState.isChalkboard || ctxState.isPiratedCart || !ctxState.is3D);

      case "physical_world_sign":
        // Crafted physical wall-mounted or post-mounted signs (always visible in 3D, 2D, Chalkboard, and screenshots)
        return true;

      case "pirated_cart_notice":
        // Copyleft enforcement static overlays strictly for pirated cartridge builds
        return Boolean(ctxState.isPiratedCart);

      case "chalkboard_dynamic":
        // Dynamic spatial coordinates, speed, and heading telemetry in Chalkboard Only mode
        return Boolean(ctxState.isChalkboard);

      case "blueprint_2d":
        // Orthographic architectural labels when rendering 2D top-down or Chalkboard view
        return !ctxState.is3D || Boolean(ctxState.isChalkboard);

      case "opponent_indicator_tag":
        // Moose/Monkey/Goat status & identity tags strictly gated behind Visual HUD Tags
        return Boolean(ctxState.showOpponentIndicators);

      case "static_wall_marker":
      case "unconditional_zone_hud":
        // Prohibited on authentic 3D POV / Rider canvas surfaces to prevent visual clutter
        return false;

      default:
        return false;
    }
  }

  /**
   * Formats concise, non-cluttering dynamic telemetry for Chalkboard blueprint mode.
   */
  public static formatChalkboardDynamicLine(params: {
    levelId: number;
    playerZ: number;
    targetDistance: number;
    speed: number;
    foyerX?: number;
    foyerY?: number;
    foyerDirection?: string;
    activeEntities?: number;
  }): string {
    const safeSpeed = Number.isFinite(params.speed) ? Math.abs(params.speed).toFixed(1) : "0.0";
    if (params.levelId === 0) {
      const fx = Number.isFinite(params.foyerX) ? Math.round(params.foyerX!) : 1000;
      const fy = Number.isFinite(params.foyerY) ? Math.round(params.foyerY!) : 1000;
      const dir = (params.foyerDirection || "North").toUpperCase();
      return `CHALKBOARD TELEMETRY | POS (${fx}ft, ${fy}ft) | HEADING: ${dir} | SPD: ${safeSpeed}`;
    }
    const zPos = Number.isFinite(params.playerZ) ? Math.round(params.playerZ) : 0;
    const target = Number.isFinite(params.targetDistance) ? Math.round(params.targetDistance) : 0;
    const entities = Number.isFinite(params.activeEntities) ? Math.max(0, Math.round(params.activeEntities!)) : 0;
    return `CHALKBOARD TELEMETRY | LVL ${params.levelId} | Z: ${zPos}/${target}m | SPD: ${safeSpeed} | ENTITIES: ${entities}`;
  }
}
