/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QI_JASMINE_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { QI_JASMINE_KINEMATIC_CONSTANTS, evaluateQiGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { QI_JASMINE_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateQiCircleLattice, getQiTailControlPoints } from "./Unit_IV_Geometry";
import { QI_JASMINE_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface QiJasmineUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof QI_JASMINE_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateQiGaitState;
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
    circleLattice: typeof generateQiCircleLattice;
    tailControlPoints: typeof getQiTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const QI_JASMINE_UNITS: QiJasmineUnitsPackage = {
  UnitI_Morphometrics: QI_JASMINE_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: QI_JASMINE_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateQiGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: QI_JASMINE_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    circleLattice: generateQiCircleLattice,
    tailControlPoints: getQiTailControlPoints
  },
  UnitV_Lore: QI_JASMINE_LORE
};

export {
  QI_JASMINE_MORPHOMETRICS,
  QI_JASMINE_KINEMATIC_CONSTANTS,
  evaluateQiGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  QI_JASMINE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateQiCircleLattice,
  getQiTailControlPoints,
  QI_JASMINE_LORE
};

export default QI_JASMINE_UNITS;
