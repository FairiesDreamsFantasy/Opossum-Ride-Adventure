/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  RealWorldArenaBlueprint, 
  BiomeType, 
  GeoCoordinate 
} from "./types";
import { GeminiEarth } from "./Earth";
import { GeminiStreetView } from "./Street_View";

export * from "./types";
export * from "./Earth";
export * from "./Street_View";

/**
 * Sovereign Geographic Catalogue of Real-World Habitats
 * Grounded in authentic ecosystems where Virginia Opossums, Moose, and Feral Pigs interact.
 */
const REAL_WORLD_HABITAT_REGISTRY: {
  placeName: string;
  region: string;
  country: string;
  biome: BiomeType;
  coordinates: GeoCoordinate;
  baseElevationMeters: number;
  elevationVarianceMeters: number;
  reverbDecaySec: number;
  helmholtzHz: number;
  baseFriction: number;
}[] = [
  {
    placeName: "Shenandoah Ridge & Skyline Canopy",
    region: "Blue Ridge Mountains, Virginia",
    country: "United States",
    biome: "Appalachian Woodland",
    coordinates: { lat: 38.534, lng: -78.351, altitudeMeters: 1120 },
    baseElevationMeters: 1050,
    elevationVarianceMeters: 140,
    reverbDecaySec: 1.25,
    helmholtzHz: 75,
    baseFriction: 0.88
  },
  {
    placeName: "Algonquin Highland Spruce Trail",
    region: "Ontario Highlands",
    country: "Canada",
    biome: "Boreal Forest",
    coordinates: { lat: 45.553, lng: -78.596, altitudeMeters: 480 },
    baseElevationMeters: 450,
    elevationVarianceMeters: 85,
    reverbDecaySec: 1.45,
    helmholtzHz: 60,
    baseFriction: 0.82
  },
  {
    placeName: "Olympic Rainshadow & Cedar Mist Grove",
    region: "Olympic Peninsula, Washington",
    country: "United States",
    biome: "Redwood Coast",
    coordinates: { lat: 47.802, lng: -123.604, altitudeMeters: 620 },
    baseElevationMeters: 580,
    elevationVarianceMeters: 110,
    reverbDecaySec: 1.80,
    helmholtzHz: 45,
    baseFriction: 0.78
  },
  {
    placeName: "Great Smoky Deep Forest Hollow",
    region: "Tennessee / North Carolina Border",
    country: "United States",
    biome: "Mountain Hollow",
    coordinates: { lat: 35.613, lng: -83.553, altitudeMeters: 890 },
    baseElevationMeters: 820,
    elevationVarianceMeters: 160,
    reverbDecaySec: 1.60,
    helmholtzHz: 55,
    baseFriction: 0.85
  },
  {
    placeName: "Isle Royale Northern Wilderness",
    region: "Lake Superior Archipelago, Michigan",
    country: "United States",
    biome: "Boreal Forest",
    coordinates: { lat: 47.995, lng: -88.909, altitudeMeters: 220 },
    baseElevationMeters: 190,
    elevationVarianceMeters: 65,
    reverbDecaySec: 1.15,
    helmholtzHz: 90,
    baseFriction: 0.90
  },
  {
    placeName: "Blue Mountain Peak & Ital Forest Sanctuary",
    region: "Surrey County",
    country: "Jamaica",
    biome: "Subtropical Rainforest",
    coordinates: { lat: 18.046, lng: -76.579, altitudeMeters: 2256 },
    baseElevationMeters: 2100,
    elevationVarianceMeters: 220,
    reverbDecaySec: 1.95,
    helmholtzHz: 50,
    baseFriction: 0.74
  }
];

export class GeminiMapsService {
  private static instance: GeminiMapsService;
  private currentBlueprintIndex: number = 0;

  public static getInstance(): GeminiMapsService {
    if (!GeminiMapsService.instance) {
      GeminiMapsService.instance = new GeminiMapsService();
    }
    return GeminiMapsService.instance;
  }

  /**
   * Generates a complete real-world arena blueprint automatically for an arena/level.
   * Pulls authentic geographic coordinates and integrates Earth and Street View vector physics.
   */
  public generateArenaBlueprint(
    levelIndex: number = 1,
    trackLengthMeters: number = 2000
  ): RealWorldArenaBlueprint {
    const habitat = REAL_WORLD_HABITAT_REGISTRY[
      (levelIndex + this.currentBlueprintIndex) % REAL_WORLD_HABITAT_REGISTRY.length
    ];

    const elevationProfile = GeminiEarth.generateElevationProfile(
      habitat.baseElevationMeters,
      habitat.elevationVarianceMeters,
      trackLengthMeters,
      25
    );

    const streetViewVector = GeminiStreetView.generatePanoVector(
      habitat.biome,
      trackLengthMeters
    );

    return {
      placeName: habitat.placeName,
      region: habitat.region,
      country: habitat.country,
      biome: habitat.biome,
      coordinates: habitat.coordinates,
      elevationProfile,
      streetViewVector,
      acoustics: {
        reverbDecaySec: habitat.reverbDecaySec,
        helmholtzHz: habitat.helmholtzHz,
        absorptionAlpha: parseFloat((0.25 * streetViewVector.canopyDensity).toFixed(2)),
        canopyEchoClarity: parseFloat((1.0 - streetViewVector.canopyDensity * 0.4).toFixed(2))
      },
      environmentalPhysics: {
        baseFriction: habitat.baseFriction,
        airDensityKgM3: parseFloat((1.225 * (1.0 - habitat.coordinates.lat / 1000)).toFixed(3)),
        windVelocityMs: parseFloat((Math.sin(levelIndex) * 3.5 + 4.0).toFixed(1)),
        gravityMs2: 9.81
      }
    };
  }

  /**
   * Cycles to next geographic habitat for automatic world generation
   */
  public nextHabitat(): void {
    this.currentBlueprintIndex = (this.currentBlueprintIndex + 1) % REAL_WORLD_HABITAT_REGISTRY.length;
  }
}

export const GeminiMaps = GeminiMapsService.getInstance();
