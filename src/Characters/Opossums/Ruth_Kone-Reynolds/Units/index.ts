/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RUTH_KONE_REYNOLDS_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { RUTH_KONE_REYNOLDS_KINEMATIC_CONSTANTS, evaluateRuthGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { RUTH_KONE_REYNOLDS_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, evaluateBotanicalPetalPoints, getRuthTailControlPoints } from "./Unit_IV_Geometry";
import { RUTH_KONE_REYNOLDS_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface RuthKoneReynoldsUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof RUTH_KONE_REYNOLDS_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateRuthGaitState;
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
    botanicalPetals: typeof evaluateBotanicalPetalPoints;
    tailControlPoints: typeof getRuthTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const RUTH_KONE_REYNOLDS_UNITS: RuthKoneReynoldsUnitsPackage = {
  UnitI_Morphometrics: RUTH_KONE_REYNOLDS_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: RUTH_KONE_REYNOLDS_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateRuthGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: RUTH_KONE_REYNOLDS_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    botanicalPetals: evaluateBotanicalPetalPoints,
    tailControlPoints: getRuthTailControlPoints
  },
  UnitV_Lore: RUTH_KONE_REYNOLDS_LORE
};

export {
  RUTH_KONE_REYNOLDS_MORPHOMETRICS,
  RUTH_KONE_REYNOLDS_KINEMATIC_CONSTANTS,
  evaluateRuthGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  RUTH_KONE_REYNOLDS_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  evaluateBotanicalPetalPoints,
  getRuthTailControlPoints,
  RUTH_KONE_REYNOLDS_LORE
};

export default RUTH_KONE_REYNOLDS_UNITS;
