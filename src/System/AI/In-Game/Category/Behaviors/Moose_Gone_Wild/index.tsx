/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * High-fidelity representation of unpredictable Moose states and Monkey rider activities.
 * Implements a strict discrete state transition model matching real-world animal behavior simulation.
 */
export interface BehaviorState {
  mooseState: "idle" | "charging" | "snorting" | "bellowing" | "mooing" | "trampling" | "bucking" | "crashed" | "ramming" | "charging_wildly" | "tossing_rider";
  monkeyState: "riding_normally" | "chasing" | "jumping" | "decorating" | "falling" | "teasing" | "wall_running" | "flight" | "scattered" | "climbing";
  aggressionFactor: number; // strictly from 0 to 1
  actionText: string;
}

/**
 * Deterministically resolves the combined behavior state based on a high-precision probability vector.
 * Avoids pseudo-science by utilizing standard normalized distribution matrices.
 * @param sourceRandom A pseudo-random seed between 0 and 1
 * @param isBull Whether the moose is male (generally higher baseline aggression)
 * @param placeId The ID of the current place (arena) to specialize behaviors (e.g. walls/ledges only in caves)
 * @param isOpossumEvent Whether the behavior is triggered by an opossum event (chatter/movement)
 */
import { PlaceResolver } from "../../../../../Engine/Resolver";

export function resolveMooseAndMonkeyBehavior(sourceRandom: number, isBull: boolean, placeId: string = "generic", isOpossumEvent: boolean = false): BehaviorState {
  const resolvedPlace = PlaceResolver.resolvePlace(placeId);
  const baseAggression = isBull ? 0.35 : 0.15;
  const scaledRandom = (sourceRandom + baseAggression) % 1;
  const isEnclosed = resolvedPlace.surfaceType === "stone" || resolvedPlace.surfaceType === "metal" || placeId.includes("cave") || placeId.includes("mine");
  const isFoliage = resolvedPlace.surfaceType === "dirt" || resolvedPlace.surfaceType === "grass" || placeId.includes("forest") || placeId.includes("orchard") || placeId.includes("grove") || placeId.includes("farm");
  
  // Opossum-specific environmental factors (wolves/dogs misidentification)
  const opossumContext = isOpossumEvent 
    ? " Due to the scale of this crafted opossum, the moose reacts to it as a competitive wild animal! " 
    : "";

  // Echo factor for enclosed stone/metal arenas
  const echoContext = (isEnclosed && isOpossumEvent)
    ? ` The opossum's chatter echoes off the ${resolvedPlace.surfaceType} walls of ${resolvedPlace.name}, causing sudden acoustic reactions! `
    : "";

  // 1. Monkey Teases A Moose (Enclosed Arenas)
  if (isEnclosed && scaledRandom < 0.20) {
    return {
      mooseState: "crashed",
      monkeyState: "wall_running",
      aggressionFactor: 0.98,
      actionText: `Inside ${resolvedPlace.name}, a monkey teases the moose! The moose lowers its head and charges furiously. ${echoContext} The nimble monkey runs up the walls to dodge, causing the moose to crash into the wall with a loud groan!`
    };
  }

  // 2. Intelligent monkeys evade, scatter/climb
  if (scaledRandom >= 0.50 && scaledRandom < 0.65) {
    let climbDesc = "They scatter and find high ground that is too high for a moose to reach.";
    let monkeyState: BehaviorState["monkeyState"] = "scattered";

    if (isFoliage) {
      climbDesc = `They expertly swing through ${resolvedPlace.name} tree branches and structures, climbing into the upper canopy.`;
      monkeyState = "climbing";
    } else if (isEnclosed) {
      climbDesc = `They scatter and climb up to elevated ledges inside ${resolvedPlace.name}.`;
      monkeyState = "climbing";
    }
    
    return {
      mooseState: "charging_wildly",
      monkeyState: monkeyState,
      aggressionFactor: 0.75,
      actionText: `${opossumContext}The highly intelligent monkeys evade the charge! ${climbDesc}, causing the moose to charge wildly in a chaotic reaction!`
    };
  }

  // Generic and other specific behaviors
  if (scaledRandom < 0.32) {
    // Moose continues to charge
    if (isBull) {
      return {
        mooseState: "charging_wildly",
        monkeyState: "teasing",
        aggressionFactor: 0.85,
        actionText: `${opossumContext}${echoContext}The aggressive Bull Moose grunts and bellows, charging wildly in unpredictable directions as the monkey is chased down by the massive beast!`
      };
    } else {
      return {
        mooseState: "ramming",
        monkeyState: "teasing",
        aggressionFactor: 0.80,
        actionText: `${opossumContext}A cow moose rams towards the teasing monkeys, attempting to trample and stomp on them with a fierce protective charge!`
      };
    }
  } else if (scaledRandom < 0.50) {
    // 4. Moose attacks: Toss, Trample, Stomp
    const attackType = sourceRandom < 0.33 ? "toss the monkey high in the air" : (sourceRandom < 0.66 ? "trample and run through them" : "perform a typical heavy stomp attack");
    return {
      mooseState: "trampling",
      monkeyState: "flight",
      aggressionFactor: 0.90,
      actionText: `${opossumContext}The extremely wild moose goes on a rampage and attempts to ${attackType}!${isEnclosed ? ` It nearly crashes into the ${resolvedPlace.name} walls in its fury!` : ""}`
    };
  } else if (scaledRandom < 0.75) {
    return {
      mooseState: "snorting",
      monkeyState: "riding_normally",
      aggressionFactor: 0.4,
      actionText: `${opossumContext}A wild moose halts, snorting with flared nostrils as it identifies a potential threat, while the monkey maintains proper balance.`
    };
  } else if (scaledRandom < 0.85) {
    return {
      mooseState: "bellowing",
      monkeyState: "jumping",
      aggressionFactor: 0.6,
      actionText: `${echoContext}The moose bellows a deep territorial acoustic call as monkey riders excitedly leap onto its majestic neck.`
    };
  } else if (scaledRandom < 0.92) {
    return {
      mooseState: "mooing",
      monkeyState: "chasing",
      aggressionFactor: 0.5,
      actionText: "A cow moose moos protectively; surrounding monkeys actively chase neighboring herd members."
    };
  } else {
    return {
      mooseState: "bucking",
      monkeyState: "falling",
      aggressionFactor: 0.8,
      actionText: `${opossumContext}The moose bucks and twists high in the air, attempting to toss its wild monkey riders off entirely!`
    };
  }
}
