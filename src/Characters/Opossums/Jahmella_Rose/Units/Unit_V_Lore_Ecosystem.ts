/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * JAHMELLA ROSE - UNIT V: LORE, LINEAGE & ECOSYSTEM TAXONOMY
 * ============================================================================
 * Anthropological lore, sovereign Babylon-Free declarations, passel kinship
 * matrices, and master landscape architectural roles for Jahmella Rose.
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

export const JAHMELLA_ROSE_LORE: LoreProfile = {
  title: "Master Landscape Architect & Sovereign Matriarch",
  fullName: "Jahmella Rose",
  passelAffiliation: "Rose Passel",
  sovereigntyStatus: "Babylon-Free Sovereign Mount",
  kinshipNetwork: [
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
      name: "Kady Rose",
      relation: "Sister",
      passelRole: "Industrial Craftsman, Community Mentor & Mutual Aid Advocate",
      shoulderHeightInches: 71.0
    },
    {
      name: "Eugene Rose",
      relation: "Brother",
      passelRole: "Trailblazer, Compact Scout & Forest Survey Specialist",
      shoulderHeightInches: 46.00932
    }
  ],
  vocation: [
    "Master Landscape Architect",
    "Civic Terracing & Earthworks Engineer",
    "Food Sovereignty Champion",
    "Eldest Guardian of the Rose Passel"
  ],
  ecologicalSanctuaryBiome: "Terraced Agrarian Foothills & Permaculture Orchards",
  ethicalPrinciples: [
    "Uncompromising Babylon-Free Livity: Complete rejection of extractive shortcuts, commercial exploitation, and resource degradation.",
    "Food Sovereignty as Defense: Communities that control their seed, soil, and water cannot be subdued by external systems.",
    "Architectural Longevity: Every terrace, irrigation canal, and timber bridge must endure for seven generations.",
    "Noble Composure under Weight: Mount stands with commanding poise, ensuring rider panoramic visibility and uncompromised safety."
  ],
  riderBondingProtocol:
    "Mounting Jahmella Rose requires standing before her upright gaze to acknowledge her commanding leadership. Standing six feet at the withers, she extends her shoulder down with calculated grace. Riders must respect her deliberate, long-reaching trot cadence (1.38 Hz) and hold reins lightly, trusting her unmatched spatial awareness of uneven terrain.",
  historicalRecord:
    "As the eldest daughter of the Rose lineage, Jahmella organized the initial zoning and defensive agricultural terracing that turned the rugged sanctuary valley into a thriving food forest. Working alongside her sisters Saffron, Agape, and Kady, she sculpted water retention swales and built community granaries without using a single piece of Babylonian machinery. Her regal poise, gold earrings, and chain necklace with gold flower charm represent generational sovereignty, craftsmanship, and ecological mastery."
};

export default JAHMELLA_ROSE_LORE;
