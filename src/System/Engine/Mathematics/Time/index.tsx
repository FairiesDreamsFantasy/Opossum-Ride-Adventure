import { TimeGeneral, TimeGeneralConfig } from "./General";
import { PermanentStandardTime, PermanentStandardTimeEngine } from "./Permanent_Standard_Time";
import {
  SolarElevationState,
  StandardTimeDetails,
  TimezoneStandardSpec,
  PermanentStandardTimeGeneral
} from "./Permanent_Standard_Time/General";

export class TimeEngine {
  public static pst = PermanentStandardTimeEngine;
  public static permanentStandardTime = PermanentStandardTime;

  public static getGeneralConfig(): TimeGeneralConfig {
    return TimeGeneral;
  }
}

export {
  TimeGeneral,
  PermanentStandardTime,
  PermanentStandardTimeEngine,
  PermanentStandardTimeGeneral
};
export type {
  TimeGeneralConfig,
  SolarElevationState,
  StandardTimeDetails,
  TimezoneStandardSpec
};
