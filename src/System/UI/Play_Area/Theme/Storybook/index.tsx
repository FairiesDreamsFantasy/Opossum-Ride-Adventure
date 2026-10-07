/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ThemeStorybookGeneral } from "./General";

export interface ThemeStorybookProps {
  children: React.ReactNode;
}

export const ThemeStorybook: React.FC<ThemeStorybookProps> = ({ children }) => {
  return (
    <div id="Theme_Storybook_Layout" className="w-full h-screen bg-[#3d2712] text-[#332211] font-serif flex flex-col relative overflow-hidden">
      {/* Wooden Reading Table Desk Texture Background */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(0deg, rgba(0,0,0,0.2) 1px, transparent 1px)`,
          backgroundSize: `24px 24px`
        }}
      />

      {/* 8x11 Opened Book Wrapper with Cream Pages & Pink Cover */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-4 h-full">
        <div className="w-full max-w-6xl h-full max-h-[92vh] bg-[#ec4899] p-3 sm:p-5 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-4 border-[#be185d] flex flex-col">
          <div className="w-full h-full bg-[#fdf6e3] rounded-xl p-3 sm:p-4 border-2 border-[#d3c6aa] flex flex-col shadow-inner overflow-hidden relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ThemeStorybookGeneral };
