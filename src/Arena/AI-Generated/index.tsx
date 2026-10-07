/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { PlaceDefinition } from "../index";

interface AIGeneratedPlaceProps {
  arena: PlaceDefinition;
}

/**
 * AIGeneratedPlace Component
 * Renders visual decorators and environmental effects for AI-generated arenas.
 */
export const AIGeneratedPlace: React.FC<AIGeneratedPlaceProps> = ({ arena }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Dynamic Environmental Layer */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundColor: arena.colorBase,
          filter: "blur(40px)" 
        }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute bottom-4 left-4 p-3 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-xs font-mono text-white/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>AI GENERATED ENVIROMENT: {arena.name.toUpperCase()}</span>
        </div>
        <div className="mt-1 opacity-50">
          SURFACE: {arena.surfaceType}
        </div>
      </div>
    </div>
  );
};
