/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MonkeyCharacter } from "../Colt_Gray/profile";
import { KENDRA_CURTIS_CONFIG } from "./General";
import { KENDRA_CURTIS_BIOGRAPHY } from "./Description";

export const KENDRA_CURTIS_MONKEY: MonkeyCharacter & {
  troop: string;
  gender: string;
  hosieryLayering: string;
  canonicalBiography: typeof KENDRA_CURTIS_BIOGRAPHY;
} = {
  name: "Kendra Curtis",
  troop: "Curtis",
  gender: "Female",
  race: "White",
  furColor: "Blond",
  attire: "White pencil dress, white pantyhose beneath gold stockings, royal purple high heels, and solid gold cross pendant",
  hosieryLayering: "White pantyhose underlayer beneath shimmering gold stockings",
  religion: "Evangelical (ultra-Christian)",
  height: "6 feet 10 inches",
  weight: "175 lbs",
  status: "Fugitive Cult Leader / Faction Commander",
  criminalHistory: [
    "Welfare and public assistance fraud (food & cash assistance)",
    "Severe tax evasion and sovereign-citizen debt default",
    "School bombing / assault with explosive ordnance",
    "Destruction of rooftop wildlife sanctuary (wiping out pet rodents and rooftop opossums)",
    "Unlawful troop conspiracy & illegal highway blockades",
    "Christian extremist terrorism"
  ],
  description: KENDRA_CURTIS_BIOGRAPHY.currentStatus,
  canonicalBiography: KENDRA_CURTIS_BIOGRAPHY
};
