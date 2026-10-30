/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SANDRA_OPOSSUM_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { SANDRA_OPOSSUM_KINEMATIC_CONSTANTS, evaluateSandraOpossumGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { SANDRA_OPOSSUM_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoDiamondLattice, getSandraOpossumTailControlPoints } from "./Unit_IV_Geometry";
import { SANDRA_OPOSSUM_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface SandraOpossumUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof SANDRA_OPOSSUM_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateSandraOpossumGaitState;
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
    tailControlPoints: typeof getSandraOpossumTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const SANDRA_OPOSSUM_UNITS: SandraOpossumUnitsPackage = {
  UnitI_Morphometrics: SANDRA_OPOSSUM_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: SANDRA_OPOSSUM_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateSandraOpossumGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: SANDRA_OPOSSUM_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoDiamondLattice: generateTorsoDiamondLattice,
    tailControlPoints: getSandraOpossumTailControlPoints
  },
  UnitV_Lore: SANDRA_OPOSSUM_LORE
};

export {
  SANDRA_OPOSSUM_MORPHOMETRICS,
  SANDRA_OPOSSUM_KINEMATIC_CONSTANTS,
  evaluateSandraOpossumGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  SANDRA_OPOSSUM_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getSandraOpossumTailControlPoints,
  SANDRA_OPOSSUM_LORE
};

export default SANDRA_OPOSSUM_UNITS;
