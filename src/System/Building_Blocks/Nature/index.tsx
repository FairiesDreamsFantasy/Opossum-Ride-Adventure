/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { NatureFeatureSpecification, NATURE_METADATA } from "./General";

interface NatureProps {
  spec: NatureFeatureSpecification;
  className?: string;
}

export const Nature: React.FC<NatureProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Nature_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-emerald-950/10 border-emerald-900/30 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-emerald-500 uppercase tracking-wider mb-2">
        {spec.name} ({spec.type})
      </div>
      <ul className="space-y-1 text-emerald-300">
        <li>ID: {spec.id}</li>
        <li>Scale Factor: {spec.scaleFactor}x</li>
        <li>Moisture Level: {Math.round(spec.moistureLevel * 100)}%</li>
        <li>Avg Temp: {spec.temperatureRating}°F</li>
        <li>Physical Friction: {spec.frictionCoefficient}</li>
        <li>Terrain Roughness: {spec.roughnessCoefficient}</li>
      </ul>
    </div>
  );
};
export * from "./General";
