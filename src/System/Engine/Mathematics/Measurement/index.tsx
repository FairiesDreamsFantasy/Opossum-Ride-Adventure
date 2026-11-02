import { MeasurementGeneral, MeasurementGeneralConfig } from "./General";
import { MetricEngine, MetricGeneral } from "./Metric";
import { ImperialEngine, ImperialGeneral } from "./Imperial";

export class MeasurementEngine {
  public static metric = MetricEngine;
  public static imperial = ImperialEngine;

  public static getGeneralConfig(): MeasurementGeneralConfig {
    return MeasurementGeneral;
  }

  /**
   * Formats a distance value (provided in meters) to the target system.
   */
  public static formatDistance(meters: number, isImperial: boolean, verbose: boolean = false): string {
    if (isImperial) {
      const feet = ImperialEngine.feet.fromMeters(meters);
      return ImperialEngine.feet.format(feet, verbose);
    } else {
      return MetricEngine.meters.format(meters, verbose);
    }
  }

  /**
   * Formats a speed value (provided in m/s) to the target system.
   */
  public static formatSpeed(metersPerSecond: number, isImperial: boolean, verbose: boolean = false): string {
    if (isImperial) {
      const mph = metersPerSecond * 2.23694;
      return `${mph.toFixed(1)}${verbose ? " miles per hour" : " mph"}`;
    } else {
      const kmh = metersPerSecond * 3.6;
      return `${kmh.toFixed(1)}${verbose ? " kilometers per hour" : " km/h"}`;
    }
  }

  /**
   * Formats a height/shoulder height value in feet/inches or meters.
   */
  public static formatHeight(feet: number, inches: number, isImperial: boolean): string {
    if (isImperial) {
      if (inches === 0) return `${feet} feet`;
      return `${feet} feet and ${inches} inches`;
    } else {
      const totalFeet = feet + inches / 12;
      const meters = MetricEngine.meters.fromFeet(totalFeet);
      return `${meters.toFixed(2)} meters`;
    }
  }
}

export {
  MetricEngine,
  ImperialEngine,
  MeasurementGeneral,
  MetricGeneral,
  ImperialGeneral
};
export type { MeasurementGeneralConfig };
