/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Telemetry report representing real-time system performance and token metrics.
 */
export interface TelemetryReport {
  timestamp: number;
  fps: number;
  avgLatencyMs: number;
  tokenThroughput: number;
  stabilityIndex: number;
  memoryUsage?: number;
}

/**
 * Kalman Filter class for smoothing out noisy measurements or latency spikes.
 */
export class KalmanFilter {
  private q: number; // Process noise covariance
  private r: number; // Measurement noise covariance
  private x: number; // Estimated value
  private p: number; // Estimation error covariance
  private k: number; // Kalman gain

  constructor(processNoise: number = 0.1, measurementNoise: number = 0.5, initialValue: number = 0) {
    this.q = processNoise;
    this.r = measurementNoise;
    this.x = initialValue;
    this.p = 1.0;
    this.k = 0.0;
  }

  /**
   * Updates the filter with a new measurement and returns the smoothed estimate.
   */
  public update(measurement: number): number {
    // Prediction Update
    this.p = this.p + this.q;

    // Measurement Update
    this.k = this.p / (this.p + this.r);
    this.x = this.x + this.k * (measurement - this.x);
    this.p = (1 - this.k) * this.p;

    return this.x;
  }

  /**
   * Gets the current estimated state.
   */
  public getState(): number {
    return this.x;
  }
}

/**
 * Gemini Engine General System Configurations and Diagnostics.
 */
export const GeminiEngineGeneral = {
  version: "2.1.4-Scientific",
  codename: "Anomalocaris",
  bootTime: Date.now(),
  latencyFilter: new KalmanFilter(0.05, 0.4, 120),

  /**
   * Evaluates the response stability score based on output consistency and token counts.
   */
  calculateStability(inputLength: number, outputLength: number, responseTimeMs: number): number {
    if (responseTimeMs <= 0) return 1.0;
    const baseStability = 1.0 - Math.min(0.5, responseTimeMs / 5000);
    const tokenEfficiency = Math.min(1.0, (outputLength + 1) / (inputLength + 1));
    return parseFloat((baseStability * 0.7 + tokenEfficiency * 0.3).toFixed(4));
  },

  /**
   * Generates a fully formatted scientific performance telemetry report.
   */
  generateTelemetry(
    frameTimes: number[],
    latencyHistory: number[],
    requestCount: number,
    totalTokens: number
  ): TelemetryReport {
    // Calculate FPS
    let fps = 60;
    if (frameTimes.length > 1) {
      const totalFrameTime = frameTimes.reduce((acc, t) => acc + t, 0);
      fps = Math.round(1000 / (totalFrameTime / frameTimes.length));
    }

    // Calculate Latency estimation through Kalman filter
    let smoothedLatency = 120;
    if (latencyHistory.length > 0) {
      const rawAvg = latencyHistory.reduce((acc, t) => acc + t, 0) / latencyHistory.length;
      smoothedLatency = this.latencyFilter.update(rawAvg);
    }

    const throughput = requestCount > 0 ? parseFloat((totalTokens / requestCount).toFixed(2)) : 0;
    const stability = this.calculateStability(100, 20, smoothedLatency);

    return {
      timestamp: Date.now(),
      fps,
      avgLatencyMs: Math.round(smoothedLatency),
      tokenThroughput: throughput,
      stabilityIndex: stability,
      memoryUsage: (window.performance && (window.performance as any).memory) 
        ? Math.round((window.performance as any).memory.usedJSHeapSize / 1048576) 
        : undefined
    };
  }
};
