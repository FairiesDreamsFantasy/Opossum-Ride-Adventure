/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SmartChatterAIRegistry = {
  id: "smart_chatter_ai",
  name: "Smart Chatter Vocalization Engine",
  category: "Animal",
  species: "Opossum",
  classification: "Procedural Sound Synthesis & Pitch Relationships",
  description: "Offline Web Audio API synthesizer for handcrafted local chatter and pitch relationships across the Perfect 16 Opossums.",
  standard: "100,000,000,000% Ultra-Broad Protection Standard",
  synth: {
    baseWaveform: "sine" as const,
    frequencySweepRange: [400, 1800],
    envelopeAttackTime: 0.04,
    envelopeReleaseTime: 0.22,
    pitchOffsets: {
      melissa_opossum: 0,
      ashley_opossum: 0,
      saffron_rose: 0,
      amara_qin: 0,
      tiana_qin: -0.03, // Tiana Qin at -3% from Amara Qin
      agape_rose: -0.04, // Agape Rose at -4% from Saffron Rose
      roxanne_kone_reynolds: -0.01, // Roxanne Kone-Reynolds at -1% from Agape Rose
      jahmella_rose: 0,
      kady_rose: 0,
      jalissa_chin: 0,
      olivia_chin: 0,
      dagmar_kone_reynolds: 0,
      ruth_kone_reynolds: 0,
      arden_rosie_kone_reynolds: 0
    }
  }
};
