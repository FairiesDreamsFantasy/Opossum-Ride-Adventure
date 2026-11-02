/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ObstaclePlayableSound {
  id: string;
  name: string;
  type: "collision" | "pickup" | "environment" | "wildlife";
  description: string;
}

export const OBSTACLE_PLAYABLE_SOUNDS: ObstaclePlayableSound[] = [
  {
    id: "fence_collision",
    name: "Wooden Fence Splinter & Collision",
    type: "collision",
    description: "Multi-layered timber creak with snappy splinter bursts upon colliding with wooden fences."
  },
  {
    id: "garden_plant_collision",
    name: "Garden Plant Foliage Rustle & Crash",
    type: "collision",
    description: "Lush botanical leaf-swish and soft stem snap when brushing or hitting garden flora."
  },
  {
    id: "rock_collision",
    name: "Solid Stone Rock Impact",
    type: "collision",
    description: "Heavy mineral mass strike with gritty rubble resonance and low-end shock."
  },
  {
    id: "tick_chime",
    name: "Crystal Tick Gobble Chime",
    type: "pickup",
    description: "Crisp arpeggiated sinusoidal crystal chimes (880Hz to 1320Hz) upon collecting track items."
  },
  {
    id: "sliding_doors_open",
    name: "Automated Sliding Door Open",
    type: "environment",
    description: "Smooth pneumatic friction hiss and mechanical latch click when entering or leaving rooms."
  },
  {
    id: "sliding_doors_close",
    name: "Automated Sliding Door Close",
    type: "environment",
    description: "Reverse friction bandpass sweep with firm magnetic seal latch click."
  },
  {
    id: "owl_hoot",
    name: "Nocturnal Forest Owl Hoot",
    type: "wildlife",
    description: "Two-stage resonant sine wave acoustic synthesis modeling authentic 'Hoo-Hoo' patterns."
  },
  {
    id: "frog_croak",
    name: "Pond Flora Frog Croak",
    type: "wildlife",
    description: "Deep frequency-modulated pulse wave mimicking wetland amphibians."
  }
];
