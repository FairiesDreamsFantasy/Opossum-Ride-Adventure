/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * AMARA QIN - UNIT V: LORE, LINEAGE & ECOSYSTEM TAXONOMY
 * ============================================================================
 * Comprehensive anthropological lore, sovereign Babylon-Free declarations,
 * passel kinship matrices, and ecological sanctuary roles for Amara Qin.
 */

export interface QinPasselKinshipNode {
  name: string;
  relation: "Elder Sister" | "Sister" | "Brother";
  passelRole: string;
  shoulderHeightInches: number;
}

export interface LoreProfile {
  title: string;
  fullName: string;
  passelAffiliation: string;
  sovereigntyStatus: "Babylon-Free Sovereign Mount";
  kinshipNetwork: QinPasselKinshipNode[];
  vocation: string[];
  ecologicalSanctuaryBiome: string;
  ethicalPrinciples: string[];
  riderBondingProtocol: string;
  historicalRecord: string;
}

export const AMARA_QIN_LORE: LoreProfile = {
  title: "Empress of the Bamboo Ridges",
  fullName: "Amara Qin",
  passelAffiliation: "Qin Passel",
  sovereigntyStatus: "Babylon-Free Sovereign Mount",
  kinshipNetwork: [
    {
      name: "Tiana Qin",
      relation: "Sister",
      passelRole: "High-Altitude Navigator & Passel Historian",
      shoulderHeightInches: 70.0
    },
    {
      name: "Melvin Qin",
      relation: "Brother",
      passelRole: "Compact Steed, Shinto Scholar & Procedural Sound Specialist",
      shoulderHeightInches: 42.0
    }
  ],
  vocation: [
    "High-Altitude Alpine Patrol",
    "Ancient Ridge Sanctuary Guardian",
    "Equilibrium Kinetic Steed"
  ],
  ecologicalSanctuaryBiome: "Subalpine Bamboo Ridges & Mist-Shrouded Granite Pinnacles",
  ethicalPrinciples: [
    "Strict Adherence to Babylon-Free Craftsmanship: Complete refusal of planned obsolescence, telemetry tracking, and resource exploitation.",
    "Harmonious Passel Lineage: Preserving the ancient heritage and biological dignity of the Qin family.",
    "Precision Mechanics: Every stride and vocalization follows exact mathematical and scientific laws."
  ],
  riderBondingProtocol:
    "Mounting Amara Qin requires mutual respect and calm composure. Her regal posture and deep brown coat convey quiet strength, and riders must synchronize with her precise stride cadence.",
  historicalRecord:
    "Amara Qin stands as a cornerstone of the Qin passel sisterhood. Born on the misty granite slopes of the bamboo sanctuaries, she mastered alpine navigation at an early age. Revered for her grace, wisdom, and steadfast dedication to non-exploitation, Amara continues to champion passel sovereignty across all sanctuary realms."
};

export default AMARA_QIN_LORE;
