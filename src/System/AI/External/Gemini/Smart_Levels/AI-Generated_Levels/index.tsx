/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import { SmartLevelConfig } from "../index";

export const DEFAULT_SMART_LEVEL_VISUALS = {
  skyColor: "#050b14",
  horizonColor: "#111827",
  ambientLight: 0.85,
  fogDensity: 0.05,
  scenery: ["synth_trees", "ambient_spores"]
};

/**
 * Visual wrapper for AI-generated levels.
 * Renders environmental configurations provided by the Gemini system with ultra-scientific null safety.
 */
export const AIGeneratedLevel: React.FC<{ config?: Partial<SmartLevelConfig> | null }> = ({ config }) => {
  const visuals = config?.visuals || DEFAULT_SMART_LEVEL_VISUALS;
  const skyColor = visuals.skyColor || DEFAULT_SMART_LEVEL_VISUALS.skyColor;
  const ambientLight = typeof visuals.ambientLight === "number" 
    ? Math.max(0, Math.min(1, visuals.ambientLight)) 
    : DEFAULT_SMART_LEVEL_VISUALS.ambientLight;
  const fogDensity = typeof visuals.fogDensity === "number" 
    ? Math.max(0, Math.min(1, visuals.fogDensity)) 
    : DEFAULT_SMART_LEVEL_VISUALS.fogDensity;

  const fogAlphaHex = Math.max(0, Math.min(255, Math.floor(fogDensity * 255)))
    .toString(16)
    .padStart(2, "0");

  const levelId = config?.id !== undefined ? config.id : "generic";
  const levelName = config?.name ? String(config.name).toUpperCase() : "DYNAMIC LEVEL";
  const gravityStr = typeof config?.gravity === "number" ? config.gravity.toFixed(3) : "1.000";
  const windStr = typeof config?.windSpeed === "number" ? config.windSpeed : 0;
  const surfaceStr = config?.surfaceType ? String(config.surfaceType).toUpperCase() : "STANDARD";

  return (
    <div 
      id={`ai-level-${levelId}`} 
      className="relative w-full h-full overflow-hidden transition-colors duration-1000"
      style={{ 
        backgroundColor: skyColor,
        opacity: ambientLight
      }}
    >
      {/* Fog Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{ 
          background: `linear-gradient(to bottom, transparent, #FFFFFF${fogAlphaHex})`
        }} 
      />
      
      {/* Level Metadata (Scientific/HUD style) */}
      <div className="absolute top-20 left-4 text-xs font-mono text-black/50 space-y-1">
        <div>LEVEL_NAME: {levelName}</div>
        <div>GRAVITY: {gravityStr} G</div>
        <div>WIND_VECTOR: {windStr} MS</div>
        <div>SURFACE_INDEX: {surfaceStr}</div>
      </div>
    </div>
  );
};

export default AIGeneratedLevel;
