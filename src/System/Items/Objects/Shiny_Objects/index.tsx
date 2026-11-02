/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { SilverObject } from "./Silver";
import { GoldObject } from "./Gold";
import { EmeraldObject } from "./Emerald";
import { DiamondObject } from "./Diamond";

export { SilverObject } from "./Silver";
export { GoldObject } from "./Gold";
export { EmeraldObject } from "./Emerald";
export { DiamondObject } from "./Diamond";

export interface ShinyObjectProps {
  type: "silver" | "gold" | "emerald" | "diamond";
  size?: number;
  className?: string;
}

export const ShinyObject: React.FC<ShinyObjectProps> = ({ type, size = 64, className = "" }) => {
  switch (type) {
    case "silver":
      return <SilverObject size={size} className={className} />;
    case "gold":
      return <GoldObject size={size} className={className} />;
    case "emerald":
      return <EmeraldObject size={size} className={className} />;
    case "diamond":
      return <DiamondObject size={size} className={className} />;
    default:
      return <GoldObject size={size} className={className} />;
  }
};
