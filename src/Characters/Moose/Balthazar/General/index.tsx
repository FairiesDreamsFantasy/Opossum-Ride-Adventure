/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BALTHAZAR_DIMENSIONS } from "../Description/Dimensions";
import { BALTHAZAR_CAPABILITIES, BalthazarMovements } from "../Animations/Movements";
import { balthazarSoundSynthesizer } from "../Sound/Synthesizer";

export const BalthazarMooseGeneral = {
  version: "1.0.0",
  id: "balthazar_moose_villain",
  name: "Balthazar",
  species: "Alces alces (Gold Bull Moose)",
  gender: "Male (Bull)",
  role: "Villain Mount Ridden by Malicious Monkeys",
  dimensions: BALTHAZAR_DIMENSIONS,
  capabilities: BALTHAZAR_CAPABILITIES,
  movements: BalthazarMovements,
  sound: balthazarSoundSynthesizer,
  colorPalette: {
    bodyColor: "Gold",
    hoofColor: "Ivory",
    antlerColor: "Red Gold",
    muzzleColor: "White (covering 20% of snout from tip)"
  },
  eyes: {
    color: "Indigo"
  },
  traits: {
    religion: "Christianity (Strict / Legalistic / Christian Terrorist)",
    babylonian: true,
    malicious: true,
    materialistic: true,
    vanityByDesign: true
  },
  archEnemies: [
    "Saffron Rose",
    "Agape Rose",
    "Arden-Rose Kone-Reynolds",
    "Kady Rose",
    "Roxanne Kone-Reynolds"
  ],
  criminalRecord: {
    early2020s: "Blew up a community garden in the city.",
    notoriousBombings: [
      "Arcades",
      "Public libraries",
      "Schools",
      "Shopping malls",
      "Hospitals"
    ],
    familyBackground: "Infected by a life of crime including welfare fraud, tax evasion, money laundering, and illegal weapons possession.",
    upbringing: "Had a hard life as a little calf; raised in incorrect/corrupt foster family.",
    criminalActivities: [
      "Refused employment",
      "Bank robberies teamed with other malicious moose",
      "Shoplifting at Roxanne Kone-Reynolds's workplace",
      "Computer game, movie, and book piracy",
      "School expulsion for illegal gun possession and smuggling",
      "Prison escape via dynamite explosion"
    ],
    fugitiveStatus: "Currently on the run."
  },
  likes: [
    "Ostentatious gold displays",
    "Material wealth",
    "Hypocritical legalism",
    "Pirated media",
    "Explosives"
  ],
  dislikes: [
    "Community gardens",
    "Public education",
    "Honest employment",
    "Saffron, Agape, Arden-Rose, Kady, and Roxanne"
  ],
  trivia: {
    summary: "Balthazar is a golden, 7-foot-tall villainous moose ridden by malicious monkeys. A notorious Christian terrorist and fugitive on the run, he blends extreme materialism, vanity, and bomb-making with corrupted legalism."
  }
};
