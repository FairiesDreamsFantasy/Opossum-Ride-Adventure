/**
 * Opossum Ride Adventure - Audacity Multi-Track & DSP Ultra-Module Master Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { AudacityEngineGeneral } from "./General";
import { AudacityTimeline } from "./Tracks";
import { AudacityDSP } from "./DSP";

export class AudacityUltraEngine {
  private static instance: AudacityUltraEngine;

  public static getInstance(): AudacityUltraEngine {
    if (!AudacityUltraEngine.instance) {
      AudacityUltraEngine.instance = new AudacityUltraEngine();
    }
    return AudacityUltraEngine.instance;
  }

  public getRegistry() {
    return AudacityEngineGeneral;
  }

  public getTimeline() {
    return AudacityTimeline;
  }

  public getDSP() {
    return AudacityDSP;
  }

  public processTrackMixdown(ctx: AudioContext, applyLimiter: boolean = true): AudioBuffer {
    let buffer = AudacityTimeline.mixdown(ctx);
    if (applyLimiter) {
      buffer = AudacityDSP.applyPeakLimiter(buffer);
    }
    return buffer;
  }
}

export const AudacityEngine = AudacityUltraEngine.getInstance();
