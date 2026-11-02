/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Go CSP Channel Models
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Goroutines messaging, channels, wait queues, and sync select states
 */

export interface GoGoroutine {
  id: string;
  isSleeping: boolean;
  priority: number;
}

export interface GoMessage<T> {
  payload: T;
  sentAt: number;
}
