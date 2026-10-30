/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AGAPE_ROSE_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { AGAPE_ROSE_KINEMATIC_CONSTANTS, evaluateAgapeRoseGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { AGAPE_ROSE_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoDiamondLattice, getAgapeRoseTailControlPoints } from "./Unit_IV_Geometry";
import { AGAPE_ROSE_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface AgapeRoseUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof AGAPE_ROSE_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateAgapeRoseGaitState;
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
    tailControlPoints: typeof getAgapeRoseTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const AGAPE_ROSE_UNITS: AgapeRoseUnitsPackage = {
  UnitI_Morphometrics: AGAPE_ROSE_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: AGAPE_ROSE_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateAgapeRoseGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: AGAPE_ROSE_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoDiamondLattice: generateTorsoDiamondLattice,
    tailControlPoints: getAgapeRoseTailControlPoints
  },
  UnitV_Lore: AGAPE_ROSE_LORE
};

export {
  AGAPE_ROSE_MORPHOMETRICS,
  AGAPE_ROSE_KINEMATIC_CONSTANTS,
  evaluateAgapeRoseGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  AGAPE_ROSE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getAgapeRoseTailControlPoints,
  AGAPE_ROSE_LORE
};

export default AGAPE_ROSE_UNITS;
