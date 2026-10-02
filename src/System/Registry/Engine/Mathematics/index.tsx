/**
 * Opossum Ride Adventure - Mathematics Registry Module
 * License: Apache-2.0 / Scientific Registry Standard
 */

import { MathematicsRegistryGeneral, MathRegistryMetadata } from "./General";
import {
  MathematicsEngine,
  MathUtils,
  AdditionEngine,
  SubtractionEngine,
  MultiplicationEngine,
  DivisionEngine,
  PlaceValueEngine,
  FractionsEngine,
  AlgebraEngine,
  GraphingEngine,
  IntegersEngine,
  GeometryEngine,
  TimeEngine,
  MeasurementEngine,
  TrigonometryEngine,
  StatisticsEngine,
  CalculusEngine,
  MathematicsGeneral,
  type MathGeneralConfig,
  type Point2D
} from "../../../Engine/Mathematics";

export class MathematicsRegistry {
  // Master Engine & Core Utilities
  public static readonly Engine = MathematicsEngine;
  public static readonly Utils = MathUtils;
  public static readonly General = MathematicsGeneral;
  public static readonly Config = MathematicsGeneral;

  // Dedicated Sub-Engine Registries
  public static readonly Addition = AdditionEngine;
  public static readonly Subtraction = SubtractionEngine;
  public static readonly Multiplication = MultiplicationEngine;
  public static readonly Division = DivisionEngine;
  public static readonly PlaceValue = PlaceValueEngine;
  public static readonly Fractions = FractionsEngine;
  public static readonly Integers = IntegersEngine;
  public static readonly Algebra = AlgebraEngine;
  public static readonly Geometry = GeometryEngine;
  public static readonly Graphing = GraphingEngine;
  public static readonly Trigonometry = TrigonometryEngine;
  public static readonly Statistics = StatisticsEngine;
  public static readonly Calculus = CalculusEngine;
  public static readonly Time = TimeEngine;
  public static readonly Measurement = MeasurementEngine;

  // Metadata queries
  public static getMetadata(): typeof MathematicsRegistryGeneral {
    return MathematicsRegistryGeneral;
  }

  public static getModuleById(id: string): MathRegistryMetadata | undefined {
    return MathematicsRegistryGeneral.modules.find(m => m.id === id);
  }

  public static listModulesByCategory(category: MathRegistryMetadata["category"]): MathRegistryMetadata[] {
    return MathematicsRegistryGeneral.modules.filter(m => m.category === category);
  }

  public static listAllModules(): MathRegistryMetadata[] {
    return MathematicsRegistryGeneral.modules;
  }
}

export {
  MathematicsRegistryGeneral,
  MathematicsEngine,
  MathUtils,
  AdditionEngine,
  SubtractionEngine,
  MultiplicationEngine,
  DivisionEngine,
  PlaceValueEngine,
  FractionsEngine,
  AlgebraEngine,
  GraphingEngine,
  IntegersEngine,
  GeometryEngine,
  TimeEngine,
  MeasurementEngine,
  TrigonometryEngine,
  StatisticsEngine,
  CalculusEngine,
  MathematicsGeneral
};

export type { MathRegistryMetadata, MathGeneralConfig, Point2D };
export default MathematicsRegistry;
