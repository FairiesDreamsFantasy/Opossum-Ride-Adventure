/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { HouseStructureSpecification, HOUSE_METADATA } from "./General";

interface HouseProps {
  spec: HouseStructureSpecification;
  className?: string;
}

export const House: React.FC<HouseProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`House_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-amber-950/10 border-amber-900/30 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-amber-500 uppercase tracking-wider mb-2">
        {spec.name} ({spec.type})
      </div>
      <ul className="space-y-1 text-amber-300">
        <li>ID: {spec.id}</li>
        <li>Stories: {spec.floorsCount}</li>
        <li>Dimensions: {spec.width}x{spec.depth}ft (Height: {spec.height}ft)</li>
        <li>Material Framing: {spec.material}</li>
        <li>Backyard Garden: {spec.hasGardenBackyard ? "Yes" : "No"}</li>
      </ul>
    </div>
  );
};
