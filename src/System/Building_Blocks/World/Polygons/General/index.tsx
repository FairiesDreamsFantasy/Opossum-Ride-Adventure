/**
 * Polygons General Module
 * Mesh generation, tessellation rules, and rendering optimization flags.
 */
export const PolygonsGeneral = {
  version: "1.0.0",
  tessellationLevel: "High",
  wireframeMode: false,
  shadingModel: "Gouraud",
  optimizations: {
    backfaceCulling: true,
    frustumCulling: true
  }
};
