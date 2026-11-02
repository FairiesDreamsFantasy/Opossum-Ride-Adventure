/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MonkeyAnatomyPart {
  id: string;
  name: string;
  geometryType: "octagon" | "hexagon" | "segmented_polyline" | "jointed_line" | "circle";
  proportions: {
    relativeX: number;
    relativeY: number;
    relativeWidth: number;
    relativeHeight: number;
  };
  furCoverage: number; // 0 to 1
  defaultColor: {
    male: string;
    female: string;
    colt: string;
  };
  description: string;
}

export const MONKEY_ANATOMICAL_PARTS: Record<string, MonkeyAnatomyPart> = {
  head: {
    id: "head",
    name: "Cranial Hexagonal Mesh",
    geometryType: "hexagon",
    proportions: {
      relativeX: 0,
      relativeY: -0.88,
      relativeWidth: 0.1,
      relativeHeight: 0.1
    },
    furCoverage: 0.85,
    defaultColor: {
      male: "#854d0e",
      female: "#854d0e",
      colt: "#7c2d12"
    },
    description: "Low-polygon flat-shaded hexagonal cranium frame housing facial landmarks and sensory receptors."
  },
  torso: {
    id: "torso",
    name: "Octagonal Thorax Mesh",
    geometryType: "octagon",
    proportions: {
      relativeX: 0,
      relativeY: -0.72,
      relativeWidth: 0.16,
      relativeHeight: 0.16
    },
    furCoverage: 0.70,
    defaultColor: {
      male: "#3b82f6",
      female: "#ec4899",
      colt: "#5c4033"
    },
    description: "Flat-shaded octagonal block torso mesh representing natural body core or stylized attire."
  },
  arms: {
    id: "arms",
    name: "Bilateral Prehensile Arms",
    geometryType: "jointed_line",
    proportions: {
      relativeX: 0,
      relativeY: -0.72,
      relativeWidth: 0.25,
      relativeHeight: 0.20
    },
    furCoverage: 0.90,
    defaultColor: {
      male: "#78350f",
      female: "#78350f",
      colt: "#5c4033"
    },
    description: "Articulated prehensile upper limbs providing climbing grip, riding balance, and throwing dynamics."
  },
  tail: {
    id: "tail",
    name: "Segmented Prehensile Tail",
    geometryType: "segmented_polyline",
    proportions: {
      relativeX: -0.15,
      relativeY: -0.72,
      relativeWidth: 0.26,
      relativeHeight: 0.18
    },
    furCoverage: 0.95,
    defaultColor: {
      male: "#78350f",
      female: "#78350f",
      colt: "#5c4033"
    },
    description: "Rigid low-poly four-segment polyline tail providing counterbalance during galloping and jumps."
  },
  snout: {
    id: "snout",
    name: "Oral-Nasal Hexagonal Muzzle",
    geometryType: "hexagon",
    proportions: {
      relativeX: -0.02,
      relativeY: -0.87,
      relativeWidth: 0.06,
      relativeHeight: 0.05
    },
    furCoverage: 0.10,
    defaultColor: {
      male: "#fde047",
      female: "#fde047",
      colt: "#ea580c"
    },
    description: "Subtle low-polygon muzzle plate containing nostrils and vocal vocalization aperture."
  },
  ears: {
    id: "ears",
    name: "Lateral Auditory Pinnae",
    geometryType: "circle",
    proportions: {
      relativeX: 0.08,
      relativeY: -0.90,
      relativeWidth: 0.04,
      relativeHeight: 0.04
    },
    furCoverage: 0.40,
    defaultColor: {
      male: "#ca8a04",
      female: "#ca8a04",
      colt: "#9a3412"
    },
    description: "Dual lateral acoustic sensory dishes detecting opossum chatter and hoofstep vibrations."
  },
  eyes: {
    id: "eyes",
    name: "Stereoscopic Optical Sensors",
    geometryType: "circle",
    proportions: {
      relativeX: -0.02,
      relativeY: -0.89,
      relativeWidth: 0.02,
      relativeHeight: 0.02
    },
    furCoverage: 0.0,
    defaultColor: {
      male: "#ffffff",
      female: "#ffffff",
      colt: "#fef08a"
    },
    description: "Stereoscopic optical lenses with alert pupils tracking rider maneuvers and terrain obstacles."
  }
};

export const MonkeyDescription = {
  version: "1.0.0",
  species: "Cebidae / Simian (Low-Poly Simulation)",
  parts: MONKEY_ANATOMICAL_PARTS,
  getPart: (id: string) => MONKEY_ANATOMICAL_PARTS[id]
};
