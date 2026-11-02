/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { STACEY_JASMIN_MORPHOMETRICS, MorphometricProfile } from "./Unit_I_Morphometrics";
import { STACEY_JASMIN_KINEMATIC_CONSTANTS, evaluateStaceyGaitState, calculateFroudeNumber, integrateSuspensionRK4 } from "./Unit_II_Kinematics";
import { STACEY_JASMIN_ACOUSTICS, AcousticVocalProfile, calculateBiquadBandpassCoefficients, evaluateChirpFrequency } from "./Unit_III_Acoustics";
import { evaluateCubicBezier2D, evaluateCubicBezierDerivative, calculateBezierCurvature, generateStaceyBeagleSaddleLattice, getStaceyTailControlPoints } from "./Unit_IV_Geometry";
import { STACEY_JASMIN_LORE, LoreProfile } from "./Unit_V_Lore_Ecosystem";

export interface StaceyJasminUnitsPackage {
  UnitI_Morphometrics: MorphometricProfile;
  UnitII_Kinematics: {
    constants: typeof STACEY_JASMIN_KINEMATIC_CONSTANTS;
    evaluateGait: typeof evaluateStaceyGaitState;
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
    saddleLattice: typeof generateStaceyBeagleSaddleLattice;
    tailControlPoints: typeof getStaceyTailControlPoints;
  };
  UnitV_Lore: LoreProfile;
}

export const STACEY_JASMIN_UNITS: StaceyJasminUnitsPackage = {
  UnitI_Morphometrics: STACEY_JASMIN_MORPHOMETRICS,
  UnitII_Kinematics: {
    constants: STACEY_JASMIN_KINEMATIC_CONSTANTS,
    evaluateGait: evaluateStaceyGaitState,
    froudeNumber: calculateFroudeNumber,
    suspensionRK4: integrateSuspensionRK4
  },
  UnitIII_Acoustics: {
    profile: STACEY_JASMIN_ACOUSTICS,
    biquadCoefficients: calculateBiquadBandpassCoefficients,
    chirpEvaluator: evaluateChirpFrequency
  },
  UnitIV_Geometry: {
    evaluateSpline: evaluateCubicBezier2D,
    splineDerivative: evaluateCubicBezierDerivative,
    curvature: calculateBezierCurvature,
    saddleLattice: generateStaceyBeagleSaddleLattice,
    tailControlPoints: getStaceyTailControlPoints
  },
  UnitV_Lore: STACEY_JASMIN_LORE
};

export {
  STACEY_JASMIN_MORPHOMETRICS,
  STACEY_JASMIN_KINEMATIC_CONSTANTS,
  evaluateStaceyGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  STACEY_JASMIN_ACOUSTICS,
  calculateBiquadBandpassCoefficients,
  evaluateChirpFrequency,
  evaluateCubicBezier2D,
  evaluateCubicBezierDerivative,
  calculateBezierCurvature,
  generateStaceyBeagleSaddleLattice,
  getStaceyTailControlPoints,
  STACEY_JASMIN_LORE
};

export default STACEY_JASMIN_UNITS;
