/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { OpossumCharacter } from "../types";
import { AIOpossum } from "../System/UI/Opossum_Selection_Screen/General/AI_State";
import { DedicatedSFXSynthesizer } from "../System/Sound/SFX";

let sfxSynthesizer: DedicatedSFXSynthesizer | null = null;

/**
 * Converts a synthesized AI Opossum into a standard OpossumCharacter
 * for use within the game engine with authentic marsupial bio-acoustics.
 */
export const convertAItoCharacter = (aiOp: AIOpossum): OpossumCharacter => {
  const baseScale = aiOp.size || 1.0;
  
  const playChatterFn = (ctx: AudioContext, isRetro: boolean, dest: AudioNode) => {
    if (!sfxSynthesizer) {
      sfxSynthesizer = new DedicatedSFXSynthesizer();
    }
    const sex = aiOp.sex;
    const vocalSource = aiOp.vocalSource || "Cloud Network Synthesis";
    if (sex === "Jill" || sex?.toLowerCase() === "female") {
      sfxSynthesizer.playCloudJillChatter(ctx, dest, baseScale, vocalSource);
    } else {
      sfxSynthesizer.playCloudJackGrunt(ctx, dest, baseScale, vocalSource);
    }
  };

  return {
    id: aiOp.id,
    name: aiOp.name,
    width: 42 * baseScale, 
    length: 95.5 * baseScale,
    headWidth: 40.75 * baseScale,
    headHeight: 43 * baseScale,
    shoulderHeight: `${(71 * baseScale).toFixed(1)} inches`,
    color: aiOp.color,
    eyeColor: aiOp.eyeColor,
    noseColor: aiOp.noseColor,
    tailColor: aiOp.tailColor,
    innerEarColor: aiOp.innerEarColor,
    gender: aiOp.sex === "Jill" ? "Female" : "Male",
    headOrientation: "Standard",
    description: aiOp.description || `A synthesized ${aiOp.sex} opossum with a ${aiOp.color} coat and ${aiOp.vocalSource} vocal signature.`,
    isAI: true,
    isAIGenerated: true,
    aiData: aiOp,
    playChatter: playChatterFn
  };
};

export default convertAItoCharacter;
