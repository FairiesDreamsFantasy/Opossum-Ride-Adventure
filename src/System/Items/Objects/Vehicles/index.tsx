/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { VehicleSpecification, VEHICLE_METADATA } from "./General";

interface VehicleProps {
  spec: VehicleSpecification;
  className?: string;
}

export const Vehicle: React.FC<VehicleProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Vehicle_Object_${spec.id}`}
      className={`relative rounded border p-3 bg-zinc-950/40 border-zinc-800/60 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-zinc-400 uppercase tracking-wider mb-2">
        {spec.name} ({spec.vehicleType})
      </div>
      <ul className="space-y-0.5 text-zinc-300">
        <li>ID: {spec.id}</li>
        <li>Length: {spec.length}m (Carriages: {spec.carriageCount})</li>
        <li>Required Gauge: {spec.gaugeRequirement}</li>
        <li>Speed: {spec.maxOperatingSpeed}mph</li>
      </ul>
    </div>
  );
};
