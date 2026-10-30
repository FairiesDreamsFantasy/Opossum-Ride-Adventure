/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Character-Specific Elegant Chatter
 */
export const playElegantChatter = (context: AudioContext, destination: AudioNode, isRetro: boolean = false) => {
  const now = context.currentTime;
  const chirpCount = 6;
  const spacing = 0.08;
  const duration = 0.04;
  const maxVolume = 0.207; // Amplified 15%
  const waveType = isRetro ? "square" : "sawtooth";

  const activeNodes: (OscillatorNode | GainNode)[] = [];
  let maxEndTime = now;

  for (let i = 0; i < chirpCount; i++) {
    const startTime = now + (i * spacing);
    const endTime = startTime + duration;
    if (endTime > maxEndTime) maxEndTime = endTime;

    const subOsc = context.createOscillator();
    const subGain = context.createGain();

    subOsc.type = waveType;
    subOsc.frequency.setValueAtTime(1200, startTime);
    subOsc.frequency.exponentialRampToValueAtTime(400, endTime);

    subGain.gain.setValueAtTime(maxVolume, startTime);
    subGain.gain.exponentialRampToValueAtTime(0.0001, endTime);

    subOsc.connect(subGain);
    subGain.connect(destination);

    subOsc.start(startTime);
    subOsc.stop(endTime);

    activeNodes.push(subOsc, subGain);
  }

  return { nodes: activeNodes, endTime: maxEndTime };
};
