/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TunnelStructureSpecification, TUNNEL_METADATA } from "./General";

interface TunnelProps {
  spec: TunnelStructureSpecification;
  className?: string;
}

export const Tunnel: React.FC<TunnelProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Tunnel_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-stone-950/40 border-stone-800/60 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-stone-400 uppercase tracking-wider mb-2">
        {spec.name} ({spec.type})
      </div>
      <ul className="space-y-1 text-stone-300">
        <li>ID: {spec.id}</li>
        <li>Clearance: {spec.heightClearance}ft</li>
        <li>Ventilation Fans: {spec.hasExhaustFans ? "Active" : "None"}</li>
        <li>Reinforced Archway: {spec.reinforcedArch ? "Yes" : "No"}</li>
      </ul>
    </div>
  );
};
