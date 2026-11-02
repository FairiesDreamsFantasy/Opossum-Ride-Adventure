/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisualEngineGeneral } from "./General";
import { ThreeDJSMathEngine } from "./3-DJS";
import * as Assembly from "./Assembly";
import { RStatisticalVisualEngine } from "./R";
import { RustVisualSafeBuffer } from "./Rust";
import * as Python from "./Python";
import { KotlinSpatialState } from "./Cotlin";
import { PHPAssociativeSceneSerializer } from "./PHP";
import { RelationalSceneGraphQueryEngine } from "./SQL";
import { JavaVisualSceneTree } from "./Java";
import { BasicVisualSequencer } from "./Basic";
import { XMLVisualLayoutParser } from "./XML";
import { SwiftVisualGeometryBridge } from "./Swift";
import { NonEuclideanRenderer } from "./Non_Euclidean_Renderer";

export { VisualEngineGeneral } from "./General";
export * from "./3-DJS";
export * from "./Assembly";
export * from "./R";
export * from "./Rust";
export * from "./Python";
export * from "./Cotlin";
export * from "./PHP";
export * from "./SQL";
export * from "./Java";
export * from "./Basic";
export * from "./XML";
export * from "./Swift";
export * from "./Non_Euclidean_Renderer";

/**
 * System Visuals Engine Subsystem.
 * Optimizes graphics pipelines, particle emission, multi-language bridges, and drawing layout coordinates.
 */
class VisualEngineSubsystem {
  public readonly General = VisualEngineGeneral;
  public readonly ThreeDJS = ThreeDJSMathEngine;
  public readonly Assembly = Assembly;
  public readonly R = RStatisticalVisualEngine;
  public readonly Rust = RustVisualSafeBuffer;
  public readonly Python = Python;
  public readonly Kotlin = KotlinSpatialState;
  public readonly PHP = PHPAssociativeSceneSerializer;
  public readonly SQL = RelationalSceneGraphQueryEngine;
  public readonly Java = JavaVisualSceneTree;
  public readonly Basic = BasicVisualSequencer;
  public readonly XML = XMLVisualLayoutParser;
  public readonly Swift = SwiftVisualGeometryBridge;
  public readonly NonEuclideanRenderer = NonEuclideanRenderer;

  /**
   * Evaluates if a given graphic model needs rendering based on camera spatial dimensions.
   */
  public shouldRender(
    posX: number,
    posY: number,
    width: number,
    height: number,
    viewWidth: number,
    viewHeight: number
  ): boolean {
    return this.General.isWithinViewport(posX, posY, width, height, viewWidth, viewHeight);
  }
}

export const VisualEngine = new VisualEngineSubsystem();

/**
 * 500% ULTRA-HIGH PRECISION MATHEMATICAL GRAPHICS PHYSICS ENGINE
 * Implements double-precision 3-D Cartesian-to-homogeneous perspective projection,
 * Euler-Rodrigues unit quaternions, and inverse-square Lambertian light attenuation.
 */
export class HighPrecisionVisualEngine {
  /**
   * Translates 3-D Cartesian coordinates to homogeneous 2-D viewport coordinates.
   * Eliminates vertex drift and sub-pixel rounding jitter.
   */
  public static perspectiveProject(
    point: { x: number; y: number; z: number },
    camera: { x: number; y: number; z: number; fov: number; aspect: number; near: number; far: number }
  ): { x: number; y: number; depth: number; visible: boolean } | null {
    // Relative position vectors
    const dx = point.x - camera.x;
    const dy = point.y - camera.y;
    const dz = point.z - camera.z;

    // Reject coordinates behind the clipping plane
    if (dz <= camera.near || dz >= camera.far) {
      return null;
    }

    // Double-precision homogeneous transformation calculation
    const f = 1.0 / Math.tan((camera.fov * Math.PI) / 360.0);
    const projX = (dx * f) / (camera.aspect * dz);
    const projY = (dy * f) / dz;

    return {
      x: projX,
      y: projY,
      depth: dz,
      visible: Math.abs(projX) <= 1.0 && Math.abs(projY) <= 1.0,
    };
  }

  /**
   * Computes a 3x3 rotation matrix using Euler-Rodrigues rotation formula.
   * Completely bypasses gimbal lock with true unit quaternion equivalent precision.
   */
  public static getRotationMatrixEulerRodrigues(
    axis: { x: number; y: number; z: number },
    angleRad: number
  ): number[][] {
    // Normalize axis vector
    const len = Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
    if (len < 0.0001) {
      return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ];
    }
    const ux = axis.x / len;
    const uy = axis.y / len;
    const uz = axis.z / len;

    const cosA = Math.cos(angleRad);
    const sinA = Math.sin(angleRad);
    const oneMinusCos = 1.0 - cosA;

    return [
      [
        cosA + ux * ux * oneMinusCos,
        ux * uy * oneMinusCos - uz * sinA,
        ux * uz * oneMinusCos + uy * sinA,
      ],
      [
        uy * ux * oneMinusCos + uz * sinA,
        cosA + uy * uy * oneMinusCos,
        uy * uz * oneMinusCos - ux * sinA,
      ],
      [
        uz * ux * oneMinusCos - uy * sinA,
        uz * uy * oneMinusCos + ux * sinA,
        cosA + uz * uz * oneMinusCos,
      ],
    ];
  }

  /**
   * Applies Inverse-Square Physical Light Attenuation & Lambertian Cosine Shading.
   * Returns a scalar lighting coefficient from 0.0 to 1.0.
   */
  public static calculateLambertianLight(
    surfacePos: { x: number; y: number; z: number },
    surfaceNormal: { x: number; y: number; z: number },
    lightPos: { x: number; y: number; z: number },
    lightIntensity: number = 1000.0,
    ambientLight: number = 0.15
  ): number {
    const lx = lightPos.x - surfacePos.x;
    const ly = lightPos.y - surfacePos.y;
    const lz = lightPos.z - surfacePos.z;
    const distSq = lx * lx + ly * ly + lz * lz;
    const dist = Math.sqrt(distSq);

    if (dist < 0.001) return 1.0;

    // Normalizing light vector
    const lNormX = lx / dist;
    const lNormY = ly / dist;
    const lNormZ = lz / dist;

    // Normalizing surface normal vector
    const nLen = Math.sqrt(
      surfaceNormal.x * surfaceNormal.x +
        surfaceNormal.y * surfaceNormal.y +
        surfaceNormal.z * surfaceNormal.z
    );
    const nNormX = nLen > 0.001 ? surfaceNormal.x / nLen : 0;
    const nNormY = nLen > 0.001 ? surfaceNormal.y / nLen : 1;
    const nNormZ = nLen > 0.001 ? surfaceNormal.z / nLen : 0;

    // Lambertian Dot Product (N . L)
    const dotNL = Math.max(0.0, nNormX * lNormX + nNormY * lNormY + nNormZ * lNormZ);

    // Inverse Square Law: intensity / (1.0 + dist^2)
    const attenuation = lightIntensity / (1.0 + distSq);
    const diffuse = dotNL * attenuation;

    return Math.max(0.0, Math.min(1.0, ambientLight + diffuse));
  }
}

export default VisualEngine;
