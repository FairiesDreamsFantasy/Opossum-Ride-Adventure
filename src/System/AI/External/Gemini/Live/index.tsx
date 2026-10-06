/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LiveSessionStatus, GeminiLiveState } from "./types";
import { GeminiSystem } from "../index";

export * from "./types";
export * from "./UI";

/**
 * Gemini Live Service
 * Orchestrates real-time voice interaction using Gemini Live API and Push-To-Talk (Shift-C).
 */
export class GeminiLiveService {
  private static instance: GeminiLiveService;
  private status: LiveSessionStatus = "idle";
  private isPushToTalkActive: boolean = false;
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
      isPushToTalkActive: this.isPushToTalkActive,
      history: [] // History tracking can be added later if needed
    };
  }

  private setupKeyboardListeners() {
    if (typeof window === "undefined") return;

    window.addEventListener("keydown", (e) => {
      // Shift-C (Sacred Push-To-Talk Command)
      // Check if input element is focused to prevent triggering during typing
      const isInputFocused = document.activeElement instanceof HTMLInputElement || 
                             document.activeElement instanceof HTMLTextAreaElement;
      
      if (!isInputFocused && e.shiftKey && e.code === "KeyC") {
        this.startPushToTalk();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.code === "KeyC") {
        this.stopPushToTalk();
      }
    });
  }

  private async startPushToTalk() {
    // Only proceed if Gemini is ready and Live is enabled in preferences
    const config = GeminiSystem.getConfig();
    if (!config?.liveEnabled || !config?.apiKey) {
      return;
    }

    if (this.isPushToTalkActive) return;

    console.log("Gemini Live: PTT START (Shift-C)");
    this.isPushToTalkActive = true;
    this.notifyListeners();

    try {
      if (!this.mediaStream) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      
      this.status = "active";
    } catch (err) {
      console.error("Gemini Live: Microphone access denied or error:", err);
      this.status = "error";
      this.stopPushToTalk();
    }
    this.notifyListeners();
  }

  private stopPushToTalk() {
    if (!this.isPushToTalkActive) return;

    console.log("Gemini Live: PTT STOP");
    this.isPushToTalkActive = false;
    this.status = "idle";
    this.notifyListeners();
  }

  public cleanup() {
    this.stopPushToTalk();
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
