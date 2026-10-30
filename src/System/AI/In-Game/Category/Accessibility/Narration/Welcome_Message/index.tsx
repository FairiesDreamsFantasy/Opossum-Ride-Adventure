/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, RiderCharacter } from "../../../../../../../types";
import { MountNarrationEngine } from "../Mount";
import { WELCOME_MESSAGE_REGISTRY } from "../../../../../../Registry/Description/Welcome_Message";

export interface WelcomeMessageOptions {
  rider?: RiderCharacter | null;
  opossum?: OpossumCharacter | null;
  levelName?: string;
  isImperial?: boolean;
  formatDistance?: (dist: number, isImperial: boolean, showUnit?: boolean) => string;
  formatHeight?: (feet: number, inches: number, isImperial: boolean) => string;
}

/**
 * Welcome Message Narration Engine
 * 
 * Provides an ultra-clean, modular, zero-dilution welcome speech for game start.
 * Combines full biometric mount profiles with verified keyboard control instructions.
 */
export class WelcomeMessageEngine {
  /**
   * Compiles the complete, un-diluted welcome narration for the Manor entrance.
   */
  public static compileWelcomeMessage(options: WelcomeMessageOptions): string {
    const {
      rider,
      opossum,
      levelName = "Floor Foyer",
      isImperial = true,
      formatDistance = (d: number) => `${d} ft`,
      formatHeight = (f: number) => `${f} ft`
    } = options;

    const r = WELCOME_MESSAGE_REGISTRY;
    const characterName = rider?.name || "Fairy-Rider";
    const opossumName = opossum?.name || "Melissa";

    const foyerDimStr = formatDistance(r.foyerDefaultAesthetics.dimensions, isImperial, true);
    const foyerHeightStr = formatHeight(r.foyerDefaultAesthetics.ceilingHeight, 0, isImperial);
    const placeDescription = `${levelName}, a ${foyerDimStr} by ${foyerDimStr} grand entrance foyer ${r.foyerDefaultAesthetics.descriptionClause} ${foyerHeightStr} high vaulted ceilings`;

    // Retrieve the complete, un-diluted biometric mount profile (zero omission standard)
    const mountDescription = opossum 
      ? MountNarrationEngine.compileRiddenOpossumProfile(opossum)
      : `an esteemed mount with exquisite craftsmanship`;

    const greeting = `Welcome to ${r.gameTitle} ${r.studioCredits} ${r.speechStopInstruction}`;
    const presence = `You as ${characterName} is riding ${opossumName} the opossum in the ${placeDescription}. ${mountDescription}`;
    
    const controls = [
      r.controls.forward,
      `${r.controls.turnLeft} ${r.controls.turnRight}`,
      r.controls.reverse,
      r.controls.jump,
      `${r.controls.keyboardLayoutPreamble} ${r.controls.ardenDenisLayout} ${r.controls.cedellaLayout}`,
      r.controls.chatter,
      r.controls.opossumInfo,
      r.controls.riderPovToggle,
      r.controls.hudInfo,
      r.controls.measurementToggle,
      r.controls.menuTools,
      r.controls.pauseResume
    ].join(" ");

    return `${greeting} ${presence} ${controls} ${r.closingBlessing}`.trim();
  }
}

export default WelcomeMessageEngine;
