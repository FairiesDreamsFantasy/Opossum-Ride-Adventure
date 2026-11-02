/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GeoCoordinate {
  lat: number;
  lng: number;
  altitudeMeters?: number;
}

export type BiomeType = 
  | "Boreal Forest" 
  | "Appalachian Woodland" 
  | "Alpine Ridge" 
  | "Subtropical Rainforest" 
  | "Redwood Coast" 
  | "Savannah Scrub" 
  | "Mountain Hollow" 
  | "Wetland Marsh";

export interface ElevationNode {
  distanceMeters: number;
  elevationMeters: number;
  gradientPercent: number;
  slopeAngleDegrees: number;
  isNaturalRamp: boolean;
}

export interface StreetViewObstacleVector {
  type: "charging_moose" | "hidden_feral_pig" | "fallen_cedar" | "granite_boulder" | "root_knot";
  distanceOffsetMeters: number;
  lateralPosition: "left" | "center" | "right";
  ambushRiskFactor: number;
}

export interface StreetViewPanoVector {
  headingDegrees: number;
  canopyDensity: number; // 0.0 (open sky) to 1.0 (dense canopy)
  pathWidthMeters: number;
  surfaceRoughness: number; // 0.0 (smooth clay) to 1.0 (rocky scree)
  visibilityMeters: number;
  obstacles: StreetViewObstacleVector[];
}

export interface RealWorldArenaBlueprint {
  placeName: string;
  region: string;
  country: string;
  biome: BiomeType;
  coordinates: GeoCoordinate;
  elevationProfile: ElevationNode[];
  streetViewVector: StreetViewPanoVector;
  acoustics: {
    reverbDecaySec: number;
    helmholtzHz: number;
    absorptionAlpha: number;
    canopyEchoClarity: number;
  };
  environmentalPhysics: {
    baseFriction: number;
    airDensityKgM3: number;
    windVelocityMs: number;
    gravityMs2: number;
  };
}
