/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Onscreen_Buttons_4_Mobile_Portrait_Phone } from "../../../Components/Onscreen_Buttons_4_Mobile_Portrait_Phone";

export interface VerticalTouchControllerProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onJump: () => void;
  onMoveUpStart?: () => void;
  onMoveUpEnd?: () => void;
  onMoveDownStart?: () => void;
  onMoveDownEnd?: () => void;
  onSetCruiseLowStop?: () => void;
  onSetCruiseHigh?: () => void;
  className?: string;
  showVisualButtons?: boolean;
}

export const VerticalTouchController: React.FC<VerticalTouchControllerProps> = ({
  onMoveLeft,
  onMoveRight,
  onJump,
  onMoveUpStart,
  onMoveUpEnd,
  onMoveDownStart,
  onMoveDownEnd,
  onSetCruiseLowStop,
  onSetCruiseHigh,
  className = "",
  showVisualButtons = true
}) => {
  return (
    <Onscreen_Buttons_4_Mobile_Portrait_Phone
      onMoveLeft={onMoveLeft}
      onMoveRight={onMoveRight}
      onJump={onJump}
      onMoveUpStart={onMoveUpStart}
      onMoveUpEnd={onMoveUpEnd}
      onMoveDownStart={onMoveDownStart}
      onMoveDownEnd={onMoveDownEnd}
      onSetCruiseLowStop={onSetCruiseLowStop}
      onSetCruiseHigh={onSetCruiseHigh}
      className={className}
      showVisualButtons={showVisualButtons}
    />
  );
};

