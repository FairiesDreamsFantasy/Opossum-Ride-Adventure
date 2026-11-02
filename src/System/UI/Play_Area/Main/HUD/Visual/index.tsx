/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { OpossumCharacter, RiderCharacter, GameLevel } from "../../../../../../types";
import { PlaceResolver } from "../../../../../Engine/Resolver";

interface VisualHUDProps {
  showVisualHUD: boolean;
  defaultRider: RiderCharacter;
  selectedOpossum: OpossumCharacter;
  currentLevel: GameLevel;
  largeText?: boolean;
}

/**
 * VisualHUD Component
 * Displays overlay information for the player and opossum status.
 * Protected against arbitrary changes.
 */
export const VisualHUD: React.FC<VisualHUDProps> = ({
  showVisualHUD,
  defaultRider,
  selectedOpossum,
  currentLevel,
  largeText = false
}) => {
  if (!showVisualHUD) return null;

  const currentPlace = PlaceResolver.resolvePlace(currentLevel.placeId);
  const fontClass = largeText ? "text-xs md:text-sm font-bold animate-pulse" : "text-[10px]";

  return (
    <>
      <div className={`absolute top-3 left-3 flex flex-col gap-1 bg-black/75 border border-green-900 px-3 py-1.5 rounded text-left font-mono text-green-500 ${fontClass}`}>
        <p>RIDER: {defaultRider.name || "UNNAMED"} ({defaultRider.height})</p>
        <p>OPOSSUM: {selectedOpossum.name} ({selectedOpossum.gender})</p>
        <p>POSTURE: {selectedOpossum.headOrientation}</p>
      </div>

      <div className={`absolute top-3 right-3 bg-black/75 border border-green-900 px-3 py-1.5 rounded text-right font-mono text-green-500 ${fontClass}`}>
        <p>PLACE: {currentPlace.name}</p>
        <p>SURFACE: {currentPlace.surfaceType}</p>
        <p>SOUNDTRACK: {currentPlace.footstepSound}</p>
      </div>
    </>
  );
};
