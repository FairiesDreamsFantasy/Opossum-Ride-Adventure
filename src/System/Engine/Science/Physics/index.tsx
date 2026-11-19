/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameLevel, TickItem, Opponent, ObstacleItem, GameViewMode, AnimalItem } from "../../../../types";
import { RHYTHM_PROFILES } from "../../../Sound";
import { AIOpossumAcousticEngine } from "../../../Sound/SFX/Category/Opossum/AI-Generated";
import { INITIAL_PLACES } from "../../../../Arena";
import { PlaceResolver } from "../../Resolver";
import { GeminiSystem } from "../../../AI/External/Gemini";
import { getDeterministicSeed } from "../../../Utilities/General";
import { MonkeyCharacterModel } from "../../../../Characters/Monkeys";
import { MooseCharacterModel } from "../../../../Characters/Moose";
import { GeneralEngineUtils } from "../General";
import { IntegrityShadow } from "../../../Security/Phantom/Integrity_Shadow";
import { SymbioticAnchor } from "../../../Security/Phantom/Cryptographic_Anchor";
import { canSpeakAnimalNarrative, speakAnimalNarrative } from "../../../Sound/TTS";
import { isCropFieldPlaceId } from "../../../AI/In-Game/Category/Accessibility/Narration/Arena/Crop_Field";
import { isVegetableFieldPlaceId } from "../../../AI/In-Game/Category/Accessibility/Narration/Arena/Vegetable_Field";
import { FeralPigAIController } from "../../../AI/In-Game/Category/Animal/Feral_Pig";
import { GoatHerdAIEngine } from "../../../AI/In-Game/Category/Animal/Goat";
import { OpossumsAttributesDesign } from "../../../Registry/Characters/Opossums/Attributes/Design";
import { FlowersStarsDiamondsRainbowStoneDoorAI } from "../../../AI/In-Game/Category/Building_Blocks";
import {
  resolveWorld2Level0Zone,
  getWorld2Level0SurfaceSound,
  SOUTH_TEA_TABLES
} from "../../../../World/2/Levels/Level_0";

/**
 * Internal helper to apply a scientific reaction to an opponent (moose/monkey)
 */
export function applyScientificReaction(
  opp: Opponent, 
  reactionRoll: number, 
  nameStr: string, 
  isForest: boolean, 
  isCave: boolean, 
  isPlain: boolean, 
  isMountain: boolean, 
  levelId: number,
  opossumScaleFactor: string,
  speakWords: (text: string, priority?: boolean) => void,
  soundSystemRef: any
) {
  // --- 🛡️ Distributed Security Heartbeat (Phantom Tier) ---
  IntegrityShadow.performShadowAudit();
  switch (reactionRoll) {
    case 0:
      // Monkeys swinging from trees (EXCLUSIVELY Forest)
      if (isForest) {
        opp.monkeyBehavior = "climbing";
        opp.mooseState = "trampling";
        speakAnimalNarrative(`${nameStr || "Moose"} mounted by wild canopy monkey.`);
      } else {
        // Fallback for non-forest: jumping
        opp.monkeyBehavior = "jumping";
        opp.mooseState = "charging";
        speakAnimalNarrative(`${nameStr || "Moose"} mounted by leaping monkey.`);
      }
      break;
    case 1:
      // Moose bucking a monkey off its back
      opp.mooseState = "trampling";
      opp.monkeyBehavior = "tossed";
      soundSystemRef.current?.playImpactCrash();
      speakAnimalNarrative(`${nameStr} bucks wildly, tossing rider.`);
      break;
    case 2:
      // Monkeys teasing with treats (EXCLUSIVELY Cave)
      if (isCave) {
        opp.mooseState = "crashed";
        opp.monkeyBehavior = "wall_running";
        speakAnimalNarrative(`${nameStr} provoked by monkey, charges cave wall.`);
      } else {
        opp.isCharging = true;
        opp.speed = 15;
        opp.mooseState = "charging_wildly";
        speakAnimalNarrative(`${nameStr} provoked, charges ahead.`);
      }
      break;
    case 3:
      // Moose has their hackles up
      opp.isCharging = true;
      opp.speed = 16;
      opp.mooseState = "charging_wildly";
      speakAnimalNarrative(`${nameStr} charges cluster of monkeys.`);
      break;
    case 4:
      // Moose fighting (Plain, Mountains, Forest, Cold places)
      const canFight = isPlain || isMountain || isForest || levelId === 5; 
      if (canFight && opp.mooseType === "Bull") {
        opp.mooseState = "ramming";
        opp.speed = 0; // locked in a fight
        speakAnimalNarrative(`${nameStr} locks horns in territory clash.`);
      } else {
        opp.mooseState = "snorting";
        speakAnimalNarrative(`${nameStr || "Cow moose"} raises ears with warning snort.`);
      }
      break;
    case 5:
      // Cave specific: Echo reaction
      if (isCave) {
        opp.mooseState = "charging_wildly";
        opp.speed = 22;
        speakAnimalNarrative(`${nameStr} alerts defensively to cave echoes.`);
      } else {
        opp.mooseState = "idle";
        speakAnimalNarrative(`${nameStr} halts, watching horizon.`);
      }
      break;
  }
}

/**
 * Computes scientific stride frequency for opossum movement.
 * Completely decouples AI-Generated opossums from the crafted 400ms elegant trot.
 */
export function computeOpossumStrideFrequency(selectedOpossum: any, isJack: boolean): number {
  const isAIGenerated = Boolean(
    selectedOpossum?.isAI ||
    selectedOpossum?.isAIGenerated ||
    selectedOpossum?.aiData != null ||
    (typeof selectedOpossum?.id === "string" && (
      selectedOpossum.id.startsWith("gen-") ||
      selectedOpossum.id.startsWith("proto-") ||
      selectedOpossum.id.startsWith("ai_") ||
      selectedOpossum.id.startsWith("ai-")
    ))
  );

  if (isAIGenerated) {
    const scale = selectedOpossum?.size || selectedOpossum?.aiData?.size || 1.0;
    return AIOpossumAcousticEngine.calculateStrideFrequency(isJack, scale);
  }

  // Crafted opossum rhythm profile (e.g. 400ms elegant trot for Jills)
  return isJack ? RHYTHM_PROFILES.opossum.jackTrot : RHYTHM_PROFILES.opossum.trot;
}

