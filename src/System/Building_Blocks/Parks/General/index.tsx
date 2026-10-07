/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ParkStructureSpecification {
  id: string;
  type: "standard_park" | "zoo_enclosure";
  name: string;
  acreage: number;
  hasBenchRestAreas: boolean;
  cageSecurityRating: number | null; // rating only if zoo_enclosure
  animalSpeciesCount: number;        // if zoo_enclosure
}

export const PARK_METADATA = {
  id: "park_standard",
  name: "Civic Public Recreational Park"
};
