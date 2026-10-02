/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { SmartLevelConfig } from "../index";

/**
 * Visual wrapper for AI-generated levels.
 * Renders the environmental configuration provided by the Gemini system.
 */
export const AIGeneratedLevel: React.FC<{ config: SmartLevelConfig }> = ({ config }) => {
  return (
    <div 
      id={`ai-level-${config.id}`} 
      className="relative w-full h-full overflow-hidden transition-colors duration-1000"
      style={{ 
        backgroundColor: config.visuals.skyColor,
        opacity: config.visuals.ambientLight
      }}
    >
      {/* Fog Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{ 
          background: `linear-gradient(to bottom, transparent, #FFFFFF${Math.floor(config.visuals.fogDensity * 255).toString(16).padStart(2, '0')})`
        }} 
      />
      
      {/* Level Metadata (Scientific/HUD style) */}
      <div className="absolute top-20 left-4 text-xs font-mono text-black/50 space-y-1">
        <div>LEVEL_NAME: {config.name.toUpperCase()}</div>
        <div>GRAVITY: {config.gravity.toFixed(3)} G</div>
        <div>WIND_VECTOR: {config.windSpeed} MS</div>
        <div>SURFACE_INDEX: {config.surfaceType.toUpperCase()}</div>
      </div>
    </div>
  );
};

export default AIGeneratedLevel;
