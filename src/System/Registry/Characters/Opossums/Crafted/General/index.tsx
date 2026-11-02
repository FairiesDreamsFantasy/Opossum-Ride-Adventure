/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MelissaOpossumRegistry } from "../Melissa_Opossum";
import { AshleyOpossumRegistry } from "../Ashley_Opossum";
import { AmaraQinRegistry } from "../Amara_Qin";
import { JahmellaRoseRegistry } from "../Jahmella_Rose";
import { SaffronRoseRegistry } from "../Saffron_Rose";
import { JalissaChinRegistry } from "../Jalissa_Chin";
import { DagmarKoneReynoldsRegistry } from "../Dagmar_Kone-Reynolds";
import { ArdenRosieKoneReynoldsRegistry } from "../Arden-Rosie_Kone-Reynolds";
import { AgapeRoseRegistry } from "../Agape_Rose";
import { RoxanneKoneReynoldsRegistry } from "../Roxanne_Kone-Reynolds";
import { TianaQinRegistry } from "../Tiana_Qin";
import { RuthKoneReynoldsRegistry } from "../Ruth_Kone-Reynolds";
import { KadyRoseRegistry } from "../Kady_Rose";
import { SandraOpossumRegistry } from "../Sandra_Opossum";
import { WandaOpossumRegistry } from "../Wanda_Opossum";
import { OliviaChinRegistry } from "../Olivia_Chin";
import { DaisyRoseRegistry } from "../Daisy_Rose";
import { CallieRoseRegistry } from "../Callie_Rose";
import { StaceyJasminRegistry } from "../Stacey_Jasmin";

/**
 * Registry of Crafted Opossums
 * Provides ultra-precise lookup data for all handcrafted, named female opossum characters (19 Sacred Jills).
 */
export const CraftedOpossumsRegistry = {
  id: "crafted_opossums",
  description: "Comprehensive lookup registry for all 19 sacred crafted female opossum characters.",
  count: 19,
  characters: [
    MelissaOpossumRegistry,
    AshleyOpossumRegistry,
    AmaraQinRegistry,
    JahmellaRoseRegistry,
    SaffronRoseRegistry,
    JalissaChinRegistry,
    DagmarKoneReynoldsRegistry,
    ArdenRosieKoneReynoldsRegistry,
    AgapeRoseRegistry,
    RoxanneKoneReynoldsRegistry,
    TianaQinRegistry,
    RuthKoneReynoldsRegistry,
    KadyRoseRegistry,
    SandraOpossumRegistry,
    WandaOpossumRegistry,
    OliviaChinRegistry,
    DaisyRoseRegistry,
    CallieRoseRegistry,
    StaceyJasminRegistry
  ]
};

