/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ThemeForestGeneral } from "./General";

export interface ThemeForestProps {
  children: React.ReactNode;
}

export const ThemeForest: React.FC<ThemeForestProps> = ({ children }) => {
  return (
    <div id="Theme_Forest_Layout" className="w-full h-screen bg-slate-950 text-green-100 font-sans flex flex-col overflow-hidden relative">
      {/* Forest Canopy Background Gradient */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#15803d 1.5px, transparent 1.5px), radial-gradient(#166534 1.5px, #020617 1.5px)`,
          backgroundSize: `32px 32px`,
          backgroundPosition: `0 0, 16px 16px`
        }}
      />
      <div className="relative z-10 flex-1 flex flex-col h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export { ThemeForestGeneral };
