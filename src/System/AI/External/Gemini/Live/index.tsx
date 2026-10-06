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
        
        // High register harmonic richness with gentle attack and ring
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
      // Gentle warm descending chime: G5 -> E5 -> C5 to indicate microphone is closed
      const freqs = [783.99, 659.25, 523.25]; // G5, E5, C5
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + index * 0.07);
        
        noteGain.gain.setValueAtTime(0, now + index * 0.07);
        noteGain.gain.linearRampToValueAtTime(0.10, now + index * 0.07 + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.07 + 0.28);
        
        osc.connect(noteGain);
        noteGain.connect(gainNode);
        
        osc.start(now + index * 0.07);
        osc.stop(now + index * 0.07 + 0.3);
      });
      
      gainNode.gain.setValueAtTime(0.5, now);
    }
  }

  private async startLive() {
    // Only proceed if Gemini is ready and Live is enabled in preferences
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
    this.playChime("stop");
    this.notifyListeners();
  }

  public cleanup() {
    this.stopLive();
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }
}

export const GeminiLive = GeminiLiveService.getInstance();
