/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * SAFFRON ROSE - UNIT V: LORE, LINEAGE & ECOSYSTEM TAXONOMY
 * ============================================================================
 * Comprehensive anthropological lore, sovereign Babylon-Free declarations,
 * passel kinship matrices, and ecological sanctuary roles for Saffron Rose.
 */

export interface RosePasselKinshipNode {
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
  kinshipNetwork: RosePasselKinshipNode[];
  vocation: string[];
  ecologicalSanctuaryBiome: string;
  ethicalPrinciples: string[];
  riderBondingProtocol: string;
  historicalRecord: string;
}

export const SAFFRON_ROSE_LORE: LoreProfile = {
  title: "Guardian of the Botanical Groves",
  fullName: "Saffron Rose",
  passelAffiliation: "Rose Passel",
  sovereigntyStatus: "Babylon-Free Sovereign Mount",
  kinshipNetwork: [
    {
      name: "Jahmella Rose",
      relation: "Elder Sister",
      passelRole: "Master Landscape Architect & Food Sovereignty Champion",
      shoulderHeightInches: 72.0
    },
    {
      name: "Agape Rose",
      relation: "Sister",
      passelRole: "Organic Farmer, Cultural Preservationist & Non-Violence Advocate",
      shoulderHeightInches: 65.0
    },
    {
      name: "Kady Rose",
      relation: "Sister",
      passelRole: "Industrial Craftsman, Community Mentor & Mutual Aid Advocate",
      shoulderHeightInches: 71.0
    },
    {
      name: "Eugene Rose",
      relation: "Brother",
      passelRole: "Trailblazer, Compact Scout & Forest Survey Specialist",
      shoulderHeightInches: 46.00932 // 3' 10.00932"
    }
  ],
  vocation: [
    "Perennial Agroforestry Steward",
    "Botanical Sanctuary Sentinel",
    "High-Traction Mountain Steed",
    "Artisanal Seed Vault Protector"
  ],
  ecologicalSanctuaryBiome: "Montane Subtropical Cloud-Forest & Heritage Rose Valleys",
  ethicalPrinciples: [
    "Strict Adherence to Babylon-Free Craftsmanship: Complete refusal of planned obsolescence, telemetry tracking, and resource exploitation.",
    "Mutual Symbiosis with Riders: Rider and mount operate as an indivisible scientific and artistic unit grounded in consent and shared purpose.",
    "Protection of Organic Flora: Safeguarding heirloom and native plant species from monoculture and industrial chemical drift.",
    "Integrity of Sound and Movement: Vocal elegant chatter and trotting mechanics represent pure biological acoustics, never synthetic shortcuts."
  ],
  riderBondingProtocol:
    "Mounting Saffron Rose requires an intentional tactile approach from her left flank. Her vibrant red-orange coat reflects deep warmth, and riders must align their breathing with her 1.45 Hz stride cadence to establish an optimal kinetic partnership. Her green diamond necklace and heart charm serve as an heirloom talisman of passel devotion.",
  historicalRecord:
    "Saffron Rose was born into the Rose passel in the lush highland hills of the sanctuary valley. Raised alongside Jahmella, Agape, and Kady, she distinguished herself early by her keen navigational instincts and extraordinary agility across granite crags and slippery creek beds. When industrial cartels sought to encroach upon the passel's heritage orchards, Saffron guided emergency seed evacuation caravans with unwavering steadfastness. Today, she stands as a pillar of the Rose sisterhood—combining brilliant aesthetic grace with formidable biomechanical power."
};

export default SAFFRON_ROSE_LORE;
