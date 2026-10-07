/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ThemeGardenGeneral } from "./General";

export interface ThemeGardenProps {
  children: React.ReactNode;
}

export const ThemeGarden: React.FC<ThemeGardenProps> = ({ children }) => {
  return (
    <div id="Theme_Garden_Layout" className="w-full min-h-screen bg-gradient-to-b from-sky-400 via-emerald-800 to-green-950 text-emerald-50 font-sans flex flex-col relative overflow-y-auto">
      {/* Garden Decorative Brick Border Styling Overlay */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export { ThemeGardenGeneral };
