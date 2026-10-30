/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TIANA_QIN_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { TIANA_QIN_KINEMATIC_CONSTANTS, evaluateTianaQinGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { TIANA_QIN_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoDiamondLattice, getTianaQinTailControlPoints } from "./Unit_IV_Geometry";
import { TIANA_QIN_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface TianaQinUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof TIANA_QIN_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateTianaQinGaitState;
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
    tailControlPoints: typeof getTianaQinTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const TIANA_QIN_UNITS: TianaQinUnitsPackage = {
  UnitI_Morphometrics: TIANA_QIN_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: TIANA_QIN_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateTianaQinGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: TIANA_QIN_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoDiamondLattice: generateTorsoDiamondLattice,
    tailControlPoints: getTianaQinTailControlPoints
  },
  UnitV_Lore: TIANA_QIN_LORE
};

export {
  TIANA_QIN_MORPHOMETRICS,
  TIANA_QIN_KINEMATIC_CONSTANTS,
  evaluateTianaQinGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  TIANA_QIN_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getTianaQinTailControlPoints,
  TIANA_QIN_LORE
};

export default TIANA_QIN_UNITS;
