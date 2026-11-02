/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TwinkleSparkle } from "../General";

export const GoldObject: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = ""
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Golden Ingot with Radial and Linear Gradients */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="gold-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#eab308" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Soft Golden Backlight Aura */}
        <circle cx="50%" cy="50%" r="45" fill="url(#gold-glow)" className="animate-pulse" />
        
        {/* Gold Nugget Polygons */}
        <path
          d="M25 40 L50 20 L80 35 L75 70 L45 85 L15 65 Z"
          fill="url(#gold-metal)"
          stroke="#fef08a"
          strokeWidth="1.5"
          filter="drop-shadow(0px 4px 8px rgba(161,98,7,0.3))"
        />
        
        {/* Shiny Facets and ridges */}
        <path d="M50 20 L45 85" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" />
        <path d="M80 35 L45 85" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.7" />
        <path d="M15 65 L45 85" stroke="#713f12" strokeWidth="1" strokeOpacity="0.5" />
      </svg>
      
      {/* Radiant Golden Sparkles */}
      <TwinkleSparkle color="#fef08a" size={14} delay={0.2} style={{ top: "10%", right: "25%" }} />
      <TwinkleSparkle color="#ffffff" size={10} delay={0.9} style={{ bottom: "20%", left: "15%" }} />
    </div>
  );
};
