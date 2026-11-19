/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoatCameoDescription } from "../types";

export interface GoatKidTemplate extends GoatCameoDescription {
  companionAdultId: string;
}

export const GOAT_KID_DESCRIPTIONS: GoatKidTemplate[] = [
  {
    id: "kid_pip",
    name: "Pip",
    gender: "female",
    ageClass: "kid",
    color: "Snowy Cream",
    hornColor: "Tiny Nubs",
    eyeColor: "Amber",
    companionAdultId: "snowy",
    text: [
      "Pip is a lively juvenile goat kid who trots eagerly beside Snowy along grassy farm knolls.",
      "Light on her cloven hooves, Pip loves practicing tiny hops on low wooden pasture blocks and greeting nearby goats with gentle high-pitched kid bleats."
    ],
    cameoOrigin: "Opossum Ride Adventure x Goat Ride Adventure Caprine Herd"
  },
  {
    id: "kid_clover",
    name: "Clover",
    gender: "female",
    ageClass: "kid",
    color: "Tri-Patch",
    hornColor: "Tiny Nubs",
    eyeColor: "Brown",
    companionAdultId: "patches",
    text: [
      "Clover is a friendly juvenile kid patterned in cream and chestnut patches beside herd anchor Patches.",
      "Curious and calm, she alternates between nibbling clover patches and curling near adult does."
    ],
    cameoOrigin: "Opossum Ride Adventure x Goat Ride Adventure Caprine Herd"
  },
  {
    id: "kid_pebble",
    name: "Pebble",
    gender: "male",
    ageClass: "kid",
    color: "Slate Grey",
    hornColor: "Budding Nubs",
    eyeColor: "Ice Blue",
    companionAdultId: "alpine",
    text: [
      "Pebble is a sure-footed young billy kid learning mountain balance under Alpine's watchful eye.",
      "He enjoys standing atop flat pasture stones and calling softly to neighboring herd packs."
    ],
    cameoOrigin: "Opossum Ride Adventure x Goat Ride Adventure Caprine Herd"
  },
  {
    id: "kid_bramble",
    name: "Bramble",
    gender: "male",
    ageClass: "kid",
    color: "Warm Russet",
    hornColor: "Budding Nubs",
    eyeColor: "Green",
    companionAdultId: "willow",
    text: [
      "Bramble is a compact dappled-russet goat kid who shadows Willow around clover borders.",
      "Even at a young age, he displays agile footing over rocky soil and grassy pasture rises."
    ],
    cameoOrigin: "Opossum Ride Adventure x Goat Ride Adventure Caprine Herd"
  },
  {
    id: "kid_sprout",
    name: "Sprout",
    gender: "female",
    ageClass: "kid",
    color: "Apricot Spotted",
    hornColor: "None",
    eyeColor: "Hazel",
    companionAdultId: "freckles",
    text: [
      "Sprout is a playful spotted juvenile kid who shares Freckles's love of nimble hops in open pasture.",
      "She keeps strictly clear of wagon tracks, bonding happily with nearby adult goats and kids."
    ],
    cameoOrigin: "Opossum Ride Adventure x Goat Ride Adventure Caprine Herd"
  },
  {
    id: "kid_sunny",
    name: "Sunny",
    gender: "male",
    ageClass: "kid",
    color: "Honey Gold",
    hornColor: "Tiny Nubs",
    eyeColor: "Blue",
    companionAdultId: "bella",
    text: [
      "Sunny is a bright honey-cream kid who stays close to Bella and Aurum in the sunniest pasture corner.",
      "He grazes attentively with soft, cheerful kid bleats that blend gently into the hillside breeze."
    ],
    cameoOrigin: "Opossum Ride Adventure x Goat Ride Adventure Caprine Herd"
  }
];
