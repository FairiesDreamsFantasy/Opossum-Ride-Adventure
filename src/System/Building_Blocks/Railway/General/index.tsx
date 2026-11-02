/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RailwayTrackSpecification {
  id: string;
  gaugeType: "standard" | "narrow" | "broad" | "tram"; // rail gauge distance
  trackMaterial: "steel" | "bronze" | "iron";
  sleeperSpacing: number;                             // distance between ties (meters)
  catenaryVoltage: number | null;                     // overhead power (null represents non-electrified track)
  maxSpeedLimit: number;                              // structural speed limit
}

export const RAILWAY_TRACK_METADATA = {
  id: "railway_standard",
  name: "Dual Steel Railway Line"
};
