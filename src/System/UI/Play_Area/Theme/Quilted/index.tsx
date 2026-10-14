/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ThemeQuiltedGeneral } from "./General";

export interface ThemeQuiltedProps {
  children: React.ReactNode;
}

export const ThemeQuilted: React.FC<ThemeQuiltedProps> = ({ children }) => {
  return (
    <div id="Theme_Quilted_Layout" className="w-full min-h-screen bg-[#111322] text-indigo-100 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background Tatami Mat Texture Pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px), radial-gradient(#312e81 1px, #111322 1px)`,
          backgroundSize: `40px 40px`,
          backgroundPosition: `0 0, 20px 20px`
        }}
      />
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export { ThemeQuiltedGeneral };
