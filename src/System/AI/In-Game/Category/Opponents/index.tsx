/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameLevel, Opponent } from "../../../../../types";
import { PlaceResolver } from "../../../../Engine/Resolver";
import { isMooseAndMonkeysAllowedInPlace } from "../../Moose_and_Monkeys_Not_Included_In_the_Garden";
import { PseudorandomGenerator } from "../Psudorandom_Functions";
import { resolveMooseAndMonkeyBehavior } from "../Behaviors/Moose_Gone_Wild";
import { GeminiSystem } from "../../../External/Gemini";

export const MONKEY_BABYLON_NAMES = [
  "Colt", "Judas", "Demas", "Gehazi", "Ananias", "Sapphira", 
  "SimonMagus", "Balaam", "Achan", "Caiaphas", "Felix", 
  "Pilate", "Absalom", "Esau", "Nabal", "Delilah"
];

export const MOOSE_BABYLON_NAMES = [
  "Rebecca", "Darrell", "Payton", "Omarosa", "Ethan", "Susanna-Belili", "Angelica", "Inquisition", "Simony", "Indulgence", "Tribute", "Mammon", 
  "Sanhedrin", "Gomorrah", "Sodom", "Talent", "BabylonianGold", 
  "PharaohHoof", "Beelzebub", "HerodTax", "GoldenCalf", "ThirtySilvers"
];

export interface MooseTaxonomyProfile {
  name: string;
  type: "Bull" | "Cow";
  isKnownCharacter: boolean;
  baseSpeed: number;
  restrictedArenas: string[];
}

export const KNOWN_MOOSE_TAXONOMY: Record<string, MooseTaxonomyProfile> = {
  "Ethan": {
    name: "Ethan",
    type: "Bull",
    isKnownCharacter: true,
    baseSpeed: 6.5,
    restrictedArenas: []
  },
  "Darrell": {
    name: "Darrell",
    type: "Bull",
    isKnownCharacter: true,
    baseSpeed: 6.0,
    restrictedArenas: []
  },
  "Payton": {
    name: "Payton",
    type: "Bull",
    isKnownCharacter: true,
    baseSpeed: 6.8,
    restrictedArenas: []
  },
  "Omarosa": {
    name: "Omarosa",
    type: "Cow",
    isKnownCharacter: true,
    baseSpeed: 6.2,
    restrictedArenas: []
  },
  "Rebecca": {
    name: "Rebecca",
    type: "Cow",
    isKnownCharacter: true,
    baseSpeed: 5.8,
    restrictedArenas: []
  },
  "Susanna-Belili": {
    name: "Susanna-Belili",
    type: "Cow",
    isKnownCharacter: true,
    baseSpeed: 6.0,
    restrictedArenas: []
  },
  "Angelica": {
    name: "Angelica",
    type: "Cow",
    isKnownCharacter: true,
    baseSpeed: 4.0,
    restrictedArenas: ["garden", "cave", "plain", "plains", "mountains"]
  }
};

export class OpponentAIEngine {
  /**
   * Evaluates whether an arena is eligible for opponent spawning.
   */
  static isArenaEligible(placeId: string, levelId: number): boolean {
    if (levelId <= 0) return false;
    return isMooseAndMonkeysAllowedInPlace(placeId);
  }

  /**
   * Resolves the species and individual identity of a moose deterministically.
   */
  static resolveMooseIdentity(
    index: number,
    levelPlaceId: string,
    rng: PseudorandomGenerator
  ): {
    mooseName: string;
    mooseType: "Bull" | "Cow";
    isWildMoose: boolean;
    isAiGeneratedMoose: boolean;
    isAngelica: boolean;
  } {
    const rawName = MOOSE_BABYLON_NAMES[index % MOOSE_BABYLON_NAMES.length];
    const knownProfile = KNOWN_MOOSE_TAXONOMY[rawName];

    // Wild moose designation: ~33% of non-primary characters
    const isWild = (index % 3 === 2 && (!knownProfile || !knownProfile.isKnownCharacter));
    const isAiGenActive = GeminiSystem.isReady();
    const isAiGeneratedMoose = isAiGenActive && isWild && (index % 2 === 0);

    // Biological gender assignment:
    // Bulls: Ethan, Darrell, Payton, or calculated by deterministic parity
    let mooseType: "Bull" | "Cow" = "Cow";
    if (knownProfile) {
      mooseType = knownProfile.type;
    } else {
      mooseType = (index % 2 === 0) ? "Bull" : "Cow";
    }

    // STRICT MANDATE: Wild moose that are unmounted HAVE NO NAMES.
    let mooseName = isWild ? "" : rawName;

    // Habitat validation for specialized characters
    if (knownProfile && knownProfile.restrictedArenas.length > 0) {
      const placeNormalized = levelPlaceId.toLowerCase().trim();
      const isRestricted = knownProfile.restrictedArenas.some(ra => placeNormalized.includes(ra));
      if (isRestricted) {
        mooseName = ""; // Stripped to unnamed wild moose
      }
    }

    const isAngelica = mooseName === "Angelica";

    return {
      mooseName,
      mooseType,
      isWildMoose: isWild || mooseName === "",
      isAiGeneratedMoose,
      isAngelica
    };
  }

