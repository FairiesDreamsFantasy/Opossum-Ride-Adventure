/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export * from "./Menu_Bar";
export * from "./Game_View";
export * from "./Game_View_2";
export * from "./HUD";

export interface MobilePlayAreaMainProps {
  children: React.ReactNode;
  className?: string;
}

export const MobilePlayAreaMain: React.FC<MobilePlayAreaMainProps> = ({ children, className = "" }) => {
  return (
    <main
      id="Mobile_Portrait_Play_Area_Main"
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden bg-black ${className}`}
      role="main"
    >
      {children}
    </main>
  );
};
