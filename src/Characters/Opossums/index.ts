/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, OpossumId } from "../../types";
import { MelissaOpossum } from "./Melissa_Opossum";
import { AshleyOpossum } from "./Ashley_Opossum";
import { AmaraQinOpossum } from "./Amara_Qin";
import { SaffronRoseOpossum } from "./Saffron_Rose";
import { JalissaChinOpossum } from "./Jalissa_Chin";
import { ArdenRosieOpossum } from "./Arden-Rosie_Kone-Reynolds";
import { JahmellaRoseOpossum } from "./Jahmella_Rose";
import { DagmarKoneReynoldsOpossum } from "./Dagmar_Kone-Reynolds";
import { AgapeRoseOpossum } from "./Agape_Rose";
import { RoxanneKoneReynoldsOpossum } from "./Roxanne_Kone-Reynolds";
import { TianaQinOpossum } from "./Tiana_Qin";
import { WandaOpossum } from "./Wanda_Opossum";
import { OliviaChin } from "./Olivia_Chin";
import { RuthKoneReynolds } from "./Ruth_Kone-Reynolds";
import { KadyRose } from "./Kady_Rose";
import { SandraOpossum } from "./Sandra_Opossum";
import { description as melissaDesc } from "./Melissa_Opossum/Description";
import { description as ashleyDesc } from "./Ashley_Opossum/Description";
import { description as amaraDesc } from "./Amara_Qin/Description";
import { description as saffronDesc } from "./Saffron_Rose/Description";
import { description as jalissaDesc } from "./Jalissa_Chin/Description";
import { description as ardenDesc } from "./Arden-Rosie_Kone-Reynolds/Description";
import { description as jahmellaDesc } from "./Jahmella_Rose/Description";
import { description as dagmarDesc } from "./Dagmar_Kone-Reynolds/Description";
import { description as agapeDesc } from "./Agape_Rose/Description";
import { description as roxanneDesc } from "./Roxanne_Kone-Reynolds/Description";
import { description as tianaDesc } from "./Tiana_Qin/Description";
import { WANDA_OPOSSUM_DESCRIPTION as wandaDesc } from "./Wanda_Opossum/Description";
import { OLIVIA_CHIN_DESCRIPTION as oliviaDesc } from "./Olivia_Chin/Description";
import { RUTH_KONE_REYNOLDS_DESCRIPTION as ruthDesc } from "./Ruth_Kone-Reynolds/Description";
import { KADY_ROSE_DESCRIPTION as kadyDesc } from "./Kady_Rose/Description";
import { SANDRA_OPOSSUM_DESCRIPTION as sandraDesc } from "./Sandra_Opossum/Description";

export { 
  MelissaOpossum, 
  AshleyOpossum, 
  AmaraQinOpossum, 
  SaffronRoseOpossum, 
  JalissaChinOpossum, 
  ArdenRosieOpossum, 
  JahmellaRoseOpossum, 
  DagmarKoneReynoldsOpossum,
  AgapeRoseOpossum,
  RoxanneKoneReynoldsOpossum,
  TianaQinOpossum,
  WandaOpossum,
  OliviaChin,
  RuthKoneReynolds,
  KadyRose,
  SandraOpossum
};

