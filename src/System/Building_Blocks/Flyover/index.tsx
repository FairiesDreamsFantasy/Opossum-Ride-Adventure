/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FlyoverStructureSpecification, FLYOVER_DEFAULT_SPEC } from "./General";

interface FlyoverProps {
  spec?: FlyoverStructureSpecification;
  className?: string;
}

export const Flyover: React.FC<FlyoverProps> = ({ spec = FLYOVER_DEFAULT_SPEC, className = "" }) => {
  return (
    <div
      id={`Flyover_Structure_${spec.id}`}
      className={`relative rounded border p-4 bg-sky-950/20 border-sky-800/40 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-sky-400 uppercase tracking-wider mb-2">
        {spec.name}
      </div>
      <ul className="space-y-1 text-sky-300">
        <li>ID: {spec.id}</li>
        <li>Tiers Height: {spec.heightLevels.map(h => `${h}ft`).join(", ")}</li>
        <li>Railway Tracks support: {spec.railwayCapable ? "Yes" : "No"}</li>
        <li>Overhead Clearance: {spec.overheadClearance}ft</li>
      </ul>
    </div>
  );
};
