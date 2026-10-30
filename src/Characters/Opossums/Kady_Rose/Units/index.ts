/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KADY_ROSE_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { KADY_ROSE_KINEMATIC_CONSTANTS, evaluateKadyGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { KADY_ROSE_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, getKadyEarBronzeCircles, evaluateHeartCharmCurve, getKadyTailControlPoints } from "./Unit_IV_Geometry";
import { KADY_ROSE_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface KadyRoseUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof KADY_ROSE_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateKadyGaitState;
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
    earBronzeCircles: typeof getKadyEarBronzeCircles;
    heartCharmCurve: typeof evaluateHeartCharmCurve;
    tailControlPoints: typeof getKadyTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const KADY_ROSE_UNITS: KadyRoseUnitsPackage = {
  UnitI_Morphometrics: KADY_ROSE_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: KADY_ROSE_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateKadyGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: KADY_ROSE_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    earBronzeCircles: getKadyEarBronzeCircles,
    heartCharmCurve: evaluateHeartCharmCurve,
    tailControlPoints: getKadyTailControlPoints
  },
  UnitV_Lore: KADY_ROSE_LORE
};

export {
  KADY_ROSE_MORPHOMETRICS,
  KADY_ROSE_KINEMATIC_CONSTANTS,
  evaluateKadyGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  KADY_ROSE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  getKadyEarBronzeCircles,
  evaluateHeartCharmCurve,
  getKadyTailControlPoints,
  KADY_ROSE_LORE
};

export default KADY_ROSE_UNITS;
