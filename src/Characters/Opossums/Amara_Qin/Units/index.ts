/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AMARA_QIN_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { AMARA_QIN_KINEMATIC_CONSTANTS, evaluateAmaraQinGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { AMARA_QIN_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoDiamondLattice, getAmaraQinTailControlPoints } from "./Unit_IV_Geometry";
import { AMARA_QIN_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface AmaraQinUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof AMARA_QIN_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateAmaraQinGaitState;
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
    tailControlPoints: typeof getAmaraQinTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const AMARA_QIN_UNITS: AmaraQinUnitsPackage = {
  UnitI_Morphometrics: AMARA_QIN_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: AMARA_QIN_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateAmaraQinGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: AMARA_QIN_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoDiamondLattice: generateTorsoDiamondLattice,
    tailControlPoints: getAmaraQinTailControlPoints
  },
  UnitV_Lore: AMARA_QIN_LORE
};

export {
  AMARA_QIN_MORPHOMETRICS,
  AMARA_QIN_KINEMATIC_CONSTANTS,
  evaluateAmaraQinGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  AMARA_QIN_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getAmaraQinTailControlPoints,
  AMARA_QIN_LORE
};

export default AMARA_QIN_UNITS;
