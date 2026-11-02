/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SAFFRON_ROSE_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { SAFFRON_ROSE_KINEMATIC_CONSTANTS, evaluateSaffronGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { SAFFRON_ROSE_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generatePolkaDotLattice, getSaffronTailControlPoints } from "./Unit_IV_Geometry";
import { SAFFRON_ROSE_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface SaffronRoseUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof SAFFRON_ROSE_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateSaffronGaitState;
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
    polkaDotLattice: typeof generatePolkaDotLattice;
    tailControlPoints: typeof getSaffronTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const SAFFRON_ROSE_UNITS: SaffronRoseUnitsPackage = {
  UnitI_Morphometrics: SAFFRON_ROSE_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: SAFFRON_ROSE_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateSaffronGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: SAFFRON_ROSE_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    polkaDotLattice: generatePolkaDotLattice,
    tailControlPoints: getSaffronTailControlPoints
  },
  UnitV_Lore: SAFFRON_ROSE_LORE
};

export {
  SAFFRON_ROSE_MORPHOMETRICS,
  SAFFRON_ROSE_KINEMATIC_CONSTANTS,
  evaluateSaffronGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  SAFFRON_ROSE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generatePolkaDotLattice,
  getSaffronTailControlPoints,
  SAFFRON_ROSE_LORE
};

export default SAFFRON_ROSE_UNITS;
