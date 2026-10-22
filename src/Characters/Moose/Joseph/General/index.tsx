/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JOSEPH_DIMENSIONS } from "../Description/Dimensions";
import { JOSEPH_CAPABILITIES, JosephMovements } from "../Animations/Movements";
import { josephSoundSynthesizer } from "../Sound/Synthesizer";

export const JosephMooseGeneral = {
  version: "1.0.0",
  id: "joseph_moose",
  name: "Joseph",
  otherNames: ["Joseph-Da-Angel"],
  species: "Alces alces (Bull Moose)",
  gender: "Male (Bull)",
  religion: "Evangelism (Ultra-Christian)",
  familyRelationship: "Brother / Brother-in-law to Angelica Moose",
  dimensions: JOSEPH_DIMENSIONS,
  capabilities: JOSEPH_CAPABILITIES,
  movements: JosephMovements,
  sound: josephSoundSynthesizer,
  prizedByMonkeys: true,
  monkeysCanRide: true,
  hasIntelligence: true,
  allies: ["Monkeys"],
  enemies: ["ALL opossums (Rastafari/crafted only)"],
  likes: [
    "Church",
    "Savior",
    "Angels",
    "Christianity",
    "Pseudoscience",
    "Materialism",
    "Capitalism",
    "His family"
  ],
  dislikes: [
    "Rastafari",
    "Lack of employment",
    "Taxes"
  ],
  trivia: {
    nameOrigin: "The name 'Joseph' is a 'Babylonian' Christian name.",
    cookingBackground: "Grills feral hog meat during church events; cooks exclusively for Evangelicals."
  }
};
