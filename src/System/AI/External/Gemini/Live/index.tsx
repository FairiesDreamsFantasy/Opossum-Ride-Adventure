/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini Live Voice & Audio Engine
 * Production-grade voice interaction with speech recognition, telemetry injection, and synthesized audio responses.
 */

import { LiveSessionStatus, GeminiLiveState, LiveMessage } from "./types";
import { GeminiSystem } from "../index";
import { getSharedAudioContext, speakWords } from "../../../../Sound/TTS";

export * from "./types";
export * from "./UI";

export class GeminiLiveService {
  private static instance: GeminiLiveService;
  private status: LiveSessionStatus = "idle";
  private isLiveActive: boolean = false;
  private listeners: (() => void)[] = [];
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private vadLoopId: number | null = null;
  private recognition: any | null = null;
  private lastCapturedText: string = "";
  private history: LiveMessage[] = [];
  private isProcessingQuery: boolean = false;

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
      history: [...this.history]
    };
  }

  private setupKeyboardListeners() {
    if (typeof window === "undefined") return;

    window.addEventListener("keydown", (e) => {
      const isInputFocused = document.activeElement instanceof HTMLInputElement || 
                             document.activeElement instanceof HTMLTextAreaElement;
      
      if (!isInputFocused && e.shiftKey && e.code === "KeyC") {
        if (this.isLiveActive) {
          this.stopLive(true);
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
      const freqs = [783.99, 523.25]; // G5, C5
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
      const speakingThreshold = 18;

      const checkVolume = () => {
        if (!this.isLiveActive) return;

        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        const now = Date.now();
        if (average > speakingThreshold) {
          lastSoundTime = now;
        }

        const config = GeminiSystem.getConfig();
        const silenceThresholdMs = (config?.liveSilenceThresholdSeconds ?? 2.5) * 1000;

        if (now - lastSoundTime > silenceThresholdMs) {
          console.log(`Gemini Live: Silence detected for ${config?.liveSilenceThresholdSeconds ?? 2.5}s. Auto-off processing query.`);
          this.stopLive(true);
        } else {
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
      speakWords("Gemini live is disabled or API key is not configured.");
      return;
    }

    if (this.isLiveActive) return;

    console.log("Gemini Live: START (Shift-C Toggle)");
    this.isLiveActive = true;
    this.status = "connecting";
    this.notifyListeners();

    try {
      if (!this.mediaStream) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      
      this.status = "active";
      this.playChime("start");
      this.startSilenceDetection(this.mediaStream);

      // Initialize browser SpeechRecognition for live voice-to-text transcript
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = true;
          this.recognition.interimResults = true;
          this.recognition.lang = "en-US";

          this.recognition.onresult = (event: any) => {
            let interim = "";
            let final = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                final += event.results[i][0].transcript;
              } else {
                interim += event.results[i][0].transcript;
              }
            }
            const currentTranscript = final || interim;
            if (currentTranscript) {
              this.lastCapturedText = currentTranscript;
              console.log("Gemini Live Captured Speech:", currentTranscript);
            }
          };

          this.recognition.onerror = (e: any) => {
            console.warn("Speech recognition notice:", e.error);
          };

          this.recognition.start();
        } catch (recErr) {
          console.warn("Speech recognition unavailable, falling back to ambient mode:", recErr);
        }
      }
    } catch (err) {
      console.error("Gemini Live: Microphone access denied or error:", err);
      this.status = "error";
      speakWords("Microphone access was denied. Unable to capture live voice.");
      this.stopLive(false);
    }
    this.notifyListeners();
  }

  private async stopLive(processQuery: boolean = true) {
    if (!this.isLiveActive) return;

    console.log("Gemini Live: STOP");
    this.isLiveActive = false;
    this.status = processQuery ? "processing" : "idle";
    this.stopSilenceDetection();
    this.playChime("stop");

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.recognition = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    this.notifyListeners();

    if (processQuery) {
      await this.executeLiveQuery();
    }
  }

  private getEnvironmentContext(): string {
    try {
      const activeArena = (window as any).__OPOSSUM_ACTIVE_ARENA__ || "Grand Arena & Foyer";
      const riddenOpossum = (window as any).__OPOSSUM_RIDDEN_NAME__ || "Melissa the Opossum";
      const riderName = (window as any).__OPOSSUM_RIDER_NAME__ || "Fairy Rider";
      const stageId = (window as any).__OPOSSUM_STAGE_ID__ || "1";
      return `Current Stage: ${stageId}, Environment/Arena: ${activeArena}, Rider: ${riderName}, Mount: ${riddenOpossum}.`;
    } catch (e) {
      return "Player is riding an esteemed opossum mount through a magnificent arena.";
    }
  }

  private async executeLiveQuery() {
    if (this.isProcessingQuery) return;
    this.isProcessingQuery = true;
    this.status = "processing";
    this.notifyListeners();

    try {
      const userPrompt = this.lastCapturedText.trim() || "Describe my current game environment and surroundings.";
      this.lastCapturedText = "";

      this.history.push({
        role: "user",
        text: userPrompt,
        timestamp: Date.now()
      });

      const envTelemetry = this.getEnvironmentContext();
      console.log("Gemini Live Dispatching Query:", userPrompt, "Telemetry:", envTelemetry);

      const responseText = await GeminiSystem.askLive(userPrompt, envTelemetry);
      console.log("Gemini Live Spoken Response:", responseText);

      this.history.push({
        role: "model",
        text: responseText,
        timestamp: Date.now()
      });

      this.status = "idle";
      this.notifyListeners();

      // Immediately speak the answer aloud to the player
      speakWords(responseText, true);
    } catch (error: any) {
      console.error("Gemini Live query execution error:", error);
      this.status = "error";
      speakWords("Notice: Unable to complete live voice interaction at this time.");
      this.notifyListeners();
    } finally {
      this.isProcessingQuery = false;
      this.status = "idle";
      this.notifyListeners();
    }
  }

  public cleanup() {
    this.stopLive(false);
  }
}

export const GeminiLive = GeminiLiveService.getInstance();
