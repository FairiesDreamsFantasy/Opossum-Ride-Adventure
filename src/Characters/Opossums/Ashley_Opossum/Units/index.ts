/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ASHLEY_OPOSSUM_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { ASHLEY_OPOSSUM_KINEMATIC_CONSTANTS, evaluateAshleyOpossumGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { ASHLEY_OPOSSUM_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoDiamondLattice, getAshleyOpossumTailControlPoints } from "./Unit_IV_Geometry";
import { ASHLEY_OPOSSUM_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface AshleyOpossumUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof ASHLEY_OPOSSUM_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateAshleyOpossumGaitState;
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
    torsoDiamondLattice: typeof generateTorsoDiamondLattice;
    tailControlPoints: typeof getAshleyOpossumTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const ASHLEY_OPOSSUM_UNITS: AshleyOpossumUnitsPackage = {
  UnitI_Morphometrics: ASHLEY_OPOSSUM_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: ASHLEY_OPOSSUM_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateAshleyOpossumGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: ASHLEY_OPOSSUM_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoDiamondLattice: generateTorsoDiamondLattice,
    tailControlPoints: getAshleyOpossumTailControlPoints
  },
  UnitV_Lore: ASHLEY_OPOSSUM_LORE
};

export {
  ASHLEY_OPOSSUM_MORPHOMETRICS,
  ASHLEY_OPOSSUM_KINEMATIC_CONSTANTS,
  evaluateAshleyOpossumGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  ASHLEY_OPOSSUM_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getAshleyOpossumTailControlPoints,
  ASHLEY_OPOSSUM_LORE
};

export default ASHLEY_OPOSSUM_UNITS;
