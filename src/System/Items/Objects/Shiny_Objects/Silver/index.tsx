/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TwinkleSparkle } from "../General";

export const SilverObject: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = ""
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Specular Chrome Gradient Ingot */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="silver-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="30%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="75%" stopColor="#475569" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <radialGradient id="silver-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Ambient Silver Backlight Glow */}
        <circle cx="50%" cy="50%" r="45" fill="url(#silver-glow)" className="animate-pulse" />
        
        {/* Silver Nugget Shape */}
        <path
          d="M20 50 L40 25 L75 30 L85 60 L60 80 L30 75 Z"
          fill="url(#silver-metal)"
          stroke="#e2e8f0"
          strokeWidth="1.5"
          filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.15))"
        />
        
        {/* Highlight ridges to simulate polished faceted surface */}
        <path d="M40 25 L60 80" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
        <path d="M75 30 L60 80" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
        <path d="M30 75 L60 80" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
      
      {/* Sparkling Twinkles */}
      <TwinkleSparkle color="#ffffff" size={12} delay={0.1} style={{ top: "15%", left: "35%" }} />
      <TwinkleSparkle color="#e2e8f0" size={10} delay={0.7} style={{ bottom: "25%", right: "20%" }} />
    </div>
  );
};
