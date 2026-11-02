/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../../../types";
import { NarrationRegistry } from "./Registry";

export class MountNarrationEngine {
  /**
   * Generates the un-diluted In-Game Welcome narration for the ridden Opossum (animal mount).
   * Dispatches to modular profile compilers with zero omissions.
   */
  public static compileRiddenOpossumProfile(op: OpossumCharacter): string {
    const compiled = NarrationRegistry.compileRidden(op);
    
    // Enforcement: Verify that critical physical parameters are not missing or zeroed out.
    this.validateProfileIntegrity(op, compiled);

    return compiled.trim();
  }

  /**
   * Generates the un-diluted Selection Screen profile when "r" key is pressed.
   * Dispatches to modular profile compilers with zero omissions.
   */
  public static compileSelectionOpossumProfile(op: OpossumCharacter): string {
    const compiled = NarrationRegistry.compileSelection(op);
    
    // Enforcement: Verify that critical physical parameters are not missing or zeroed out.
    this.validateProfileIntegrity(op, compiled);

    return compiled.trim();
  }

  /**
   * Internal scientific validation to prevent "Babylonian" shortcuts and automated information omission.
   */
  private static validateProfileIntegrity(op: OpossumCharacter, compiledDetails: string): void {
    const mandatoryFields: (keyof OpossumCharacter)[] = ["width", "length", "headWidth", "headHeight", "eyeColor", "noseColor", "tailColor"];
    const missing = mandatoryFields.filter(f => !op[f]);
    
    if (
      missing.length > 0 ||
      !compiledDetails.includes("shoulder height") ||
      !compiledDetails.includes("inches") ||
      !compiledDetails.includes("head width") ||
      !compiledDetails.includes("head height")
    ) {
      console.warn(`[Integrity Shield Warning] Opossum profile for ${op.name} is incomplete. Missing: ${missing.join(", ")}. Standardized output may be diluted.`);
    }
  }
}

