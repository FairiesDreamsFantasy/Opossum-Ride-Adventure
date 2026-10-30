/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ARDEN-ROSIE KONE-REYNOLDS - UNIT V: LORE, LINEAGE & ECOSYSTEM TAXONOMY
 * ============================================================================
 * Anthropological lore, sovereign Babylon-Free declarations, passel kinship
 * matrices, and mathematical analysis roles for Arden-Rosie Kone-Reynolds.
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

export const ARDEN_ROSIE_LORE: LoreProfile = {
  title: "Master Technician & Mathematical Analyst",
  fullName: "Arden-Rosie Kone-Reynolds",
  passelAffiliation: "Kone-Reynolds Passel",
  sovereigntyStatus: "Babylon-Free Sovereign Mount",
  kinshipNetwork: [
    {
      name: "Dagmar Kone-Reynolds",
      relation: "Kin",
      passelRole: "Environmental Auditor, Community Advocate & Anti-Pollution Specialist",
      shoulderHeightInches: 68.5
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
      shoulderHeightInches: 43.5 // 3' 7.5"
    },
    {
      name: "Drake Kone-Reynolds",
      relation: "Brother",
      passelRole: "Heavy Industrial Crafter & Defensive Trail Sentinel",
      shoulderHeightInches: 47.0
    }
  ],
  vocation: [
    "Mathematical Analyst & Signal Technician",
    "Holistic Education & Logic Instructor",
    "Precision Agile Mountain Steed",
    "Architectural Acoustic Surveyor"
  ],
  ecologicalSanctuaryBiome: "Limestone Valley Observatories & Alpine Geodetic Stations",
  ethicalPrinciples: [
    "Unyielding Standard of Computer Science & Discrete Mathematics: Rejection of pseudoscience, shortcuts, and speculative assumptions.",
    "Babylon-Free Sovereignty: Opposing corporate software bloat, black-box algorithms, and extractive commercial platforms.",
    "Holistic Pedagogical Ethics: Empowering riders and students with verified physical first-principles and reproducible logic.",
    "Compact Architectural Agility: Calibrated dimensions providing agile navigation in confined ancient library vaults."
  ],
  riderBondingProtocol:
    "Mounting Arden-Rosie requires an intentional alignment with her analytical posture. Standing at 5 feet 1.5 inches at the withers, she maintains a centered stance. Riders who respect her swift, precise gait (1.56 Hz) benefit from her extraordinary cornering agility and near-zero lateral drift across high limestone ledges.",
  historicalRecord:
    "Arden-Rosie emerged as the chief scientific mind of the Kone-Reynolds passel during the Great Archive Reconstruction. When industrial cartels sought to wipe out open-source engineering records, Arden-Rosie calculated topological escape routes through limestone caves, preserving millennia of geometric, agricultural, and astronomical manuscripts. Adorned with gold earrings and her iconic heart charm, she embodies pure analytical brilliance married to uncorrupted sovereign dedication."
};

export default ARDEN_ROSIE_LORE;
