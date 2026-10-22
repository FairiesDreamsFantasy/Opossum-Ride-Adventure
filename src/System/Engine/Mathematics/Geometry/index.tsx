import { GeometryGeneral, GeometryGeneralConfig } from "./General";
import { Geometry2DEngine, Rect2D } from "./2-D";
import { Geometry3DEngine, AABB3D } from "./3-D";
import { VectorEngine, Vector2D, Vector3D } from "./Vectors";
import { RaycastingEngine, Ray3D, RayHit } from "./Raycasting";

export class GeometryEngine {
  public static general = GeometryGeneral;
  public static twoD = Geometry2DEngine;
  public static threeD = Geometry3DEngine;
  public static vectors = VectorEngine;
  public static raycasting = RaycastingEngine;

  public static getGeneralConfig(): GeometryGeneralConfig {
    return GeometryGeneral;
  }
}

export {
  GeometryGeneral,
  Geometry2DEngine,
  Geometry3DEngine,
  VectorEngine,
  RaycastingEngine
};
export type {
  GeometryGeneralConfig,
  Rect2D,
  AABB3D,
  Vector2D,
  Vector3D,
  Ray3D,
  RayHit
};
