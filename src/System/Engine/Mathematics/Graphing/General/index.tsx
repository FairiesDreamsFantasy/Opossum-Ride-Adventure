export interface GraphingGeneralConfig {
  name: string;
  version: string;
  defaultOriginX: number;
  defaultOriginY: number;
  defaultScale: number;
}

export const GraphingGeneral: GraphingGeneralConfig = {
  name: "Opossum Ride Graphing and Coordinate Mapping Subsystem",
  version: "1.0.0",
  defaultOriginX: 0,
  defaultOriginY: 0,
  defaultScale: 1.0
};
