/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JAHMELLA_ROSE_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { JAHMELLA_ROSE_KINEMATIC_CONSTANTS, evaluateJahmellaGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { JAHMELLA_ROSE_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoSpottedGrid, getJahmellaTailControlPoints } from "./Unit_IV_Geometry";
import { JAHMELLA_ROSE_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface JahmellaRoseUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof JAHMELLA_ROSE_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateJahmellaGaitState;
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
    torsoSpottedGrid: typeof generateTorsoSpottedGrid;
    tailControlPoints: typeof getJahmellaTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const JAHMELLA_ROSE_UNITS: JahmellaRoseUnitsPackage = {
  UnitI_Morphometrics: JAHMELLA_ROSE_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: JAHMELLA_ROSE_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateJahmellaGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: JAHMELLA_ROSE_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoSpottedGrid: generateTorsoSpottedGrid,
    tailControlPoints: getJahmellaTailControlPoints
  },
  UnitV_Lore: JAHMELLA_ROSE_LORE
};

export {
  JAHMELLA_ROSE_MORPHOMETRICS,
  JAHMELLA_ROSE_KINEMATIC_CONSTANTS,
  evaluateJahmellaGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  JAHMELLA_ROSE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoSpottedGrid,
  getJahmellaTailControlPoints,
  JAHMELLA_ROSE_LORE
};

export default JAHMELLA_ROSE_UNITS;
