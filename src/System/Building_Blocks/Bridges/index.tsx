/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";

import React from "react";
import { BridgeStructureSpecification, BRIDGE_METADATA } from "./General";

interface BridgeProps {
  spec: BridgeStructureSpecification;
  className?: string;
}

export const Bridge: React.FC<BridgeProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Bridge_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-orange-950/20 border-orange-900/40 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-orange-400 uppercase tracking-wider mb-2">
        {spec.name} ({spec.structureType})
      </div>
      <ul className="space-y-1 text-orange-300">
        <li>ID: {spec.id}</li>
        <li>Span Length: {spec.spanLength}m</li>
        <li>Deck Height: {spec.deckHeight}ft (Min Required: {BRIDGE_METADATA.minHeight}ft)</li>
        <li>Lanes: {spec.lanesCount} (Allowed: {BRIDGE_METADATA.minLanes}-{BRIDGE_METADATA.maxLanes})</li>
        <li>End Abutments: {spec.hasAbutments ? "Equipped" : "None"}</li>
      </ul>
    </div>
  );
};
