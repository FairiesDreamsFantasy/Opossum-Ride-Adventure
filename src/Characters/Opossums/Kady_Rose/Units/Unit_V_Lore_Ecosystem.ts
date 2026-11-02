/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * KADY ROSE - UNIT V: LORE, LINEAGE & ECOSYSTEM TAXONOMY
 * ============================================================================
 * Anthropological lore, sovereign Babylon-Free declarations, passel kinship
 * matrices, and industrial craftsmanship mentorship roles for Kady Rose.
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

export const KADY_ROSE_LORE: LoreProfile = {
  title: "Master of Industrial Craft & Communal Solidarity",
  fullName: "Kady Rose",
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
      name: "Saffron Rose",
      relation: "Sister",
      passelRole: "Guardian of the Botanical Groves & High-Traction Steed",
      shoulderHeightInches: 71.0
    },
    {
      name: "Agape Rose",
      relation: "Sister",
      passelRole: "Organic Farmer, Cultural Preservationist & Non-Violence Advocate",
      shoulderHeightInches: 65.0
    },
    {
      name: "Eugene Rose",
      relation: "Brother",
      passelRole: "Trailblazer, Compact Scout & Forest Survey Specialist",
      shoulderHeightInches: 46.00932
    }
  ],
  vocation: [
    "Master Industrial Craftsman & Tool Forger",
    "Youth Technical Mentor & Guild Builder",
    "Mutual Aid Logistics Coordinator",
    "Heavy-Duty Heavy-Timber Transport Steed"
  ],
  ecologicalSanctuaryBiome: "Hydraulic Timber Forges & Valley Masonry Workyards",
  ethicalPrinciples: [
    "Uncompromising Devotion to Honest Labor: True dignity is forged through skilled hands and transparent, uncorrupted materials.",
    "Mutual Aid over Babylonian Commercialism: Rejecting competitive profiteering in favor of collective resilience and mutual protection.",
    "Youth Upliftment: Passing down the exact mathematics of craft, carpentry, and metallurgy to ensure generational independence.",
    "Unshakable Traction: A wide 48-inch stance providing grounded stability across heavy mud, ice, and loose gravel."
  ],
  riderBondingProtocol:
    "Mounting Kady Rose begins with a respectful approach to her broad shoulders. Standing 5 feet 11 inches at the withers with a 48-inch breadth, she projects an air of indestructible strength and deep warmth. Riders quickly find reassurance in her steady, vibration-absorbing trot (1.45 Hz) and her protective posture over challenging trails.",
  historicalRecord:
    "Kady Rose has dedicated her life to the craft guilds of the sanctuary valley. When early settlers faced collapsing supply chains and predatory external merchants, Kady mobilized timber teams and forged high-tensile bronze fittings to restore community mills and granaries. Her red necklace and pink heart charm were hand-beaded by apprentice craftswomen as an enduring emblem of mutual solidarity and communal gratitude."
};

export default KADY_ROSE_LORE;
