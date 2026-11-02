/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ultra-Precise Surround Sound System
 * Maps game coordinates to multi-channel audio environments (5.1/7.1 simulation).
 */
export class UltraPreciseSurroundSystem {
  private ctx: AudioContext | null = null;
  private spatialPanner: PannerNode | null = null;

  constructor() {
    // Initialized lazily
  }

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.spatialPanner = this.ctx.createPanner();
      this.spatialPanner.panningModel = 'HRTF';
      this.spatialPanner.distanceModel = 'inverse';
      this.spatialPanner.refDistance = 1;
      this.spatialPanner.maxDistance = 10000;
      this.spatialPanner.rolloffFactor = 1;
      this.spatialPanner.coneInnerAngle = 360;
      this.spatialPanner.coneOuterAngle = 0;
      this.spatialPanner.coneOuterGain = 0;
      this.spatialPanner.connect(this.ctx.destination);
    }
  }

  /**
   * Update listener position (The Opossum)
   */
  public updateListener(x: number, y: number, z: number) {
    this.init();
    if (this.ctx) {
      const listener = this.ctx.listener;
      if (listener.positionX) {
        listener.positionX.setTargetAtTime(x, this.ctx.currentTime, 0.1);
        listener.positionY.setTargetAtTime(y, this.ctx.currentTime, 0.1);
        listener.positionZ.setTargetAtTime(z, this.ctx.currentTime, 0.1);
      } else {
        // Fallback for older browsers
        listener.setPosition(x, y, z);
      }
    }
  }

  /**
   * Update source position relative to world coordinates
   */
  public updateSourcePosition(x: number, y: number, z: number) {
    this.init();
    if (this.spatialPanner && this.ctx) {
      this.spatialPanner.positionX.setTargetAtTime(x, this.ctx.currentTime, 0.1);
      this.spatialPanner.positionY.setTargetAtTime(y, this.ctx.currentTime, 0.1);
      this.spatialPanner.positionZ.setTargetAtTime(z, this.ctx.currentTime, 0.1);
    }
  }
}
