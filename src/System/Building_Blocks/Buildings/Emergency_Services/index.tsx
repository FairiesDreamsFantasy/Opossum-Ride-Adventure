/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EmergencyServiceSpecification, EMERGENCY_SERVICE_METADATA } from "./General";

interface EmergencyServiceProps {
  spec: EmergencyServiceSpecification;
  className?: string;
}

export const EmergencyService: React.FC<EmergencyServiceProps> = ({ spec, className = "" }) => {
  return (
    <div
      id={`Emergency_Service_Block_${spec.id}`}
      className={`relative rounded border p-4 bg-red-950/20 border-red-900/40 font-mono text-xs ${className}`}
    >
      <div className="font-bold text-red-400 uppercase tracking-wider mb-2">
        {spec.name} ({spec.type})
      </div>
      <ul className="space-y-1 text-red-300">
        <li>ID: {spec.id}</li>
        <li>Active Vehicle Bays: {spec.bayDoorsCount}</li>
        <li>Back-up Power Generator: {spec.backUpGeneratorActive ? "Online" : "Offline"}</li>
        <li>Antenna Elevation: {spec.communicationsTowerHeight}ft</li>
      </ul>
    </div>
  );
};
