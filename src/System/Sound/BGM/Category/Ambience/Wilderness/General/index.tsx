/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Wilderness Scientific Ambience Engine - General Submodule (64-bit Precision Parameters)
 * Synthesizes scientifically accurate ambient acoustic landscapes across all 5 Wilderness biomes:
 * 1. Desert: Arid thermal air shear + aeolian sand-grain saltation hiss
 * 2. Plain: Laminar open-grassland wind swells + blade-rustle harmonic layer
 * 3. Forest: Multi-layered canopy breeze + humid woodland rustle
 * 4. Natural Wilderness Caves: Helmholtz subterranean cavity resonance + natural water drips + underground river flow
 */

import { CaveWaterDrip } from "../../Cave/Water_Drip";

export type WildernessAmbienceBiome = "desert" | "plain" | "forest" | "wilderness_cave";

export class WildernessAmbienceEngine {
  private activeSources: AudioBufferSourceNode[] = [];
  private activeGains: GainNode[] = [];
  private modTimer: ReturnType<typeof setTimeout> | null = null;
  private dripTimer: ReturnType<typeof setTimeout> | null = null;

  private createFilteredNoiseBuffer(context: AudioContext, seconds: number, kind: "brown" | "pink" | "grain"): AudioBuffer {
    const bufferSize = Math.max(1, Math.floor(context.sampleRate * seconds));
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);

