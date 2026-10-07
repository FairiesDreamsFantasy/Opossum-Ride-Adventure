/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface RetroVerticalMainProps {
  children: React.ReactNode;
  className?: string;
}

export const RetroVerticalMain: React.FC<RetroVerticalMainProps> = ({ children, className = "" }) => {
  return (
    <main
      id="Retro_Vertical_Main_Viewport"
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden bg-black ${className}`}
      role="main"
    >
      {children}
    </main>
  );
};
