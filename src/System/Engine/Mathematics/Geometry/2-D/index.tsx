import { Geometry2DGeneral, Geometry2DConfig } from "./General";
import { AnglesEngine } from "./Angles";
import { CirclesEngine } from "./Circles";
import { RectanglesEngine, Rect2D } from "./Rectangles";
import { PolygonsEngine } from "./Polygons";

export class Geometry2DEngine {
  public static angles = AnglesEngine;
  public static circles = CirclesEngine;
  public static rectangles = RectanglesEngine;
  public static polygons = PolygonsEngine;

  public static getGeneralConfig(): Geometry2DConfig {
    return Geometry2DGeneral;
  }
}

export { AnglesEngine, CirclesEngine, RectanglesEngine, PolygonsEngine, Geometry2DGeneral };
export type { Rect2D, Geometry2DConfig };
