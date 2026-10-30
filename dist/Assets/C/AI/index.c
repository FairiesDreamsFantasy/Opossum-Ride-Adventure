/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - C In-Game AI Decision & Pathfinding Engine
 */

#include <stdio.h>
#include <math.h>

/**
 * Calculates A* heuristic distance between two 2D points.
 */
double calculate_ai_heuristic_distance(double x1, double y1, double x2, double y2) {
    double dx = x2 - x1;
    double dy = y2 - y1;
    return sqrt((dx * dx) + (dy * dy));
}

/**
 * Evaluates AI opponent tactic decision given distance and speed.
 * @return 0 for Patrol, 1 for Pursuit, 2 for Evade, 3 for Tick-Gobble
 */
int evaluate_ai_tactic_decision(double distanceToPlayer, double playerSpeed, double tickDistance) {
    if (tickDistance < 100.0) return 3; // Priority: Gobble tick
    if (distanceToPlayer < 150.0 && playerSpeed > 10.0) return 2; // Evade fast player
    if (distanceToPlayer < 400.0) return 1; // Pursue
    return 0; // Patrol
}
