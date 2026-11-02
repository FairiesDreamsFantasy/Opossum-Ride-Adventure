/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId, OpossumCharacter } from "../../../../../../../types";
import * as Profiles from "./Profiles";

/**
 * Narration Registry
 * 
 * Maps Opossum IDs to their individualized modular narration compilers.
 * Supports both In-Game Ridden Mount Welcome and Selection Screen ('r' key) profiles.
 */
export const NarrationRegistry = {
  /**
   * Compiles the In-Game Welcome / Mount Profile for riding.
   */
  compileRidden: (op: OpossumCharacter): string => {
    const id = op.id as OpossumId;
    
    switch (id) {
      case OpossumId.MELISSA: return Profiles.MelissaNarration.compileRidden(op);
      case OpossumId.ASHLEY: return Profiles.AshleyNarration.compileRidden(op);
      case OpossumId.AMARA_QIN: return Profiles.AmaraQinNarration.compileRidden(op);
      case OpossumId.SAFFRON_ROSE: return Profiles.SaffronRoseNarration.compileRidden(op);
      case OpossumId.JALISSA_CHIN: return Profiles.JalissaChinNarration.compileRidden(op);
      case OpossumId.ARDEN_ROSIE: return Profiles.ArdenRosieNarration.compileRidden(op);
      case OpossumId.JAHMELLA_ROSE: return Profiles.JahmellaRoseNarration.compileRidden(op);
      case OpossumId.DAGMAR_KONE_REYNOLDS: return Profiles.DagmarKoneReynoldsNarration.compileRidden(op);
      case OpossumId.AGAPE_ROSE: return Profiles.AgapeRoseNarration.compileRidden(op);
      case OpossumId.ROXANNE_KONE_REYNOLDS: return Profiles.RoxanneKoneReynoldsNarration.compileRidden(op);
      case OpossumId.TIANA_QIN: return Profiles.TianaQinNarration.compileRidden(op);
      case OpossumId.WANDA: return Profiles.WandaNarration.compileRidden(op);
      case OpossumId.OLIVIA_CHIN: return Profiles.OliviaChinNarration.compileRidden(op);
      case OpossumId.RUTH_KONE_REYNOLDS: return Profiles.RuthKoneReynoldsNarration.compileRidden(op);
      case OpossumId.KADY_ROSE: return Profiles.KadyRoseNarration.compileRidden(op);
      case OpossumId.SANDRA: return Profiles.SandraNarration.compileRidden(op);
      case OpossumId.DRAKE_KONE_REYNOLDS: return Profiles.DrakeKoneReynoldsNarration.compileRidden(op);
      case OpossumId.RUDY_KONE_REYNOLDS: return Profiles.RudyKoneReynoldsNarration.compileRidden(op);
      case OpossumId.EUGENE_ROSE: return Profiles.EugeneRoseNarration.compileRidden(op);
      case OpossumId.DAISY_ROSE: return Profiles.DaisyRoseNarration.compileRidden(op);
      case OpossumId.CALLIE_ROSE: return Profiles.CallieRoseNarration.compileRidden(op);
      case OpossumId.STACEY_JASMIN: return Profiles.StaceyJasminNarration.compileRidden(op);
      case OpossumId.ARNOLD_ROSE: return Profiles.ArnoldRoseNarration.compileRidden(op);
      case OpossumId.MELVIN_QIN: return Profiles.MelvinQinNarration.compileRidden(op);
      case OpossumId.SAFFORD_CHIN: return Profiles.SaffordChinNarration.compileRidden(op);
      case OpossumId.IVAN_OPOSSUM: return Profiles.IvanOpossumNarration.compileRidden(op);
      case OpossumId.ISAAC_OPOSSUM: return Profiles.IsaacOpossumNarration.compileRidden(op);
      
      default:
        // Dynamic fallback for AI-generated or unknown steeds (un-diluted standard)
        return `You are riding ${op.name}, an esteemed ${op.gender} opossum mount. Stands at a shoulder height of ${op.shoulderHeight}, with a body width of ${op.width} inches, a body length of ${op.length} inches, a head width of ${op.headWidth || op.width} inches, and a head height of ${op.headHeight || 12} inches (excluding ears). Eyes: ${op.eyeColor}. Nose: ${op.noseColor}. Tail: ${op.tailColor}. Background: ${op.description}`;
    }
  },

  /**
   * Compiles the Selection Screen Profile ('r' key press).
   */
  compileSelection: (op: OpossumCharacter): string => {
    const id = op.id as OpossumId;
    
    switch (id) {
      case OpossumId.MELISSA: return Profiles.MelissaNarration.compileSelection(op);
      case OpossumId.ASHLEY: return Profiles.AshleyNarration.compileSelection(op);
      case OpossumId.AMARA_QIN: return Profiles.AmaraQinNarration.compileSelection(op);
      case OpossumId.SAFFRON_ROSE: return Profiles.SaffronRoseNarration.compileSelection(op);
      case OpossumId.JALISSA_CHIN: return Profiles.JalissaChinNarration.compileSelection(op);
      case OpossumId.ARDEN_ROSIE: return Profiles.ArdenRosieNarration.compileSelection(op);
      case OpossumId.JAHMELLA_ROSE: return Profiles.JahmellaRoseNarration.compileSelection(op);
      case OpossumId.DAGMAR_KONE_REYNOLDS: return Profiles.DagmarKoneReynoldsNarration.compileSelection(op);
      case OpossumId.AGAPE_ROSE: return Profiles.AgapeRoseNarration.compileSelection(op);
      case OpossumId.ROXANNE_KONE_REYNOLDS: return Profiles.RoxanneKoneReynoldsNarration.compileSelection(op);
      case OpossumId.TIANA_QIN: return Profiles.TianaQinNarration.compileSelection(op);
      case OpossumId.WANDA: return Profiles.WandaNarration.compileSelection(op);
      case OpossumId.OLIVIA_CHIN: return Profiles.OliviaChinNarration.compileSelection(op);
      case OpossumId.RUTH_KONE_REYNOLDS: return Profiles.RuthKoneReynoldsNarration.compileSelection(op);
      case OpossumId.KADY_ROSE: return Profiles.KadyRoseNarration.compileSelection(op);
      case OpossumId.SANDRA: return Profiles.SandraNarration.compileSelection(op);
      case OpossumId.DRAKE_KONE_REYNOLDS: return Profiles.DrakeKoneReynoldsNarration.compileSelection(op);
      case OpossumId.RUDY_KONE_REYNOLDS: return Profiles.RudyKoneReynoldsNarration.compileSelection(op);
      case OpossumId.EUGENE_ROSE: return Profiles.EugeneRoseNarration.compileSelection(op);
      case OpossumId.DAISY_ROSE: return Profiles.DaisyRoseNarration.compileSelection(op);
      case OpossumId.CALLIE_ROSE: return Profiles.CallieRoseNarration.compileSelection(op);
      case OpossumId.STACEY_JASMIN: return Profiles.StaceyJasminNarration.compileSelection(op);
      case OpossumId.ARNOLD_ROSE: return Profiles.ArnoldRoseNarration.compileSelection(op);
      case OpossumId.MELVIN_QIN: return Profiles.MelvinQinNarration.compileSelection(op);
      case OpossumId.SAFFORD_CHIN: return Profiles.SaffordChinNarration.compileSelection(op);
      case OpossumId.IVAN_OPOSSUM: return Profiles.IvanOpossumNarration.compileSelection(op);
      case OpossumId.ISAAC_OPOSSUM: return Profiles.IsaacOpossumNarration.compileSelection(op);
      
      default:
        // Dynamic fallback for AI-generated or unknown steeds (un-diluted standard)
        return `Profile of ${op.name}. Features a body length of ${op.length} inches, body width of ${op.width} inches, head width of ${op.headWidth || op.width} inches, head height of ${op.headHeight || 12} inches (excluding ears), and registered shoulder height of ${op.shoulderHeight}. Nose: ${op.noseColor}. Eyes: ${op.eyeColor}. Background: ${op.description}`;
    }
  },

  /**
   * Backward-compatible default compiler (defaults to Ridden mount welcome profile).
   */
  compile: (op: OpossumCharacter): string => {
    return NarrationRegistry.compileRidden(op);
  }
};
