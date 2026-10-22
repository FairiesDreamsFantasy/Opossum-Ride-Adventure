/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StreetViewPanoVector, StreetViewObstacleVector, BiomeType } from "../types";

/**
 * Street View Environmental & Boundary Engine
 * Extracts 360-degree heading paths, canopy density, and line-of-sight metrics to dynamically
 * position charging Moose trajectories, feral pig ambush zones, and ambient forest acoustics.
 */
export class GeminiStreetViewEngine {
  private static instance: GeminiStreetViewEngine;

  public static getInstance(): GeminiStreetViewEngine {
    if (!GeminiStreetViewEngine.instance) {
      GeminiStreetViewEngine.instance = new GeminiStreetViewEngine();
    }
    return GeminiStreetViewEngine.instance;
  }

  /**
   * Synthesizes realistic 360-degree panoramic vectors based on the biome type
   */
  public generatePanoVector(
    biome: BiomeType,
    trackLengthMeters: number = 2000
  ): StreetViewPanoVector {
    let canopyDensity = 0.65;
    let pathWidth = 6.0;
    let surfaceRoughness = 0.45;
    let visibility = 120;

    switch (biome) {
      case "Boreal Forest":
        canopyDensity = 0.85;
        pathWidth = 5.0;
        surfaceRoughness = 0.55;
        visibility = 80;
        break;
      case "Appalachian Woodland":
        canopyDensity = 0.75;
        pathWidth = 5.5;
        surfaceRoughness = 0.40;
        visibility = 95;
        break;
      case "Alpine Ridge":
        canopyDensity = 0.15;
        pathWidth = 4.0;
        surfaceRoughness = 0.80;
        visibility = 250;
        break;
      case "Redwood Coast":
        canopyDensity = 0.92;
        pathWidth = 7.0;
        surfaceRoughness = 0.35;
        visibility = 70;
        break;
      case "Wetland Marsh":
        canopyDensity = 0.45;
        pathWidth = 4.5;
        surfaceRoughness = 0.65;
        visibility = 110;
        break;
      case "Savannah Scrub":
        canopyDensity = 0.25;
        pathWidth = 8.0;
        surfaceRoughness = 0.50;
        visibility = 180;
        break;
      default:
        canopyDensity = 0.60;
        pathWidth = 6.0;
        surfaceRoughness = 0.45;
        visibility = 100;
    }

    const obstacles: StreetViewObstacleVector[] = [];
    const obstacleCount = Math.floor(trackLengthMeters / 180);

    for (let i = 1; i <= obstacleCount; i++) {
      const distanceOffset = i * 180 + (Math.sin(i * 1.7) * 35);
      const rand = (Math.sin(i * 99.1) + 1) / 2;
      
      let type: StreetViewObstacleVector["type"] = "charging_moose";
      let lateralPosition: StreetViewObstacleVector["lateralPosition"] = "center";
      let ambushRisk = 0.5;

      if (canopyDensity > 0.7 && rand < 0.45) {
        // High canopy dense areas favor hidden Feral Pig ambushes on the flanks
        type = "hidden_feral_pig";
        lateralPosition = rand < 0.22 ? "left" : "right";
        ambushRisk = 0.85;
      } else if (rand > 0.75) {
        type = "fallen_cedar";
        lateralPosition = "center";
        ambushRisk = 0.4;
      } else if (rand > 0.55) {
        type = "granite_boulder";
        lateralPosition = rand < 0.65 ? "left" : "right";
        ambushRisk = 0.5;
      } else {
        // Open or moderate path favors charging Moose with monkey riders
        type = "charging_moose";
        lateralPosition = rand < 0.3 ? "left" : rand < 0.7 ? "center" : "right";
        ambushRisk = 0.7;
      }

      obstacles.push({
        type,
        distanceOffsetMeters: Math.round(distanceOffset),
        lateralPosition,
        ambushRiskFactor: parseFloat(ambushRisk.toFixed(2))
      });
    }

    return {
      headingDegrees: Math.round((Math.sin(trackLengthMeters) * 45 + 180) % 360),
      canopyDensity: parseFloat(canopyDensity.toFixed(2)),
      pathWidthMeters: parseFloat(pathWidth.toFixed(1)),
      surfaceRoughness: parseFloat(surfaceRoughness.toFixed(2)),
      visibilityMeters: visibility,
      obstacles
    };
  }
}

export const GeminiStreetView = GeminiStreetViewEngine.getInstance();
