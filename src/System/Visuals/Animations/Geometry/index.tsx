import React from "react";
import { GeometryVectorMath2D } from "./GeometryVectorMath2D";
import { GeometryCurveEvaluator } from "./GeometryCurveEvaluator";
import { GeometryCollisionShapes } from "./GeometryCollisionShapes";

export * from "./GeometryVectorMath2D";
export * from "./GeometryCurveEvaluator";
export * from "./GeometryCollisionShapes";

/**
 * Geometry Animation Module
 * Handles primitive geometric shapes, mathematical curves, and 
 * coordinate space utilities.
 */
export const GeometrySystem = {
  Vectors: GeometryVectorMath2D,
  Curves: GeometryCurveEvaluator,
  Shapes: GeometryCollisionShapes,

  distance: (x1: number, y1: number, x2: number, y2: number) => {
    return GeometryVectorMath2D.distance(x1, y1, x2, y2);
  },
  
  toRad: (deg: number) => GeometryCurveEvaluator.toRadians(deg),
  
  getPointOnCircle: (radius: number, angleDeg: number, centerX: number, centerY: number) => {
    return GeometryCurveEvaluator.pointOnCircle(radius, angleDeg, centerX, centerY);
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
        left: Number.isFinite(x) ? x : 0,
        top: Number.isFinite(y) ? y : 0,
        width: Math.max(0, Number.isFinite(width) ? width : 0),
        height: Math.max(0, Number.isFinite(height) ? height : 0),
        backgroundColor: fill,
        border: stroke !== "none" ? `1px solid ${stroke}` : "none"
      }}
    />
  );
};
