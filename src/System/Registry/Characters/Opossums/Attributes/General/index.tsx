/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OPOSSUM_CHARACTERS } from "../../../../../../Characters/Opossums";
import { OpossumsAttributesDesign } from "../Design";

export class OpossumsAttributesGeneral {
  /**
   * Returns a complete profile of all attributes for a given opossum ID.
   */
  public static getAttributesForOpossum(id: string) {
    const matched = OPOSSUM_CHARACTERS.find((o) => o.id === id);
    if (!matched) return null;

    const lookupId = matched.id === "arden_rosie" ? "arden_rosie_kone_reynolds" : matched.id;

    // Resolve specific details from Design Lookups
    return {
      id: matched.id,
      name: matched.name,
      skinColor: OpossumsAttributesDesign.Skin_Color.getByOpossumId(lookupId),
      pattern: OpossumsAttributesDesign.With_Patterns.getByOpossumId(lookupId),
      furColor: OpossumsAttributesDesign.Fur_Color.getByOpossumId(lookupId),
      tailColor: OpossumsAttributesDesign.Tail_Color.getByOpossumId(lookupId),
      tailDesign: OpossumsAttributesDesign.Tail_Color_With_Design.getByOpossumId(lookupId),
      noseColor: OpossumsAttributesDesign.Nose_Color.getByOpossumId(lookupId),
      shoulderHeight: OpossumsAttributesDesign.Shoulder_Height.getByOpossumId(lookupId),
      bodyWidth: OpossumsAttributesDesign.Body_Width.getByOpossumId(lookupId),
      bodyLengthExcludingHeadTail: OpossumsAttributesDesign.Body_Length_excluding_head_and_tail.getByOpossumId(lookupId),
      fullBodyLength: OpossumsAttributesDesign.Full_Body_Length.getByOpossumId(lookupId),
      headWidth: OpossumsAttributesDesign.Head_Width.getByOpossumId(lookupId),
      headHeightExcludingEars: OpossumsAttributesDesign.Head_Height_excluding_ears.getByOpossumId(lookupId),
      fullHeadHeight: OpossumsAttributesDesign.Full_Head_Height.getByOpossumId(lookupId),
      totalHeightExcludingEars: OpossumsAttributesDesign.Total_Height_excluding_ears.getByOpossumId(lookupId),
      totalHeight: OpossumsAttributesDesign.Total_Height.getByOpossumId(lookupId),
      eyeColor: OpossumsAttributesDesign.Eye_Color.getByOpossumId(lookupId),
      snoutLength: OpossumsAttributesDesign.Snout_Length.getByOpossumId(lookupId),
      furryFace: OpossumsAttributesDesign.Furry_Face.getByOpossumId(lookupId),
      accessories: OpossumsAttributesDesign.Accessories.getByOpossumId(lookupId),
      tailLength: OpossumsAttributesDesign.Tail_Length.getByOpossumId(lookupId),
      earOrientation: OpossumsAttributesDesign.Ear_Orientation.getByOpossumId(lookupId),
      earLength: OpossumsAttributesDesign.Ear_Length.getByOpossumId(lookupId),
      pawColor: OpossumsAttributesDesign.Paw_Color.getByOpossumId(lookupId),
      pawPadColor: OpossumsAttributesDesign.Paw_Pad_Color.getByOpossumId(lookupId),
      earColor: OpossumsAttributesDesign.Ear_Color.getByOpossumId(lookupId),
      innerEarColor: OpossumsAttributesDesign.Inner_Ear_Color.getByOpossumId(lookupId),
      earColorWithPatterns: OpossumsAttributesDesign.Ear_Color_With_Patterns.getByOpossumId(lookupId),
      headFurColor: OpossumsAttributesDesign.Head_Fur_Color.getByOpossumId(lookupId),
      furryFaceColor: OpossumsAttributesDesign._Furry_Face_Color.getByOpossumId(lookupId),
      bodyFurThickness: OpossumsAttributesDesign.Body_Fur_Thickness.getByOpossumId(lookupId),
      furryTailPercentage: OpossumsAttributesDesign.Furry_Tail_Percentage.getByOpossumId(lookupId),
      pawSize: OpossumsAttributesDesign.Paw_Size.getByOpossumId(lookupId),
      legLength: OpossumsAttributesDesign.Leg_Length.getByOpossumId(lookupId),
      pawWidth: OpossumsAttributesDesign.Paw_Width.getByOpossumId(lookupId),
      legWidth: OpossumsAttributesDesign.Leg_Width.getByOpossumId(lookupId),
      hasElegantChatter: OpossumsAttributesDesign.Has_Elegant_Chatter.getByOpossumId(lookupId),
      hasElegantTrot: OpossumsAttributesDesign.Has_Elegant_Trot.getByOpossumId(lookupId),
      tailThickness: OpossumsAttributesDesign.Tail_Thickness.getByOpossumId(lookupId),
    };
  }

  /**
   * Returns all 16 opossums sorted or filtered by a specific design attribute key and value.
   */
  public static queryOpossumsByAttribute<K extends keyof ReturnType<typeof OpossumsAttributesGeneral.getAttributesForOpossum>>(
    key: K,
    value: any
  ) {
    return OPOSSUM_CHARACTERS.filter((o) => {
      const attrs = OpossumsAttributesGeneral.getAttributesForOpossum(o.id);
      if (!attrs) return false;
      const attrVal = attrs[key];
      if (typeof attrVal === "object" && attrVal !== null) {
        // Handle complex objects such as tone structures by matching name or value
        return JSON.stringify(attrVal).toLowerCase().includes(String(value).toLowerCase());
      }
      return String(attrVal).toLowerCase() === String(value).toLowerCase();
    });
  }
}

export default OpossumsAttributesGeneral;
