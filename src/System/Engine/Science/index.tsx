import { ScienceGeneral, ScienceGeneralConfig, GeneralEngineUtils } from "./General";
import * as Physics from "./Physics";
import * as Graphical_Renderer from "./Graphical_Renderer";
import { ThermodynamicsEngine } from "./Thermodynamics";
import { OpticsEngine } from "./Optics";
import { AcousticsEngine } from "./Acoustics";
import { BiomechanicsEngine } from "./Biomechanics";

export class ScienceEngine {
  public static general = ScienceGeneral;
  public static utils = GeneralEngineUtils;
  public static physics = Physics;
  public static graphics = Graphical_Renderer;
  public static thermodynamics = ThermodynamicsEngine;
  public static optics = OpticsEngine;
  public static acoustics = AcousticsEngine;
  public static biomechanics = BiomechanicsEngine;

  public static getGeneralConfig(): ScienceGeneralConfig {
    return ScienceGeneral;
  }
}

export {
  ScienceGeneral,
  Physics,
  Graphical_Renderer,
  GeneralEngineUtils,
  ThermodynamicsEngine,
  OpticsEngine,
  AcousticsEngine,
  BiomechanicsEngine
};
export type { ScienceGeneralConfig };
