import React from "react";
import { PolygonTessellationKernel } from "./PolygonTessellationKernel";
import { PolygonTransformPipeline } from "./PolygonTransformPipeline";
import { PolygonDeformationSolver } from "./PolygonDeformationSolver";

export * from "./PolygonTessellationKernel";
export * from "./PolygonTransformPipeline";
export * from "./PolygonDeformationSolver";

/**
 * Polygons Animation Module
 * Specialized in rendering and animating vector-based shapes, 
 * dynamic meshes, and faceted geometric objects.
 */
export interface Point {
  x: number;
  y: number;
}

export const PolygonSystem = {
  Tessellation: PolygonTessellationKernel,
  Transform: PolygonTransformPipeline,
  Deformation: PolygonDeformationSolver,

  createRegularPolygon: (sides: number, radius: number, centerX: number, centerY: number): Point[] => {
    const safeSides = Math.max(3, Math.floor(Number.isFinite(sides) ? sides : 3));
    const safeRadius = Number.isFinite(radius) ? radius : 0;
    const safeCx = Number.isFinite(centerX) ? centerX : 0;
    const safeCy = Number.isFinite(centerY) ? centerY : 0;
    const points: Point[] = [];
    for (let i = 0; i < safeSides; i++) {
      const angle = (i * 2 * Math.PI) / safeSides;
      points.push({
        x: safeCx + safeRadius * Math.cos(angle),
        y: safeCy + safeRadius * Math.sin(angle)
      });
    }
    return points;
  }
};

/**
 * Ultra-precise Polygon shape generation and vertex layouts.
 */
export const PolygonShapeRegistry = {
  star: (cx: number, cy: number, spikes: number = 5, outerRadius: number = 12, innerRadius: number = 5): Point[] => {
    const safeSpikes = Math.max(2, Math.floor(Number.isFinite(spikes) ? spikes : 5));
    const safeCx = Number.isFinite(cx) ? cx : 0;
    const safeCy = Number.isFinite(cy) ? cy : 0;
    const safeOuter = Number.isFinite(outerRadius) ? outerRadius : 12;
    const safeInner = Number.isFinite(innerRadius) ? innerRadius : 5;
    const points: Point[] = [];
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / safeSpikes;

    for (let i = 0; i < safeSpikes; i++) {
      points.push({
        x: safeCx + Math.cos(rot) * safeOuter,
        y: safeCy + Math.sin(rot) * safeOuter
      });
      rot += step;

      points.push({
        x: safeCx + Math.cos(rot) * safeInner,
        y: safeCy + Math.sin(rot) * safeInner
      });
      rot += step;
    }
    return points;
  },
  
  diamond: (cx: number, cy: number, w: number = 16, h: number = 24): Point[] => {
    const safeCx = Number.isFinite(cx) ? cx : 0;
    const safeCy = Number.isFinite(cy) ? cy : 0;
    const safeW = Number.isFinite(w) ? w : 16;
    const safeH = Number.isFinite(h) ? h : 24;
    return [
      { x: safeCx, y: safeCy - safeH / 2 },
      { x: safeCx + safeW / 2, y: safeCy },
      { x: safeCx, y: safeCy + safeH / 2 },
      { x: safeCx - safeW / 2, y: safeCy }
    ];
  }
};

export const PolygonRenderer: React.FC<{
  points: Point[];
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}> = ({ points, fill = "transparent", stroke = "currentColor", strokeWidth = 1 }) => {
  const pathData = PolygonTransformPipeline.toSvgPath(points);

  return (
    <svg className="system-polygon-svg" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <path d={pathData} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
};
