/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EugeneRose2DAnimation } from "../2-D";

interface EugeneRose3DProps {
  width?: number;
  height?: number;
  className?: string;
}

export const EugeneRose3DAnimation: React.FC<EugeneRose3DProps> = (props) => {
  return (
    <div className="relative transform-gpu transition-all duration-300 hover:scale-105">
      <EugeneRose2DAnimation {...props} />
    </div>
  );
};
