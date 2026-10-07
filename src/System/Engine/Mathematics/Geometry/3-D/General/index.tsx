export interface Geometry3DConfig {
  upAxis: "Y" | "Z";
  handedness: "Right-Handed" | "Left-Handed";
}

export const Geometry3DGeneral: Geometry3DConfig = {
  upAxis: "Y",
  handedness: "Right-Handed"
};
