export interface Geometry2DConfig {
  coordinatePlane: "Cartesian";
  defaultWindingOrder: "CW" | "CCW";
}

export const Geometry2DGeneral: Geometry2DConfig = {
  coordinatePlane: "Cartesian",
  defaultWindingOrder: "CCW"
};
