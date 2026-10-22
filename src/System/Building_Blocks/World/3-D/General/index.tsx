/**
 * 3-D General Module
 * Depth scaling, perspective parameters, and spatial coordinate logic.
 */
export const ThreeDGeneral = {
  version: "1.0.0",
  projection: "Perspective",
  fieldOfView: 75,
  near: 0.1,
  far: 10000,
  coordinateSpace: "Right-Handed",
  fovLimits: {
    min: 45,
    max: 90
  }
};