export function updateFoyerPhysics(
  delta: number,
  stateRef: any,
  localTicks: TickItem[],
  setTicks: (ticks: TickItem[]) => void,
  setTicksEaten: (val: number) => void,
  setScore: (val: number) => void,
  setSpeed: (val: number) => void,
  setFoyerX: (val: number) => void,
  setFoyerY: (val: number) => void,
  setPlayerZ: (val: number) => void,
  setPlayerY: (val: number) => void,
  setIsJumping: (val: boolean) => void,
  lastFootstepZRef: { current: number },
  lastRenderedZRef: { current: number },
  soundSystemRef: any,
  speakWords: (text: string, priority?: boolean) => void,
  setStatusMessage: (text: string) => void,
  playProceduralSound: (type: string) => void,
  startLevel: (level: number, worldId?: number) => void,
  announceDoors: boolean,
  selectedOpossum: any
) {
  // Active Embedded Defense: Physics tick mathematically tied to codebase integrity
  const anchorFactor = SymbioticAnchor.validateAndGetFactor();

  // Apply manual movement logic with hold key controls
  if (stateRef.current.isPressingForward) {
    stateRef.current.speed = Math.min(8, stateRef.current.speed + delta * 12 * anchorFactor);
  } else if (stateRef.current.isPressingBackward) {
    stateRef.current.speed = Math.max(-3, stateRef.current.speed - delta * 12 * anchorFactor);
  } else {
    // Apply cruise control speed (converted from mph to m/s) if no keys pressed
    const cruiseTarget = stateRef.current.cruiseSpeed / 2.23694;
    if (stateRef.current.speed < cruiseTarget) {
      stateRef.current.speed = Math.min(cruiseTarget, stateRef.current.speed + delta * 6);
    } else if (stateRef.current.speed > cruiseTarget) {
      stateRef.current.speed = Math.max(cruiseTarget, stateRef.current.speed - delta * 12);
    } else {
      stateRef.current.speed = cruiseTarget;
    }
  }
  setSpeed(stateRef.current.speed);

  // Jump physical parabola in Level 0 (Floor Foyer)
  if (stateRef.current.isJumping) {
    stateRef.current.jumpProgress += delta * 2;
    if (stateRef.current.jumpProgress >= Math.PI) {
      stateRef.current.isJumping = false;
      stateRef.current.playerY = 0;
      setIsJumping(false);
      // Resync trot gait and play precise landing footstep sound on landing
      lastFootstepZRef.current = stateRef.current.playerZ;
      const surfaceName = stateRef.current.foyerY > 2000 ? "wooden decking" : "ceramic tile";
      const opSex = selectedOpossum?.aiData?.sex || selectedOpossum?.sex || (selectedOpossum?.gender === "Male" ? "Jack" : "Jill");
      const isAI = Boolean(
        selectedOpossum?.isAI ||
        selectedOpossum?.isAIGenerated ||
        selectedOpossum?.aiData != null ||
        (typeof selectedOpossum?.id === "string" && (
          selectedOpossum.id.startsWith("gen-") ||
          selectedOpossum.id.startsWith("proto-") ||
          selectedOpossum.id.startsWith("ai_") ||
          selectedOpossum.id.startsWith("ai-")
        ))
      );
      soundSystemRef.current?.playFootstep(surfaceName, opSex, isAI);
    } else {
      stateRef.current.playerY = Math.sin(stateRef.current.jumpProgress) * 3;
    }
    setPlayerY(stateRef.current.playerY);
  }

  const speedFactor = 16; // scalar factor
  const dPos = stateRef.current.speed * delta * speedFactor;

  let targetX = stateRef.current.foyerX;
  let targetY = stateRef.current.foyerY;

  if (stateRef.current.foyerDirection === "North") {
    targetY += dPos;
  } else if (stateRef.current.foyerDirection === "South") {
    targetY -= dPos;
  } else if (stateRef.current.foyerDirection === "East") {
    targetX += dPos;
  } else if (stateRef.current.foyerDirection === "West") {
    targetX -= dPos;
  }

  // Sliding doors trigger and animation updates
  const isNearDoors = Math.abs(stateRef.current.foyerY - 2000) <= 60 && stateRef.current.foyerX >= 990 && stateRef.current.foyerX <= 1010;
  if (isNearDoors !== stateRef.current.doorsOpen) {
    stateRef.current.doorsOpen = isNearDoors;
    if (isNearDoors) {
      if (announceDoors) {
        speakWords("The brass double doors slide open smoothly, revealing the glass-paneled open-air porch.");
      }
      soundSystemRef.current?.playSlidingDoors(true);
    } else {
      if (announceDoors) {
        speakWords("The brass double doors slide shut.");
      }
      soundSystemRef.current?.playSlidingDoors(false);
    }
  }

  // Smoothly animate sliding doors progress
  const targetProgress = stateRef.current.doorsOpen ? 1.0 : 0.0;
  stateRef.current.doorOpenProgress += (targetProgress - stateRef.current.doorOpenProgress) * Math.min(1.0, delta * 8);

  let collided = false;
  let collWall = "";

  // Bound clamp X in coordinates [0, 2000]
  if (targetX < 0) {
    targetX = 0;
    collided = true;
    collWall = "West Wall";
  } else if (targetX > 2000) {
    targetX = 2000;
    collided = true;
    collWall = "East Wall";
  }

  // Bound clamp Y below 0 (South Wall of Foyer)
  if (targetY < 0) {
    targetY = 0;
    collided = true;
    collWall = "South Wall";
  }

  // Partition crossing check at Y = 2000:
  // Player moving from Foyer (inside) to Porch (outside)
  if (stateRef.current.foyerY <= 2000 && targetY > 2000) {
    // Can only pass if within double doors width [990, 1010]
    if (targetX >= 990 && targetX <= 1010) {
      // Allowed to pass
    } else {
      targetY = 2000;
      collided = true;
      collWall = "North Wall";
    }
  }

  // Player moving from Porch (outside) back to Foyer (inside)
  if (stateRef.current.foyerY > 2000 && targetY < 2000) {
    if (targetX >= 990 && targetX <= 1010) {
      // Allowed to pass
    } else {
      targetY = 2000;
      collided = true;
      collWall = "Porch South Wall";
    }
  }

  // Outer north edge of expanded porch clamp (Y = 2200)
  if (targetY > 2200) {
    targetY = 2200;
  }

  // Single-time speech zone announcement when crossing zones
  if (targetY > 2000 && stateRef.current.announcedZone === "foyer") {
    stateRef.current.announcedZone = "porch";
    speakWords("Stepping onto the Expanded Porch. It is 2000 feet wide, 200 feet deep, styled with wooden decking. The north part of the porch is always open-air!");
    setStatusMessage("Expanded Porch: 2000 feet wide, 200 feet deep");
  } else if (targetY <= 2000 && stateRef.current.announcedZone === "porch") {
    stateRef.current.announcedZone = "foyer";
    speakWords("Returning to the Floor Foyer.");
    setStatusMessage("Floor Foyer: 2000 feet by 2000 feet");
  }

  stateRef.current.foyerX = targetX;
  stateRef.current.foyerY = targetY;

  if (collided && Math.abs(stateRef.current.speed) > 1.2) {
    // bounce player slightly on boundary collision
    stateRef.current.speed = -stateRef.current.speed * 0.35;
    setSpeed(stateRef.current.speed);
    playProceduralSound("crash");
    soundSystemRef.current?.playImpactCrash();
    setStatusMessage(`Bumped into the ${collWall}!`);
  }

  setFoyerX(Math.round(stateRef.current.foyerX));
  setFoyerY(Math.round(stateRef.current.foyerY));

  // Also simulate playerZ for rhythm footstep synthesizer/odometer
  stateRef.current.playerZ += Math.abs(stateRef.current.speed) * delta;
  const roundedFoyerZ = Math.round(stateRef.current.playerZ);
  if (lastRenderedZRef.current !== roundedFoyerZ) {
    lastRenderedZRef.current = roundedFoyerZ;
    setPlayerZ(roundedFoyerZ);
  }

  // Footstep ticking on ceramic tile or wooden porch decking
  const stepDeltaZ = stateRef.current.playerZ - lastFootstepZRef.current;
  const isJack = selectedOpossum?.gender === "Jack" || selectedOpossum?.sex === "Jack" || selectedOpossum?.gender === "Male";
  const trotStrideFrequency = computeOpossumStrideFrequency(selectedOpossum, isJack);
  
  if (Math.abs(stepDeltaZ) >= trotStrideFrequency && Math.abs(stateRef.current.speed) > 0.1 && !stateRef.current.isJumping && stateRef.current.playerY <= 0) {
    lastFootstepZRef.current = stateRef.current.playerZ;
    const surfaceName = stateRef.current.foyerY > 2000 ? "wooden decking" : "ceramic tile";
    const opSex = selectedOpossum?.aiData?.sex || selectedOpossum?.sex || (selectedOpossum?.gender === "Male" ? "Jack" : "Jill");
    const isAI = Boolean(
      selectedOpossum?.isAI ||
      selectedOpossum?.isAIGenerated ||
      selectedOpossum?.aiData != null ||
      (typeof selectedOpossum?.id === "string" && (
        selectedOpossum.id.startsWith("gen-") ||
        selectedOpossum.id.startsWith("proto-") ||
        selectedOpossum.id.startsWith("ai_") ||
        selectedOpossum.id.startsWith("ai-")
      ))
    );
    soundSystemRef.current.playFootstep(surfaceName, opSex, isAI);
  }

  // Foyer Ticks collision check
  localTicks.forEach((tick: any) => {
    if (!tick.collected) {
      const tx = tick.x ?? 1000;
      const ty = tick.y ?? 1000;
      const distance = Math.sqrt(
        Math.pow(tx - stateRef.current.foyerX, 2) + Math.pow(ty - stateRef.current.foyerY, 2)
      );
      if (distance < 55) { // collision radius
        tick.collected = true;
        playProceduralSound("tick");
        soundSystemRef.current?.playTickChime();
        setTicks([...localTicks]);
        stateRef.current.ticksEaten += 1;
        stateRef.current.score += 50;
        setTicksEaten(stateRef.current.ticksEaten);
        setScore(stateRef.current.score);
      }
    }
  });

  // Level transition check: Crossing North Wall of Porch Y >= 2200 exits foyer to level 1
  if (stateRef.current.foyerY >= 2200) {
    stateRef.current.isGameOver = true;
    speakWords("Leaving the Expanded Porch, entering Level 1: Garden of Beginnings stage! Ride along!");
    setStatusMessage("Leaving porch, entering Level 1!");
    setTimeout(() => {
      startLevel(1, 1);
    }, 3500);
  }
}

