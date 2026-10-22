/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GardenFeatureSpecification, GARDEN_METADATA } from "./General";

interface GardenProps {
  spec: GardenFeatureSpecification;
  className?: string;
}

export const GardenFeature: React.FC<GardenProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Garden_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-teal-950/15 border-teal-900/30 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-teal-400 uppercase tracking-wider mb-2">
        {spec.name} ({spec.type})
      </div>
      <ul className="space-y-1 text-teal-300">
        <li>ID: {spec.id}</li>
        <li>Cultivation Wardens: {spec.cultivatedBy}</li>
        <li>Irrigation Needed: {spec.requiresWatering ? "Yes" : "No"}</li>
        <li>Basin Depth: {spec.waterDepthFeet !== null ? `${spec.waterDepthFeet}ft` : "N/A"}</li>
        <li>Soil Quality Rating: {spec.fertilizerIndex}/10</li>
      </ul>
    </div>
  );
};
export * from "./General";
