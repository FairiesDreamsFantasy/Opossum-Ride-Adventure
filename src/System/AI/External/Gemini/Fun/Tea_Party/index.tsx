/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TeaPartyGeneral, getCurrentTeaRoomTimeProfile, TeaRoomTimeProfile, TeaPartySubsystemConfig, DEFAULT_TEA_PARTY_CONFIG } from "./General";
import { TeaPartyHostesses, OpossumHostessSpecification, generateGrandTeaRoomHostesses } from "./Hostesses";
import { TeaPartyGuests, HumanGuestSpecification, TeaTableSpecification, TEA_TABLE_LAYOUT, SAMPLE_HUMAN_FAMILIES } from "./Guests";
import { TeaPartyTreats, TeaBlendSpecification, TeaPartyPastrySpecification, TEA_BLEND_CATALOG, PASTRY_TREAT_CATALOG } from "./Treats";
import { TeaPartyAcoustics, TeaPartyAcousticEngine } from "./Acoustics";

export * from "./General";
export * from "./Hostesses";
export * from "./Guests";
export * from "./Treats";
export * from "./Acoustics";

export interface GrandTeaRoomState {
  readonly isInitialized: boolean;
  readonly timeProfile: TeaRoomTimeProfile;
  readonly hostesses: OpossumHostessSpecification[];
  readonly tables: TeaTableSpecification[];
  readonly humanGuests: HumanGuestSpecification[];
  readonly availableBlends: TeaBlendSpecification[];
  readonly availableTreats: TeaPartyPastrySpecification[];
  readonly totalHostessCount: number;
  readonly totalGuestCount: number;
}

/**
 * Grand Tea Room Subsystem Manager
 * Coordinates real-time evening tea dynamics, hostess assignments, guest interactions, and acoustic feedback.
 */
export class GrandTeaRoomManager {
  private config: TeaPartySubsystemConfig = DEFAULT_TEA_PARTY_CONFIG;
  private state: GrandTeaRoomState;

  constructor() {
    const timeProfile = getCurrentTeaRoomTimeProfile();
    const hostesses = generateGrandTeaRoomHostesses(64);
    const tables = TEA_TABLE_LAYOUT;
    const humanGuests = SAMPLE_HUMAN_FAMILIES;
    const availableBlends = TEA_BLEND_CATALOG;
    const availableTreats = PASTRY_TREAT_CATALOG;

    this.state = {
      isInitialized: true,
      timeProfile,
      hostesses,
      tables,
      humanGuests,
      availableBlends,
      availableTreats,
      totalHostessCount: hostesses.length,
      totalGuestCount: humanGuests.length
    };
  }

  public getState(): GrandTeaRoomState {
    // Refresh time profile if needed
    const updatedTimeProfile = getCurrentTeaRoomTimeProfile();
    if (updatedTimeProfile.period !== this.state.timeProfile.period) {
      this.state = {
        ...this.state,
        timeProfile: updatedTimeProfile
      };
    }
    return this.state;
  }

  public pourTea(blendId: string): void {
    TeaPartyAcousticEngine.playTeaPouringSound();
    console.info(`[GrandTeaRoom] Poured cup of blend: ${blendId}`);
  }

  public clinkTeacups(): void {
    TeaPartyAcousticEngine.playPorcelainClinkSound();
  }

  public stirSpoon(): void {
    TeaPartyAcousticEngine.playSpoonStirSound();
  }
}

export const GrandTeaRoomSystem = new GrandTeaRoomManager();

export const GeminiTeaParty = {
  General: TeaPartyGeneral,
  Hostesses: TeaPartyHostesses,
  Guests: TeaPartyGuests,
  Treats: TeaPartyTreats,
  Acoustics: TeaPartyAcoustics,
  Manager: GrandTeaRoomManager,
  System: GrandTeaRoomSystem
};

export default GeminiTeaParty;
