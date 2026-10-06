/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Google Cloud Platform (GCP) Module for Gemini
 * Configures Cloud Storage buckets, Speech-To-Text configurations,
 * and translation parameters to support the Gemini AI subsystem.
 */

export interface GcsBucketConfig {
  bucketName: string;
  location: string;
  storageClass: "STANDARD" | "NEARLINE" | "COLDLINE" | "ARCHIVE";
  kmsKeyName?: string;
}

export interface GcpSpeechToTextConfig {
  encoding: "LINEAR16" | "FLAC" | "MULAW" | "AMR";
  sampleRateHertz: number;
  languageCode: string;
  enableAutomaticPunctuation: boolean;
  model: "default" | "video" | "phone_call" | "medical";
}

export class GeminiGcpService {
  private static instance: GeminiGcpService;
  private storageBucket: GcsBucketConfig | null = null;
  private speechConfig: GcpSpeechToTextConfig | null = null;

  public static getInstance(): GeminiGcpService {
    if (!GeminiGcpService.instance) {
      GeminiGcpService.instance = new GeminiGcpService();
    }
    return GeminiGcpService.instance;
  }

  private constructor() {
    // Default high-precision scientific configuration
    this.storageBucket = {
      bucketName: "opossum-ride-adventure-world-states",
      location: "us-central1",
      storageClass: "STANDARD"
    };

    this.speechConfig = {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US",
      enableAutomaticPunctuation: true,
      model: "default"
    };
  }

  public getStorageConfig(): GcsBucketConfig | null {
    return this.storageBucket;
  }

  public getSpeechConfig(): GcpSpeechToTextConfig | null {
    return this.speechConfig;
  }

  public updateStorageConfig(config: GcsBucketConfig) {
    this.storageBucket = config;
    console.log(`GCP Storage Config updated for bucket: ${config.bucketName}`);
  }

  public updateSpeechConfig(config: GcpSpeechToTextConfig) {
    this.speechConfig = config;
    console.log(`GCP Speech Config updated: ${config.languageCode} / ${config.sampleRateHertz}Hz`);
  }
}

export const GeminiGcp = GeminiGcpService.getInstance();