/**
 * World 2 Level 0 Exploration Physics (Temple Courtyard, North Flower Garden, South Tea Area, and Temple Foyer)
 */
export function updateWorld2CourtyardPhysics(
  delta: number,
  stateRef: any,
  setSpeed: (val: number) => void,
  setFoyerX: (val: number) => void,
  setFoyerY: (val: number) => void,
  setPlayerZ: (val: number) => void,
  setPlayerY: (val: number) => void,
  setIsJumping: (val: boolean) => void,
  lastFootstepZRef: { current: number },
  lastRenderedZRef: { current: number },
  soundSystemRef: any,
  speakWords: (text: string, priority?: boolean) => void,
  setStatusMessage: (text: string) => void,
  playProceduralSound: (type: string) => void,
  startLevel: (level: number, worldId?: number) => void,
  completeLevelSave: (level: number, ticks: number, worldId?: number) => Promise<any>,
  announceDoors: boolean,
  selectedOpossum: any
) {
  const anchorFactor = SymbioticAnchor.validateAndGetFactor();

  // Manual movement & cruise control
  if (stateRef.current.isPressingForward) {
    stateRef.current.speed = Math.min(10, stateRef.current.speed + delta * 14 * anchorFactor);
  } else if (stateRef.current.isPressingBackward) {
    stateRef.current.speed = Math.max(-4, stateRef.current.speed - delta * 12 * anchorFactor);
  } else {
    const cruiseTarget = stateRef.current.cruiseSpeed / 2.23694;
    if (stateRef.current.speed < cruiseTarget) {
      stateRef.current.speed = Math.min(cruiseTarget, stateRef.current.speed + delta * 6);
    } else if (stateRef.current.speed > cruiseTarget) {
      stateRef.current.speed = Math.max(cruiseTarget, stateRef.current.speed - delta * 12);
    } else {
      stateRef.current.speed = cruiseTarget;
    }
  }
  setSpeed(stateRef.current.speed);

  const curZone = resolveWorld2Level0Zone(stateRef.current.foyerX, stateRef.current.foyerY);
  const currentSurfaceSound = getWorld2Level0SurfaceSound(curZone);

  // Jump parabola
  if (stateRef.current.isJumping) {
    stateRef.current.jumpProgress += delta * 2;
    if (stateRef.current.jumpProgress >= Math.PI) {
      stateRef.current.isJumping = false;
      stateRef.current.playerY = 0;
      setIsJumping(false);
      lastFootstepZRef.current = stateRef.current.playerZ;
      const opSex = selectedOpossum?.aiData?.sex || selectedOpossum?.sex || (selectedOpossum?.gender === "Male" ? "Jack" : "Jill");
      const isAI = Boolean(
        selectedOpossum?.isAI ||
        selectedOpossum?.isAIGenerated ||
        selectedOpossum?.aiData != null ||
        (typeof selectedOpossum?.id === "string" && (
          selectedOpossum.id.startsWith("gen-") ||
          selectedOpossum.id.startsWith("proto-") ||
          selectedOpossum.id.startsWith("ai_") ||
          selectedOpossum.id.startsWith("ai-")
        ))
      );
      soundSystemRef.current?.playFootstep(currentSurfaceSound, opSex, isAI);
    } else {
      stateRef.current.playerY = Math.sin(stateRef.current.jumpProgress) * 3;
    }
    setPlayerY(stateRef.current.playerY);
  }

  const speedFactor = 20;
  const dPos = stateRef.current.speed * delta * speedFactor;

  const prevX = stateRef.current.foyerX;
  const prevY = stateRef.current.foyerY;
  let targetX = prevX;
  let targetY = prevY;

  if (stateRef.current.foyerDirection === "North") targetY += dPos;
  else if (stateRef.current.foyerDirection === "South") targetY -= dPos;
  else if (stateRef.current.foyerDirection === "East") targetX += dPos;
  else if (stateRef.current.foyerDirection === "West") targetX -= dPos;

  // Evaluate carved stone double sliding door AI at East Courtyard Wall (X = 4000, Y = 1490..1510)
  const doorEval = FlowersStarsDiamondsRainbowStoneDoorAI.evaluateProximity(
    prevX,
    prevY,
    stateRef.current.doorsOpen,
    stateRef.current.doorOpenProgress,
    delta
  );
  stateRef.current.doorsOpen = doorEval.isOpen;
  stateRef.current.doorOpenProgress = doorEval.openProgress;

  if (doorEval.shouldPlayOpenSFX) {
    soundSystemRef.current?.playStoneCarvedSlidingDoors(true);
    if (announceDoors && doorEval.announceDoorState) {
      speakWords("The carved stone sliding doors open into the Temple Foyer.");
    }
  } else if (doorEval.shouldPlayCloseSFX) {
    soundSystemRef.current?.playStoneCarvedSlidingDoors(false);
  }

  let collided = false;
  let collWall = "";

  // West boundary (X = 0): locked exterior door overlooks road & crop field horizon
  if (targetX < 0) {
    targetX = 0;
    collided = true;
    collWall = (prevY >= 1490 && prevY <= 1510 && prevY >= 0 && prevY <= 3000)
      ? "Locked West Exterior Door (Overlooking Road & Crop Fields)"
      : "West Wall";
  }

  // East Temple Wall boundary at X = 4000 (Courtyard/North Garden/South Tea Area -> Temple Foyer via Y = 1490..1510)
  if (prevX <= 4000 && targetX > 4000) {
    if (prevY >= 1490 && prevY <= 1510 && stateRef.current.doorOpenProgress > 0.25) {
      // Allowed through open carved stone double sliding doors into Temple Foyer
    } else {
      targetX = 4000;
      collided = true;
      collWall = "East Temple Stone Wall";
    }
  } else if (prevX > 4000 && targetX < 4000) {
    // Returning West from Temple Foyer back into Courtyard
    if (prevY >= 1490 && prevY <= 1510 && stateRef.current.doorOpenProgress > 0.25) {
      // Allowed back out to courtyard
    } else {
      targetX = 4000;
      collided = true;
      collWall = "Temple Foyer West Wall";
    }
  }

  // Inside Temple Foyer (X in [4000, 7000], Y in [0, 3000]): clamp north/south & check East Archway exit
  if (prevX > 4000 || targetX > 4000) {
    if (targetY < 0) {
      targetY = 0;
      collided = true;
      collWall = "Temple Foyer South Gold-Pyramid Wall";
    } else if (targetY > 3000) {
      targetY = 3000;
      collided = true;
      collWall = "Temple Foyer North Horizon Wall";
    }

    // East wall X = 7000: 20x20 ft Archway at Y in [1490, 1510] leads into World 2 Level 1!
    if (targetX >= 7000) {
      if (targetY >= 1490 && targetY <= 1510) {
        stateRef.current.isGameOver = true;
        soundSystemRef.current?.playLevelCompleteFanfare();
        completeLevelSave(0, 0, 2).catch((err) => {
          console.warn("Could not save World 2 Level 0 completion:", err);
        });
        speakWords("Stepping through the east temple archway into World 2, Level 1: The Ancient Relic Temple!");
        setStatusMessage("Entering World 2 - Level 1: The Ancient Relic Temple!");
        setTimeout(() => {
          startLevel(1, 2);
        }, 3000);
        return;
      } else {
        targetX = 7000;
        collided = true;
        collWall = "Temple Foyer East Carved Wall";
      }
    }
  } else {
    // Courtyard / North Garden / South Tea Area Y partition gates at X in [2990, 3010]
    // 1. North divider at Y = 3000
    if (prevY <= 3000 && targetY > 3000) {
      if (targetX >= 2990 && targetX <= 3010) {
        // Enter North Flower Garden
      } else {
        targetY = 3000;
        collided = true;
        collWall = "North Flower Garden Divider Wall";
      }
    } else if (prevY > 3000 && targetY < 3000) {
      if (targetX >= 2990 && targetX <= 3010) {
        // Return to Courtyard
      } else {
        targetY = 3000;
        collided = true;
        collWall = "Flower Garden South Gate Wall";
      }
    }

    // 2. South divider at Y = 0
    if (prevY >= 0 && targetY < 0) {
      if (targetX >= 2990 && targetX <= 3010) {
        // Enter South Tea Area
      } else {
        targetY = 0;
        collided = true;
        collWall = "South Outdoor Tea Area Wall";
      }
    } else if (prevY < 0 && targetY > 0) {
      if (targetX >= 2990 && targetX <= 3010) {
        // Return to Courtyard
      } else {
        targetY = 0;
        collided = true;
        collWall = "Tea Area North Wall";
      }
    }

    // Outer North/South bounds
    if (targetY > 5000) {
      targetY = 5000;
      collided = true;
      collWall = "North Flower Garden Horizon Wall";
    } else if (targetY < -2000) {
      targetY = -2000;
      collided = true;
      collWall = "South Tea Garden Horizon Wall";
    }

    // Spaced outdoor tea tables collision check (South Tea Area)
    if (targetY < 0) {
      for (const tbl of SOUTH_TEA_TABLES) {
        const dist = Math.hypot(targetX - tbl.x, targetY - tbl.y);
        if (dist < tbl.radiusFeet + 4 && stateRef.current.playerY < 2) {
          targetX = prevX;
          targetY = prevY;
          collided = true;
          collWall = `Outdoor Tea Table #${tbl.id}`;
          break;
        }
      }
    }
  }

  // Zone transitions & one-time announcements
  const nextZone = resolveWorld2Level0Zone(targetX, targetY);
  if (nextZone !== stateRef.current.announcedZone) {
    stateRef.current.announcedZone = nextZone;
    if (nextZone === "temple_foyer") {
      speakWords("Entering the Temple Entrance Foyer, 3000 by 3000 feet with 40-foot ceilings and checkered black and green tile flooring. Head east to the 20-foot archway for World 2 Level 1.");
      setStatusMessage("Temple Foyer (3000x3000 ft, 40 ft ceiling)");
    } else if (nextZone === "north_garden") {
      speakWords("Entering the North Flower Garden on grass. Notice the large flowers and distant crop fields to the west.");
      setStatusMessage("North Flower Garden (4000x2000 ft, Grass)");
    } else if (nextZone === "south_tea_area") {
      speakWords("Entering the Outdoor Tea Garden under the 20-foot skylight canopy on tile flooring with spaced tea tables.");
      setStatusMessage("South Tea Area (4000x2000 ft, Tile)");
    } else {
      speakWords("Stepping into the central Stone Temple Courtyard, 4000 by 3000 feet.");
      setStatusMessage("Temple Courtyard (4000x3000 ft, Stone)");
    }
  }

  stateRef.current.foyerX = targetX;
  stateRef.current.foyerY = targetY;

  if (collided && Math.abs(stateRef.current.speed) > 1.2) {
    stateRef.current.speed = -stateRef.current.speed * 0.35;
    setSpeed(stateRef.current.speed);
    playProceduralSound("crash");
    soundSystemRef.current?.playImpactCrash();
    setStatusMessage(`Bumped into ${collWall}!`);
  }

  setFoyerX(Math.round(stateRef.current.foyerX));
  setFoyerY(Math.round(stateRef.current.foyerY));

  stateRef.current.playerZ += Math.abs(stateRef.current.speed) * delta;
  const roundedZ = Math.round(stateRef.current.playerZ);
  if (lastRenderedZRef.current !== roundedZ) {
    lastRenderedZRef.current = roundedZ;
    setPlayerZ(roundedZ);
  }

  // Surface-specific footsteps ("stone" / "grass" / "tile")
  const stepDeltaZ = stateRef.current.playerZ - lastFootstepZRef.current;
  const isJack = selectedOpossum?.gender === "Jack" || selectedOpossum?.sex === "Jack" || selectedOpossum?.gender === "Male";
  const trotStrideFrequency = computeOpossumStrideFrequency(selectedOpossum, isJack);

  if (Math.abs(stepDeltaZ) >= trotStrideFrequency && Math.abs(stateRef.current.speed) > 0.1 && !stateRef.current.isJumping && stateRef.current.playerY <= 0) {
    lastFootstepZRef.current = stateRef.current.playerZ;
    const opSex = selectedOpossum?.aiData?.sex || selectedOpossum?.sex || (selectedOpossum?.gender === "Male" ? "Jack" : "Jill");
    const isAI = Boolean(
      selectedOpossum?.isAI ||
      selectedOpossum?.isAIGenerated ||
      selectedOpossum?.aiData != null ||
      (typeof selectedOpossum?.id === "string" && (
        selectedOpossum.id.startsWith("gen-") ||
        selectedOpossum.id.startsWith("proto-") ||
        selectedOpossum.id.startsWith("ai_") ||
        selectedOpossum.id.startsWith("ai-")
      ))
    );
    soundSystemRef.current?.playFootstep(currentSurfaceSound, opSex, isAI);
  }
}

