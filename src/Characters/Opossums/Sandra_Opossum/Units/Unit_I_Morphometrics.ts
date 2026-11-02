/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * SANDRA OPOSSUM - UNIT I: MORPHOMETRICS & VOLUMETRIC BIOMECHANICS
 * ============================================================================
 * Mathematical specification of physical mass, volumetric displacement,
 * center-of-mass distribution, and 3-D moment of inertia tensor for Sandra Opossum.
 *
 * Physical Dimensions:
 * - Shoulder Height: 5 feet 3 inches (63.0 inches / 160.02 cm)
 * - Body Width: 38.0 inches (96.52 cm)
 * - Body Length (excluding head/tail): 88.0 inches (223.52 cm)
 * - Full Body Length (with head & tail): 130.9 inches (332.49 cm)
 * - Tail Length: 28.512 inches (72.42 cm)
 * - Head Width: 36.0 inches (91.44 cm)
 * - Head Height: 36.0 inches (91.44 cm)
 */

export interface InertiaTensor3D {
  Ixx: number;
  Iyy: number;
  Izz: number;
  Ixy: number;
  Ixz: number;
  Iyz: number;
}

export interface MorphometricProfile {
  name: string;
  id: string;
  shoulderHeightInches: number;
  bodyWidthInches: number;
  bodyLengthInches: number;
  fullBodyLengthInches: number;
  headWidthInches: number;
  headHeightInches: number;
  tailLengthInches: number;
  semiMajorAxisMeters: number;
  semiMinorAxisMeters: number;
  semiVerticalAxisMeters: number;
  volumetricDisplacementCubicMeters: number;
  calculatedMassKg: number;
  centerOfMassOffsetMeters: { x: number; y: number; z: number };
  inertiaTensor: InertiaTensor3D;
  riderLoadCapacityRatio: number;
}

const a = (88.0 * 0.0254) / 2; // half-length ~ 1.1176 m
const b = (38.0 * 0.0254) / 2; // half-width ~ 0.4826 m
const c = (63.0 * 0.0254) / 2; // half-height ~ 0.8001 m

const volumeM3 = (4.0 / 3.0) * Math.PI * a * b * c; // ~ 1.810 m^3
const tissueDensityKgM3 = 1042.0;
const totalMassKg = volumeM3 * tissueDensityKgM3 * 0.68; // ~ 1282 kg

const Ixx = (1.0 / 5.0) * totalMassKg * (Math.pow(b, 2) + Math.pow(c, 2));
const Iyy = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(c, 2));
const Izz = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(b, 2));

export const SANDRA_OPOSSUM_MORPHOMETRICS: MorphometricProfile = {
  name: "Sandra Opossum",
  id: "sandra_opossum",
  shoulderHeightInches: 63.0,
  bodyWidthInches: 38.0,
  bodyLengthInches: 88.0,
  fullBodyLengthInches: 130.9,
  headWidthInches: 36.0,
  headHeightInches: 36.0,
  tailLengthInches: 28.512,
  semiMajorAxisMeters: a,
  semiMinorAxisMeters: b,
  semiVerticalAxisMeters: c,
  volumetricDisplacementCubicMeters: volumeM3,
  calculatedMassKg: totalMassKg,
  centerOfMassOffsetMeters: {
    x: 0.0,
    y: c * 0.45,
    z: -a * 0.08
  },
  inertiaTensor: {
    Ixx,
    Iyy,
    Izz,
    Ixy: 0.0,
    Ixz: 0.0,
    Iyz: 0.0
  },
  riderLoadCapacityRatio: 0.28
};

export default SANDRA_OPOSSUM_MORPHOMETRICS;
