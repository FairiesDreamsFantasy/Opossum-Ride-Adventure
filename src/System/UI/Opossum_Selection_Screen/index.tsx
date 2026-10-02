/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { OpossumId, OpossumCharacter } from "../../../types";
import { OPOSSUM_CHARACTERS } from "../../../Characters/Opossums";
import { ProceduralSoundSystem } from "../../Sound";
import { OpossumSelectionHeader } from "./Header";
import { OpossumSelectionMain } from "./Main";
import { OpossumSelectionFooter } from "./Footer";
import { MobilePortraitOpossumSelection } from "./Mobile_Portrait_4_Phone";
import { useMobilePortraitPhone } from "../../Keyboards_and_Controllers/Device_Detection";
import { ScreenReader } from "../../Accessibility/ScreenReader";
import { calculateMaxRiderHeight, getOpossumAestheticDescription } from "./General";

import { convertAItoCharacter } from "../../../utils/ai-conversion";
import { convertCompactToCharacter } from "../../../Characters/Opossums/Generic";

export * from "./Mobile_Portrait_4_Phone";

interface OpossumSelectionScreenProps {
  onSelectOpossum: (opossum: OpossumCharacter) => void;
  onBack: () => void;
  selectedRider?: import("../../../types").RiderCharacter | null;
}

export const OpossumSelection: React.FC<OpossumSelectionScreenProps> = ({
  onSelectOpossum,
  onBack,
  selectedRider,
}) => {
  const [selectedId, setSelectedId] = useState<OpossumId>(OpossumId.MELISSA);
  const soundSystemRef = useRef(new ProceduralSoundSystem());
  const { isMobilePortraitPhone } = useMobilePortraitPhone();
  
  const currentOpossum = OPOSSUM_CHARACTERS.find((o) => o.id === selectedId) || OPOSSUM_CHARACTERS[0];

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Prevent triggering if inside input elements
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea") return;

      if (e.key === "r" || e.key === "R" || e.code === "KeyR") {
        const { feet, inches } = calculateMaxRiderHeight(currentOpossum);
        const aesthetic = getOpossumAestheticDescription(currentOpossum);
        const spokenText = `Profile of ${currentOpossum.name}. Description: ${currentOpossum.description} She features a body length of ${currentOpossum.length} inches, with a body width of ${currentOpossum.width} inches and a registered shoulder height of ${currentOpossum.shoulderHeight}. Perfect spacing accommodates rider heights of up to ${feet} feet and ${inches} inches comfortably. ${aesthetic}`;
        
        ScreenReader.announceText(spokenText, "USER_COMMAND");
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentOpossum]);

  const handleSelect = (id: OpossumId) => {

    setSelectedId(id);
    const chosen = OPOSSUM_CHARACTERS.find((o) => o.id === id);
    if (chosen) {
      soundSystemRef.current.playOpossumChatter(false, id, chosen.playChatter);
    } else {
      soundSystemRef.current.playOpossumChatter(false, id);
    }
  };

  const handleStart = (selectedEntity?: any) => {
    if (selectedEntity) {
      if (selectedEntity.category === "compact" || selectedEntity.outerEarColor) {
        const converted = convertCompactToCharacter(selectedEntity);
        onSelectOpossum(converted);
      } else {
        const converted = convertAItoCharacter(selectedEntity);
        onSelectOpossum(converted);
      }
    } else {
      soundSystemRef.current.playOpossumChatter(false, currentOpossum.id, currentOpossum.playChatter);
      onSelectOpossum(currentOpossum);
    }
  };

  // Dedicated Mobile Portrait Phone layout: Exclusive for mobile phones held vertically
  if (isMobilePortraitPhone) {
    return (
      <MobilePortraitOpossumSelection
        opossums={OPOSSUM_CHARACTERS}
        selectedOpossum={currentOpossum}
        onSelectOpossum={(op) => {
          setSelectedId(op.id as OpossumId);
        }}
        onConfirm={() => {
          handleStart();
        }}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-sans flex flex-col p-4 md:p-8">
      <OpossumSelectionHeader onBack={onBack} />

      <div className="mb-4">
        <h2 className="text-2xl md:text-3.5xl font-extrabold uppercase text-green-300 mb-2">
          Pick An Opossum To Ride
        </h2>
      </div>

      <OpossumSelectionMain
        selectedId={selectedId}
        currentOpossum={currentOpossum}
        onSelect={handleSelect}
        onStart={handleStart}
        onBack={onBack}
        selectedRider={selectedRider}
      />

      <OpossumSelectionFooter />
    </div>
  );
};
