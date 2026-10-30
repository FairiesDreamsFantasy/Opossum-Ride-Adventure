/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WANDA_OPOSSUM_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { WANDA_OPOSSUM_KINEMATIC_CONSTANTS, evaluateWandaOpossumGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { WANDA_OPOSSUM_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoDiamondLattice, getWandaOpossumTailControlPoints } from "./Unit_IV_Geometry";
import { WANDA_OPOSSUM_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface WandaOpossumUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof WANDA_OPOSSUM_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateWandaOpossumGaitState;
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
    tailControlPoints: typeof getWandaOpossumTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const WANDA_OPOSSUM_UNITS: WandaOpossumUnitsPackage = {
  UnitI_Morphometrics: WANDA_OPOSSUM_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: WANDA_OPOSSUM_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateWandaOpossumGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: WANDA_OPOSSUM_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoDiamondLattice: generateTorsoDiamondLattice,
    tailControlPoints: getWandaOpossumTailControlPoints
  },
  UnitV_Lore: WANDA_OPOSSUM_LORE
};

export {
  WANDA_OPOSSUM_MORPHOMETRICS,
  WANDA_OPOSSUM_KINEMATIC_CONSTANTS,
  evaluateWandaOpossumGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  WANDA_OPOSSUM_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getWandaOpossumTailControlPoints,
  WANDA_OPOSSUM_LORE
};

export default WANDA_OPOSSUM_UNITS;
