import React from "react";

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
  createRegularPolygon: (sides: number, radius: number, centerX: number, centerY: number): Point[] => {
    const points: Point[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      points.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
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
    const points: Point[] = [];
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    for (let i = 0; i < spikes; i++) {
      points.push({
        x: cx + Math.cos(rot) * outerRadius,
        y: cy + Math.sin(rot) * outerRadius
      });
      rot += step;

      points.push({
        x: cx + Math.cos(rot) * innerRadius,
        y: cy + Math.sin(rot) * innerRadius
      });
      rot += step;
    }
    return points;
  },
  
  diamond: (cx: number, cy: number, w: number = 16, h: number = 24): Point[] => {
    return [
      { x: cx, y: cy - h / 2 },
      { x: cx + w / 2, y: cy },
      { x: cx, y: cy + h / 2 },
      { x: cx - w / 2, y: cy }
    ];
  }
};

export const PolygonRenderer: React.FC<{
  points: Point[];
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}> = ({ points, fill = "transparent", stroke = "currentColor", strokeWidth = 1 }) => {
  const pathData = points.length > 0 
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ") + " Z"
    : "";

  return (
    <svg className="system-polygon-svg" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <path d={pathData} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
};
