/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * JALISSA CHIN - UNIT I: MORPHOMETRICS & VOLUMETRIC BIOMECHANICS
 * ============================================================================
 * Mathematical specification of physical mass, volumetric displacement,
 * center-of-mass distribution, and 3-D moment of inertia tensor for Jalissa Chin.
 *
 * Physical Dimensions:
 * - Shoulder Height: 5 feet 1 inch (61.0 inches / 154.94 cm)
 * - Body Width: 37.5 inches (95.25 cm)
 * - Body Length (excluding head/tail): 84.0 inches (213.36 cm)
 * - Full Body Length (with head & tail): 123.2 inches (312.93 cm)
 * - Tail Length: 25.2 inches (64.01 cm)
 * - Head Width: 36.0 inches (91.44 cm)
 * - Head Height: 38.0 inches (96.52 cm)
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
const b = (37.5 * 0.0254) / 2; // half-width ~ 0.47625 m
const c = (61.0 * 0.0254) / 2; // half-height ~ 0.7747 m

const volumeM3 = (4.0 / 3.0) * Math.PI * a * b * c; // ~ 1.637 m^3
const tissueDensityKgM3 = 1042.0;
const totalMassKg = volumeM3 * tissueDensityKgM3 * 0.68; // ~ 1159 kg

const Ixx = (1.0 / 5.0) * totalMassKg * (Math.pow(b, 2) + Math.pow(c, 2));
const Iyy = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(c, 2));
const Izz = (1.0 / 5.0) * totalMassKg * (Math.pow(a, 2) + Math.pow(b, 2));

export const JALISSA_CHIN_MORPHOMETRICS: MorphometricProfile = {
  name: "Jalissa Chin",
  id: "jalissa_chin",
  shoulderHeightInches: 61.0,
  bodyWidthInches: 37.5,
  bodyLengthInches: 84.0,
  fullBodyLengthInches: 123.2,
  headWidthInches: 36.0,
  headHeightInches: 38.0,
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

export default JALISSA_CHIN_MORPHOMETRICS;
