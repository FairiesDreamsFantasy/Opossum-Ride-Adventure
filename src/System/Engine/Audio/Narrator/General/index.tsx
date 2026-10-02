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
 * General helper to compile a scenic description for narrator screen-readers.
 */
export function compileScenicDescription(
  arena: { name: string; surfaceType: string; theme: string; longDescription?: string },
  isFoyer: boolean,
  foyerDesc: { prompt: string; reverbProfile: string; extendedNarrative: string },
  settings: NarratorSettings
): string {
  if (isFoyer) {
    let desc = foyerDesc.prompt;
    if (settings.announceReverb) {
      desc += ` The reverb profile is ${foyerDesc.reverbProfile}.`;
    }
    if (settings.extendedInfo) {
      desc += ` ${foyerDesc.extendedNarrative}`;
    }
    return desc;
  }

  const name = arena.name || "Unknown Location";
  const surface = arena.surfaceType || "standard ground";
  const theme = arena.theme || "Serene";
  const longDesc = arena.longDescription ? ` ${arena.longDescription}` : "";

  return `You are currently at ${name}. This is a ${surface} environment. The atmosphere is ${theme}.${longDesc}`;
}
