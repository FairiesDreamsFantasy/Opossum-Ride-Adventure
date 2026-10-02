/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Swift Declarative Layout & Geometry Pipeline Bridge
 */

export interface SwiftVisualFrame {
  origin: { x: number; y: number };
  size: { width: number; height: number };
}

export class SwiftVisualGeometryBridge {
  public static createFrame(x: number, y: number, width: number, height: number): SwiftVisualFrame {
    return { origin: { x, y }, size: { width, height } };
  }

  public static containsPoint(frame: SwiftVisualFrame, x: number, y: number): boolean {
    return (
      x >= frame.origin.x &&
      x <= frame.origin.x + frame.size.width &&
      y >= frame.origin.y &&
      y <= frame.origin.y + frame.size.height
    );
  }
}

export default SwiftVisualGeometryBridge;
