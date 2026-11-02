/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ultra-Precise Stereo Sound System
 * Handles high-fidelity spatialization for 2-channel output.
 */
export class UltraPreciseStereoSystem {
  private ctx: AudioContext | null = null;
  private panner: StereoPannerNode | null = null;

  constructor() {
    // Initialized lazily to respect browser autoplay policies
  }

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.panner = this.ctx.createStereoPanner();
      this.panner.connect(this.ctx.destination);
    }
  }

  /**
   * Calculate pan value based on game coordinates.
   * @param sourceX X-coordinate of the sound source
   * @param listenerX X-coordinate of the listener (Opossum)
   * @param fieldWidth Total width of the play area
   */
  public calculatePan(sourceX: number, listenerX: number, fieldWidth: number): number {
    const deltaX = sourceX - listenerX;
    // Normalize delta to [-1, 1] range for StereoPannerNode
    const pan = Math.max(-1, Math.min(1, (deltaX / (fieldWidth / 2))));
    return pan;
  }

  public setPan(value: number) {
    this.init();
    if (this.panner && this.ctx) {
      this.panner.pan.setTargetAtTime(value, this.ctx.currentTime, 0.05);
    }
  }
}
