/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * DAGMAR KONE-REYNOLDS - UNIT V: LORE, LINEAGE & ECOSYSTEM TAXONOMY
 * ============================================================================
 * Anthropological lore, sovereign Babylon-Free declarations, passel kinship
 * matrices, and environmental audit roles for Dagmar Kone-Reynolds.
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

export const DAGMAR_KONE_REYNOLDS_LORE: LoreProfile = {
  title: "Environmental Auditor & Community Advocate",
  fullName: "Dagmar Kone-Reynolds",
  passelAffiliation: "Kone-Reynolds Passel",
  sovereigntyStatus: "Babylon-Free Sovereign Mount",
  kinshipNetwork: [
    {
      name: "Arden-Rosie Kone-Reynolds",
      relation: "Kin",
      passelRole: "Mathematical Analyst, Technician & Holistic Education Advocate",
      shoulderHeightInches: 61.5
    },
    {
      name: "Roxanne Kone-Reynolds",
      relation: "Kin",
      passelRole: "Factory Safety Manager & Industrial Integrity Advocate",
      shoulderHeightInches: 72.0
    },
    {
      name: "Ruth Kone-Reynolds",
      relation: "Kin",
      passelRole: "Master Botanist, Educator & Certified Store Cashier",
      shoulderHeightInches: 72.0
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
    "Environmental Quality Auditor",
    "Watershed Contamination Specialist",
    "Anti-Pollution Compliance Officer",
    "High-Endurance Highland Steed"
  ],
  ecologicalSanctuaryBiome: "River Headwaters, Wetlands & Protected Drainage Basins",
  ethicalPrinciples: [
    "Zero Tolerance for Industrial Pollution: Systematic chemical auditing of all runoff to protect municipal groundwater.",
    "Babylon-Free Environmental Livity: Defending ecosystems against toxic waste dumping, corporate greenwashing, and predatory extraction.",
    "Uncompromising Forensic Rigor: Environmental reports backed by verified spectrometry and physical soil core samples.",
    "Reassuring Equilibrium: High-stability gait designed to safely transport riders across fragile, slippery marshland."
  ],
  riderBondingProtocol:
    "Mounting Dagmar Kone-Reynolds requires patience and calm poise. Standing 5 feet 8.5 inches at the shoulder with an extra-long rabbit-style ear profile, she listens intently to trail reverberations. Riders who synchronize with her rhythmic 1.48 Hz stride find an incredibly smooth and dependable transit across wet, marshy substrates.",
  historicalRecord:
    "Dagmar gained widespread renown across the valley when she uncovered illegal toxic effluent pipelines installed by an offshore chemical syndicate. Using her acute olfactory senses and analytical chemistry tools, Dagmar tracked the contaminants to their subterranean source, leading the passel to seal the breach. Her pure white coat with intricate diamond patterns and silver-spiral tail symbolize ecological purity and steadfast protection of community waters."
};

export default DAGMAR_KONE_REYNOLDS_LORE;
