/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ThemeImmersionUltraGeneral } from "./General";

export interface ThemeImmersionUltraProps {
  children: React.ReactNode;
}

export const ThemeImmersionUltra: React.FC<ThemeImmersionUltraProps> = ({ children }) => {
  return (
    <div id="Theme_Immersion_Ultra_Layout" className="w-full h-screen bg-black text-white font-mono flex flex-col overflow-hidden relative">
      {children}
    </div>
  );
};

export { ThemeImmersionUltraGeneral };
