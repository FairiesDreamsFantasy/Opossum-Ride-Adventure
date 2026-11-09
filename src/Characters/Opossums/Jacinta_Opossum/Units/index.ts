/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JACINTA_OPOSSUM_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { JACINTA_OPOSSUM_KINEMATIC_CONSTANTS, evaluateJacintaGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { JACINTA_OPOSSUM_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, getJacintaTailControlPoints } from "./Unit_IV_Geometry";
import { JACINTA_OPOSSUM_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface JacintaOpossumUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof JACINTA_OPOSSUM_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateJacintaGaitState;
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
    tailControlPoints: typeof getJacintaTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const JACINTA_OPOSSUM_UNITS: JacintaOpossumUnitsPackage = {
  UnitI_Morphometrics: JACINTA_OPOSSUM_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: JACINTA_OPOSSUM_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateJacintaGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: JACINTA_OPOSSUM_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    tailControlPoints: getJacintaTailControlPoints
  },
  UnitV_Lore: JACINTA_OPOSSUM_LORE
};

export {
  JACINTA_OPOSSUM_MORPHOMETRICS,
  JACINTA_OPOSSUM_KINEMATIC_CONSTANTS,
  evaluateJacintaGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  JACINTA_OPOSSUM_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  getJacintaTailControlPoints,
  JACINTA_OPOSSUM_LORE
};

export default JACINTA_OPOSSUM_UNITS;
