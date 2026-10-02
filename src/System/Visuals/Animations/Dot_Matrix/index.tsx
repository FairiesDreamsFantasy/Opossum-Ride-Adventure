import React from "react";

/**
 * Dot Matrix Module
 * Emulates dot matrix displays and grid-based art systems.
 * Used for mechanical displays or retro-styled score boards.
 */
export const DotMatrixSystem = {
  getDotState: (x: number, y: number, pattern: number[][]) => {
    return pattern[y] && pattern[y][x] === 1;
  }
};

export const DotMatrixDisplay: React.FC<{
  rows: number;
  cols: number;
  data: number[][];
  dotSize?: number;
  activeColor?: string;
  inactiveColor?: string;
}> = ({ 
  rows, 
  cols, 
  data, 
  dotSize = 4, 
  activeColor = "#22c55e", 
  inactiveColor = "#064e3b" 
}) => {
  return (
    <div 
      className="system-dot-matrix"
      style={{ 
        display: "grid", 
        gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
        gap: "1px"
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const isActive = data[r] && data[r][c] === 1;
        return (
          <div 
            key={i} 
            style={{ 
              width: dotSize, 
              height: dotSize, 
              borderRadius: "50%",
              backgroundColor: isActive ? activeColor : inactiveColor
            }} 
          />
        );
      })}
    </div>
  );
};
