/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * KADY ROSE - UNIT I: MORPHOMETRICS & VOLUMETRIC BIOMECHANICS
 * ============================================================================
 * Mathematical specification of physical mass, volumetric displacement,
 * center-of-mass distribution, and 3-D moment of inertia tensor for Kady Rose.
 *
 * Physical Dimensions:
 * - Shoulder Height: 5 feet 11 inches (71.0 inches / 180.34 cm)
 * - Body Width: 48.0 inches (121.92 cm)
 * - Body Length (excluding head/tail): 95.0 inches (241.30 cm)
 * - Full Body Length (with head & tail): 139.5 inches (354.33 cm)
 * - Tail Length: 28.5 inches (72.39 cm)
 * - Head Width: 47.5 inches (120.65 cm)
 * - Head Height: 46.0 inches (116.84 cm)
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
const a = (95.0 * 0.0254) / 2; // half-length ~ 1.2065 m
const b = (48.0 * 0.0254) / 2; // half-width ~ 0.6096 m
const c = (71.0 * 0.0254) / 2; // half-height ~ 0.9017 m

// 2. Tri-axial ellipsoid volumetric displacement integral: V = (4/3) * pi * a * b * c
const volumeM3 = (4.0 / 3.0) * Math.PI * a * b * c; // ~ 2.780 m^3

// 3. Opossum tissue density constant: rho ~ 1042 kg/m^3
const tissueDensityKgM3 = 1042.0;
const totalMassKg = volumeM3 * tissueDensityKgM3 * 0.68; // ~ 1970.0 kg

// 4. Moment of inertia tensor for tri-axial solid ellipsoid:
const Ixx = (1.0 / 5.0) * totalMassKg * (Math.pow(b, 2) + Math.pow(c, 2));
const Iyy = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(c, 2));
const Izz = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(b, 2));

export const KADY_ROSE_MORPHOMETRICS: MorphometricProfile = {
  name: "Kady Rose",
  id: "kady_rose",
  shoulderHeightInches: 71.0,
  bodyWidthInches: 48.0,
  bodyLengthInches: 95.0,
  fullBodyLengthInches: 139.5,
  headWidthInches: 47.5,
  headHeightInches: 46.0,
  tailLengthInches: 28.5,
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

export default KADY_ROSE_MORPHOMETRICS;
