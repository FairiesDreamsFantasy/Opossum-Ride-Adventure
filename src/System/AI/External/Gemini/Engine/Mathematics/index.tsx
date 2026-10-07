/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiMathArithmetic } from "./Arithmetic";
import { GeminiMathGeometry } from "./Geometry";
import { GeminiMathAlgebra } from "./Algebra";
import { GeminiMathAddition } from "./Addition";
import { GeminiMathSubtraction } from "./Subtraction";
import { GeminiMathMultiplication } from "./Multiplication";
import { GeminiMathDivision } from "./Division";
import { GeminiMathFractions } from "./Fractions";
import { GeminiMathMeasurement } from "./Measurement";
import { GeminiMathTime } from "./Time";
import { GeminiMathIntegers } from "./Integers";
import { GeminiMathPlaceValue } from "./Place_Value";
import { GeminiMathGraphing } from "./Graphing";
import { GeminiMathTrigonometry } from "./Trigonometry";
import { GeminiMathStatistics } from "./Statistics";
import { GeminiMathCalculus } from "./Calculus";
import { GeminiEngineMathematicsGeneral } from "./General";

export interface Point2D { x: number; y: number; }
export interface Vector3D { x: number; y: number; z: number; }
export type Matrix4x4 = number[][];

export const GeminiEngineMathematics = {
  General: GeminiEngineMathematicsGeneral,
  Arithmetic: GeminiMathArithmetic,
  Addition: GeminiMathAddition,
  Subtraction: GeminiMathSubtraction,
  Multiplication: GeminiMathMultiplication,
  Division: GeminiMathDivision,
  Fractions: GeminiMathFractions,
  Measurement: GeminiMathMeasurement,
  Time: GeminiMathTime,
  Integers: GeminiMathIntegers,
  PlaceValue: GeminiMathPlaceValue,
  Graphing: GeminiMathGraphing,
  Trigonometry: GeminiMathTrigonometry,
  Statistics: GeminiMathStatistics,
  Calculus: GeminiMathCalculus,
  Geometry: GeminiMathGeometry,
  Algebra: GeminiMathAlgebra,
  systemName: "Gemini AI Engine Ultra-Precision Mathematics Subsystem"
};

export default GeminiEngineMathematics;
