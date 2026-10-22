/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ThemeLightGeneral } from "./General";

export interface ThemeLightProps {
  children: React.ReactNode;
}

export const ThemeLight: React.FC<ThemeLightProps> = ({ children }) => {
  return (
    <div id="Theme_Light_Layout" className="w-full min-h-screen bg-stone-100 text-stone-900 font-sans flex flex-col transition-colors duration-300">
      {children}
    </div>
  );
};

export { ThemeLightGeneral };
