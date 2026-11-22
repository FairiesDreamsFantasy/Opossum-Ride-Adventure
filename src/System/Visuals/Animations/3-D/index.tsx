import React from "react";
import { SpatialStabilizer3D, VertexFloat64Pool } from "./SpatialStabilizer3D";
import { QuaternionKinematics3D } from "./QuaternionKinematics3D";
import { PerspectiveFrustumProjection } from "./PerspectiveFrustumProjection";
import { SkeletalGaitKinematics3D } from "./SkeletalGaitKinematics3D";
import { SurfaceNormalLighting3D } from "./SurfaceNormalLighting3D";
import { BoundingVolumeCulling3D } from "./BoundingVolumeCulling3D";

export * from "./SpatialStabilizer3D";
export * from "./QuaternionKinematics3D";
export * from "./PerspectiveFrustumProjection";
export * from "./SkeletalGaitKinematics3D";
export * from "./SurfaceNormalLighting3D";
export * from "./BoundingVolumeCulling3D";

/**
 * 3-D Animation Module
 * Handles spatial transformations, perspective projections, quaternion rotations,
 * skeletal gait kinematics, surface normals, and frustum culling.
 */
export const ThreeDAnimationSystem = {
  Stabilizer: SpatialStabilizer3D,
  VertexPool: VertexFloat64Pool,
  Quaternion: QuaternionKinematics3D,
  Projection: PerspectiveFrustumProjection,
  SkeletalGait: SkeletalGaitKinematics3D,
  Lighting: SurfaceNormalLighting3D,
  Culling: BoundingVolumeCulling3D,

  calculatePerspective: (z: number, fov: number = 250) => {
    return PerspectiveFrustumProjection.calculatePerspectiveScale(z, fov);
  },
  
  applyRotation: (x: number, y: number, z: number, angleX: number, angleY: number, angleZ: number = 0) => {
    const q = QuaternionKinematics3D.fromEulerYXZ(angleX, angleY, angleZ);
    return QuaternionKinematics3D.rotatePoint(q, { x, y, z });
  },

  project3DPoint: (x: number, y: number, z: number, angleX: number, angleY: number, fov: number = 250) => {
    const projected = PerspectiveFrustumProjection.projectPoint(x, y, z, angleX, angleY, fov);
    return {
      x: projected.x,
      y: projected.y,
      scale: projected.scale
    };
  }
};

/**
 * Ultra-precise 3-D Vertex coordinates and face/edge registries for high-fidelity visual elements.
 */
export const ThreeDVertexRegistry = {
  opossumBox: {
    vertices: [
      { x: -10, y: -10, z: -20 }, // Front-Top-Left (0)
      { x: 10, y: -10, z: -20 },  // Front-Top-Right (1)
      { x: 10, y: 10, z: -20 },   // Front-Bottom-Right (2)
      { x: -10, y: 10, z: -20 },  // Front-Bottom-Left (3)
      { x: -10, y: -10, z: 20 },  // Back-Top-Left (4)
      { x: 10, y: -10, z: 20 },   // Back-Top-Right (5)
      { x: 10, y: 10, z: 20 },    // Back-Bottom-Right (6)
      { x: -10, y: 10, z: 20 }    // Back-Bottom-Left (7)
    ],
    faces: [
      [0, 1, 2, 3], // Front Face
      [1, 5, 6, 2], // Right Face
      [5, 4, 7, 6], // Back Face
      [4, 0, 3, 7], // Left Face
      [3, 2, 6, 7], // Top Face
      [4, 5, 1, 0]  // Bottom Face
    ]
  },
  mooseAntlers: {
    vertices: [
      { x: -12, y: -30, z: 0 },  // Left Base (0)
      { x: -32, y: -50, z: 10 }, // Left Tine A (1)
      { x: -22, y: -55, z: 20 }, // Left Tine B (2)
      { x: 12, y: -30, z: 0 },   // Right Base (3)
      { x: 32, y: -50, z: 10 },  // Right Tine A (4)
      { x: 22, y: -55, z: 20 }   // Right Tine B (5)
    ],
    edges: [
      [0, 1], [0, 2],
      [3, 4], [3, 5]
    ]
  }
};

export const ThreeDLayer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="system-3d-layer" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
};
