export interface GeometryGeneralConfig {
  name: string;
  version: string;
  pi: number;
  tau: number;
  degToRad: number;
  radToDeg: number;
  epsilon: number;
}

export const GeometryGeneral: GeometryGeneralConfig = {
  name: "Opossum Ride Ultra-Powerful Geometry Subsystem",
  version: "1.0.0-scientific",
  pi: Math.PI,
  tau: Math.PI * 2,
  degToRad: Math.PI / 180,
  radToDeg: 180 / Math.PI,
  epsilon: 1e-9
};
