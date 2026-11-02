import { GraphingGeneral, GraphingGeneralConfig } from "./General";
import { CoordinatesEngine, Point2D, PolarPoint } from "./Coordinates";
import { CurvesEngine } from "./Curves";

export class GraphingEngine {
  public static coordinates = CoordinatesEngine;
  public static curves = CurvesEngine;

  public static getGeneralConfig(): GraphingGeneralConfig {
    return GraphingGeneral;
  }
}

export { CoordinatesEngine, CurvesEngine, GraphingGeneral };
export type { Point2D, PolarPoint, GraphingGeneralConfig };
