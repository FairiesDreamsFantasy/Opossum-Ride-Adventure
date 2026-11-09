/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DALE_JASMINE_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { DALE_JASMINE_KINEMATIC_CONSTANTS, evaluateDaleGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { DALE_JASMINE_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateDaleRoseLattice, getDaleTailControlPoints } from "./Unit_IV_Geometry";
import { DALE_JASMINE_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface DaleJasmineUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof DALE_JASMINE_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateDaleGaitState;
    froudeNumber: typeof calculateFroudeNumber;
    suspensionRK4: typeof integrateSuspensionRK4;
  };
  UnitIII_Acoustics: {
    profile: AcousticVocalProfile;
    biquadCoefficients: typeof calculateBiquadBandpassCoefficients;
    chirpEvaluator: typeof evaluateChirpFrequency;
  };
  UnitIV_Geometry: {
    evaluateSpline: typeof evaluateCubicBezier2D;
    splineDerivative: typeof evaluateCubicBezierDerivative;
    curvature: typeof calculateBezierCurvature;
    roseLattice: typeof generateDaleRoseLattice;
    tailControlPoints: typeof getDaleTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const DALE_JASMINE_UNITS: DaleJasmineUnitsPackage = {
  UnitI_Morphometrics: DALE_JASMINE_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: DALE_JASMINE_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateDaleGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: DALE_JASMINE_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    roseLattice: generateDaleRoseLattice,
    tailControlPoints: getDaleTailControlPoints
  },
  UnitV_Lore: DALE_JASMINE_LORE
};

export {
  DALE_JASMINE_MORPHOMETRICS,
  DALE_JASMINE_KINEMATIC_CONSTANTS,
  evaluateDaleGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  DALE_JASMINE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateDaleRoseLattice,
  getDaleTailControlPoints,
  DALE_JASMINE_LORE
};

export default DALE_JASMINE_UNITS;
