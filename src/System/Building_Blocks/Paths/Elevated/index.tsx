/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ElevatedPathSpecification, ELEVATED_PATH_METADATA } from "./General";

interface ElevatedPathProps {
  spec: ElevatedPathSpecification;
  className?: string;
}

export const ElevatedPath: React.FC<ElevatedPathProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Elevated_Path_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-amber-950/20 border-amber-800/40 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-amber-500 uppercase tracking-wider mb-2">
        {ELEVATED_PATH_METADATA.name} ({spec.id})
      </div>
      <ul className="space-y-1 text-amber-300">
        <li>Length: {spec.dimensions.length}m</li>
        <li>Height: {spec.dimensions.height}ft (Min: {spec.minHeight}ft)</li>
        <li>Lanes: {spec.lanes.count} (Range: {spec.minLanes}-{spec.maxLanes})</li>
        <li>Surface: {spec.surfaceType}</li>
        <li>Pillars Every: {spec.supportPillarSpacing}m</li>
      </ul>
    </div>
  );
};
