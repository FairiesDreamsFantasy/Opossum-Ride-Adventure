/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MenuBarComponentProps } from "../../General";
import { CraftedMenuBar as BaseMenuBar } from "../index";
import { MenuBarForestGeneral } from "./General";

export interface ForestMenuBarProps extends MenuBarComponentProps {
  onReturnToLandingPage?: () => void;
  onOpenThemeModal?: () => void;
}

export const ForestMenuBar: React.FC<ForestMenuBarProps> = (props) => {
  return (
    <div id="Forest_Top_Floating_Menu_Bar" className="w-full bg-slate-950/95 border-b border-green-700/60 shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-md z-40">
      <div className="flex items-center justify-between px-3 py-1.5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {props.onReturnToLandingPage && (
            <button
              type="button"
              onClick={() => {
                if (props.speakWords) props.speakWords("Returning to landing page from Forest Theme");
                props.onReturnToLandingPage?.();
              }}
              aria-label="Return to Landing Page - Forest Theme"
              className="flex items-center gap-2 bg-green-950 hover:bg-green-900 text-green-200 px-3 py-1.5 rounded border border-green-700 min-h-[44px] cursor-pointer transition shadow"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Landing Page</span>
            </button>
          )}

          {props.onOpenThemeModal && (
            <button
              type="button"
              onClick={props.onOpenThemeModal}
              aria-label="Switch Theme - Open Theme Selection Dialogue"
              className="bg-green-950 hover:bg-green-900 text-green-300 px-3 py-1.5 rounded text-xs font-bold uppercase border border-green-700 min-h-[44px] cursor-pointer transition"
            >
              Switch Theme
            </button>
          )}
        </div>

        <div className="flex-1 max-w-4xl">
          <BaseMenuBar {...props} />
        </div>
      </div>
    </div>
  );
};

export { MenuBarForestGeneral };
