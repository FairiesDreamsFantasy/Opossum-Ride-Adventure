/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GroundPathSpecification, GROUND_PATH_METADATA } from "./General";

interface GroundPathProps {
  spec: GroundPathSpecification;
  className?: string;
}

export const GroundPath: React.FC<GroundPathProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Ground_Path_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-emerald-950/20 border-emerald-800/40 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-emerald-500 uppercase tracking-wider mb-2">
        {GROUND_PATH_METADATA.name} ({spec.id})
      </div>
      <ul className="space-y-1 text-emerald-300">
        <li>Length: {spec.dimensions.length}m</li>
        <li>Lanes: {spec.lanes.count}</li>
        <li>Surface: {spec.surfaceType}</li>
        <li>Shoulder: {spec.shoulderWidth}m</li>
        <li>Curbing: {spec.hasCurb ? "Enabled" : "Disabled"}</li>
      </ul>
    </div>
  );
};
