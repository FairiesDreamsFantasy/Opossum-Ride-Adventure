/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Quadrupedal Locomotion and Biomechanical Kinetics Engine.
 * Tailored specifically to the physical morphology of the handcrafted 16 opossums,
 * taking into account shoulder height, body length, joint torque, and gait transitions.
 */
export class BiomechanicsEngine {
  /** Standard gravitational acceleration (m/s^2) */
  public static readonly GRAVITY = 9.80665;

  /**
   * Calculates the dimensionless Froude Number:
   * Fr = v^2 / (g * legLength)
   * Dictates dynamically similar locomotion and quadrupedal gait transitions:
   * - Fr < 0.5: Walk
   * - 0.5 <= Fr < 2.5: Trot / Paced Gallop
   * - Fr >= 2.5: Full Sprint Gallop
   */
  public static calculateFroudeNumber(velocityMs: number, legLengthMeters: number): number {
    if (legLengthMeters <= 0.05) return 0;
    return (velocityMs * velocityMs) / (this.GRAVITY * legLengthMeters);
  }

  /**
   * Determine biomechanical gait mode based on shoulder height and forward speed.
   */
  public static determineGait(
    velocityMs: number,
    shoulderHeightMeters: number
  ): {
    froudeNumber: number;
    gait: "walk" | "trot" | "gallop";
    strideFrequencyHz: number;
  } {
    // Effective leg length is approximately 75% of shoulder height in opossum anatomy
    const effectiveLegLength = shoulderHeightMeters * 0.75;
    const fr = this.calculateFroudeNumber(velocityMs, effectiveLegLength);

    let gait: "walk" | "trot" | "gallop" = "walk";
    if (fr >= 2.5) {
      gait = "gallop";
    } else if (fr >= 0.5) {
      gait = "trot";
    }

    // Dynamic stride frequency: f_stride ~ sqrt(g / L) * (Fr)^0.26 (Heglund & Taylor scaling)
    const baseFreq = Math.sqrt(this.GRAVITY / effectiveLegLength) / (2 * Math.PI);
    const strideFrequencyHz = baseFreq * Math.pow(Math.max(0.01, fr), 0.26);

    return {
      froudeNumber: fr,
      gait,
      strideFrequencyHz: Math.max(0.5, Math.min(6.5, strideFrequencyHz)),
    };
  }

  /**
   * Ground Reaction Force (GRF) peak impact estimation during foot touchdown:
   * F_peak ~ (pi/2) * (M * g / dutyFactor)
   */
  public static peakGroundReactionForce(
    bodyMassKg: number,
    dutyFactor: number // Fraction of stride cycle limb is in ground contact (0.2 to 0.6)
  ): number {
    const clampedDuty = Math.max(0.1, Math.min(0.8, dutyFactor));
    return (Math.PI / 2) * ((bodyMassKg * this.GRAVITY) / clampedDuty);
  }

  /**
   * Joint Torque Vector:
   * tau = r x F
   */
  public static calculateJointTorque(
    leverArm: { x: number; y: number; z: number },
    appliedForce: { x: number; y: number; z: number }
  ): { x: number; y: number; z: number; magnitude: number } {
    const tx = leverArm.y * appliedForce.z - leverArm.z * appliedForce.y;
    const ty = leverArm.z * appliedForce.x - leverArm.x * appliedForce.z;
    const tz = leverArm.x * appliedForce.y - leverArm.y * appliedForce.x;
    const magnitude = Math.sqrt(tx * tx + ty * ty + tz * tz);
    return { x: tx, y: ty, z: tz, magnitude };
  }

  /**
   * Metabolic energetic expenditure rate during locomotion (Taylor & Heglund model):
   * P_total = P_basal + (CostOfTransport * Mass * Velocity)
   */
  public static metabolicPower(
    bodyMassKg: number,
    velocityMs: number,
    isCarryingRider: boolean = true,
    riderMassKg: number = 25
  ): { powerWatts: number; oxygenConsumptionMlPerMin: number } {
    const totalMass = bodyMassKg + (isCarryingRider ? riderMassKg : 0);
    // Kleiber's Law basal metabolic rate: P_basal ~ 3.4 * M^0.75
    const basalPower = 3.4 * Math.pow(totalMass, 0.75);

    // Cost of transport: COT ~ 10.7 * M^(-0.316) J / (kg * m)
    const costOfTransport = 10.7 * Math.pow(totalMass, -0.316);
    const locomotorPower = costOfTransport * totalMass * velocityMs;
    const powerWatts = basalPower + locomotorPower;

    // 1 Watt ~ 3.0 mL O2 / min (respiratory equivalence)
    const oxygenConsumptionMlPerMin = powerWatts * 3.0;

    return { powerWatts, oxygenConsumptionMlPerMin };
  }
}
