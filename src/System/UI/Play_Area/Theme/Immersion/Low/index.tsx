/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ThemeImmersionLowGeneral } from "./General";

export interface ThemeImmersionLowProps {
  children: React.ReactNode;
}

export const ThemeImmersionLow: React.FC<ThemeImmersionLowProps> = ({ children }) => {
  return (
    <div id="Theme_Immersion_Low_Layout" className="w-full min-h-screen bg-black text-cyan-200 font-mono flex flex-col relative overflow-y-auto">
      {children}
    </div>
  );
};

export { ThemeImmersionLowGeneral };
