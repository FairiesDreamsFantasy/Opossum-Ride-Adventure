/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - C 64-Bit Physics Engine
 */

#include <stdio.h>
#include <math.h>

/**
 * 64-bit RK4 numerical integration step for spring suspension physics.
 */
double integrate_rk4_suspension_step(double positionY, double velocityY, double springK, double massKg, double delta) {
    double accel = (-springK * positionY) / massKg;
    double k1_v = accel * delta;
    double k1_p = velocityY * delta;
    
    double half_v = velocityY + (0.5 * k1_v);
    double k2_p = half_v * delta;
    
    return positionY + k2_p;
}

/**
 * 64-bit Axis-Aligned Bounding Box Collision Check.
 */
int check_aabb_collision_64(
    double minAx, double maxAx, double minAy, double maxAy,
    double minBx, double maxBx, double minBy, double maxBy
) {
    if (maxAx < minBx || minAx > maxBx) return 0;
    if (maxAy < minBy || minAy > maxBy) return 0;
    return 1;
}
