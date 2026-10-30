/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * JAHMELLA ROSE - UNIT I: MORPHOMETRICS & VOLUMETRIC BIOMECHANICS
 * ============================================================================
 * Mathematical specification of physical mass, volumetric displacement,
 * center-of-mass distribution, and 3-D moment of inertia tensor for Jahmella Rose.
 *
 * Physical Dimensions:
 * - Shoulder Height: 6 feet 0 inches (72.0 inches / 182.88 cm)
 * - Body Width: 40.0 inches (101.60 cm)
 * - Body Length (excluding head/tail): 99.5 inches (252.73 cm)
 * - Full Body Length (with head & tail): 144.35 inches (366.65 cm)
 * - Tail Length: 29.85 inches (75.82 cm)
 * - Head Width: 37.0 inches (93.98 cm)
 * - Head Height: 45.0 inches (114.30 cm)
 */

export interface InertiaTensor3D {
  Ixx: number; // Rotational inertia around transverse pitch axis (kg * m^2)
  Iyy: number; // Rotational inertia around vertical yaw axis (kg * m^2)
  Izz: number; // Rotational inertia around longitudinal roll axis (kg * m^2)
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
  semiMajorAxisMeters: number;   // a: half-length
  semiMinorAxisMeters: number;   // b: half-width
  semiVerticalAxisMeters: number; // c: half-height
  volumetricDisplacementCubicMeters: number;
  calculatedMassKg: number;
  centerOfMassOffsetMeters: { x: number; y: number; z: number };
  inertiaTensor: InertiaTensor3D;
  riderLoadCapacityRatio: number;
}

// 1. Semi-axes in metric units (meters)
const a = (99.5 * 0.0254) / 2; // half-length ~ 1.26365 m
const b = (40.0 * 0.0254) / 2; // half-width ~ 0.5080 m
const c = (72.0 * 0.0254) / 2; // half-height ~ 0.9144 m

// 2. Tri-axial ellipsoid volumetric displacement integral: V = (4/3) * pi * a * b * c
const volumeM3 = (4.0 / 3.0) * Math.PI * a * b * c; // ~ 2.459 m^3

// 3. Opossum tissue density constant: rho ~ 1042 kg/m^3
const tissueDensityKgM3 = 1042.0;
const totalMassKg = volumeM3 * tissueDensityKgM3 * 0.68; // ~ 1742.6 kg

// 4. Moment of inertia tensor for tri-axial solid ellipsoid:
const Ixx = (1.0 / 5.0) * totalMassKg * (Math.pow(b, 2) + Math.pow(c, 2));
const Iyy = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(c, 2));
const Izz = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(b, 2));

export const JAHMELLA_ROSE_MORPHOMETRICS: MorphometricProfile = {
  name: "Jahmella Rose",
  id: "jahmella_rose",
  shoulderHeightInches: 72.0,
  bodyWidthInches: 40.0,
  bodyLengthInches: 99.5,
  fullBodyLengthInches: 144.35,
  headWidthInches: 37.0,
  headHeightInches: 45.0,
  tailLengthInches: 29.85,
  semiMajorAxisMeters: a,
  semiMinorAxisMeters: b,
  semiVerticalAxisMeters: c,
  volumetricDisplacementCubicMeters: volumeM3,
  calculatedMassKg: totalMassKg,
  centerOfMassOffsetMeters: {
    x: 0.0,
    y: c * 0.46,
    z: -a * 0.07
  },
  inertiaTensor: {
    Ixx,
    Iyy,
    Izz,
    Ixy: 0.0,
    Ixz: 0.0,
    Iyz: 0.0
  },
  riderLoadCapacityRatio: 0.30 // Up to 30% of mount body mass with high commanding shoulder
};

export default JAHMELLA_ROSE_MORPHOMETRICS;
