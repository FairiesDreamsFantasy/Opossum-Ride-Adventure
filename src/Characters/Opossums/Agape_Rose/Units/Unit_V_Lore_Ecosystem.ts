/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
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

export const AGAPE_ROSE_LORE: LoreProfile = {
  title: "Organic Farmer & Cultural Preservationist",
  fullName: "Agape Rose",
  passelAffiliation: "Rose Passel",
  sovereigntyStatus: "Babylon-Free Sovereign Mount",
  kinshipNetwork: [
    {
      name: "Jahmella Rose",
      relation: "Elder Sister",
      passelRole: "Master Landscape Architect",
      shoulderHeightInches: 72.0
    },
    {
      name: "Saffron Rose",
      relation: "Sister",
      passelRole: "Botanical Sanctuary Sentinel",
      shoulderHeightInches: 66.0
    },
    {
      name: "Kady Rose",
      relation: "Sister",
      passelRole: "Industrial Craftsman",
      shoulderHeightInches: 71.0
    },
    {
      name: "Eugene Rose",
      relation: "Brother",
      passelRole: "Compact Scout",
      shoulderHeightInches: 46.00932
    }
  ],
  vocation: [
    "Organic Farming Steward",
    "Rastafari Cultural Preservationist",
    "Peaceful Non-Violence Advocate"
  ],
  ecologicalSanctuaryBiome: "Highland Organic Agriculture & Sanctuary Groves",
  ethicalPrinciples: [
    "Strict Adherence to Babylon-Free Craftsmanship",
    "Peaceful non-violence and organic agriculture advocacy",
    "Deep Rastafari spiritual devotion and passel solidarity"
  ],
  riderBondingProtocol:
    "Mounting Agape Rose requires an gentle approach aligned with her balanced stride and spiritual composure.",
  historicalRecord:
    "Agape Rose is an inspiring and radiant female opossum of the Rose passel, dedicated to organic farming, non-violence, and cultural preservation."
};

export default AGAPE_ROSE_LORE;
