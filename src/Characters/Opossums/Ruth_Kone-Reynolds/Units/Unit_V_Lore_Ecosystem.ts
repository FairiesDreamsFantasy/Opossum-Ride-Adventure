/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * RUTH KONE-REYNOLDS - UNIT V: LORE, LINEAGE & ECOSYSTEM TAXONOMY
 * ============================================================================
 * Anthropological lore, sovereign Babylon-Free declarations, passel kinship
 * matrices, and botanical education roles for Ruth Kone-Reynolds.
 */

export interface KoneReynoldsKinshipNode {
  name: string;
  relation: "Sister" | "Kin" | "Brother";
  passelRole: string;
  shoulderHeightInches: number;
}

export interface LoreProfile {
  title: string;
  fullName: string;
  passelAffiliation: string;
  sovereigntyStatus: "Babylon-Free Sovereign Mount";
  kinshipNetwork: KoneReynoldsKinshipNode[];
  vocation: string[];
  ecologicalSanctuaryBiome: string;
  ethicalPrinciples: string[];
  riderBondingProtocol: string;
  historicalRecord: string;
}

export const RUTH_KONE_REYNOLDS_LORE: LoreProfile = {
  title: "Master Botanist, Educator & Certified Sovereign Merchant",
  fullName: "Ruth Kone-Reynolds",
  passelAffiliation: "Kone-Reynolds Passel",
  sovereigntyStatus: "Babylon-Free Sovereign Mount",
  kinshipNetwork: [
    {
      name: "Roxanne Kone-Reynolds",
      relation: "Sister",
      passelRole: "Factory Safety Manager & Industrial Integrity Advocate",
      shoulderHeightInches: 72.0
    },
    {
      name: "Dagmar Kone-Reynolds",
      relation: "Kin",
      passelRole: "Environmental Auditor, Community Advocate & Anti-Pollution Specialist",
      shoulderHeightInches: 68.5
    },
    {
      name: "Arden-Rosie Kone-Reynolds",
      relation: "Kin",
      passelRole: "Mathematical Analyst, Technician & Holistic Education Advocate",
      shoulderHeightInches: 61.5
    },
    {
      name: "Rudy Kone-Reynolds",
      relation: "Brother",
      passelRole: "Acrobatic Tactician & High-Precision Compact Jack",
      shoulderHeightInches: 43.5
    },
    {
      name: "Drake Kone-Reynolds",
      relation: "Brother",
      passelRole: "Heavy Industrial Crafter & Defensive Trail Sentinel",
      shoulderHeightInches: 47.0
    }
  ],
  vocation: [
    "Master Botanist & Herbal Pharmacologist",
    "Natural Sciences Educator",
    "Cashier at Certified Babylon-Free Cooperative Store",
    "Mother of 8 Idren within the Sovereign Sanctuary"
  ],
  ecologicalSanctuaryBiome: "Botanical Research Greenhouses & Alpine Medicinal Meadows",
  ethicalPrinciples: [
    "Strict Adherence to Babylon-Free Commerce: Serving only unadulterated, certified chemical-free goods at fair mutualist exchange.",
    "Botanical Integrity & Indigenous Flora Defense: Protecting natural ecosystems against patent monopolies and synthetic monoculture.",
    "Pedagogical Devotion to Children: Nurturing 8 idren and community youth in natural science, botany, and moral courage.",
    "Serene Poise & Gentle Pacing: 6-foot stature delivering massive stability and harmonious shock absorption."
  ],
  riderBondingProtocol:
    "Mounting Ruth Kone-Reynolds requires a tranquil, respectful demeanor. Standing 6 feet at the shoulder adorned with her 25-color flower motifs and yellow necklace, she greets riders with profound calmness. Her stately 1.42 Hz stride provides unmatched stability, allowing riders to study botanical landscapes in serene comfort.",
  historicalRecord:
    "Ruth is revered across the sanctuary valleys as an unshakeable pillar of community nourishment and botanical wisdom. Sister to Roxanne, Ruth established the first sovereign botanical apothecary and co-founded the community's certified Babylon-Free store, ensuring families had direct access to clean organic foods and herbal medicine without reliance on commercial food conglomerates. Her 8 idren actively manage the experimental seed bank she founded."
};

export default RUTH_KONE_REYNOLDS_LORE;