export function updateStandardPhysics(
  delta: number,
  stateRef: any,
  currentLevel: GameLevel,
  localTicks: TickItem[],
  localObstacles: ObstacleItem[],
  localOpponents: Opponent[],
  localAnimals: AnimalItem[],
  setTicks: (ticks: TickItem[]) => void,
  setOpponents: (opps: Opponent[]) => void,
  setAnimals: (animals: AnimalItem[]) => void,
  setTicksEaten: (val: number) => void,
  setScore: (val: number) => void,
  setSpeed: (val: number) => void,
  setPlayerZ: (val: number) => void,
  setPlayerY: (val: number) => void,
  setIsJumping: (val: boolean) => void,
  lastFootstepZRef: { current: number },
  lastRenderedZRef: { current: number },
  soundSystemRef: any,
  speakWords: (text: string, priority?: boolean) => void,
  setStatusMessage: (text: string) => void,
  playProceduralSound: (type: string) => void,
  startLevel: (level: number, worldId?: number) => void,
  getEdibleItemName: (level: number) => string,
  selectedOpossum: any,
  completeLevelSave: (level: number, ticks: number, worldId?: number) => Promise<any>,
  announceSteering: boolean,
  selectedRider: any = null
) {
  // Active Embedded Defense: Standard physics tick mathematically tied to codebase integrity
  const anchorFactor = SymbioticAnchor.validateAndGetFactor();

  // Resolve stage atmosphere and biology scientifically
  const atmosphere = GeneralEngineUtils.resolveStageAtmosphere(currentLevel.id, currentLevel.placeId);
  const legLengthLabel = OpossumsAttributesDesign.Leg_Length.getByOpossumId(selectedOpossum?.id || "");
  const mountedJumpProfile = GeneralEngineUtils.calculateMountedJumpProfile(
    selectedOpossum,
    selectedRider,
    stateRef.current.speed,
    legLengthLabel
  );

  // Calculate dynamic aerodynamic drag deceleration
  const dragDecel = GeneralEngineUtils.calculateDragDeceleration(
    stateRef.current.speed,
    atmosphere.airDensityKgM3,
    mountedJumpProfile.opossumMassKg
  );

  // Course paths: realistic glide deceleration when releasing forward, immediate stop when releasing reverse
  if (stateRef.current.isPressingForward) {
    stateRef.current.speed = Math.min(8, stateRef.current.speed + delta * 12 * anchorFactor);
  } else if (stateRef.current.isPressingBackward) {
    stateRef.current.speed = Math.max(-3, stateRef.current.speed - delta * 12 * anchorFactor);
  } else {
    // Apply cruise control speed if no keys pressed
    const cruiseTarget = stateRef.current.cruiseSpeed / 2.23694;
    if (stateRef.current.speed < cruiseTarget) {
      stateRef.current.speed = Math.min(cruiseTarget, stateRef.current.speed + delta * 6);
    } else {
      if (stateRef.current.speed > cruiseTarget) {
        // Dynamic air drag combined with mechanical friction damping
        const dynamicDamping = dragDecel * delta * 25 + delta * 15;
        stateRef.current.speed = Math.max(cruiseTarget, stateRef.current.speed - dynamicDamping);
      }
    }
  }
  setSpeed(stateRef.current.speed);

  // Smooth slide visual lane X coordinate towards target playerLane
  const targetX = stateRef.current.playerLane * 4; // visual spacing
  const xDiff = targetX - stateRef.current.visualLaneX;
  stateRef.current.visualLaneX += xDiff * Math.min(1, delta * 15);

  // Jump physical parabola
  if (stateRef.current.isJumping) {
    stateRef.current.jumpProgress += delta * 2;
    if (stateRef.current.jumpProgress >= Math.PI) {
      stateRef.current.isJumping = false;
      const platformUnder = localObstacles.find(obs => obs.type === "stone_platform" && obs.lane === stateRef.current.playerLane && Math.abs(obs.z - stateRef.current.playerZ) <= obs.width / 2);
      stateRef.current.playerY = platformUnder ? platformUnder.height : 0;
      setIsJumping(false);
      // Resync trot gait and play precise landing footstep sound on landing
      lastFootstepZRef.current = stateRef.current.playerZ;
      const currentPlaceObj = PlaceResolver.resolvePlace(currentLevel.placeId);
      const opSex = selectedOpossum?.aiData?.sex || selectedOpossum?.sex || (selectedOpossum?.gender === "Male" ? "Jack" : "Jill");
      const isAI = Boolean(
        selectedOpossum?.isAI ||
        selectedOpossum?.isAIGenerated ||
        selectedOpossum?.aiData != null ||
        (typeof selectedOpossum?.id === "string" && (
          selectedOpossum.id.startsWith("gen-") ||
          selectedOpossum.id.startsWith("proto-") ||
          selectedOpossum.id.startsWith("ai_") ||
          selectedOpossum.id.startsWith("ai-")
        ))
      );
      const platformSurface = currentPlaceObj.surfaceType.toLowerCase().includes("slate")
        ? "slate"
        : currentPlaceObj.surfaceType.toLowerCase().includes("marble")
          ? "marble"
          : currentPlaceObj.surfaceType.toLowerCase().includes("basalt")
            ? "basalt"
            : "granite";
      soundSystemRef.current?.playFootstep(platformUnder ? platformSurface : currentPlaceObj.surfaceType, opSex, isAI);
    } else {
      const platformUnder = localObstacles.find(obs => obs.type === "stone_platform" && obs.lane === stateRef.current.playerLane && Math.abs(obs.z - stateRef.current.playerZ) <= obs.width / 2);
      const baseHeight = platformUnder && stateRef.current.playerY >= platformUnder.height - 0.2 ? platformUnder.height : 0;
      stateRef.current.playerY = baseHeight + Math.sin(stateRef.current.jumpProgress) * mountedJumpProfile.jumpPeakHeightM;
    }
    setPlayerY(stateRef.current.playerY);
  } else {
    // If NOT jumping, check if we stand on platform or fall off
    const platformUnder = localObstacles.find(obs => obs.type === "stone_platform" && obs.lane === stateRef.current.playerLane && Math.abs(obs.z - stateRef.current.playerZ) <= obs.width / 2);
    if (platformUnder) {
      if (stateRef.current.playerY >= platformUnder.height - 0.2) {
        stateRef.current.playerY = platformUnder.height;
      }
    } else {
      if (stateRef.current.playerY > 0) {
        const oldY = stateRef.current.playerY;
        stateRef.current.playerY = Math.max(0, stateRef.current.playerY - delta * 8);
        if (stateRef.current.playerY === 0 && oldY > 0) {
          lastFootstepZRef.current = stateRef.current.playerZ;
          const currentPlaceObj = PlaceResolver.resolvePlace(currentLevel.placeId);
          const opSex = selectedOpossum?.aiData?.sex || selectedOpossum?.sex || (selectedOpossum?.gender === "Male" ? "Jack" : "Jill");
          const isAI = Boolean(
            selectedOpossum?.isAI ||
            selectedOpossum?.isAIGenerated ||
            selectedOpossum?.aiData != null ||
            (typeof selectedOpossum?.id === "string" && (
              selectedOpossum.id.startsWith("gen-") ||
              selectedOpossum.id.startsWith("proto-") ||
              selectedOpossum.id.startsWith("ai_") ||
              selectedOpossum.id.startsWith("ai-")
            ))
          );
          soundSystemRef.current?.playFootstep(currentPlaceObj.surfaceType, opSex, isAI);
        }
      }
    }
    setPlayerY(stateRef.current.playerY);
  }

  // Decay chatter pulse
  if (stateRef.current.chatterPulse > 0) {
    stateRef.current.chatterPulse -= delta * 2.2;
    if (stateRef.current.chatterPulse < 0) stateRef.current.chatterPulse = 0;
  }

  // Advance progress position
  stateRef.current.playerZ = Math.max(0, stateRef.current.playerZ + stateRef.current.speed * delta);
  const roundedRaceZ = Math.round(stateRef.current.playerZ);
  if (lastRenderedZRef.current !== roundedRaceZ) {
    lastRenderedZRef.current = roundedRaceZ;
    setPlayerZ(roundedRaceZ);
  }

  // Compute current course segment index and play automated steering announcements
  const currentZ = stateRef.current.playerZ;
  let segmentIdx = 0;
  let turnMsg = "";
  
  if (currentZ <= 80) {
    segmentIdx = 0;
  } else if (currentZ <= 200) {
    segmentIdx = 1;
    turnMsg = "Turned right via automated steering, now heading East.";
  } else if (currentZ <= 350) {
    segmentIdx = 2;
    turnMsg = "Turned left via automated steering, now heading North.";
  } else if (currentZ <= 500) {
    segmentIdx = 3;
    turnMsg = "Turned left via automated steering, now heading West.";
  } else if (currentZ <= 700) {
    segmentIdx = 4;
    turnMsg = "Turned right via automated steering, now heading North.";
  } else if (currentZ <= 900) {
    segmentIdx = 5;
    turnMsg = "Turned right via automated steering, now heading East.";
  } else if (currentZ <= 1100) {
    segmentIdx = 6;
    turnMsg = "Turned right via automated steering, now heading South.";
  } else {
    segmentIdx = 7;
    turnMsg = "Turned left via automated steering, now heading North.";
  }

  if (stateRef.current.lastAnnouncedSegmentIdx === undefined) {
    stateRef.current.lastAnnouncedSegmentIdx = 0;
  }

  if (segmentIdx !== stateRef.current.lastAnnouncedSegmentIdx) {
    stateRef.current.lastAnnouncedSegmentIdx = segmentIdx;
    if (turnMsg) {
      if (announceSteering) {
        speakWords(turnMsg);
      }
      setStatusMessage(turnMsg);
    }
  }

  // Rhythmic footstep synthesizer with dynamic biomechanical stride frequency calculation
  const currentPlace = PlaceResolver.resolvePlace(currentLevel.placeId);
  const stepDeltaZ = stateRef.current.playerZ - lastFootstepZRef.current;
  const isJack = selectedOpossum?.gender === "Jack" || selectedOpossum?.sex === "Jack" || selectedOpossum?.gender === "Male";
  const trotStrideFrequency = computeOpossumStrideFrequency(selectedOpossum, isJack);
  
  const isAI = Boolean(
    selectedOpossum?.isAI ||
    selectedOpossum?.isAIGenerated ||
    selectedOpossum?.aiData != null ||
    (typeof selectedOpossum?.id === "string" && (
      selectedOpossum.id.startsWith("gen-") ||
      selectedOpossum.id.startsWith("proto-") ||
      selectedOpossum.id.startsWith("ai_") ||
      selectedOpossum.id.startsWith("ai-")
    ))
  );
  
  const ridingPlatform = !stateRef.current.isJumping
    ? localObstacles.find(obs => obs.type === "stone_platform" && obs.lane === stateRef.current.playerLane && Math.abs(obs.z - stateRef.current.playerZ) <= obs.width / 2 && Math.abs(stateRef.current.playerY - obs.height) < 0.15)
    : undefined;

  if (Math.abs(stepDeltaZ) >= trotStrideFrequency && Math.abs(stateRef.current.speed) > 0.1 && !stateRef.current.isJumping && (stateRef.current.playerY <= 0 || ridingPlatform)) {
    lastFootstepZRef.current = stateRef.current.playerZ;
    const opSex = selectedOpossum?.aiData?.sex || selectedOpossum?.sex || (selectedOpossum?.gender === "Male" ? "Jack" : "Jill");
    const stepSurface = ridingPlatform
      ? (currentPlace.surfaceType.toLowerCase().includes("slate") ? "slate" : currentPlace.surfaceType.toLowerCase().includes("marble") ? "marble" : "granite")
      : currentPlace.surfaceType;
    soundSystemRef.current.playFootstep(stepSurface, opSex, isAI);
  }

  // Move opponents
  localOpponents.forEach((opp) => {
    MooseCharacterModel.General.updateMovement(
      opp, 
      delta, 
      stateRef, 
      currentLevel, 
      selectedOpossum.id
    );

    MonkeyCharacterModel.General.updateMovement(opp, delta);

    // High-fidelity named moose click hoofbeats and named monkey vocalizations
    const oppDistance = Math.abs(opp.z - stateRef.current.playerZ);
    if (oppDistance < 120) { // audibly near the player
      if (opp.lastHoofstepZ === undefined) {
        opp.lastHoofstepZ = opp.z;
      }
      const deltaHoofZ = Math.abs(opp.z - opp.lastHoofstepZ);
      
      // Resolve hard coding errors: Add individualized rhythm jitter and gait state variations
      const seed = getDeterministicSeed(opp.mooseName || opp.mooseType);
      const uniqueOffset = (seed % 10) / 40; // 0.0 to 0.25 variance based on identity
      let stateBaseStride = RHYTHM_PROFILES.moose.trot;
      if (opp.isCharging || opp.mooseState === "charging" || opp.mooseState === "charging_wildly" || opp.mooseState === "ramming") {
        stateBaseStride = RHYTHM_PROFILES.moose.charge;
      } else if (opp.mooseState === "trampling") {
        stateBaseStride = 1.8;
      } else if (opp.mooseState === "idle") {
        stateBaseStride = RHYTHM_PROFILES.moose.idle;
      }
      const baseStride = stateBaseStride + uniqueOffset;
      const jitterStride = baseStride + (opp.hoofStrideVariance || 0);
      
      if (deltaHoofZ >= jitterStride) {
        opp.lastHoofstepZ = opp.z;
        // Refresh variance per stride for organic, non-repetitive pacing
        opp.hoofStrideVariance = Math.random() * 0.5 - 0.25; 
        soundSystemRef.current?.playMooseHoofClick(opp.mooseName, opp.mooseType, oppDistance);
      }

      // Occasionally trigger customized screeches and snorts using delta-time based timers
      if (!opp.nextVocalTime) opp.nextVocalTime = 0;
      opp.nextVocalTime -= delta;
      
      if (opp.nextVocalTime <= 0) {
        // Set next vocal time between 1.5 and 4.5 seconds
        opp.nextVocalTime = 1.5 + Math.random() * 3.0;
        
        const vocalChoice = Math.random() > 0.5 ? "monkey" : "moose";
        if (vocalChoice === "monkey") {
          soundSystemRef.current?.playMonkeyVocalForOpponent(opp, oppDistance);
        } else {
          soundSystemRef.current?.playMooseVocalForOpponent(opp, oppDistance);
        }
      }
    }

    // [MACHNE LEARNING VARIANT] 
    // Check collision with non-organic obstacles (rock or fence) or garden plants
    MooseCharacterModel.General.updateCollisions(
      opp,
      localObstacles,
      oppDistance,
      soundSystemRef,
      speakWords
    );

    // [UNPREDICTABLE MOOSE CHARGE & MACHINE LEARNING REFINEMENTS]
    if (opp.isAngelica) return; // Angelica doesn't charge

    const isMooseFreePlace = currentLevel.placeId === "floor_foyer" || currentLevel.placeId === "stone_corridor" || currentLevel.placeId === "stone_room" || currentLevel.placeId === "generic";
    // Check for endless hotspots in specific arenas
    const pidLower = currentLevel.placeId.toLowerCase();
    const hasEndlessHotspots = pidLower === "cave" || pidLower.startsWith("wilderness_cave_") || pidLower.startsWith("plain") || pidLower.startsWith("forest") || pidLower.startsWith("mountains");
    
    const randomThreshold = hasEndlessHotspots ? delta * 0.12 : delta * 0.04;
    
    if (!isMooseFreePlace && oppDistance < 90 && !opp.hasCharged && canSpeakAnimalNarrative() && Math.random() < randomThreshold) {
      opp.hasCharged = true; // Trigger once per opponent encounter
      const nameStr = opp.mooseName || (opp.mooseType === "Bull" ? "Wild Bull Moose" : "Wild Cow Moose");
      const isCave = pidLower === "cave" || pidLower.startsWith("wilderness_cave_");
      const isForest = pidLower.startsWith("forest");
      const isPlain = pidLower.startsWith("plain");
      const isMountain = pidLower.startsWith("mountains");
      
      // Scientific factor: misidentification due to opossum size
      const opossumScaleFactor = " Due to the large scale of this crafted opossum, the moose misidentifies it as a wolf or wild dog enemy! ";

      // Resolution: Local Scientific Random vs External Scientific AI
      let reactionRoll = Math.floor(Math.random() * 6);
      
      if (GeminiSystem.isReady()) {
        // Trigger External AI reaction asynchronously
        GeminiSystem.resolveScientificReaction({
          mooseName: nameStr,
          monkeyName: opp.monkeyName || "Wild Monkey",
          environment: currentLevel.placeId,
          isOpossumEvent: false
        }).then((resolvedIndex) => {
          // Re-apply the reaction to the opponent if the game is still running
          setOpponents(localOpponents.map(o => {
            if (o.id === opp.id) {
              // Apply the AI's scientific decision
              applyScientificReaction(o, resolvedIndex, nameStr, isForest, isCave, isPlain, isMountain, currentLevel.id, opossumScaleFactor, speakWords, soundSystemRef);
            }
            return o;
          }));
        });
        return; // Wait for AI response
      }

      applyScientificReaction(opp, reactionRoll, nameStr, isForest, isCave, isPlain, isMountain, currentLevel.id, opossumScaleFactor, speakWords, soundSystemRef);
    }
  });

  // Ticks collision check
  localTicks.forEach((tick) => {
    if (!tick.collected) {
      const distance = Math.abs((tick.z || 0) - stateRef.current.playerZ);
      if (distance < 2.5 && tick.lane === stateRef.current.playerLane) {
        tick.collected = true;
        playProceduralSound("tick");
        soundSystemRef.current?.playTickChime();
        setTicks([...localTicks]);
        stateRef.current.ticksEaten += 1;
        stateRef.current.score += 50;
        setTicksEaten(stateRef.current.ticksEaten);
        setScore(stateRef.current.score);
      }
    }
  });

  // Obstacles collision check
  localObstacles.forEach((obs) => {
    const distance = Math.abs(obs.z - stateRef.current.playerZ);
    if (distance < 1.8 && obs.lane === stateRef.current.playerLane) {
      if (obs.type === "stone_platform") {
        // If we are below the platform top, we crash into the side of it!
        if (stateRef.current.playerY < obs.height - 0.2) {
          playProceduralSound("crash");
          soundSystemRef.current?.playRockCollision();
          stateRef.current.speed = -3;
          stateRef.current.score = Math.max(0, stateRef.current.score - 20);
          stateRef.current.playerZ -= 4;
          speakWords(`Crash! Hit side of stone platform! Jump onto it!`, true);
          setStatusMessage(`Ouch! Hit stone platform`);
        }
      } else {
        const savesWithJump =
          stateRef.current.playerY > 0.8 &&
          (obs.type === "fence" || obs.type === "garden_plant" || obs.type === "triangular_stone_fence");
        if (!savesWithJump) {
          playProceduralSound("crash");
          if (obs.type === "fence") {
            soundSystemRef.current?.playFenceCollision();
          } else if (obs.type === "garden_plant") {
            soundSystemRef.current?.playGardenPlantCollision();
          } else if (obs.type === "rock") {
            soundSystemRef.current?.playRockCollision();
          } else if (obs.type === "triangular_stone_fence") {
            soundSystemRef.current?.playTriangularStoneFenceCollision();
          } else {
            soundSystemRef.current?.playImpactCrash();
          }
          stateRef.current.speed = -3;
          stateRef.current.score = Math.max(0, stateRef.current.score - 20);
          stateRef.current.playerZ -= 4;
          const obstacleLabel = obs.type.replace(/_/g, " ");
          speakWords(`Crash! Hit ${obstacleLabel}! Jump or strafe lanes to avoid.`, true);
          setStatusMessage(`Ouch! Hit a ${obstacleLabel}`);
        }
      }
    }
  });

  // Moose/monkey Opponents collision check
  localOpponents.forEach((opp) => {
    const distance = Math.abs(opp.z - stateRef.current.playerZ);
    if (distance < 2.5 && opp.lane === stateRef.current.playerLane) {
      const isUnmountedWild = opp.isWildMoose && !opp.isRiddenByMonkey && opp.monkeyName === "";
      
      if (stateRef.current.playerY > 0.8 && isUnmountedWild && opp.mooseState !== "smashed") {
        // High Leap & Heavy Landing Smash (Jump High and Land Hard - no Babylonian shortcuts)
        opp.mooseState = "smashed";
        opp.speed = 0; // stop moving
        
        // Award points
        stateRef.current.score += 100;
        setScore(stateRef.current.score);

        // distressed vocal
        soundSystemRef.current?.synthesizeMooseSmashedVocal(opp.mooseName, opp.mooseType);
        
        // Floating score "+100" at moose coordinate
        const fText = stateRef.current.floatingTextPool.next();
        fText.id = Math.random();
        fText.text = "100";
        fText.lane = opp.lane;
        fText.z = opp.z;
        fText.spawnTime = Date.now();
        fText.yOffset = 3.0; // Float height

        // Trigger poof particles
        const p = stateRef.current.particlePool.next();
        p.id = Math.random();
        p.lane = opp.lane;
        p.z = opp.z;
        p.spawnTime = Date.now();
        p.radius = 0.2;
        p.maxRadius = 2.5;

        // Speak synthesis announcement if preference enabled
        if (stateRef.current.announceMooseSmash) {
          speakWords("Perfect jump! Smashed the unmounted wild moose!", true);
        }
        setStatusMessage("Smashed Wild Moose! +100");

        // Subtract the moose after poof effect
        (opp as any).smashedTime = Date.now();
        
        // Give player a little extra upward bounce
        stateRef.current.isJumping = true;
        stateRef.current.jumpProgress = 0.5; // Jump slightly up again
        setIsJumping(true);
      } else {
        if (opp.mooseState === "smashed") return;

        playProceduralSound("crash");
        soundSystemRef.current?.playMooseChargeTrample();
        stateRef.current.speed = -6;
        stateRef.current.score = Math.max(0, stateRef.current.score - 100);
        stateRef.current.playerZ -= 6;
        const isWild = opp.isWildMoose || !opp.mooseName || opp.mooseName.trim() === "";
        const hasRider = !!(opp.monkeyName && opp.monkeyName.trim() !== "");

        if (isWild || !hasRider) {
          speakWords(`Ouch! Trampled by a raw charging wild ${opp.mooseType} Moose!`, true);
          setStatusMessage(`Dodge charging wild ${opp.mooseType.toLowerCase()} moose!`);
        } else if (opp.isCharging) {
          speakWords(`Ouch! Trampled by raw charging ${opp.mooseType} Moose ${opp.mooseName}!`, true);
          setStatusMessage(`Dodge charging ${opp.mooseType.toLowerCase()} moose ${opp.mooseName}!`);
        } else {
          const riderGender = (opp.monkeyGender || (opp.mooseType === "Bull" ? "Female" : "Male")).toLowerCase();
          speakWords(`Ouch! Trampled by ${riderGender} monkey ${opp.monkeyName} riding the ${opp.mooseType} Moose ${opp.mooseName}!`, true);
          setStatusMessage(`Dodge charging monkey ${opp.monkeyName} riding moose ${opp.mooseName}!`);
        }
      }
    }
  });

  // Programmatically prune poofed/smashed moose and feral pigs after 1.2 seconds
  const activeOpponents = localOpponents.filter((opp) => {
    if (opp.mooseState === "smashed") {
      const timeElapsed = Date.now() - ((opp as any).smashedTime || 0);
      return timeElapsed < 1200; // Keep on screen for 1.2 seconds for poof particle rendering, then subtract from course!
    }
    return true;
  });
  if (activeOpponents.length !== localOpponents.length) {
    setOpponents(activeOpponents);
  }

  const activeAnimals = localAnimals.filter((animal) => {
    if (animal.state === "smashed") {
      const timeElapsed = Date.now() - (animal.smashedTime || 0);
      return timeElapsed < 1200; // Keep on screen for 1.2 seconds for poof particle rendering, then subtract!
    }
    return true;
  });
  if (activeAnimals.length !== localAnimals.length) {
    setAnimals(activeAnimals);
  }
  
  // Animal behavior, feral pig AI lane-switching, stun/smash detection, and vocalization
  const nowMs = Date.now();
  localAnimals.forEach((animal) => {
    // 1. Update level-scaled Feral Pig AI on path-based arenas (random lane switching across ANY lane -1, 0, 1)
    if (animal.species === "feral_pig" && animal.state !== "smashed") {
      const pigAiTick = FeralPigAIController.updateCoursePigAI(
        animal,
        stateRef.current.playerZ,
        stateRef.current.visualLaneX,
        currentLevel.id,
        delta,
        nowMs
      );
      if (pigAiTick.switchedLane && pigAiTick.distanceToPlayer < 120) {
        soundSystemRef.current?.playPigLaneSwitchGrunt(animal.gender || "Boar", pigAiTick.distanceToPlayer);
      }

      const proximity = FeralPigAIController.Collision.checkCoursePigProximity(
        stateRef.current.visualLaneX,
        stateRef.current.playerZ,
        animal.lane,
        animal.xOffset || 0,
        animal.z
      );

      if (proximity.isAligned) {
        if (stateRef.current.playerY > 0.8) {
          const impactOutcome = GeneralEngineUtils.evaluateCompactPigImpact(
            mountedJumpProfile,
            animal.gender || "Boar",
            animal.state
          );

          if (impactOutcome === "stun") {
            // Compact Jack impact stuns active feral pig (realistic stunned SFX, zero TTS description)
            animal.state = "stunned";
            animal.behaviorState = "stunned";
            animal.stunnedUntil = nowMs + 3200;

            stateRef.current.score += 25;
            setScore(stateRef.current.score);

            soundSystemRef.current?.playPigStunnedVocal(animal.gender || "Boar", 0);

            const fText = stateRef.current.floatingTextPool.next();
            fText.id = Math.random();
            fText.text = "+25";
            fText.lane = animal.lane;
            fText.z = animal.z;
            fText.spawnTime = nowMs;
            fText.yOffset = 2.0;

            // Give player an upward rebound so consecutive jump-impact smash or dodge is clean
            stateRef.current.isJumping = true;
            stateRef.current.jumpProgress = 0.5;
            setIsJumping(true);
          } else {
            // High Leap & Heavy Landing Smash on Feral Pig (no stomp mechanics)
            animal.state = "smashed";
            animal.behaviorState = "smashed";
            animal.smashedTime = nowMs;

            // Award points
            stateRef.current.score += 100;
            setScore(stateRef.current.score);

            // Intense explosion sound with cartoon squash
            soundSystemRef.current?.synthesizePigSmashedExplosion(animal.gender || "Boar", 0);

            // Floating score "+100" at pig coordinates
            const fText = stateRef.current.floatingTextPool.next();
            fText.id = Math.random();
            fText.text = "100";
            fText.lane = animal.lane;
            fText.z = animal.z;
            fText.spawnTime = nowMs;
            fText.yOffset = 2.5;

            // Trigger celebratory poof particle explosion
            const p = stateRef.current.particlePool.next();
            p.id = Math.random();
            p.lane = animal.lane;
            p.z = animal.z;
            p.spawnTime = nowMs;
            p.radius = 0.3;
            p.maxRadius = 3.0;

            // Narrative announcement when jumping on a feral pig while riding an opossum
            const genderTitle = animal.gender === "Sow" ? "feral sow" : "feral boar";
            speakWords(`Perfect jump! Smashed the wild ${genderTitle} with an intense blast!`, true);
            setStatusMessage(`Smashed Wild ${animal.gender === "Sow" ? "Sow" : "Boar"}! +100`);

            // Give player an upward bounce
            stateRef.current.isJumping = true;
            stateRef.current.jumpProgress = 0.5;
            setIsJumping(true);
          }
        } else if (animal.state !== "stunned") {
          // Ground level contact bump (bypassed harmlessly if pig is currently stunned)
          if (canSpeakAnimalNarrative()) {
            speakAnimalNarrative(`Opossum bumped into a wild feral ${animal.gender === "Sow" ? "sow" : "boar"}.`);
          }
          soundSystemRef.current?.playPigVocal(animal.gender || "Boar", 0);
          stateRef.current.speed = Math.max(1, stateRef.current.speed - 3);
        }
      }
    }

    if (animal.species === "monkey") {
      const distance = Math.abs(animal.z - stateRef.current.playerZ);
      const isSameLane = animal.lane === stateRef.current.playerLane;
      if (distance < 2.2 && isSameLane && stateRef.current.playerY <= 0.8 && !(animal as any).recentlyDodged) {
        (animal as any).recentlyDodged = true;
        const isFemale = animal.state === "roaming_female";
        soundSystemRef.current?.playMonkeyModularVocal(isFemale ? "coo" : "screech", isFemale ? 1.15 : 0.92);
        stateRef.current.speed = Math.max(2, stateRef.current.speed - 2);
        if (canSpeakAnimalNarrative()) {
          const isFieldPath = isCropFieldPlaceId(currentLevel.placeId) || isVegetableFieldPlaceId(currentLevel.placeId);
          speakAnimalNarrative(`Opossum darted past a loose ${isFemale ? "female" : "male"} monkey ${isFieldPath ? "on the slate path" : "along the wilderness trail"}.`);
        }
      }
    }

    if (animal.species === "goat") {
      const goatTick = GoatHerdAIEngine.updatePastureGoatAI(
        animal,
        localAnimals,
        stateRef.current.playerZ,
        delta,
        nowMs
      );
      if (goatTick.shouldEmitBleat) {
        soundSystemRef.current?.playGoatBleat(
          animal.goatId || "snowy",
          goatTick.distanceToPlayer,
          goatTick.isKid
        );
      } else if (goatTick.shouldEmitStepClop) {
        soundSystemRef.current?.playGoatHoofClop(
          goatTick.distanceToPlayer,
          goatTick.isKid,
          goatTick.onWoodRamp
        );
      } else if (goatTick.shouldEmitGrazeRustle) {
        soundSystemRef.current?.playGoatGrazeRustle(goatTick.distanceToPlayer);
      }
      return;
    }

    if (animal.state === "smashed" || animal.state === "stunned") return;

    if (animal.nextVocalTime === undefined) {
      animal.nextVocalTime = 1 + Math.random() * 5;
    }
    animal.nextVocalTime -= delta;
    if (animal.nextVocalTime <= 0) {
      animal.nextVocalTime = 4 + Math.random() * 8;
      const distance = Math.abs(animal.z - stateRef.current.playerZ);
      if (distance < 120) {
        if (animal.species === "owl") {
          soundSystemRef.current?.playOwlHoot(distance);
        } else if (animal.species === "frog") {
          soundSystemRef.current?.playFrogCroak(distance);
        } else if (animal.species === "feral_pig") {
          soundSystemRef.current?.playPigVocal(animal.gender || "Boar", distance);
        } else if (animal.species === "monkey") {
          const isFemale = animal.state === "roaming_female";
          soundSystemRef.current?.playMonkeyModularVocal(isFemale ? "hoot" : "pant_hoot", isFemale ? 1.12 : 0.95);
        }
      }
    }
  });

  // Check level objective finish line reached
  if (stateRef.current.playerZ >= currentLevel.targetDistance) {
    stateRef.current.isGameOver = true;
    // Play level complete fanfare audio
    soundSystemRef.current?.playLevelCompleteFanfare();
    const activeWorldId = currentLevel.worldId ?? 1;
    // Record level progression in IndexedDB & Local Storage offline
    completeLevelSave(currentLevel.id, stateRef.current.ticksEaten, activeWorldId).catch((err) => {
      console.warn("Could not save level progression:", err);
    });
    const isEndOfWorld1 = activeWorldId === 1 && currentLevel.id >= 40;
    if (isEndOfWorld1) {
      speakWords(`World 1 complete! You passed Stage 40: ${currentLevel.name}! Advancing next to World 2, Level 0: Temple Courtyard! Got ${stateRef.current.ticksEaten} ${getEdibleItemName(currentLevel.id)}.`);
      setStatusMessage("World 1 Complete! Advancing to World 2!");
    } else {
      speakWords(`Level complete! You safely completed Stage ${currentLevel.id}: ${currentLevel.name}! Got ${stateRef.current.ticksEaten} ${getEdibleItemName(currentLevel.id)}.`);
      setStatusMessage("Stage Accomplished!");
    }
    setTimeout(() => {
      if (isEndOfWorld1) {
        startLevel(0, 2);
      } else {
        startLevel(currentLevel.id + 1, activeWorldId);
      }
    }, 3500);
  }
}
