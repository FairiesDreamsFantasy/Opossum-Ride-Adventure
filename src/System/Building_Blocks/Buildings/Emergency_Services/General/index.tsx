/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EmergencyServiceSpecification {
  id: string;
  type: "fire_house" | "ambulance_station" | "police_station";
  name: string;
  bayDoorsCount: number; // Number of vehicle dispatch bays
  backUpGeneratorActive: boolean;
  communicationsTowerHeight: number; // Tower height in feet
}

export const EMERGENCY_SERVICE_METADATA = {
  id: "emergency_standard",
  name: "Civic Emergency Dispatch Center"
};
