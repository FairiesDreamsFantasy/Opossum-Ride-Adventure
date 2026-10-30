/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ARDEN-ROSIE KONE-REYNOLDS - UNIT I: MORPHOMETRICS & VOLUMETRIC BIOMECHANICS
 * ============================================================================
 * Mathematical specification of physical mass, volumetric displacement,
 * center-of-mass distribution, and 3-D moment of inertia tensor for Arden-Rosie.
 *
 * Physical Dimensions:
 * - Shoulder Height: 5 feet 1.5 inches (61.5 inches / 156.21 cm)
 * - Body Width: 38.0 inches (96.52 cm)
 * - Body Length (excluding head/tail): 78.0 inches (198.12 cm)
 * - Full Body Length (with head & tail): 115.4 inches (293.12 cm)
 * - Tail Length: 23.4 inches (59.44 cm)
 * - Head Width: 36.5 inches (92.71 cm)
 * - Head Height: 40.0 inches (101.60 cm)
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
const a = (78.0 * 0.0254) / 2; // half-length ~ 0.9906 m
const b = (38.0 * 0.0254) / 2; // half-width ~ 0.4826 m
const c = (61.5 * 0.0254) / 2; // half-height ~ 0.78105 m

// 2. Tri-axial ellipsoid volumetric displacement integral: V = (4/3) * pi * a * b * c
const volumeM3 = (4.0 / 3.0) * Math.PI * a * b * c; // ~ 1.565 m^3

// 3. Opossum tissue density constant: rho ~ 1042 kg/m^3
const tissueDensityKgM3 = 1042.0;
const totalMassKg = volumeM3 * tissueDensityKgM3 * 0.68; // ~ 1109.0 kg

// 4. Moment of inertia tensor for tri-axial solid ellipsoid:
const Ixx = (1.0 / 5.0) * totalMassKg * (Math.pow(b, 2) + Math.pow(c, 2));
const Iyy = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(c, 2));
const Izz = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(b, 2));

export const ARDEN_ROSIE_MORPHOMETRICS: MorphometricProfile = {
  name: "Arden-Rosie Kone-Reynolds",
  id: "arden_rosie",
  shoulderHeightInches: 61.5,
  bodyWidthInches: 38.0,
  bodyLengthInches: 78.0,
  fullBodyLengthInches: 115.4,
  headWidthInches: 36.5,
  headHeightInches: 40.0,
  tailLengthInches: 23.4,
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

export default ARDEN_ROSIE_MORPHOMETRICS;
