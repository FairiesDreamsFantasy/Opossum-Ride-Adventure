/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LiveSessionStatus, GeminiLiveState } from "./types";
import { GeminiSystem } from "../index";
import { getSharedAudioContext } from "../../../../Sound/TTS";

export * from "./types";
export * from "./UI";

/**
 * Gemini Live Service
 * Orchestrates real-time voice interaction using Gemini Live API and Push-To-Talk (Shift-C).
 */
export class GeminiLiveService {
  private static instance: GeminiLiveService;
  private status: LiveSessionStatus = "idle";
  private isLiveActive: boolean = false;
  private listeners: (() => void)[] = [];
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private websocket: WebSocket | null = null;
  private vadLoopId: number | null = null;

  public static getInstance(): GeminiLiveService {
    if (!GeminiLiveService.instance) {
      GeminiLiveService.instance = new GeminiLiveService();
    }
    return GeminiLiveService.instance;
  }

  private constructor() {
    this.setupKeyboardListeners();
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l());
  }

  public getState(): GeminiLiveState {
    return {
      status: this.status,
      isLiveActive: this.isLiveActive,
      history: [] // History tracking can be added later if needed
    };
  }

  private setupKeyboardListeners() {
    if (typeof window === "undefined") return;

    window.addEventListener("keydown", (e) => {
      // Shift-C (Sacred Gemini Command)
      // Check if input element is focused to prevent triggering during typing
      const isInputFocused = document.activeElement instanceof HTMLInputElement || 
                             document.activeElement instanceof HTMLTextAreaElement;
      
      if (!isInputFocused && e.shiftKey && e.code === "KeyC") {
        if (this.isLiveActive) {
          this.stopLive();
        } else {
          this.startLive();
        }
      }
    });
  }

  private playChime(type: "start" | "stop") {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);

    if (type === "start") {
      // Pleasant rising crystal-clean chime: C5 -> E5 -> G5
      const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + index * 0.08);
        
        noteGain.gain.setValueAtTime(0, now + index * 0.08);
        noteGain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.35);
        
        osc.connect(noteGain);
        noteGain.connect(gainNode);
        
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.4);
      });
      
      gainNode.gain.setValueAtTime(0.6, now);
    } else {
      // Dual chimes indicating auto toggled off: G5 -> C5 in rapid succession
      const freqs = [783.99, 523.25]; // G5, C5 (high to low classic Google Assistant era dual chime)
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + index * 0.12);
        
        noteGain.gain.setValueAtTime(0, now + index * 0.12);
        noteGain.gain.linearRampToValueAtTime(0.14, now + index * 0.12 + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 0.3);
        
        osc.connect(noteGain);
        noteGain.connect(gainNode);
        
        osc.start(now + index * 0.12);
        osc.stop(now + index * 0.12 + 0.35);
      });
      
      gainNode.gain.setValueAtTime(0.6, now);
    }
  }

  private startSilenceDetection(stream: MediaStream) {
    const ctx = getSharedAudioContext();
    if (!ctx) return;

    try {
      this.audioContext = ctx;
      this.source = ctx.createMediaStreamSource(stream);
      
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      this.source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let lastSoundTime = Date.now();
      const speakingThreshold = 18; // Scientific RMS amplitude threshold

      const checkVolume = () => {
        if (!this.isLiveActive) return;

        analyser.getByteFrequencyData(dataArray);

        // Calculate average amplitude (RMS)
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        const now = Date.now();
        if (average > speakingThreshold) {
          lastSoundTime = now; // User is speaking, reset the silence timer
        }

        const config = GeminiSystem.getConfig();
        const silenceThresholdMs = (config?.liveSilenceThresholdSeconds ?? 2.5) * 1000;

        if (now - lastSoundTime > silenceThresholdMs) {
          console.log(`Gemini Live: Silence detected for ${config?.liveSilenceThresholdSeconds ?? 2.5}s. Auto-off.`);
          this.stopLive();
        } else {
          // Keep scanning recursively
          this.vadLoopId = requestAnimationFrame(checkVolume);
        }
      };

      this.vadLoopId = requestAnimationFrame(checkVolume);
    } catch (err) {
      console.error("Failed to start voice activity detection analyser:", err);
    }
  }

  private stopSilenceDetection() {
    if (this.vadLoopId !== null) {
      cancelAnimationFrame(this.vadLoopId);
      this.vadLoopId = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
  }

  private async startLive() {
    const config = GeminiSystem.getConfig();
    if (!config?.liveEnabled || !config?.apiKey) {
      return;
    }

    if (this.isLiveActive) return;

    console.log("Gemini Live: START (Shift-C Toggle)");
    this.isLiveActive = true;
    this.notifyListeners();

    try {
      if (!this.mediaStream) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      
      this.status = "active";
      this.playChime("start");
      this.startSilenceDetection(this.mediaStream);
    } catch (err) {
      console.error("Gemini Live: Microphone access denied or error:", err);
      this.status = "error";
      this.stopLive();
    }
    this.notifyListeners();
  }

  private stopLive() {
    if (!this.isLiveActive) return;

    console.log("Gemini Live: STOP");
    this.isLiveActive = false;
    this.status = "idle";
    this.stopSilenceDetection();
    this.playChime("stop");

    // Strictly release stream tracks to turn off recording light
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    this.notifyListeners();
  }

  public cleanup() {
    this.stopLive();
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }
}

export const GeminiLive = GeminiLiveService.getInstance();
