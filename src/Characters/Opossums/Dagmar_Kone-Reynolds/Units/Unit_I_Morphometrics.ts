/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * DAGMAR KONE-REYNOLDS - UNIT I: MORPHOMETRICS & VOLUMETRIC BIOMECHANICS
 * ============================================================================
 * Mathematical specification of physical mass, volumetric displacement,
 * center-of-mass distribution, and 3-D moment of inertia tensor for Dagmar.
 *
 * Physical Dimensions:
 * - Shoulder Height: 5 feet 8.5 inches (68.5 inches / 173.99 cm)
 * - Body Width: 40.0 inches (101.60 cm)
 * - Body Length (excluding head/tail): 85.0 inches (215.90 cm)
 * - Full Body Length (with head & tail): 125.5 inches (318.77 cm)
 * - Tail Length: 25.5 inches (64.77 cm)
 * - Head Width: 39.0 inches (99.06 cm)
 * - Head Height: 44.0 inches (111.76 cm)
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

// 1. Semi-axes in metric units (meters)
const a = (85.0 * 0.0254) / 2; // half-length ~ 1.0795 m
const b = (40.0 * 0.0254) / 2; // half-width ~ 0.5080 m
const c = (68.5 * 0.0254) / 2; // half-height ~ 0.86995 m

// 2. Tri-axial ellipsoid volumetric displacement integral: V = (4/3) * pi * a * b * c
const volumeM3 = (4.0 / 3.0) * Math.PI * a * b * c; // ~ 1.999 m^3

// 3. Opossum tissue density constant: rho ~ 1042 kg/m^3
const tissueDensityKgM3 = 1042.0;
const totalMassKg = volumeM3 * tissueDensityKgM3 * 0.68; // ~ 1416.7 kg

// 4. Moment of inertia tensor for tri-axial solid ellipsoid:
const Ixx = (1.0 / 5.0) * totalMassKg * (Math.pow(b, 2) + Math.pow(c, 2));
const Iyy = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(c, 2));
const Izz = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(b, 2));

export const DAGMAR_KONE_REYNOLDS_MORPHOMETRICS: MorphometricProfile = {
  name: "Dagmar Kone-Reynolds",
  id: "dagmar_kone_reynolds",
  shoulderHeightInches: 68.5,
  bodyWidthInches: 40.0,
  bodyLengthInches: 85.0,
  fullBodyLengthInches: 125.5,
  headWidthInches: 39.0,
  headHeightInches: 44.0,
  tailLengthInches: 25.5,
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

export default DAGMAR_KONE_REYNOLDS_MORPHOMETRICS;
