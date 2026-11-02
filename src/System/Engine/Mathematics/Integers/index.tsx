import { IntegersGeneral, IntegersGeneralConfig } from "./General";
import { ModularArithmeticEngine } from "./Modular_Arithmetic";
import { BitwiseEngine } from "./Bitwise";

export class IntegersEngine {
  public static modular = ModularArithmeticEngine;
  public static bitwise = BitwiseEngine;

  public static isEven(n: number): boolean {
    return (n & 1) === 0;
  }

  public static isOdd(n: number): boolean {
    return (n & 1) !== 0;
  }

  public static clamp(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val));
  }

  public static getGeneralConfig(): IntegersGeneralConfig {
    return IntegersGeneral;
  }
}

export { ModularArithmeticEngine, BitwiseEngine, IntegersGeneral };
export type { IntegersGeneralConfig };
