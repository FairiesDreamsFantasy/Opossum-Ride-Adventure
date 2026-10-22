/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RandomMaterialType =
  | "wood"
  | "stone"
  | "metal"
  | "crystal"
  | "glass"
  | "fabric"
  | "energy_field"
  | "biomaterial"
  | "composite"
  | "plasma"
  | "marble"
  | "granite"
  | "amber"
  | "obsidian"
  | "copper"
  | "silver"
  | "gold"
  | "quartz"
  | "sandstone"
  | "ceramic"
  | "synthetic"
  | "organic"
  | "custom";

export interface RandomMaterialSpecification {
  id: string;
  name: string;
  materialType: RandomMaterialType;
  density: number; // Density in g/cm³
  elasticity: number; // Restitution coefficient 0.0 - 1.0
  frictionCoefficient: number; // Kinetic friction 0.0 - 1.0
  reflectivity: number; // Optical reflectivity 0.0 - 1.0
  hardnessMohs: number; // Mohs hardness scale 1 - 10
  roughness: number; // Surface roughness 0.0 - 1.0
  color: string; // Hex or CSS color string
  texturePattern?: string; // e.g. "grain", "faceted", "smooth", "fibrous"
  soundSurfaceProfile: string; // Audio footprint resonance
  isDestructible: boolean;
  structuralIntegrity: number; // Durability points 0 - 100
  customProperties?: Record<string, any>;
}

export const RANDOM_MATERIALS_METADATA = {
  id: "random_materials_system",
  name: "Dynamic Random Building Block Materials Registry",
  version: "1.0.0",
  description: "Supports dynamic building block material components of any arbitrary physical classification."
};

/**
 * Deterministic generator for dynamic random materials given a numerical seed or descriptor
 */
