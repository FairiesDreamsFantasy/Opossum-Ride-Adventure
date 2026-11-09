/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JAMIE_JASMINE_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { JAMIE_JASMINE_KINEMATIC_CONSTANTS, evaluateJamieGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { JAMIE_JASMINE_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, getJamieTailControlPoints } from "./Unit_IV_Geometry";
import { JAMIE_JASMINE_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface JamieJasmineUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof JAMIE_JASMINE_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateJamieGaitState;
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
    tailControlPoints: typeof getJamieTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const JAMIE_JASMINE_UNITS: JamieJasmineUnitsPackage = {
  UnitI_Morphometrics: JAMIE_JASMINE_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: JAMIE_JASMINE_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateJamieGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: JAMIE_JASMINE_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    tailControlPoints: getJamieTailControlPoints
  },
  UnitV_Lore: JAMIE_JASMINE_LORE
};

export {
  JAMIE_JASMINE_MORPHOMETRICS,
  JAMIE_JASMINE_KINEMATIC_CONSTANTS,
  evaluateJamieGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  JAMIE_JASMINE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  getJamieTailControlPoints,
  JAMIE_JASMINE_LORE
};

export default JAMIE_JASMINE_UNITS;
