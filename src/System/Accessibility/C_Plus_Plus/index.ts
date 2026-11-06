/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - High-Speed Accessibility Speech Queue
 * Native C++ High-Precision Simulation Bridge
 */

export interface IAccessibilityAnnouncement {
  id: string;
  text: string;
  priority: "High" | "Normal" | "Low";
  timestamp: number;
}

export const AccessibilitySpeechQueueCPP = {
  maxQueueCapacity: 64,

  /**
   * Sorts accessibility speech queue by priority and microsecond timestamp:
   */
  prioritizeQueue: (queue: IAccessibilityAnnouncement[]): IAccessibilityAnnouncement[] => {
    const priorityMap: Record<string, number> = { High: 3, Normal: 2, Low: 1 };
    return [...queue].sort((a, b) => {
      const pDiff = (priorityMap[b.priority] || 1) - (priorityMap[a.priority] || 1);
      if (pDiff !== 0) return pDiff;
      return a.timestamp - b.timestamp;
    });
  },

  /**
   * Evaluates string speech rate multiplier for ARIA screen readers:
   */
  computeSpeechRateMultiplier: (readingSpeedFactor: number = 1.0): number => {
    return Number(Math.max(0.5, Math.min(2.5, readingSpeedFactor * 1.1)).toFixed(2));
  }
};

export default AccessibilitySpeechQueueCPP;
