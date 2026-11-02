/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ThemeDarkGeneral } from "./General";

export interface ThemeDarkProps {
  children: React.ReactNode;
}

export const ThemeDark: React.FC<ThemeDarkProps> = ({ children }) => {
  return (
    <div id="Theme_Dark_Layout" className="w-full min-h-screen bg-zinc-950 text-white font-sans flex flex-col transition-colors duration-300">
      {children}
    </div>
  );
};

export { ThemeDarkGeneral };
