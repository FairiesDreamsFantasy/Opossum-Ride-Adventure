/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TwinkleSparkle } from "../General";

export const DiamondObject: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = ""
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Prismatic sparkling Diamond SVG */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="diamond-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#e0f2fe" />
            <stop offset="80%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#c084fc" /> {/* Rainbow violet hint */}
          </linearGradient>
          <linearGradient id="diamond-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <radialGradient id="diamond-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#f3e8ff" stopOpacity="0.5" /> {/* Rainbow glow */}
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Soft prismatic Backlight Aura */}
        <circle cx="50%" cy="50%" r="45" fill="url(#diamond-glow)" className="animate-pulse" />
        
        {/* Diamond Outer Crystalline Cut (Classic Brilliant Cut Front view) */}
        <polygon points="50,15 80,35 80,55 50,85 20,55 20,35" fill="url(#diamond-dark)" stroke="#e0f2fe" strokeWidth="1" />
        
        {/* Inner brilliant table star */}
        <polygon points="50,32 70,45 62,60 50,50 38,60 30,45" fill="url(#diamond-light)" stroke="#ffffff" strokeWidth="1" />
        
        {/* Brilliant cut facet connector lines */}
        <line x1="50" y1="15" x2="50" y2="32" stroke="#ffffff" strokeWidth="1.2" />
        <line x1="80" y1="35" x2="70" y2="45" stroke="#ffffff" strokeWidth="1" />
        <line x1="80" y1="55" x2="62" y2="60" stroke="#bae6fd" strokeWidth="1" />
        <line x1="50" y1="85" x2="50" y2="50" stroke="#7dd3fc" strokeWidth="1.2" />
        <line x1="20" y1="55" x2="38" y2="60" stroke="#bae6fd" strokeWidth="1" />
        <line x1="20" y1="35" x2="30" y2="45" stroke="#ffffff" strokeWidth="1" />
      </svg>
      
      {/* Prismatic sparkles */}
      <TwinkleSparkle color="#ffffff" size={12} delay={0.1} style={{ top: "15%", right: "25%" }} />
      <TwinkleSparkle color="#bae6fd" size={14} delay={0.4} style={{ bottom: "25%", left: "15%" }} />
      <TwinkleSparkle color="#f3e8ff" size={10} delay={0.8} style={{ top: "50%", right: "12%" }} />
    </div>
  );
};
