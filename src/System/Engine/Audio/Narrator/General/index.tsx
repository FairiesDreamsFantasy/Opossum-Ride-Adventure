/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Interface representing active Narrator/Accessibility settings.
 */
export interface NarratorSettings {
  announceDoors: boolean;
  announceReverb: boolean;
  extendedInfo: boolean;
  chatterNotifications: boolean;
}

export const DEFAULT_NARRATOR_SETTINGS: NarratorSettings = {
  announceDoors: true,
  announceReverb: false,
  extendedInfo: false,
  chatterNotifications: true,
};

/**
 * Helper to compile an ultra-scientific scenic description for narrator screen-readers.
 */
export function compileScenicDescription(
  arena: { name: string; surfaceType: string; theme: string; longDescription?: string },
  isFoyer: boolean,
  foyerDesc: { prompt: string; reverbProfile: string; extendedNarrative: string },
  settings: NarratorSettings
): string {
  if (isFoyer) {
    let desc = foyerDesc.prompt;
    if (settings.announceReverb && foyerDesc.reverbProfile) {
      desc += ` The acoustic reverberation profile is ${foyerDesc.reverbProfile}.`;
    }
    if (settings.extendedInfo && foyerDesc.extendedNarrative) {
      desc += ` ${foyerDesc.extendedNarrative}`;
    }
    return desc;
  }

  const name = arena.name || "Natural Simulation Arena";
  const surface = arena.surfaceType || "calibrated terrain substrate";
  const theme = arena.theme || "Serene";
  const longDesc = arena.longDescription ? ` ${arena.longDescription}` : "";

  return `You are currently at ${name}. Terrain substrate features ${surface}. Atmospheric resonance is ${theme}.${longDesc}`;
}

export default compileScenicDescription;
