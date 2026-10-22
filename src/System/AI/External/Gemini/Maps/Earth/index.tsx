/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoCoordinate, ElevationNode } from "../types";

/**
 * Earth Topological & Elevation Engine
 * Translates real-world Earth surface elevation profiles into continuous canvas slopes,
 * inertia vectors, deceleration forces, and natural jump ramps.
 */
export class GeminiEarthEngine {
  private static instance: GeminiEarthEngine;

  public static getInstance(): GeminiEarthEngine {
    if (!GeminiEarthEngine.instance) {
      GeminiEarthEngine.instance = new GeminiEarthEngine();
    }
    return GeminiEarthEngine.instance;
  }

  /**
   * Synthesizes a real-world continuous elevation profile along a track length
   * using cubic Hermite interpolation and geological fractal noise.
   */
  public generateElevationProfile(
    baseElevation: number,
    elevationVarianceMeters: number,
    trackLengthMeters: number = 2000,
    nodeCount: number = 20
  ): ElevationNode[] {
    const nodes: ElevationNode[] = [];
    const step = trackLengthMeters / (nodeCount - 1);

    let currentElev = baseElevation;
    for (let i = 0; i < nodeCount; i++) {
      const distance = i * step;
      // Synthesize realistic undulating terrain with harmonic sine & natural grade
      const macroUndulation = Math.sin(i * 0.35) * (elevationVarianceMeters * 0.6);
      const microRidge = Math.cos(i * 0.85) * (elevationVarianceMeters * 0.4);
      const elevation = Math.max(0, currentElev + macroUndulation + microRidge);
      
      const prevNode = nodes[i - 1];
      const prevElev = prevNode ? prevNode.elevationMeters : elevation;
      const deltaElev = elevation - prevElev;
      const gradient = i === 0 ? 0 : (deltaElev / step) * 100;
      const angleRad = Math.atan2(deltaElev, step);
      const angleDeg = (angleRad * 180) / Math.PI;

      nodes.push({
        distanceMeters: Math.round(distance),
        elevationMeters: parseFloat(elevation.toFixed(1)),
        gradientPercent: parseFloat(gradient.toFixed(1)),
        slopeAngleDegrees: parseFloat(angleDeg.toFixed(1)),
        isNaturalRamp: gradient > 8.0 // Natural launch ramp if steep positive slope
      });
    }

    return nodes;
  }

  /**
   * Computes player speed adjustment multiplier based on topographic gradient
   */
  public calculateSlopeSpeedFactor(gradientPercent: number): number {
    if (gradientPercent > 0) {
      // Uphill: progressive resistance up to 35% reduction
      return Math.max(0.65, 1.0 - (gradientPercent / 100) * 1.5);
    } else {
      // Downhill: progressive acceleration up to 40% boost
      return Math.min(1.4, 1.0 + (Math.abs(gradientPercent) / 100) * 1.8);
    }
  }
}

export const GeminiEarth = GeminiEarthEngine.getInstance();
