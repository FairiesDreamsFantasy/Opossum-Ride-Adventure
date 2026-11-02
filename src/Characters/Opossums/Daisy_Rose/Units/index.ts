/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DAISY_ROSE_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { DAISY_ROSE_KINEMATIC_CONSTANTS, evaluateDaisyGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { DAISY_ROSE_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateDaisyPatternLattice, getDaisyTailControlPoints } from "./Unit_IV_Geometry";
import { DAISY_ROSE_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface DaisyRoseUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof DAISY_ROSE_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateDaisyGaitState;
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
    patternLattice: typeof generateDaisyPatternLattice;
    tailControlPoints: typeof getDaisyTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const DAISY_ROSE_UNITS: DaisyRoseUnitsPackage = {
  UnitI_Morphometrics: DAISY_ROSE_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: DAISY_ROSE_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateDaisyGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: DAISY_ROSE_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    patternLattice: generateDaisyPatternLattice,
    tailControlPoints: getDaisyTailControlPoints
  },
  UnitV_Lore: DAISY_ROSE_LORE
};

export {
  DAISY_ROSE_MORPHOMETRICS,
  DAISY_ROSE_KINEMATIC_CONSTANTS,
  evaluateDaisyGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  DAISY_ROSE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateDaisyPatternLattice,
  getDaisyTailControlPoints,
  DAISY_ROSE_LORE
};

export default DAISY_ROSE_UNITS;
