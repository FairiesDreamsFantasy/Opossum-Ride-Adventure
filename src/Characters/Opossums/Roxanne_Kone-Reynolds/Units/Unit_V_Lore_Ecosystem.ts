/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ROXANNE KONE-REYNOLDS - UNIT V: LORE, LINEAGE & ECOSYSTEM TAXONOMY
 * ============================================================================
 * Anthropological lore, sovereign Babylon-Free declarations, passel kinship
 * matrices, and industrial safety management roles for Roxanne Kone-Reynolds.
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

export const ROXANNE_KONE_REYNOLDS_LORE: LoreProfile = {
  title: "Factory Safety Manager & Matriarch of Industrial Integrity",
  fullName: "Roxanne Kone-Reynolds",
  passelAffiliation: "Kone-Reynolds Passel",
  sovereigntyStatus: "Babylon-Free Sovereign Mount",
  kinshipNetwork: [
    {
      name: "Ruth Kone-Reynolds",
      relation: "Sister",
      passelRole: "Master Botanist, Educator & Certified Store Cashier",
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
    "Factory Safety Inspector & Plant Integrity Manager",
    "Worker Rights & Physical Protection Advocate",
    "Heavy-Payload Mountain Transport Steed",
    "Mother of 4 Idren within the Sovereign Community"
  ],
  ecologicalSanctuaryBiome: "Highland Industrial Forges, Foundries & Solid Granite Ridges",
  ethicalPrinciples: [
    "Strict Adherence to Rastafari Livity & Babylon-Free Craftsmanship: Complete refusal to compromise human/creature safety for commercial profit quotas.",
    "Whistleblower Protection & Direct Action: Alerting workers immediately when structural flaws or safety hazards are detected.",
    "Rejection of Exploitative Materialism: Raising children with spiritual discipline, honest labor, and collective solidarity.",
    "Unshakable Physical Stature: Massive 6-foot shoulder height providing commanding authority and heavy-payload rider protection."
  ],
  riderBondingProtocol:
    "Mounting Roxanne Kone-Reynolds begins with an acknowledgment of her commanding authority and protective aura. Standing at 6 feet with a 45-inch breadth and vivid yellow fur, she approaches riders with deliberate care. Her rhythmic 1.42 Hz stride delivers massive traction, instilling absolute confidence across steep rocky inclines and timber clearings.",
  historicalRecord:
    "Roxanne is celebrated as a fearless community champion across the industrial valleys. Formerly an assembly-line technician, she blew the whistle on a corrupt chemical manufacturing plant that attempted to bypass pressure-valve regulations, saving hundreds of lives before the facility was peacefully evacuated and converted into a cooperative workshop. Today, raising her four idren with deep spiritual resolve, she continues to manage workplace safety across the passel's artisanal workshops."
};

export default ROXANNE_KONE_REYNOLDS_LORE;
