/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GrandTeaRoomGeneral } from "./General";
import { GrandTeaRoomDescription } from "./Description";
import { GrandTeaRoomDimensions } from "./Description/Dimensions";

export * from "./General";
export * from "./Description";
export * from "./Description/Dimensions";
export * from "./Animations";

export const GrandTeaRoomModule = {
  id: "grand_tea_room",
  name: "Grand Tea Room",
  location: "Manor 1st Floor (West of Floor Foyer)",
  dimensions: GrandTeaRoomDimensions,
  description: GrandTeaRoomDescription,
  timestamp: new Date().toISOString()
};

export const GrandTeaRoom: React.FC<{ playerX?: number; playerY?: number; facingDirection?: string }> = (props) => {
  return <GrandTeaRoomGeneral {...props} />;
};
