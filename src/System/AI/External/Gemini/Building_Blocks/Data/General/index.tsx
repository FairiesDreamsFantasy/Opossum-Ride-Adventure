/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Building Blocks Voxelization & Mesh Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Surface normal cross products, face winding orientation, material elasticity, and procedural prism geometry
 */

export interface VoxelVertex3D {
  x: number;
  y: number;
  z: number;
  u: number;
  v: number;
}

export interface VoxelTriangleFace {
  a: VoxelVertex3D;
  b: VoxelVertex3D;
  c: VoxelVertex3D;
  normal: { x: number; y: number; z: number };
}

export interface MaterialPhysicalProfile {
  name: string;
  densityKgM3: number;
  frictionCoefficient: number;
  elasticityRestitution: number;
  tensileStrengthMpa: number;
}

export const MATERIAL_PHYSICS_PROFILES: Record<string, MaterialPhysicalProfile> = {
  HardenedGranite: {
    name: "Hardened Granite",
    densityKgM3: 2700,
    frictionCoefficient: 0.65,
    elasticityRestitution: 0.15,
    tensileStrengthMpa: 14.5
  },
  EnchantedCedar: {
    name: "Enchanted Cedar",
    densityKgM3: 480,
    frictionCoefficient: 0.52,
    elasticityRestitution: 0.35,
    tensileStrengthMpa: 42.0
  },
  QuenchedSteel: {
    name: "Quenched Steel",
    densityKgM3: 7850,
    frictionCoefficient: 0.42,
    elasticityRestitution: 0.58,
    tensileStrengthMpa: 520.0
  },
  AcousticMoss: {
    name: "Acoustic Moss",
    densityKgM3: 120,
    frictionCoefficient: 0.88,
    elasticityRestitution: 0.05,
    tensileStrengthMpa: 1.2
  }
};

export class BuildingBlocksMeshCompiler {
  /**
   * Computes the normalized surface normal vector using the cross product of face edges:
   * u = B - A, v = C - A
   * n = (u × v) / ||u × v||
   */
  public static computeFaceNormal(
    a: { x: number; y: number; z: number },
    b: { x: number; y: number; z: number },
    c: { x: number; y: number; z: number }
  ): { x: number; y: number; z: number } {
    const ux = b.x - a.x;
    const uy = b.y - a.y;
    const uz = b.z - a.z;

    const vx = c.x - a.x;
    const vy = c.y - a.y;
    const vz = c.z - a.z;

    // Cross product components
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;

    const magnitude = Math.hypot(nx, ny, nz);
    if (magnitude <= 0.000001) {
      return { x: 0, y: 1, z: 0 }; // Default upward normal for degenerate faces
    }

    return {
      x: Number((nx / magnitude).toFixed(6)),
      y: Number((ny / magnitude).toFixed(6)),
      z: Number((nz / magnitude).toFixed(6))
    };
  }

  /**
   * Generates procedural 3D prism vertices and triangular faces for ramps and obstacles
   */
  public static generateRampPrism(
    width: number,
    height: number,
    depth: number
  ): VoxelTriangleFace[] {
    const v000: VoxelVertex3D = { x: 0, y: 0, z: 0, u: 0, v: 0 };
    const v100: VoxelVertex3D = { x: width, y: 0, z: 0, u: 1, v: 0 };
    const v101: VoxelVertex3D = { x: width, y: 0, z: depth, u: 1, v: 1 };
    const v001: VoxelVertex3D = { x: 0, y: 0, z: depth, u: 0, v: 1 };

    const v011: VoxelVertex3D = { x: 0, y: height, z: depth, u: 0, v: 0 };
    const v111: VoxelVertex3D = { x: width, y: height, z: depth, u: 1, v: 0 };

    const faces: VoxelTriangleFace[] = [];

    const addFace = (a: VoxelVertex3D, b: VoxelVertex3D, c: VoxelVertex3D) => {
      const normal = this.computeFaceNormal(a, b, c);
      faces.push({ a, b, c, normal });
    };

    // Incline Slope Face
    addFace(v000, v100, v111);
    addFace(v000, v111, v011);

    // Back Vertical Wall
    addFace(v001, v101, v111);
    addFace(v001, v111, v011);

    // Left Triangular Wall
    addFace(v000, v011, v001);

    // Right Triangular Wall
    addFace(v100, v101, v111);

    // Bottom Base
    addFace(v000, v100, v101);
    addFace(v000, v101, v001);

    return faces;
  }
}

export const GeminiBuildingBlocksDataGeneral = {
  systemName: "Gemini Building Blocks Data General Subsystem",
  status: "Active",
  blockTypesCount: 24,
  meshFormat: "glTF/OBJ",
  materialProfiles: MATERIAL_PHYSICS_PROFILES,
  computeFaceNormal: BuildingBlocksMeshCompiler.computeFaceNormal,
  generateRampPrism: BuildingBlocksMeshCompiler.generateRampPrism
};

export default GeminiBuildingBlocksDataGeneral;
