/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DAGMAR_KONE_REYNOLDS_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { DAGMAR_KONE_REYNOLDS_KINEMATIC_CONSTANTS, evaluateDagmarGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { DAGMAR_KONE_REYNOLDS_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateEarDiamondLattice, getDagmarTailControlPoints } from "./Unit_IV_Geometry";
import { DAGMAR_KONE_REYNOLDS_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface DagmarKoneReynoldsUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof DAGMAR_KONE_REYNOLDS_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateDagmarGaitState;
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
    earDiamondLattice: typeof generateEarDiamondLattice;
    tailControlPoints: typeof getDagmarTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const DAGMAR_KONE_REYNOLDS_UNITS: DagmarKoneReynoldsUnitsPackage = {
  UnitI_Morphometrics: DAGMAR_KONE_REYNOLDS_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: DAGMAR_KONE_REYNOLDS_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateDagmarGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: DAGMAR_KONE_REYNOLDS_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    earDiamondLattice: generateEarDiamondLattice,
    tailControlPoints: getDagmarTailControlPoints
  },
  UnitV_Lore: DAGMAR_KONE_REYNOLDS_LORE
};

export {
  DAGMAR_KONE_REYNOLDS_MORPHOMETRICS,
  DAGMAR_KONE_REYNOLDS_KINEMATIC_CONSTANTS,
  evaluateDagmarGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  DAGMAR_KONE_REYNOLDS_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateEarDiamondLattice,
  getDagmarTailControlPoints,
  DAGMAR_KONE_REYNOLDS_LORE
};

export default DAGMAR_KONE_REYNOLDS_UNITS;
