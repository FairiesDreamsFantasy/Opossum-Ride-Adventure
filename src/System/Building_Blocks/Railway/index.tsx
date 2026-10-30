/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { RailwayTrackSpecification, RAILWAY_TRACK_METADATA } from "./General";

interface RailwayProps {
  spec: RailwayTrackSpecification;
  className?: string;
}

export const Railway: React.FC<RailwayProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Railway_Track_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-zinc-950/40 border-zinc-700/50 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-zinc-400 uppercase tracking-wider mb-2">
        {RAILWAY_TRACK_METADATA.name} ({spec.id})
      </div>
      <ul className="space-y-1 text-zinc-300">
        <li>Gauge Type: {spec.gaugeType}</li>
        <li>Material: {spec.trackMaterial}</li>
        <li>Sleeper Spacing: {spec.sleeperSpacing}m</li>
        <li>Power Mode: {spec.catenaryVoltage ? `Overhead Line (${spec.catenaryVoltage}V)` : "Non-Electrified"}</li>
        <li>Max Speed Limit: {spec.maxSpeedLimit}mph</li>
      </ul>
    </div>
  );
};
