/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * WANDA OPOSSUM - UNIT I: MORPHOMETRICS & VOLUMETRIC BIOMECHANICS
 * ============================================================================
 * Mathematical specification of physical mass, volumetric displacement,
 * center-of-mass distribution, and 3-D moment of inertia tensor for Wanda Opossum.
 *
 * Physical Dimensions:
 * - Shoulder Height: 5 feet 3 inches (63.0 inches / 160.02 cm)
 * - Body Width: 36.0 inches (91.44 cm)
 * - Body Length (excluding head/tail): 84.0 inches (213.36 cm)
 * - Full Body Length (with head & tail): 122.7 inches (311.66 cm)
 * - Tail Length: 25.2 inches (64.01 cm)
 * - Head Width: 36.0 inches (91.44 cm)
 * - Head Height: 45.0 inches (114.30 cm)
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

const a = (84.0 * 0.0254) / 2; // half-length ~ 1.0668 m
const b = (36.0 * 0.0254) / 2; // half-width ~ 0.4572 m
const c = (63.0 * 0.0254) / 2; // half-height ~ 0.8001 m

const volumeM3 = (4.0 / 3.0) * Math.PI * a * b * c; // ~ 1.675 m^3
const tissueDensityKgM3 = 1042.0;
const totalMassKg = volumeM3 * tissueDensityKgM3 * 0.68; // ~ 1186 kg

const Ixx = (1.0 / 5.0) * totalMassKg * (Math.pow(b, 2) + Math.pow(c, 2));
const Iyy = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(c, 2));
const Izz = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(b, 2));

export const WANDA_OPOSSUM_MORPHOMETRICS: MorphometricProfile = {
  name: "Wanda Opossum",
  id: "wanda_opossum",
  shoulderHeightInches: 63.0,
  bodyWidthInches: 36.0,
  bodyLengthInches: 84.0,
  fullBodyLengthInches: 122.7,
  headWidthInches: 36.0,
  headHeightInches: 45.0,
  tailLengthInches: 25.2,
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

export default WANDA_OPOSSUM_MORPHOMETRICS;
