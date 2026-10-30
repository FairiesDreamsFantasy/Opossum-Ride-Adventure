/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * TIANA QIN - UNIT I: MORPHOMETRICS & VOLUMETRIC BIOMECHANICS
 * ============================================================================
 * Mathematical specification of physical mass, volumetric displacement,
 * center-of-mass distribution, and 3-D moment of inertia tensor for Tiana Qin.
 *
 * Physical Dimensions:
 * - Shoulder Height: 5 feet 10 inches (70.0 inches / 177.80 cm)
 * - Body Width: 38.0 inches (96.52 cm)
 * - Body Length (excluding head/tail): 88.0 inches (223.52 cm)
 * - Full Body Length (with head & tail): 128.4 inches (326.14 cm)
 * - Tail Length: 26.4 inches (67.06 cm)
 * - Head Width: 37.0 inches (93.98 cm)
 * - Head Height: 44.45 inches (112.90 cm)
 */

export interface InertiaTensor3D {
  Ixx: number; // Rotational inertia around transverse pitch axis (kg * m^2)
  Iyy: number; // Rotational inertia around vertical yaw axis (kg * m^2)
  Izz: number; // Rotational inertia around longitudinal roll axis (kg * m^2)
  Ixy: number; // Cross product of inertia (kg * m^2)
  Ixz: number; // Cross product of inertia (kg * m^2)
  Iyz: number; // Cross product of inertia (kg * m^2)
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
const a = (88.0 * 0.0254) / 2; // half-length ~ 1.1176 m
const b = (38.0 * 0.0254) / 2; // half-width ~ 0.4826 m
const c = (70.0 * 0.0254) / 2; // half-height ~ 0.8890 m

// 2. Tri-axial ellipsoid volumetric displacement integral: V = (4/3) * pi * a * b * c
const volumeM3 = (4.0 / 3.0) * Math.PI * a * b * c; // ~ 2.012 m^3

// 3. Tissue density constant: rho ~ 1042 kg/m^3
const tissueDensityKgM3 = 1042.0;
const totalMassKg = volumeM3 * tissueDensityKgM3 * 0.68; // Form factor correction (~ 1425 kg)

// 4. Moment of inertia tensor for tri-axial solid ellipsoid:
const Ixx = (1.0 / 5.0) * totalMassKg * (Math.pow(b, 2) + Math.pow(c, 2));
const Iyy = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(c, 2));
const Izz = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(b, 2));

export const TIANA_QIN_MORPHOMETRICS: MorphometricProfile = {
  name: "Tiana Qin",
  id: "tiana_qin",
  shoulderHeightInches: 70.0,
  bodyWidthInches: 38.0,
  bodyLengthInches: 88.0,
  fullBodyLengthInches: 128.4,
  headWidthInches: 37.0,
  headHeightInches: 44.45,
  tailLengthInches: 26.4,
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

export default TIANA_QIN_MORPHOMETRICS;
