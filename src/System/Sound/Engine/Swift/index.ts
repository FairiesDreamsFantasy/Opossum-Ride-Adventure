/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Swift Sound Audio Engine & Spatial Audio Node Bridge
 */

export interface SwiftAudioNode {
  nodeId: string;
  pan3D: { x: number; y: number; z: number };
  volume: number;
}

export class SwiftAudioEngineBridge {
  public static createSpatialNode(id: string, x: number, y: number, z: number, volume: number = 1.0): SwiftAudioNode {
    return { nodeId: id, pan3D: { x, y, z }, volume };
  }
}

export default SwiftAudioEngineBridge;
