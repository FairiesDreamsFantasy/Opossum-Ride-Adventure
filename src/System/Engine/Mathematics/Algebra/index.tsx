import { AlgebraGeneral, AlgebraGeneralConfig } from "./General";
import { LinearAlgebraEngine } from "./Linear";
import { PolynomialEngine } from "./Polynomial";

export class AlgebraEngine {
  public static linear = LinearAlgebraEngine;
  public static polynomial = PolynomialEngine;

  public static getGeneralConfig(): AlgebraGeneralConfig {
    return AlgebraGeneral;
  }
}

export { LinearAlgebraEngine, PolynomialEngine, AlgebraGeneral };
