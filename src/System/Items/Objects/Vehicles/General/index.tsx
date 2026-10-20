/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VehicleSpecification {
  id: string;
  name: string;
  vehicleType: "steam_train" | "electric_tram" | "trolley" | "subway_car";
  length: number;           // total length in meters
  width: number;            // width in meters
  carriageCount: number;    // number of coupled cabins/carriages
  gaugeRequirement: "standard" | "narrow" | "broad" | "tram";
  maxOperatingSpeed: number;
}

export const VEHICLE_METADATA = {
  id: "vehicle_standard",
  name: "Standard Decorative Tram Car"
};
