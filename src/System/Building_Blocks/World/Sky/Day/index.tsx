import { DaySkyGeneral } from "./General";

/**
 * Day Sky Module
 * Defines solar positions, cloud highlights, and atmospheric lighting for daytime cycles.
 */
export const DaySky = {
  id: "Day",
  name: "Day Sky",
  ambientColor: "#38bdf8",
  fogColor: "#bae6fd",
  cloudDensity: 0.35,
  sunVisible: true,
  sunPosition: { x: 0.5, y: 0.8 },
  lightIntensity: 1.0,
  horizonColor: "#e0f2fe",
  General: DaySkyGeneral
};
