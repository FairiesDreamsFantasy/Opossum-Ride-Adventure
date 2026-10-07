/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ParkStructureSpecification, PARK_METADATA } from "./General";

interface ParkProps {
  spec: ParkStructureSpecification;
  className?: string;
}

export const Park: React.FC<ParkProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Park_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-green-950/15 border-green-900/30 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-green-400 uppercase tracking-wider mb-2">
        {spec.name} ({spec.type})
      </div>
      <ul className="space-y-1 text-green-300">
        <li>ID: {spec.id}</li>
        <li>Land Cover: {spec.acreage} Acres</li>
        <li>Rest Amenities: {spec.hasBenchRestAreas ? "Available" : "None"}</li>
        <li>Zoo Sec Rating: {spec.cageSecurityRating !== null ? `${spec.cageSecurityRating}/10` : "N/A"}</li>
        <li>Active Species Count: {spec.animalSpeciesCount}</li>
      </ul>
    </div>
  );
};
export * from "./General";