  /**
   * Returns a scientifically accurate, grammatically clean taxonomic display label for any moose.
   */
  static getMooseDisplayName(opp: { mooseName?: string; mooseType: "Bull" | "Cow"; isWildMoose?: boolean }): string {
    if (opp.isWildMoose || !opp.mooseName || opp.mooseName.trim() === "") {
      return `Wild ${opp.mooseType} Moose`;
    }
    return opp.mooseName;
  }

  /**
   * Returns the narrative subject description for TTS and status feeds.
   */
  static getNarrativeSubject(opp: { 
    mooseName?: string; 
    mooseType: "Bull" | "Cow"; 
    monkeyName?: string; 
    monkeyGender?: "Male" | "Female"; 
    isWildMoose?: boolean; 
  }): string {
    const isWild = opp.isWildMoose || !opp.mooseName || opp.mooseName.trim() === "";
    const hasRider = !!(opp.monkeyName && opp.monkeyName.trim() !== "");
    
    if (hasRider) {
      const genderStr = (opp.monkeyGender || (opp.mooseType === "Bull" ? "Female" : "Male")).toLowerCase();
      return `${genderStr} monkey ${opp.monkeyName} riding ${opp.mooseType} Moose ${opp.mooseName}`;
    }
    
    return isWild ? `a wild ${opp.mooseType} Moose` : `the ${opp.mooseType} Moose ${opp.mooseName}`;
  }

  /**
   * Resolves the rider identity and behavioral attributes adhering to sacred coupling rules:
   * (Female monkeys ride Bull moose, Male monkeys ride Cow moose).
   */
  static resolveMonkeyRider(
    index: number,
    mooseType: "Bull" | "Cow",
    isWildMoose: boolean,
    isAngelica: boolean,
    selectedOpossumId: string
  ): {
    monkeyName: string;
    monkeyGender: "Male" | "Female";
  } {
    // Sacred biological coupling:
    // Female monkeys mount Bull moose, Male monkeys mount Cow moose
    const monkeyGender: "Male" | "Female" = mooseType === "Bull" ? "Female" : "Male";

    // Companion or wild exceptions: Amara riding alongside companion Angelica carries no monkey rider
    const isCompanionAngelica = isAngelica && selectedOpossumId === "amara_qin";
    const monkeyName = (isWildMoose || isCompanionAngelica) 
      ? "" 
      : MONKEY_BABYLON_NAMES[index % MONKEY_BABYLON_NAMES.length];

    return {
      monkeyName,
      monkeyGender
    };
  }

  /**
   * Generates a fully populated, mathematically sound opponent array for a given level.
   */
  static generateOpponents(levelObj: GameLevel, levelId: number, selectedOpossumId: string): Opponent[] {
    const spawnedOpponents: Opponent[] = [];
    if (!this.isArenaEligible(levelObj.placeId, levelId)) {
      return spawnedOpponents;
    }

    const rng = new PseudorandomGenerator(levelId * 3000 + 789);
    const oppCount = Math.floor((levelObj.targetDistance / 100) * levelObj.opponentFrequency);

    for (let i = 0; i < oppCount; i++) {
      const mooseInfo = this.resolveMooseIdentity(i, levelObj.placeId, rng);
      const riderInfo = this.resolveMonkeyRider(
        i,
        mooseInfo.mooseType,
        mooseInfo.isWildMoose,
        mooseInfo.isAngelica,
        selectedOpossumId
      );

      const isBull = mooseInfo.mooseType === "Bull";
      const isAlreadyCharging = mooseInfo.isWildMoose && (rng.next() < 0.45);
      const isCompanionCleaning = mooseInfo.isAngelica && selectedOpossumId === "amara_qin";

      // Ethological behavior resolution from the scientific state machine
      const behaviorState = resolveMooseAndMonkeyBehavior(
        rng.next(),
        isBull,
        levelObj.placeId,
        false
      );

      // Speed resolution
      let speed: number;
      if (mooseInfo.isAngelica) {
        speed = isCompanionCleaning ? 0 : 4;
      } else if (isAlreadyCharging) {
        speed = 10 + rng.range(0, 6);
      } else {
        speed = 5 + rng.range(0, 4);
      }

      // Lane resolution (Angelica sweeps right lane 1 if Amara rides)
      const lane = isCompanionCleaning ? 1 : rng.intRange(-1, 1);

      spawnedOpponents.push({
        id: i,
        z: 80 + i * 90 + rng.range(-10, 10),
        lane,
        monkeyGender: riderInfo.monkeyGender,
        mooseType: mooseInfo.mooseType,
        monkeyName: riderInfo.monkeyName,
        mooseName: mooseInfo.mooseName,
        speed,
        isCharging: mooseInfo.isAngelica ? false : isAlreadyCharging,
        hasCharged: mooseInfo.isAngelica,
        width: 2.2,
        height: 2.6,
        isAngelica: mooseInfo.isAngelica,
        isCleaning: isCompanionCleaning,
        isRiddenByMonkey: mooseInfo.isAngelica && !isCompanionCleaning,
        isWildMoose: mooseInfo.isWildMoose,
        isAiGeneratedMoose: mooseInfo.isAiGeneratedMoose,
        hoofStrideVariance: rng.range(-0.2, 0.2),
        nextVocalTime: 0,
        mooseState: behaviorState.mooseState,
        monkeyBehavior: behaviorState.monkeyState
      });
    }

    return spawnedOpponents;
  }
}
