/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * RUTH KONE-REYNOLDS - UNIT I: MORPHOMETRICS & VOLUMETRIC BIOMECHANICS
 * ============================================================================
 * Mathematical specification of physical mass, volumetric displacement,
 * center-of-mass distribution, and 3-D moment of inertia tensor for Ruth.
 *
 * Physical Dimensions:
 * - Shoulder Height: 6 feet 0 inches (72.0 inches / 182.88 cm)
 * - Body Width: 45.0 inches (114.30 cm)
 * - Body Length (excluding head/tail): 96.0 inches (243.84 cm)
 * - Full Body Length (with head & tail): 140.8 inches (357.63 cm)
 * - Tail Length: 28.8 inches (73.15 cm)
 * - Head Width: 43.33 inches (110.06 cm)
 * - Head Height: 44.88 inches (114.00 cm)
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
const a = (96.0 * 0.0254) / 2; // half-length ~ 1.2192 m
const b = (45.0 * 0.0254) / 2; // half-width ~ 0.5715 m
const c = (72.0 * 0.0254) / 2; // half-height ~ 0.9144 m

// 2. Tri-axial ellipsoid volumetric displacement integral: V = (4/3) * pi * a * b * c
const volumeM3 = (4.0 / 3.0) * Math.PI * a * b * c; // ~ 2.673 m^3

// 3. Opossum tissue density constant: rho ~ 1042 kg/m^3
const tissueDensityKgM3 = 1042.0;
const totalMassKg = volumeM3 * tissueDensityKgM3 * 0.68; // ~ 1894.1 kg

// 4. Moment of inertia tensor for tri-axial solid ellipsoid:
const Ixx = (1.0 / 5.0) * totalMassKg * (Math.pow(b, 2) + Math.pow(c, 2));
const Iyy = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(c, 2));
const Izz = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(b, 2));

export const RUTH_KONE_REYNOLDS_MORPHOMETRICS: MorphometricProfile = {
  name: "Ruth Kone-Reynolds",
  id: "ruth_kone_reynolds",
  shoulderHeightInches: 72.0,
  bodyWidthInches: 45.0,
  bodyLengthInches: 96.0,
  fullBodyLengthInches: 140.8,
  headWidthInches: 43.33,
  headHeightInches: 44.88,
  tailLengthInches: 28.8,
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
  riderLoadCapacityRatio: 0.30
};

export default RUTH_KONE_REYNOLDS_MORPHOMETRICS;
