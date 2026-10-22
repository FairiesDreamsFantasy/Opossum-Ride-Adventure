import { ImperialGeneral, ImperialGeneralConfig } from "./General";
import { InchesEngine } from "./Inches";
import { FeetEngine } from "./Feet";
import { YardsEngine } from "./Yards";
import { MilesEngine } from "./Miles";

export class ImperialEngine {
  public static inches = InchesEngine;
  public static feet = FeetEngine;
  public static yards = YardsEngine;
  public static miles = MilesEngine;

  public static getGeneralConfig(): ImperialGeneralConfig {
    return ImperialGeneral;
  }
}

export {
  InchesEngine,
  FeetEngine,
  YardsEngine,
  MilesEngine,
  ImperialGeneral
};
export type { ImperialGeneralConfig };
