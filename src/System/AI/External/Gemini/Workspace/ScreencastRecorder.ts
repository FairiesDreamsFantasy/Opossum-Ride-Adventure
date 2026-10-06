/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSharedAudioContext } from "../../../../Sound/TTS";
import { GeminiWorkspace } from "./index";

export type ScreencastState = "idle" | "recording" | "paused" | "stopped";

export class ScreencastRecorderService {
  private static instance: ScreencastRecorderService;
  private state: ScreencastState = "idle";
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private lastRecordedBlob: Blob | null = null;
  private canvasElement: HTMLCanvasElement | null = null;

  public static getInstance(): ScreencastRecorderService {
    if (!ScreencastRecorderService.instance) {
      ScreencastRecorderService.instance = new ScreencastRecorderService();
    }
    return ScreencastRecorderService.instance;
  }

  private constructor() {
    this.setupGlobalShortcuts();
  }

  public setCanvas(canvas: HTMLCanvasElement | null) {
    this.canvasElement = canvas;
  }

  private playProceduralChime(type: "record" | "pause" | "stop" | "save" | "discard") {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0.35, now);

    let freqs: number[] = [523.25, 659.25];

    if (type === "record") {
      freqs = [880.00, 1318.51]; // A5 -> E6 high energetic chime
    } else if (type === "pause") {
      freqs = [659.25, 523.25]; // E5 -> C5 pause chime
    } else if (type === "stop") {
      freqs = [523.25, 659.25, 783.99]; // C5 -> E5 -> G5 stop chime
    } else if (type === "save") {
      freqs = [523.25, 783.99, 1046.50]; // C5 -> G5 -> C6 triumphant save to drive chime
    } else if (type === "discard") {
      freqs = [783.99, 523.25, 261.63]; // G5 -> C5 -> C4 descending discard chime
    }

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      noteGain.gain.setValueAtTime(0, now + idx * 0.08);
      noteGain.gain.linearRampToValueAtTime(0.15, now + idx * 0.08 + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.28);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.3);
    });
  }

  private setupGlobalShortcuts() {
    if (typeof window === "undefined") return;

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      const isInput = document.activeElement instanceof HTMLInputElement || 
                      document.activeElement instanceof HTMLTextAreaElement;
      if (isInput) return;

      // 1. Ctrl-Shift-) : Record / Pause
      if (e.ctrlKey && e.shiftKey && (e.key === ")" || e.code === "Digit0")) {
        e.preventDefault();
        this.toggleRecordPause();
        return;
      }

      // 2. Shift-) : Stop recording / Save to Drive
      if (!e.ctrlKey && e.shiftKey && (e.key === ")" || e.code === "Digit0")) {
        e.preventDefault();
        this.stopOrSaveToDrive();
        return;
      }

      // 3. Shift-( : Discard immediate
      if (!e.ctrlKey && e.shiftKey && (e.key === "(" || e.code === "Digit9")) {
        e.preventDefault();
        this.discardRecording();
        return;
      }
    });
  }

  public toggleRecordPause() {
    if (this.state === "idle" || this.state === "stopped") {
      this.startRecording();
    } else if (this.state === "recording") {
      this.pauseRecording();
    } else if (this.state === "paused") {
      this.resumeRecording();
    }
  }

  private startRecording() {
    try {
      if (this.canvasElement && (this.canvasElement as any).captureStream) {
        const stream = (this.canvasElement as any).captureStream(30);
        this.mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        this.recordedChunks = [];

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          if (this.recordedChunks.length > 0) {
            this.lastRecordedBlob = new Blob(this.recordedChunks, { type: "video/webm" });
          }
        };

        this.mediaRecorder.start(250);
      }
      this.state = "recording";
      this.playProceduralChime("record");
      console.log("Screencast: Recording Started");
    } catch (err) {
      this.state = "recording";
      this.playProceduralChime("record");
      console.warn("Canvas stream capture initialized in fallback mode:", err);
    }
  }

  private pauseRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.pause();
    }
    this.state = "paused";
    this.playProceduralChime("pause");
    console.log("Screencast: Recording Paused");
  }

  private resumeRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === "paused") {
      this.mediaRecorder.resume();
    }
    this.state = "recording";
    this.playProceduralChime("record");
    console.log("Screencast: Recording Resumed");
  }

  public stopOrSaveToDrive() {
    if (this.state === "recording" || this.state === "paused") {
      if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
        this.mediaRecorder.stop();
      }
      this.state = "stopped";
      this.playProceduralChime("stop");
      console.log("Screencast: Stopped. Press Shift-) again to save to Google Drive.");
    } else if (this.state === "stopped") {
      // Second press saves to drive
      const fileName = `Opossum_Adventure_Screencast_${Date.now()}.webm`;
      GeminiWorkspace.saveToDrive(fileName, this.lastRecordedBlob || undefined);
      this.state = "idle";
      this.playProceduralChime("save");
      console.log("Screencast: Saved to Google Drive!");
    }
  }

  public discardRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
    }
    this.recordedChunks = [];
    this.lastRecordedBlob = null;
    this.state = "idle";
    this.playProceduralChime("discard");
    console.log("Screencast: Discarded immediately.");
  }

  public getState(): ScreencastState {
    return this.state;
  }
}

export const ScreencastRecorder = ScreencastRecorderService.getInstance();
