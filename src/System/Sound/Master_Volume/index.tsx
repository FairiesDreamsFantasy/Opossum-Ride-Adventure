/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Master Volume Control
 * Centralized gain management for all in-game audio signals.
 */

let masterGainNode: GainNode | null = null;

export const getMasterGain = (context: AudioContext): GainNode => {
  if (!masterGainNode) {
    masterGainNode = context.createGain();
    masterGainNode.gain.setValueAtTime(1.0, context.currentTime);
    masterGainNode.connect(context.destination);
  }
  return masterGainNode;
};

export const setMasterVolume = (value: number) => {
  if (masterGainNode) {
    const context = masterGainNode.context;
    masterGainNode.gain.setTargetAtTime(Math.max(0, Math.min(1, value)), context.currentTime, 0.1);
  }
};