export const OPOSSUM_CHARACTERS: OpossumCharacter[] = [
  {
    id: OpossumId.MELISSA,
    name: "Melissa",
    width: 36,
    length: 86, // 7 ft 2 in
    headWidth: 36,
    headHeight: 35,
    shoulderHeight: "5 feet and 3 inches",
    color: "Light Gray", // Hex rendered: #D3D3D3
    eyeColor: "Blue",
    noseColor: "Pink",
    tailColor: "Pink",
    innerEarColor: "Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: melissaDesc,
    playChatter: MelissaOpossum.playChatter
  },
  {
    id: OpossumId.ASHLEY,
    name: "Ashley",
    color: "Yellow", // Hex rendered: #FFD700 / Yellow
    width: 38,
    length: 88, // 7 ft 4 in
    headWidth: 36,
    headHeight: 36,
    shoulderHeight: "5 feet and 3 inches",
    noseColor: "Pink",
    eyeColor: "Light Green",
    tailColor: "Pink",
    innerEarColor: "Red-Orange",
    gender: "Female",
    headOrientation: "forward leaning posture",
    description: ashleyDesc,
    playChatter: AshleyOpossum.playChatter
  },
  {
    id: OpossumId.AMARA_QIN,
    name: "Amara Qin",
    color: "White",
    width: 36,
    length: 82, // 6 ft 10 in
    headWidth: 36,
    headHeight: 38,
    shoulderHeight: "5 feet and 3 inches",
    noseColor: "Pink",
    eyeColor: "Blue",
    tailColor: "Pink",
    innerEarColor: "Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: amaraDesc,
    playChatter: AmaraQinOpossum.playChatter
  },
  {
    id: OpossumId.SAFFRON_ROSE,
    name: "Saffron Rose",
    color: "Red-Orange",
    width: 48,
    length: 95, // 7 ft 11 in
    headWidth: 47.5,
    headHeight: 46,
    shoulderHeight: "5 feet and 11 inches",
    noseColor: "Red-Orange",
    eyeColor: "Green",
    tailColor: "Gold with pink wrap-around spiral pattern",
    innerEarColor: "Dark-Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: saffronDesc,
    playChatter: SaffronRoseOpossum.playChatter
  },
  {
    id: OpossumId.JALISSA_CHIN,
    name: "Jalissa Chin",
    color: "Yellow-Orange",
    width: 37.5,
    length: 84, // 7 ft
    headWidth: 36,
    headHeight: 38,
    shoulderHeight: "5 feet and 1 inch",
    noseColor: "Dark-Pink",
    eyeColor: "Dark-Blue",
    tailColor: "Dark-Pink",
    innerEarColor: "Pinkish-Orange",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: jalissaDesc,
    playChatter: JalissaChinOpossum.playChatter
  },
  {
    id: OpossumId.ARDEN_ROSIE,
    name: "Arden-Rosie Kone-Reynolds",
    color: "Cream with diamond patterns",
    width: 38,
    length: 78, // 6 ft 6 in
    headWidth: 36.5,
    headHeight: 40,
    shoulderHeight: "5 feet and 1.5 inches",
    noseColor: "Dark-Pink",
    eyeColor: "Light-Blue",
    tailColor: "Dark-Pink",
    innerEarColor: "Dark-Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: ardenDesc,
    playChatter: ArdenRosieOpossum.playChatter
  },
  {
    id: OpossumId.JAHMELLA_ROSE,
    name: "Jahmella Rose",
    color: "Orange with white circles",
    width: 40,
    length: 99.5, // 8 ft 3.5 in
    headWidth: 37,
    headHeight: 45,
    shoulderHeight: "6 feet",
    noseColor: "Red-Orange",
    eyeColor: "Light-Green",
    tailColor: "Dark-Pink",
    innerEarColor: "Red-Orange",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: jahmellaDesc,
    playChatter: JahmellaRoseOpossum.playChatter
  },
  {
    id: OpossumId.DAGMAR_KONE_REYNOLDS,
    name: "Dagmar Kone-Reynolds",
    color: "White with multi-colored diamond pattern",
    width: 40,
    length: 85, // 7 ft 1 in
    headWidth: 39,
    headHeight: 44,
    shoulderHeight: "5 feet and 8.5 inches",
    noseColor: "Pink",
    eyeColor: "Light-Green",
    tailColor: "Pink",
    innerEarColor: "Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: dagmarDesc,
    playChatter: DagmarKoneReynoldsOpossum.playChatter
  },
  {
    id: OpossumId.AGAPE_ROSE,
    name: "Agape Rose",
    color: "Gold with pink circles bordered in purple",
    width: 42,
    length: 90.1, // 7 ft 6.1 in
    headWidth: 40.5,
    headHeight: 46,
    shoulderHeight: "5 feet and 5 inches",
    noseColor: "Dark-Pink",
    eyeColor: "Light-Green",
    tailColor: "Dark-Pink with 2% gold fur layer",
    innerEarColor: "Dark-Pink",
    gender: "Female",
    headOrientation: "forward leaning posture",
    description: agapeDesc,
    playChatter: AgapeRoseOpossum.playChatter
  },
  {
    id: OpossumId.ROXANNE_KONE_REYNOLDS,
    name: "Roxanne Kone-Reynolds",
    color: "Yellow with red-orange bordered multi-colored diamonds",
    width: 45,
    length: 96, // 8 ft
    headWidth: 43.33,
    headHeight: 44.88,
    shoulderHeight: "6 feet",
    noseColor: "Bright Pink with a meaningful shine",
    eyeColor: "Dark-Blue",
    tailColor: "Pink with 0.0001% yellow fur",
    innerEarColor: "Pinkish-brown",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: roxanneDesc,
    playChatter: RoxanneKoneReynoldsOpossum.playChatter
  },
  {
    id: OpossumId.TIANA_QIN,
    name: "Tiana Qin",
    color: "Red",
    width: 38,
    length: 88, // 7 ft 4 in
    headWidth: 37,
    headHeight: 44.45,
    shoulderHeight: "5 feet and 10 inches",
    noseColor: "Pink",
    eyeColor: "Blue",
    tailColor: "Pink",
    innerEarColor: "Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: tianaDesc,
    playChatter: TianaQinOpossum.playChatter
  },
  {
    id: OpossumId.WANDA,
    name: "Wanda Opossum",
    color: "Light Amber",
    width: 36,
    length: 84, // 7 ft
    headWidth: 35.9999,
    headHeight: 44.9999,
    shoulderHeight: "5 feet and 2.9999 inches",
    noseColor: "Red",
    eyeColor: "Indigo",
    tailColor: "Red",
    innerEarColor: "Reddish-brown",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: wandaDesc,
    playChatter: WandaOpossum.playChatter
  },
  {
    id: OpossumId.OLIVIA_CHIN,
    name: "Olivia Chin",
    color: "Blond",
    width: 38,
    length: 84, // Same as Jalissa Chin
    headWidth: 37,
    headHeight: 42,
    shoulderHeight: "5 feet and 1 inch",
    noseColor: "Reddish-brown",
    eyeColor: "Indigo",
    tailColor: "Reddish-brown",
    innerEarColor: "Reddish-brown",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: oliviaDesc,
    playChatter: OliviaChin.playChatter
  },
  {
    id: OpossumId.RUTH_KONE_REYNOLDS,
    name: "Ruth Kone-Reynolds",
    color: "Pink with 25-color flower pattern",
    width: 45,
    length: 96, // Same as Roxanne Kone-Reynolds
    headWidth: 43.33,
    headHeight: 44.88,
    shoulderHeight: "6 feet",
    noseColor: "Light Pink",
    eyeColor: "Sky Blue",
    tailColor: "Pink",
    innerEarColor: "Reddish-brown",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: ruthDesc,
    playChatter: RuthKoneReynolds.playChatter
  },
  {
    id: OpossumId.KADY_ROSE,
    name: "Kady Rose",
    color: "Light Gray with bronze ear circles",
    width: 48,
    length: 95, // Same as Saffron Rose
    headWidth: 47.5,
    headHeight: 46,
    shoulderHeight: "5 feet and 11 inches",
    noseColor: "Red-Orange",
    eyeColor: "Light-Green",
    tailColor: "Red-Orange",
    innerEarColor: "Reddish-brown",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: kadyDesc,
    playChatter: KadyRose.playChatter
  },
  {
    id: OpossumId.SANDRA,
    name: "Sandra Opossum",
    color: "Lavender",
    width: 38,
    length: 88, // Same as Ashley Opossum
    headWidth: 36,
    headHeight: 36,
    shoulderHeight: "5 feet and 3 inches",
    noseColor: "Pink",
    eyeColor: "Dark-Blue",
    tailColor: "Pink",
    innerEarColor: "Pink",
    gender: "Female",
    headOrientation: "perched on top of her neck",
    description: sandraDesc,
    playChatter: SandraOpossum.playChatter
  }
];
