/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CAMRYN_OPOSSUM_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { CAMRYN_OPOSSUM_KINEMATIC_CONSTANTS, evaluateCamrynGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { CAMRYN_OPOSSUM_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, getCamrynTailControlPoints } from "./Unit_IV_Geometry";
import { CAMRYN_OPOSSUM_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface CamrynOpossumUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof CAMRYN_OPOSSUM_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateCamrynGaitState;
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
    tailControlPoints: typeof getCamrynTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const CAMRYN_OPOSSUM_UNITS: CamrynOpossumUnitsPackage = {
  UnitI_Morphometrics: CAMRYN_OPOSSUM_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: CAMRYN_OPOSSUM_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateCamrynGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: CAMRYN_OPOSSUM_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    tailControlPoints: getCamrynTailControlPoints
  },
  UnitV_Lore: CAMRYN_OPOSSUM_LORE
};

export {
  CAMRYN_OPOSSUM_MORPHOMETRICS,
  CAMRYN_OPOSSUM_KINEMATIC_CONSTANTS,
  evaluateCamrynGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  CAMRYN_OPOSSUM_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  getCamrynTailControlPoints,
  CAMRYN_OPOSSUM_LORE
};

export default CAMRYN_OPOSSUM_UNITS;
