/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CALLIE_ROSE_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { CALLIE_ROSE_KINEMATIC_CONSTANTS, evaluateCallieGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { CALLIE_ROSE_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateCallieCircleLattice, getCallieTailControlPoints } from "./Unit_IV_Geometry";
import { CALLIE_ROSE_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface CallieRoseUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof CALLIE_ROSE_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateCallieGaitState;
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
    circleLattice: typeof generateCallieCircleLattice;
    tailControlPoints: typeof getCallieTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const CALLIE_ROSE_UNITS: CallieRoseUnitsPackage = {
  UnitI_Morphometrics: CALLIE_ROSE_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: CALLIE_ROSE_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateCallieGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: CALLIE_ROSE_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    circleLattice: generateCallieCircleLattice,
    tailControlPoints: getCallieTailControlPoints
  },
  UnitV_Lore: CALLIE_ROSE_LORE
};

export {
  CALLIE_ROSE_MORPHOMETRICS,
  CALLIE_ROSE_KINEMATIC_CONSTANTS,
  evaluateCallieGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  CALLIE_ROSE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateCallieCircleLattice,
  getCallieTailControlPoints,
  CALLIE_ROSE_LORE
};

export default CALLIE_ROSE_UNITS;
