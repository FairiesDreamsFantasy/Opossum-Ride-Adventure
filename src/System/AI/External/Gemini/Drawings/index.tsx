/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VectorShapeElement {
  type: "path" | "polygon" | "circle" | "rect";
  points: { x: number; y: number }[];
  strokeColor: string;
  fillColor?: string;
}

export interface GoogleDrawingDiagram {
  id: string;
  title: string;
  elements: VectorShapeElement[];
  width: number;
  height: number;
  createdTimestamp: number;
}

export class GeminiDrawingsService {
  private static instance: GeminiDrawingsService;
  private drawings: GoogleDrawingDiagram[] = [];

  public static getInstance(): GeminiDrawingsService {
    if (!GeminiDrawingsService.instance) {
      GeminiDrawingsService.instance = new GeminiDrawingsService();
    }
    return GeminiDrawingsService.instance;
  }

  public createElevationDiagram(
    title: string, 
    elevationNodes: { distanceMeters: number; elevationMeters: number }[]
  ): GoogleDrawingDiagram {
    const points = elevationNodes.map(n => ({
      x: n.distanceMeters * 0.4,
      y: 400 - (n.elevationMeters * 0.25)
    }));

    const diagram: GoogleDrawingDiagram = {
      id: `drawing_${Date.now()}`,
      title,
      width: 800,
      height: 500,
      elements: [
        {
          type: "path",
          points,
          strokeColor: "#10B981",
          fillColor: "rgba(16, 185, 129, 0.15)"
        }
      ],
      createdTimestamp: Date.now()
    };

    this.drawings.unshift(diagram);
    return diagram;
  }

  public getDrawings(): GoogleDrawingDiagram[] {
    return [...this.drawings];
  }
}

export const GeminiDrawings = GeminiDrawingsService.getInstance();
