/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

/**
 * Common sparkles and shine effect wrapper
 */
export const TwinkleSparkle: React.FC<{
  color: string;
  size: number;
  delay: number;
  style?: React.CSSProperties;
}> = ({ color, size, delay, style }) => {
  return (
    <svg
      className="absolute animate-pulse"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "1.5s",
        ...style
      }}
    >
      <path
        d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
        fill={color}
      />
    </svg>
  );
};

export const ShinyShimmer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative overflow-hidden rounded-lg group">
      {children}
      {/* Specular light sweep effect */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
    </div>
  );
};
