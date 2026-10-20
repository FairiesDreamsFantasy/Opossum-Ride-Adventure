import { Geometry3DGeneral, Geometry3DConfig } from "./General";
import { BoundingBoxesEngine, AABB3D } from "./Bounding_Boxes";
import { SpheresEngine } from "./Spheres";
import { PrismsEngine } from "./Prisms";

export class Geometry3DEngine {
  public static boundingBoxes = BoundingBoxesEngine;
  public static spheres = SpheresEngine;
  public static prisms = PrismsEngine;

  public static getGeneralConfig(): Geometry3DConfig {
    return Geometry3DGeneral;
  }
}

export { BoundingBoxesEngine, SpheresEngine, PrismsEngine, Geometry3DGeneral };
export type { AABB3D, Geometry3DConfig };