    if (kind === "brown") {
      let last = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.024 * white) / 1.024;
        data[i] = last * 1.8;
      }
    } else if (kind === "pink") {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
        b6 = white * 0.115926;
      }
    } else {
      let prev = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (white - prev * 0.55) * 0.55;
        prev = white;
      }
    }

    return buffer;
  }

  public startDesertWind(context: AudioContext, destination: AudioNode, placeId: string = "desert"): void {
    this.stopWildernessAmbience();
    const now = context.currentTime;
    const isSingingDunes = placeId.includes("singing_dunes") || placeId.includes("quartz");
    const isOasis = placeId.includes("oasis");

    const windSrc = context.createBufferSource();
    windSrc.buffer = this.createFilteredNoiseBuffer(context, 3, "brown");
    windSrc.loop = true;

    const windFilter = context.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.setValueAtTime(isSingingDunes ? 260 : 320, now);
    windFilter.Q.setValueAtTime(isSingingDunes ? 3.2 : 1.5, now);

    const windGain = context.createGain();
    windGain.gain.setValueAtTime(0.055, now);

    windSrc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(destination);
    windSrc.start(now);

    const grainSrc = context.createBufferSource();
    grainSrc.buffer = this.createFilteredNoiseBuffer(context, 3, "grain");
    grainSrc.loop = true;

    const grainFilter = context.createBiquadFilter();
    grainFilter.type = "bandpass";
    grainFilter.frequency.setValueAtTime(isOasis ? 1400 : 2150, now);
    grainFilter.Q.setValueAtTime(2.4, now);

    const grainGain = context.createGain();
    grainGain.gain.setValueAtTime(isOasis ? 0.015 : 0.024, now);

    grainSrc.connect(grainFilter);
    grainFilter.connect(grainGain);
    grainGain.connect(destination);
    grainSrc.start(now);

    this.activeSources = [windSrc, grainSrc];
    this.activeGains = [windGain, grainGain];

    const cycle = () => {
      if (!context || context.state === "closed" || this.activeGains.length < 2) return;
      const t = context.currentTime;
      const gust = 0.3 + Math.random() * 0.7;
      windGain.gain.setTargetAtTime(0.03 + gust * 0.055, t, 1.8);
      windFilter.frequency.setTargetAtTime((isSingingDunes ? 220 : 280) + gust * 190, t, 1.6);
      grainGain.gain.setTargetAtTime(0.01 + gust * 0.028, t + 0.25, 1.2);
      grainFilter.frequency.setTargetAtTime(1600 + gust * 1100, t, 1.4);
      this.modTimer = setTimeout(cycle, 3600 + Math.random() * 2800);
    };
    cycle();
  }

  public startPlainWind(context: AudioContext, destination: AudioNode, placeId: string = "plain"): void {
    this.stopWildernessAmbience();
    const now = context.currentTime;
    const isTundra = placeId.includes("tundra") || placeId.includes("moorland");

    const windSrc = context.createBufferSource();
    windSrc.buffer = this.createFilteredNoiseBuffer(context, 4, "pink");
    windSrc.loop = true;

    const windFilter = context.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.setValueAtTime(isTundra ? 520 : 380, now);
    windFilter.Q.setValueAtTime(isTundra ? 1.8 : 1.1, now);

    const windGain = context.createGain();
    windGain.gain.setValueAtTime(0.055, now);

    windSrc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(destination);
    windSrc.start(now);

    const grassSrc = context.createBufferSource();
    grassSrc.buffer = this.createFilteredNoiseBuffer(context, 3, "grain");
    grassSrc.loop = true;

    const grassFilter = context.createBiquadFilter();
    grassFilter.type = "bandpass";
    grassFilter.frequency.setValueAtTime(isTundra ? 2600 : 1900, now);
    grassFilter.Q.setValueAtTime(1.5, now);

    const grassGain = context.createGain();
    grassGain.gain.setValueAtTime(0.022, now);

    grassSrc.connect(grassFilter);
    grassFilter.connect(grassGain);
    grassGain.connect(destination);
    grassSrc.start(now);

    this.activeSources = [windSrc, grassSrc];
    this.activeGains = [windGain, grassGain];

    const cycle = () => {
      if (!context || context.state === "closed" || this.activeGains.length < 2) return;
      const t = context.currentTime;
      const sweep = 0.25 + Math.random() * 0.75;
      windGain.gain.setTargetAtTime(0.032 + sweep * 0.05, t, 1.5);
      windFilter.frequency.setTargetAtTime((isTundra ? 420 : 300) + sweep * 260, t, 1.5);
      grassGain.gain.setTargetAtTime(0.012 + sweep * 0.03, t + 0.15, 1.1);
      this.modTimer = setTimeout(cycle, 3000 + Math.random() * 2500);
    };
    cycle();
  }

  public startForestWildernessAmbience(context: AudioContext, destination: AudioNode, placeId: string = "forest"): void {
    this.stopWildernessAmbience();
    const now = context.currentTime;
    const isRainforest = placeId.includes("rainforest") || placeId.includes("bayou");

    const canopySrc = context.createBufferSource();
    canopySrc.buffer = this.createFilteredNoiseBuffer(context, 4, "pink");
    canopySrc.loop = true;

    const canopyFilter = context.createBiquadFilter();
    canopyFilter.type = "lowpass";
    canopyFilter.frequency.setValueAtTime(isRainforest ? 680 : 540, now);
    canopyFilter.Q.setValueAtTime(1.2, now);

    const canopyGain = context.createGain();
    canopyGain.gain.setValueAtTime(0.055, now);

    canopySrc.connect(canopyFilter);
    canopyFilter.connect(canopyGain);
    canopyGain.connect(destination);
    canopySrc.start(now);

    const foliageSrc = context.createBufferSource();
    foliageSrc.buffer = this.createFilteredNoiseBuffer(context, 3, "grain");
    foliageSrc.loop = true;

    const foliageFilter = context.createBiquadFilter();
    foliageFilter.type = "bandpass";
    foliageFilter.frequency.setValueAtTime(isRainforest ? 2900 : 2300, now);
    foliageFilter.Q.setValueAtTime(1.4, now);

    const foliageGain = context.createGain();
    foliageGain.gain.setValueAtTime(0.02, now);

    foliageSrc.connect(foliageFilter);
    foliageFilter.connect(foliageGain);
    foliageGain.connect(destination);
    foliageSrc.start(now);

    this.activeSources = [canopySrc, foliageSrc];
    this.activeGains = [canopyGain, foliageGain];

    const cycle = () => {
      if (!context || context.state === "closed" || this.activeGains.length < 2) return;
      const t = context.currentTime;
      const breeze = 0.3 + Math.random() * 0.7;
      canopyGain.gain.setTargetAtTime(0.03 + breeze * 0.045, t, 1.7);
      canopyFilter.frequency.setTargetAtTime(420 + breeze * 340, t, 1.7);
      foliageGain.gain.setTargetAtTime(0.012 + breeze * 0.025, t + 0.2, 1.1);
      this.modTimer = setTimeout(cycle, 3400 + Math.random() * 2600);
    };
    cycle();

    if (isRainforest) {
      const scheduleMistDrip = () => {
        if (!context || context.state === "closed" || this.activeGains.length === 0) return;
        CaveWaterDrip.play(context, destination);
        this.dripTimer = setTimeout(scheduleMistDrip, 4200 + Math.random() * 4800);
      };
      this.dripTimer = setTimeout(scheduleMistDrip, 2600);
    }
  }

  public startWildernessCaveAmbience(context: AudioContext, destination: AudioNode, placeId: string = "wilderness_cave"): void {
    this.stopWildernessAmbience();
    const now = context.currentTime;
    const hasRiver = placeId.includes("alluvial") || placeId.includes("river");
    const isGlacial = placeId.includes("glacial") || placeId.includes("ice");

    const cavernSrc = context.createBufferSource();
    cavernSrc.buffer = this.createFilteredNoiseBuffer(context, 4, "brown");
    cavernSrc.loop = true;

    const cavernFilter = context.createBiquadFilter();
    cavernFilter.type = "lowpass";
    cavernFilter.frequency.setValueAtTime(isGlacial ? 210 : 145, now);
    cavernFilter.Q.setValueAtTime(3.8, now);

    const cavernGain = context.createGain();
    cavernGain.gain.setValueAtTime(0.06, now);

    cavernSrc.connect(cavernFilter);
    cavernFilter.connect(cavernGain);
    cavernGain.connect(destination);
    cavernSrc.start(now);

    this.activeSources = [cavernSrc];
    this.activeGains = [cavernGain];

    if (hasRiver) {
      const riverSrc = context.createBufferSource();
      riverSrc.buffer = this.createFilteredNoiseBuffer(context, 3, "pink");
      riverSrc.loop = true;

      const riverFilter = context.createBiquadFilter();
      riverFilter.type = "bandpass";
      riverFilter.frequency.setValueAtTime(780, now);
      riverFilter.Q.setValueAtTime(1.1, now);

      const riverGain = context.createGain();
      riverGain.gain.setValueAtTime(0.035, now);

      riverSrc.connect(riverFilter);
      riverFilter.connect(riverGain);
      riverGain.connect(destination);
      riverSrc.start(now);

      this.activeSources.push(riverSrc);
      this.activeGains.push(riverGain);
    }

    const cycleCavern = () => {
      if (!context || context.state === "closed" || this.activeGains.length === 0) return;
      const t = context.currentTime;
      cavernGain.gain.setTargetAtTime(0.035 + Math.random() * 0.05, t, 2.2);
      cavernFilter.frequency.setTargetAtTime((isGlacial ? 160 : 105) + Math.random() * 110, t, 2.0);
      this.modTimer = setTimeout(cycleCavern, 4600 + Math.random() * 3400);
    };
    cycleCavern();

    const scheduleDrip = () => {
      if (!context || context.state === "closed" || this.activeGains.length === 0) return;
      CaveWaterDrip.play(context, destination);
      this.dripTimer = setTimeout(scheduleDrip, 2200 + Math.random() * 3800);
    };
    scheduleDrip();
  }

  public stopWildernessAmbience(): void {
    if (this.modTimer) {
      clearTimeout(this.modTimer);
      this.modTimer = null;
    }
    if (this.dripTimer) {
      clearTimeout(this.dripTimer);
      this.dripTimer = null;
    }
    this.activeGains.forEach((g) => {
      try {
        g.gain.setTargetAtTime(0, 0, 0.08);
      } catch {}
    });
    this.activeGains = [];
    this.activeSources.forEach((src) => {
      try {
        src.stop();
        src.disconnect();
      } catch {}
    });
    this.activeSources = [];
  }
}

export const globalWildernessAmbience = new WildernessAmbienceEngine();
