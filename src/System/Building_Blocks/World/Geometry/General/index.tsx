/**
 * World Geometry General Module
 * Precision calculations, transformations, and primitive definitions.
 */
export const GeometryGeneral = {
  version: "1.0.0",
  id: "world_geometry",
  math: {
    precision: 0.0001,
    useQuaternions: true,
    gravity: 9.81
  },
  primitives: ["Cube", "Sphere", "Plane", "Cylinder"]
};
