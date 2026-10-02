/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { RandomMaterialSpecification, RANDOM_MATERIALS_METADATA, createDynamicMaterial } from "./General";

export interface RandomMaterialProps {
  spec: RandomMaterialSpecification;
  className?: string;
}

export const RandomMaterialBlock: React.FC<RandomMaterialProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Random_Material_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-purple-950/15 border-purple-900/30 font-mono text-xs ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-purple-400 uppercase tracking-wider">
          {spec.name} ({spec.materialType})
        </span>
        <span
          className="w-4 h-4 rounded border border-white/20 inline-block shadow"
          style={{ backgroundColor: spec.color }}
          title={`Color: ${spec.color}`}
        />
      </div>
      <ul className="space-y-1 text-purple-300">
        <li>ID: {spec.id}</li>
        <li>Density: {spec.density} g/cm³</li>
        <li>Elasticity: {Math.round(spec.elasticity * 100)}%</li>
        <li>Friction: {spec.frictionCoefficient}</li>
        <li>Hardness: {spec.hardnessMohs} Mohs</li>
        <li>Roughness: {spec.roughness}</li>
        <li>Surface Sound: {spec.soundSurfaceProfile}</li>
        <li>Destructible: {spec.isDestructible ? `Yes (${spec.structuralIntegrity} HP)` : "Indestructible"}</li>
      </ul>
    </div>
  );
};

export * from "./General";
export default RandomMaterialBlock;
