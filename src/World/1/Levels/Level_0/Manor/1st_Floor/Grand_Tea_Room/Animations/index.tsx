/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { RenderGrandTeaRoomNorthWall } from "./North";
import { RenderGrandTeaRoomSouthWall } from "./South";
import { RenderGrandTeaRoomEastWall } from "./East";
import { RenderGrandTeaRoomWestWall } from "./West";

export * from "./North";
export * from "./South";
export * from "./East";
export * from "./West";

export interface GrandTeaRoomAnimationsProps {
  activeDirection?: string;
  className?: string;
}

export const GrandTeaRoomAnimations: React.FC<GrandTeaRoomAnimationsProps> = ({
  activeDirection = "East",
  className = ""
}) => {
  return (
    <div className={`grand-tea-room-animations bg-zinc-950 p-4 rounded-xl border border-purple-900 shadow-2xl ${className}`}>
      {activeDirection === "North" && <RenderGrandTeaRoomNorthWall />}
      {activeDirection === "South" && <RenderGrandTeaRoomSouthWall />}
      {activeDirection === "East" && <RenderGrandTeaRoomEastWall />}
      {activeDirection === "West" && <RenderGrandTeaRoomWestWall />}
    </div>
  );
};
