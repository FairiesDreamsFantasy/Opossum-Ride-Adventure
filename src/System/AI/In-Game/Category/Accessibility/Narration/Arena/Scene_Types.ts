/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SceneNarrationContext {
  levelId: number;
  levelName?: string;
  placeId: string;
  surfaceType?: string;
  theme?: string;
  longDescription?: string;
  isFoyer?: boolean;
  foyerPrompt?: string;
  foyerReverb?: string;
  foyerExtended?: string;
  settings?: {
    announceReverb?: boolean;
    extendedInfo?: boolean;
    announceDoors?: boolean;
    chatterNotifications?: boolean;
  };
}
