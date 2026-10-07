import { MetricGeneral, MetricGeneralConfig } from "./General";
import { MetersEngine } from "./Meters";
import { CentimetersEngine } from "./Centimeters";
import { MillimetersEngine } from "./Millimeters";
import { KilometersEngine } from "./Kilometers";

export class MetricEngine {
  public static meters = MetersEngine;
  public static centimeters = CentimetersEngine;
  public static millimeters = MillimetersEngine;
  public static kilometers = KilometersEngine;

  public static getGeneralConfig(): MetricGeneralConfig {
    return MetricGeneral;
  }
}

export {
  MetersEngine,
  CentimetersEngine,
  MillimetersEngine,
  KilometersEngine,
  MetricGeneral
};
export type { MetricGeneralConfig };
