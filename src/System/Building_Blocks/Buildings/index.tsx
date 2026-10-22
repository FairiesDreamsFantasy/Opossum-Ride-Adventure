/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BuildingStructureSpecification, BUILDING_METADATA } from "./General";

interface BuildingProps {
  spec: BuildingStructureSpecification;
  className?: string;
}

export const Building: React.FC<BuildingProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Building_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-zinc-950/20 border-zinc-800/40 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-zinc-400 uppercase tracking-wider mb-2">
        {spec.name} ({spec.type})
      </div>
      <ul className="space-y-1 text-zinc-300">
        <li>ID: {spec.id}</li>
        <li>Levels: {spec.levels}</li>
        <li>Ramp Access: {spec.hasWheelchairRamp ? "Available" : "None"}</li>
        <li>Max Occupancy: {spec.occupancyRating} persons</li>
      </ul>
    </div>
  );
};
