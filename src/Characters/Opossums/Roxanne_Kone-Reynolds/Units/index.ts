/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ROXANNE_KONE_REYNOLDS_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { ROXANNE_KONE_REYNOLDS_KINEMATIC_CONSTANTS, evaluateRoxanneGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { ROXANNE_KONE_REYNOLDS_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateEarRedDiamondArray, getRoxanneTailControlPoints } from "./Unit_IV_Geometry";
import { ROXANNE_KONE_REYNOLDS_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface RoxanneKoneReynoldsUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof ROXANNE_KONE_REYNOLDS_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateRoxanneGaitState;
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
    earRedDiamondArray: typeof generateEarRedDiamondArray;
    tailControlPoints: typeof getRoxanneTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const ROXANNE_KONE_REYNOLDS_UNITS: RoxanneKoneReynoldsUnitsPackage = {
  UnitI_Morphometrics: ROXANNE_KONE_REYNOLDS_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: ROXANNE_KONE_REYNOLDS_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateRoxanneGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: ROXANNE_KONE_REYNOLDS_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    earRedDiamondArray: generateEarRedDiamondArray,
    tailControlPoints: getRoxanneTailControlPoints
  },
  UnitV_Lore: ROXANNE_KONE_REYNOLDS_LORE
};

export {
  ROXANNE_KONE_REYNOLDS_MORPHOMETRICS,
  ROXANNE_KONE_REYNOLDS_KINEMATIC_CONSTANTS,
  evaluateRoxanneGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  ROXANNE_KONE_REYNOLDS_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateEarRedDiamondArray,
  getRoxanneTailControlPoints,
  ROXANNE_KONE_REYNOLDS_LORE
};

export default ROXANNE_KONE_REYNOLDS_UNITS;
