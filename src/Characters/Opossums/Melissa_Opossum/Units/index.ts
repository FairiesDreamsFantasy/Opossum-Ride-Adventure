/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MELISSA_OPOSSUM_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { MELISSA_OPOSSUM_KINEMATIC_CONSTANTS, evaluateMelissaOpossumGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { MELISSA_OPOSSUM_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoDiamondLattice, getMelissaOpossumTailControlPoints } from "./Unit_IV_Geometry";
import { MELISSA_OPOSSUM_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface MelissaOpossumUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof MELISSA_OPOSSUM_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateMelissaOpossumGaitState;
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
    tailControlPoints: typeof getMelissaOpossumTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const MELISSA_OPOSSUM_UNITS: MelissaOpossumUnitsPackage = {
  UnitI_Morphometrics: MELISSA_OPOSSUM_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: MELISSA_OPOSSUM_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateMelissaOpossumGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: MELISSA_OPOSSUM_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoDiamondLattice: generateTorsoDiamondLattice,
    tailControlPoints: getMelissaOpossumTailControlPoints
  },
  UnitV_Lore: MELISSA_OPOSSUM_LORE
};

export {
  MELISSA_OPOSSUM_MORPHOMETRICS,
  MELISSA_OPOSSUM_KINEMATIC_CONSTANTS,
  evaluateMelissaOpossumGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  MELISSA_OPOSSUM_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getMelissaOpossumTailControlPoints,
  MELISSA_OPOSSUM_LORE
};

export default MELISSA_OPOSSUM_UNITS;
