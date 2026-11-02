/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JALISSA_CHIN_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { JALISSA_CHIN_KINEMATIC_CONSTANTS, evaluateJalissaChinGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { JALISSA_CHIN_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoDiamondLattice, getJalissaChinTailControlPoints } from "./Unit_IV_Geometry";
import { JALISSA_CHIN_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface JalissaChinUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof JALISSA_CHIN_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateJalissaChinGaitState;
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
    tailControlPoints: typeof getJalissaChinTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const JALISSA_CHIN_UNITS: JalissaChinUnitsPackage = {
  UnitI_Morphometrics: JALISSA_CHIN_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: JALISSA_CHIN_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateJalissaChinGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: JALISSA_CHIN_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoDiamondLattice: generateTorsoDiamondLattice,
    tailControlPoints: getJalissaChinTailControlPoints
  },
  UnitV_Lore: JALISSA_CHIN_LORE
};

export {
  JALISSA_CHIN_MORPHOMETRICS,
  JALISSA_CHIN_KINEMATIC_CONSTANTS,
  evaluateJalissaChinGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  JALISSA_CHIN_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getJalissaChinTailControlPoints,
  JALISSA_CHIN_LORE
};

export default JALISSA_CHIN_UNITS;
