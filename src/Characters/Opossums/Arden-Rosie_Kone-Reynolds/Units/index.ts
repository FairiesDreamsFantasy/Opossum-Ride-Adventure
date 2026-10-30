/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ARDEN_ROSIE_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { ARDEN_ROSIE_KINEMATIC_CONSTANTS, evaluateArdenRosieGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { ARDEN_ROSIE_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateTorsoDiamondLattice, getArdenRosieTailControlPoints } from "./Unit_IV_Geometry";
import { ARDEN_ROSIE_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface ArdenRosieUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof ARDEN_ROSIE_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateArdenRosieGaitState;
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
    tailControlPoints: typeof getArdenRosieTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const ARDEN_ROSIE_UNITS: ArdenRosieUnitsPackage = {
  UnitI_Morphometrics: ARDEN_ROSIE_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: ARDEN_ROSIE_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateArdenRosieGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: ARDEN_ROSIE_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    torsoDiamondLattice: generateTorsoDiamondLattice,
    tailControlPoints: getArdenRosieTailControlPoints
  },
  UnitV_Lore: ARDEN_ROSIE_LORE
};

export {
  ARDEN_ROSIE_MORPHOMETRICS,
  ARDEN_ROSIE_KINEMATIC_CONSTANTS,
  evaluateArdenRosieGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  ARDEN_ROSIE_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateTorsoDiamondLattice,
  getArdenRosieTailControlPoints,
  ARDEN_ROSIE_LORE
};

export default ARDEN_ROSIE_UNITS;