export function createDynamicMaterial(
  id: string,
  name: string,
  type: RandomMaterialType = "stone",
  overrides?: Partial<RandomMaterialSpecification>
): RandomMaterialSpecification {
  const baseDefaults: Record<RandomMaterialType, Partial<RandomMaterialSpecification>> = {
    wood: { density: 0.65, elasticity: 0.3, frictionCoefficient: 0.7, hardnessMohs: 3.0, roughness: 0.5, color: "#8B5A2B", soundSurfaceProfile: "wood_solid", isDestructible: true, structuralIntegrity: 60 },
    stone: { density: 2.65, elasticity: 0.1, frictionCoefficient: 0.8, hardnessMohs: 6.5, roughness: 0.7, color: "#708090", soundSurfaceProfile: "stone_dense", isDestructible: false, structuralIntegrity: 95 },
    metal: { density: 7.85, elasticity: 0.2, frictionCoefficient: 0.4, hardnessMohs: 5.5, roughness: 0.2, color: "#A8A9AD", soundSurfaceProfile: "metal_solid", isDestructible: false, structuralIntegrity: 100 },
    crystal: { density: 2.65, elasticity: 0.5, frictionCoefficient: 0.3, hardnessMohs: 7.0, roughness: 0.1, color: "#E0FFFF", soundSurfaceProfile: "crystal_chime", isDestructible: true, structuralIntegrity: 45 },
    glass: { density: 2.50, elasticity: 0.2, frictionCoefficient: 0.2, hardnessMohs: 5.5, roughness: 0.05, color: "#F0F8FF", soundSurfaceProfile: "glass_resonant", isDestructible: true, structuralIntegrity: 30 },
    fabric: { density: 0.30, elasticity: 0.05, frictionCoefficient: 0.9, hardnessMohs: 1.0, roughness: 0.8, color: "#D2B48C", soundSurfaceProfile: "fabric_soft", isDestructible: true, structuralIntegrity: 20 },
    energy_field: { density: 0.0, elasticity: 0.9, frictionCoefficient: 0.05, hardnessMohs: 10.0, roughness: 0.0, color: "#00FFFF", soundSurfaceProfile: "energy_hum", isDestructible: false, structuralIntegrity: 100 },
    biomaterial: { density: 1.10, elasticity: 0.4, frictionCoefficient: 0.6, hardnessMohs: 2.5, roughness: 0.6, color: "#2E8B57", soundSurfaceProfile: "organic_pliant", isDestructible: true, structuralIntegrity: 50 },
    composite: { density: 1.80, elasticity: 0.35, frictionCoefficient: 0.5, hardnessMohs: 6.0, roughness: 0.3, color: "#36454F", soundSurfaceProfile: "composite_firm", isDestructible: false, structuralIntegrity: 85 },
    plasma: { density: 0.01, elasticity: 0.8, frictionCoefficient: 0.01, hardnessMohs: 0.0, roughness: 0.0, color: "#FF4500", soundSurfaceProfile: "plasma_crackle", isDestructible: false, structuralIntegrity: 100 },
    marble: { density: 2.70, elasticity: 0.15, frictionCoefficient: 0.6, hardnessMohs: 4.0, roughness: 0.2, color: "#F5F5F5", soundSurfaceProfile: "marble_smooth", isDestructible: false, structuralIntegrity: 90 },
    granite: { density: 2.75, elasticity: 0.1, frictionCoefficient: 0.85, hardnessMohs: 7.0, roughness: 0.65, color: "#4F4F4F", soundSurfaceProfile: "granite_heavy", isDestructible: false, structuralIntegrity: 98 },
    amber: { density: 1.07, elasticity: 0.25, frictionCoefficient: 0.4, hardnessMohs: 2.5, roughness: 0.15, color: "#FFBF00", soundSurfaceProfile: "amber_warm", isDestructible: true, structuralIntegrity: 40 },
    obsidian: { density: 2.40, elasticity: 0.2, frictionCoefficient: 0.3, hardnessMohs: 5.5, roughness: 0.05, color: "#1C1C1C", soundSurfaceProfile: "obsidian_sharp", isDestructible: true, structuralIntegrity: 70 },
    copper: { density: 8.96, elasticity: 0.3, frictionCoefficient: 0.45, hardnessMohs: 3.0, roughness: 0.3, color: "#B87333", soundSurfaceProfile: "copper_tone", isDestructible: false, structuralIntegrity: 80 },
    silver: { density: 10.49, elasticity: 0.25, frictionCoefficient: 0.35, hardnessMohs: 2.5, roughness: 0.1, color: "#C0C0C0", soundSurfaceProfile: "silver_ring", isDestructible: false, structuralIntegrity: 85 },
    gold: { density: 19.32, elasticity: 0.2, frictionCoefficient: 0.3, hardnessMohs: 2.5, roughness: 0.1, color: "#FFD700", soundSurfaceProfile: "gold_mellow", isDestructible: false, structuralIntegrity: 90 },
    quartz: { density: 2.65, elasticity: 0.4, frictionCoefficient: 0.35, hardnessMohs: 7.0, roughness: 0.15, color: "#E6E6FA", soundSurfaceProfile: "quartz_harmonic", isDestructible: true, structuralIntegrity: 75 },
    sandstone: { density: 2.20, elasticity: 0.1, frictionCoefficient: 0.75, hardnessMohs: 4.5, roughness: 0.8, color: "#F4A460", soundSurfaceProfile: "sandstone_gritty", isDestructible: true, structuralIntegrity: 65 },
    ceramic: { density: 2.40, elasticity: 0.2, frictionCoefficient: 0.4, hardnessMohs: 6.0, roughness: 0.2, color: "#FAF0E6", soundSurfaceProfile: "ceramic_clink", isDestructible: true, structuralIntegrity: 55 },
    synthetic: { density: 1.20, elasticity: 0.6, frictionCoefficient: 0.5, hardnessMohs: 3.5, roughness: 0.4, color: "#4682B4", soundSurfaceProfile: "synthetic_dampened", isDestructible: false, structuralIntegrity: 75 },
    organic: { density: 0.95, elasticity: 0.5, frictionCoefficient: 0.65, hardnessMohs: 2.0, roughness: 0.7, color: "#556B2F", soundSurfaceProfile: "organic_soft", isDestructible: true, structuralIntegrity: 45 },
    custom: { density: 1.0, elasticity: 0.5, frictionCoefficient: 0.5, hardnessMohs: 5.0, roughness: 0.5, color: "#9370DB", soundSurfaceProfile: "custom_resonance", isDestructible: false, structuralIntegrity: 80 }
  };

  const defaults = baseDefaults[type] || baseDefaults.custom;

  return {
    id,
    name,
    materialType: type,
    density: overrides?.density ?? defaults.density ?? 1.0,
    elasticity: overrides?.elasticity ?? defaults.elasticity ?? 0.5,
    frictionCoefficient: overrides?.frictionCoefficient ?? defaults.frictionCoefficient ?? 0.5,
    reflectivity: overrides?.reflectivity ?? defaults.reflectivity ?? 0.3,
    hardnessMohs: overrides?.hardnessMohs ?? defaults.hardnessMohs ?? 5.0,
    roughness: overrides?.roughness ?? defaults.roughness ?? 0.5,
    color: overrides?.color ?? defaults.color ?? "#888888",
    texturePattern: overrides?.texturePattern ?? defaults.texturePattern ?? "standard",
    soundSurfaceProfile: overrides?.soundSurfaceProfile ?? defaults.soundSurfaceProfile ?? "neutral_impact",
    isDestructible: overrides?.isDestructible ?? defaults.isDestructible ?? false,
    structuralIntegrity: overrides?.structuralIntegrity ?? defaults.structuralIntegrity ?? 100,
    customProperties: overrides?.customProperties ?? {}
  };
}
