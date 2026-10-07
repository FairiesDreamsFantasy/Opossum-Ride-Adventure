/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { RoadwaySpecification, ROAD_DEFAULT_SPEC } from "./General";

interface RoadProps {
  spec?: RoadwaySpecification;
  className?: string;
}

export const Road: React.FC<RoadProps> = ({ spec = ROAD_DEFAULT_SPEC, className = "" }) => {
  return (
    <div
      id={`Road_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-slate-950/20 border-slate-800/40 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-slate-400 uppercase tracking-wider mb-2">
        {spec.name}
      </div>
      <ul className="space-y-1 text-slate-300">
        <li>ID: {spec.id}</li>
        <li>Lanes: {spec.lanesCount} lanes</li>
        <li>Dividers Color: {spec.markingColor}</li>
        <li>Curbing: {spec.curbStyle}</li>
        <li>Lights: {spec.hasStreetLights ? "Yes" : "No"}</li>
      </ul>
    </div>
  );
};
