/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TwinkleSparkle } from "../General";

export const EmeraldObject: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = ""
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Translucent faceted Emerald Crystal */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="emerald-facet-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="emerald-facet-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
          <radialGradient id="emerald-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Soft Emerald Backlight Aura */}
        <circle cx="50%" cy="50%" r="45" fill="url(#emerald-glow)" className="animate-pulse" />
        
        {/* Outer Hexagonal Facets */}
        <polygon points="50,15 80,30 80,70 50,85 20,70 20,30" fill="url(#emerald-facet-dark)" stroke="#047857" strokeWidth="1" />
        
        {/* Inner Table (Face) of Emerald */}
        <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="url(#emerald-facet-light)" stroke="#6ee7b7" strokeWidth="1" />
        
        {/* Facet Connector Ridges */}
        <line x1="50" y1="15" x2="50" y2="30" stroke="#6ee7b7" strokeWidth="1" />
        <line x1="80" y1="30" x2="70" y2="40" stroke="#6ee7b7" strokeWidth="1" />
        <line x1="80" y1="70" x2="70" y2="60" stroke="#34d399" strokeWidth="1" />
        <line x1="50" y1="85" x2="50" y2="70" stroke="#047857" strokeWidth="1" />
        <line x1="20" y1="70" x2="30" y2="60" stroke="#047857" strokeWidth="1" />
        <line x1="20" y1="30" x2="30" y2="40" stroke="#6ee7b7" strokeWidth="1" />
      </svg>
      
      {/* Brilliant Green Sparkles */}
      <TwinkleSparkle color="#34d399" size={12} delay={0.3} style={{ top: "20%", left: "20%" }} />
      <TwinkleSparkle color="#a7f3d0" size={10} delay={0.6} style={{ bottom: "20%", right: "20%" }} />
    </div>
  );
};
