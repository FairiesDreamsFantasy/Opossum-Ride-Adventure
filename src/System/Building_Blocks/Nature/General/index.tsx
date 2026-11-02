/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NatureFeatureType =
  | "forest"
  | "lake"
  | "river"
  | "stream"
  | "ground"
  | "cave"
  | "mountain"
  | "rock"
  | "cove"
  | "ocean"
  | "ocean_floor"
  | "glacier"
  | "sand"
  | "mud"
  | "dirt"
  | "pebbles"
  | "gravel"
  | "volcano"
  | "lava"
  | "magma"
  | "shale"
  | "clay"
  | "trench"
  | "tar_lake"
  | "plain"
  | "plateau"
  | "meadow"
  | "biodiversity_zone"
  | "tundra"
  | "mammoth_step"
  | "ice"
  | "snow"
  | "water"
  | "rain"
  | "lightning"
  | "clouds"
  | "wild_plants"
  | "wild_trees";

export interface NatureFeatureSpecification {
  id: string;
  type: NatureFeatureType;
  name: string;
  scaleFactor: number;             // generic size scale (1.0 default)
  moistureLevel: number;           // percentage value representing moisture
  temperatureRating: number;       // average temperature in Fahrenheit
  frictionCoefficient: number;     // physics properties
  roughnessCoefficient: number;    // terrain detail index
}

export const NATURE_METADATA = {
  id: "nature_standard",
  name: "Natural Geographical Feature"
};
