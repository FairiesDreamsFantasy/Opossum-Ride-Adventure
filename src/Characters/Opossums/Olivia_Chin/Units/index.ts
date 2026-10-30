/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OLIVIA_CHIN_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { OLIVIA_CHIN_KINEMATIC_CONSTANTS, evaluateOliviaChinGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { OLIVIA_CHIN_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoDiamondLattice, getOliviaChinTailControlPoints } from "./Unit_IV_Geometry";
import { OLIVIA_CHIN_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface OliviaChinUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof OLIVIA_CHIN_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateOliviaChinGaitState;
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
    tailControlPoints: typeof getOliviaChinTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const OLIVIA_CHIN_UNITS: OliviaChinUnitsPackage = {
  UnitI_Morphometrics: OLIVIA_CHIN_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: OLIVIA_CHIN_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateOliviaChinGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: OLIVIA_CHIN_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoDiamondLattice: generateTorsoDiamondLattice,
    tailControlPoints: getOliviaChinTailControlPoints
  },
  UnitV_Lore: OLIVIA_CHIN_LORE
};

export {
  OLIVIA_CHIN_MORPHOMETRICS,
  OLIVIA_CHIN_KINEMATIC_CONSTANTS,
  evaluateOliviaChinGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  OLIVIA_CHIN_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getOliviaChinTailControlPoints,
  OLIVIA_CHIN_LORE
};

export default OLIVIA_CHIN_UNITS;
