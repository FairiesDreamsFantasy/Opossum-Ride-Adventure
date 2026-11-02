/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * C# Sound Audio Emitter Component Architecture
 */

export interface ISoundEmitterComponent {
  emitterId: string;
  volume: number;
  pitch: number;
  isLooping: boolean;
  play(): void;
  stop(): void;
}

export class CSharpSoundEmitterManager {
  private emitters: Map<string, ISoundEmitterComponent> = new Map();

  public registerEmitter(emitter: ISoundEmitterComponent): void {
    this.emitters.set(emitter.emitterId, emitter);
  }

  public stopAll(): void {
    this.emitters.forEach((e) => e.stop());
  }
}

export default CSharpSoundEmitterManager;
