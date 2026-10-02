import { MathematicsGeneral, MathGeneralConfig, MathUtils, Point2D } from "./General";
import { AdditionEngine } from "./Addition";
import { SubtractionEngine } from "./Subtraction";
import { MultiplicationEngine } from "./Multiplication";
import { DivisionEngine } from "./Division";
import { PlaceValueEngine } from "./Place_Value";
import { FractionsEngine } from "./Fractions";
import { AlgebraEngine } from "./Algebra";
import { GraphingEngine } from "./Graphing";
import { IntegersEngine } from "./Integers";
import { GeometryEngine } from "./Geometry";
import { TimeEngine } from "./Time";
import { MeasurementEngine } from "./Measurement";
import { TrigonometryEngine } from "./Trigonometry";
import { StatisticsEngine } from "./Statistics";
import { CalculusEngine } from "./Calculus";
import { LinearAlgebraEngine, Vector3, Matrix4, Quaternion } from "./Linear_Algebra";
import { FourierAnalysisEngine, ComplexNumber } from "./Fourier_Analysis";
import { DifferentialEquationsEngine } from "./Differential_Equations";

/**
 * Opossum Ride Adventure - Master Mathematics Engine
 * Aggregates all mathematical submodules for high-precision scientific calculations.
 */
export class MathematicsEngine {
  public static general = MathematicsGeneral;
  public static utils = MathUtils;
  public static addition = AdditionEngine;
  public static subtraction = SubtractionEngine;
  public static multiplication = MultiplicationEngine;
  public static division = DivisionEngine;
  public static placeValue = PlaceValueEngine;
  public static fractions = FractionsEngine;
  public static algebra = AlgebraEngine;
  public static graphing = GraphingEngine;
  public static integers = IntegersEngine;
  public static geometry = GeometryEngine;
  public static time = TimeEngine;
  public static measurement = MeasurementEngine;
  public static trigonometry = TrigonometryEngine;
  public static statistics = StatisticsEngine;
  public static calculus = CalculusEngine;
  public static linearAlgebra = LinearAlgebraEngine;
  public static fourierAnalysis = FourierAnalysisEngine;
  public static differentialEquations = DifferentialEquationsEngine;

  public static getGeneralConfig(): MathGeneralConfig {
    return MathematicsGeneral;
  }
}

// For backward compatibility and ease of use
export const EngineMathematics = MathUtils;

export {
  MathematicsGeneral,
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
  LinearAlgebraEngine,
  Vector3,
  Matrix4,
  Quaternion,
  FourierAnalysisEngine,
  DifferentialEquationsEngine
};

export type { MathGeneralConfig, Point2D, ComplexNumber };
