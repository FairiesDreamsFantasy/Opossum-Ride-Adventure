/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../../../../types";
import { OpossumsAttributesDesign } from "../../../../../../../Registry/Characters/Opossums/Attributes/Design";

/**
 * Base Narration Logic
 * 
 * Provides mathematically exact, scientifically robust physical and biometric
 * descriptions of opossum mounts by pulling registered design attributes.
 * Zero-omission standard: shoulder height, width, length, nose, eyes, tail,
 * and capacity are guaranteed to be fully represented.
 */
export const BaseNarration = {
  /**
   * Helper extracting biometric design tokens from the design registry.
   */
  extractTokens: (opossum: OpossumCharacter) => {
    const opId = opossum.id === "arden_rosie" ? "arden_rosie_kone_reynolds" : opossum.id as string;
    
    // 1. Skin & Pattern Lookups
    const skinInfo = OpossumsAttributesDesign.Skin_Color.getByOpossumId(opId);
    const skinLabel = (OpossumsAttributesDesign.Skin_Color as any)[skinInfo.root]?.[skinInfo.tone]?.label || "Alabaster Off-White";
    const pattern = OpossumsAttributesDesign.With_Patterns.getByOpossumId(opId);
    const patternLabel = (OpossumsAttributesDesign.With_Patterns as any)[pattern]?.label || "Solid Plain";
    
    // 2. Fur & Face Lookups
    const furThickness = OpossumsAttributesDesign.Body_Fur_Thickness.getByOpossumId(opId);
    const furryFacePercentage = OpossumsAttributesDesign.Furry_Face.getByOpossumId(opId);
    const faceFurColor = OpossumsAttributesDesign._Furry_Face_Color.getByOpossumId(opId);
    
    // 3. Ear Lookups
    const earLength = OpossumsAttributesDesign.Ear_Length.getByOpossumId(opId);
    const earOrient = OpossumsAttributesDesign.Ear_Orientation.getByOpossumId(opId);
    const outerEarColor = OpossumsAttributesDesign.Ear_Color.getByOpossumId(opId);
    const earPattern = OpossumsAttributesDesign.Ear_Color_With_Patterns.getByOpossumId(opId);
    
    // 4. Paw & Tail Lookups
    const pawCol = OpossumsAttributesDesign.Paw_Color.getByOpossumId(opId);
    const pawPadCol = OpossumsAttributesDesign.Paw_Pad_Color.getByOpossumId(opId);
    const tailDesign = OpossumsAttributesDesign.Tail_Color_With_Design.getByOpossumId(opId);
    const tailPct = OpossumsAttributesDesign.Furry_Tail_Percentage.getByOpossumId(opId);
    
    // 5. Narrative Pronouns
    const pronoun = opossum.gender === "Male" ? "He" : "She";
    const possessive = opossum.gender === "Male" ? "His" : "Her";
    const sub = pronoun;

    // Formatting terms
    const earLengthTerm = earLength === "Long" ? "long and expressive" : (earLength === "Medium" ? "medium-length" : "conventional, balanced proportion");
    const earOrientTerm = earOrient === "Forward Leaning" ? "forward-leaning" : "upright";
    const outerEarDesc = (earPattern && earPattern !== "Solid Plain") ? earPattern : `smooth ${outerEarColor}`;
    const coatPatternSentence = (pattern && pattern !== "none" && patternLabel !== "Plain / Solid No Pattern" && patternLabel !== "Solid Plain")
      ? `which is organized as a ${patternLabel}`
      : "which is a solid plain coat with no patterns";

    const visualSignature = `${possessive} visual signature features ${earLengthTerm} ears set in an ${earOrientTerm} orientation, with outer surfaces of ${outerEarDesc} facing the rider, complemented by a ${furThickness} ${opossum.color} coat ${coatPatternSentence} and beautiful ${skinLabel} skin.`;

    const faceText = furryFacePercentage > 0
      ? `${pronoun} possesses a unique, partially furry face (${furryFacePercentage}% furry face skin coverage) with a lovely ${faceFurColor} face fur tone, contrasting with ${possessive.toLowerCase()} main coat.`
      : `${pronoun} features a completely hairless, smooth ${skinLabel} face skin.`;

    const feetTextPawsOnly = `${possessive} paws are colored ${pawCol} with soft ${pawPadCol} paw pads underneath for perfect silent footing.`;
    const feetTextWithEars = `${feetTextPawsOnly} ${possessive} ears are lined with a delicate ${opossum.innerEarColor} inner-ear lining.`;

    const tailText = tailPct > 0
      ? `${possessive} tail is ${tailPct}% covered in rich fur, featuring a specialized design: ${tailDesign}.`
      : `${pronoun} has a classic, hairless tactile prehensile tail with a ${opossum.tailColor} coloration.`;

    const accessory = OpossumsAttributesDesign.Accessories.getByOpossumId(opId);
    const accText = accessory !== "None"
      ? `For adornment, ${pronoun.toLowerCase()} proudly wears handcrafted accessories: ${accessory}.`
      : `${pronoun} wears no physical jewelry, displaying ${possessive.toLowerCase()} natural grace and elegant form.`;

    const pose = opossum.headOrientation || (opossum.gender === "Male" ? "perched upright with noble focus" : "perched on top of her neck");
    const poseText = `${possessive} head orientation is ${pose}, measuring ${opossum.headWidth} inches in head width and ${opossum.headHeight} inches in head height (excluding ears).`;

    return {
      sub,
      pronoun,
      possessive,
      skinLabel,
      patternLabel,
      coatPatternSentence,
      outerEarDesc,
      earLengthTerm,
      earOrientTerm,
      visualSignature,
      faceText,
      feetTextPawsOnly,
      feetTextWithEars,
      tailText,
      accText,
      pose,
      poseText
    };
  },

  /**
   * Generates a descriptive string of an opossum's physical appearance.
   */
  describePhysicalAesthetic: (opossum: OpossumCharacter): string => {
    const t = BaseNarration.extractTokens(opossum);
    return `${t.visualSignature} ${t.faceText} ${t.feetTextWithEars} ${t.tailText} ${t.accText} ${t.poseText}`;
  },

  /**
   * Generates the In-Game Welcome / Mount Narration.
   * Format:
   * "You are riding [name], an esteemed [Gender] opossum mount. [sub] stands at a shoulder height of [shoulder height],
   * with a body width of [width] inches, a body length of [length] inches, a head width of [headWidth] inches, and a head height of [headHeight] inches (excluding ears). Coat: [fur] ([coat pattern]).
   * [possessive] face skin is [skinLabel]. Eyes: [eyes]. Nose: [nose]. Tail: [tail].
   * Ears: [outerEarDesc], set in a [earLengthTerm] [earOrientTerm] orientation, and lined with a delicate [innerEars] inner-ear lining.
   * [faceText] [feetText] [tailText] [accText] [poseText] Background: [description without duplicates]"
   */
  compileRiddenMountProfile: (opossum: OpossumCharacter): string => {
    const t = BaseNarration.extractTokens(opossum);
    const intro = `You are riding ${opossum.name}, an esteemed ${opossum.gender} opossum mount.`;
    const measurements = `${t.sub} stands at a shoulder height of ${opossum.shoulderHeight}, with a body width of ${opossum.width} inches, a body length of ${opossum.length} inches, a head width of ${opossum.headWidth} inches, and a head height of ${opossum.headHeight} inches (excluding ears).`;
    const features = `Coat: ${opossum.color} (${t.patternLabel}). ${t.possessive} face skin is ${t.skinLabel}. Eyes: ${opossum.eyeColor}. Nose: ${opossum.noseColor}. Tail: ${opossum.tailColor}. Ears: ${t.outerEarDesc}, set in a ${t.earLengthTerm} ${t.earOrientTerm} orientation, and lined with a delicate ${opossum.innerEarColor} inner-ear lining.`;
    const details = `${t.faceText} ${t.feetTextPawsOnly} ${t.tailText} ${t.accText} ${t.poseText}`;
    const background = `Background: ${opossum.description}`;

    return `${intro} ${measurements} ${features} ${details} ${background}`.trim();
  },

  /**
   * Generates the Selection Screen Profile when "r" key is pressed.
   * Format:
   * "Profile of [name]. [visual signature and complete aesthetic physical description] [pronoun] features a body length
   * of [length] inches, with a body width of [width] inches, a head width of [headWidth] inches, a head height of [headHeight] inches (excluding ears), and a registered shoulder height of [shoulder height].
   * Perfect spacing accommodates rider heights of up to [feet] feet and [inches] inches comfortably.
   * Nose: [nose]. Eyes: [eyes]. Background: [description]"
   */
  compileSelectionProfile: (opossum: OpossumCharacter): string => {
    const t = BaseNarration.extractTokens(opossum);
    const aesthetic = BaseNarration.describePhysicalAesthetic(opossum);
    const feet = 6;
    const inches = 3;
    const dimensions = `${t.pronoun} features a body length of ${opossum.length} inches, with a body width of ${opossum.width} inches, a head width of ${opossum.headWidth} inches, a head height of ${opossum.headHeight} inches (excluding ears), and a registered shoulder height of ${opossum.shoulderHeight}.`;
    const capacity = `Perfect spacing accommodates rider heights of up to ${feet} feet and ${inches} inches comfortably.`;
    const facial = `Nose: ${opossum.noseColor}. Eyes: ${opossum.eyeColor}.`;
    const background = `Background: ${opossum.description}`;

    return `Profile of ${opossum.name}. ${aesthetic} ${dimensions} ${capacity} ${facial} ${background}`.trim();
  }
};
