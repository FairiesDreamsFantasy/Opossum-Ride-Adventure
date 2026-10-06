/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LiveSessionStatus = "idle" | "connecting" | "active" | "error";

export interface LiveVoiceConfig {
  voiceName: "Puck" | "Charon" | "Kore" | "Fenrir" | "Zephyr";
}

export interface LiveMessage {
  role: "user" | "model";
  text?: string;
  audio?: string; // base64 encoded audio
  timestamp: number;
}

export interface GeminiLiveState {
  status: LiveSessionStatus;
  isLiveActive: boolean;
  history: LiveMessage[];
}
