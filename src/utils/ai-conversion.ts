import { OpossumCharacter } from "../types";
import { AIOpossum } from "../System/UI/Opossum_Selection_Screen/General/AI_State";
import { DedicatedSFXSynthesizer } from "../System/Sound/SFX";

let sfxSynthesizer: DedicatedSFXSynthesizer | null = null;

/**
 * Converts a synthesized AI Opossum into a standard OpossumCharacter
 * for use within the game engine.
 */
export const convertAItoCharacter = (aiOp: AIOpossum): OpossumCharacter => {
  // Use accurate scientific scaling for AI entities:
  // For shoulder height of ~5ft 11in (71 inches), length is ~95.5 inches (7'11.5"),
  // width is 42 inches, head width is 40.75 inches, and head height is 43 inches.
  const baseScale = aiOp.size || 1.0;

  const playChatterFn = (ctx: AudioContext, isRetro: boolean, dest: AudioNode) => {
    if (!sfxSynthesizer) {
      sfxSynthesizer = new DedicatedSFXSynthesizer();
    }
    const sex = aiOp.sex;
    if (sex === "Jill" || sex?.toLowerCase() === "female") {
      sfxSynthesizer.playCloudJillChatter(ctx, dest, baseScale);
    } else {
      sfxSynthesizer.playCloudJackGrunt(ctx, dest, baseScale);
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
    aiData: aiOp,
    playChatter: playChatterFn
  };
};
