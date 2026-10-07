import React from "react";

/**
 * Geometry Animation Module
 * Handles primitive geometric shapes, mathematical curves, and 
 * coordinate space utilities.
 */
export const GeometrySystem = {
  distance: (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  },
  
  toRad: (deg: number) => (deg * Math.PI) / 180,
  
  getPointOnCircle: (radius: number, angleDeg: number, centerX: number, centerY: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad)
    };
  }
};

export const Rect: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
}> = ({ x, y, width, height, fill = "currentColor", stroke = "none" }) => {
  return (
    <div 
      className="system-geo-rect"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        backgroundColor: fill,
        border: stroke !== "none" ? `1px solid ${stroke}` : "none"
      }}
    />
  );
};
