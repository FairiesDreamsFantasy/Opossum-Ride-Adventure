export interface AlgebraGeneralConfig {
  name: string;
  version: string;
  maxIterations: number;
  tolerance: number;
}

export const AlgebraGeneral: AlgebraGeneralConfig = {
  name: "Opossum Ride Algebraic Computing Engine",
  version: "1.0.0",
  maxIterations: 1000,
  tolerance: 1e-9
};
