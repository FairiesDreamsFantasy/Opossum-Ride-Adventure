/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FreeDOS VGA Mode 13h & 80x25 Text Display Engine
 */

export class FreeDOSVideoEngine {
  private mode: number = 0x13; // Mode 13h: 320x200 256 colors
  private frameBuffer: Uint8Array = new Uint8Array(320 * 200);

  public setMode(mode: number): void {
    this.mode = mode;
  }

  public getMode(): number {
    return this.mode;
  }

  public putPixel(x: number, y: number, colorIndex: number): void {
    if (x >= 0 && x < 320 && y >= 0 && y < 200) {
      this.frameBuffer[y * 320 + x] = colorIndex & 0xff;
    }
  }

  public getPixel(x: number, y: number): number {
    if (x >= 0 && x < 320 && y >= 0 && y < 200) {
      return this.frameBuffer[y * 320 + x];
    }
    return 0;
  }

  public clear(colorIndex: number = 0): void {
    this.frameBuffer.fill(colorIndex & 0xff);
  }

  public getFrameBuffer(): Uint8Array {
    return this.frameBuffer;
  }
}

export default FreeDOSVideoEngine;
