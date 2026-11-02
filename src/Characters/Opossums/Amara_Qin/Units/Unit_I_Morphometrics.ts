/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * AMARA QIN - UNIT I: MORPHOMETRICS & VOLUMETRIC BIOMECHANICS
 * ============================================================================
 * Mathematical specification of physical mass, volumetric displacement,
 * center-of-mass distribution, and 3-D moment of inertia tensor for Amara Qin.
 *
 * Physical Dimensions:
 * - Shoulder Height: 5 feet 3 inches (63.0 inches / 160.02 cm)
 * - Body Width: 36.0 inches (91.44 cm)
 * - Body Length (excluding head/tail): 82.0 inches (208.28 cm)
 * - Full Body Length (with head & tail): 120.6 inches (306.32 cm)
 * - Tail Length: 24.6 inches (62.48 cm)
 * - Head Width: 36.0 inches (91.44 cm)
 * - Head Height: 38.0 inches (96.52 cm)
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
const a = (82.0 * 0.0254) / 2; // half-length ~ 1.0414 m
const b = (36.0 * 0.0254) / 2; // half-width ~ 0.4572 m
const c = (63.0 * 0.0254) / 2; // half-height ~ 0.8001 m

// 2. Tri-axial ellipsoid volumetric displacement integral: V = (4/3) * pi * a * b * c
const volumeM3 = (4.0 / 3.0) * Math.PI * a * b * c; // ~ 1.578 m^3

// 3. Tissue density constant: rho ~ 1042 kg/m^3
const tissueDensityKgM3 = 1042.0;
const totalMassKg = volumeM3 * tissueDensityKgM3 * 0.68; // Form factor correction (~ 1118 kg)

// 4. Moment of inertia tensor for tri-axial solid ellipsoid:
const Ixx = (1.0 / 5.0) * totalMassKg * (Math.pow(b, 2) + Math.pow(c, 2));
const Iyy = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(c, 2));
const Izz = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(b, 2));

export const AMARA_QIN_MORPHOMETRICS: MorphometricProfile = {
  name: "Amara Qin",
  id: "amara_qin",
  shoulderHeightInches: 63.0,
  bodyWidthInches: 36.0,
  bodyLengthInches: 82.0,
  fullBodyLengthInches: 120.6,
  headWidthInches: 36.0,
  headHeightInches: 38.0,
  tailLengthInches: 24.6,
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

export default AMARA_QIN_MORPHOMETRICS;
