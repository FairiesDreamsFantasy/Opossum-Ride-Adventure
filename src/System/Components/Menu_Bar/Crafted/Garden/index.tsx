/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MenuBarComponentProps } from "../../General";
import { CraftedMenuBar as BaseMenuBar } from "../index";
import { MenuBarGardenGeneral } from "./General";

export interface GardenMenuBarProps extends MenuBarComponentProps {
  onReturnToLandingPage?: () => void;
  onOpenThemeModal?: () => void;
}

export const GardenMenuBar: React.FC<GardenMenuBarProps> = (props) => {
  return (
    <div id="Garden_Menu_Bar_Wrapper" className="w-full bg-emerald-950/90 border-b-2 border-emerald-700/80 shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between px-3 py-1.5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {props.onReturnToLandingPage && (
            <button
              type="button"
              onClick={() => {
                if (props.speakWords) props.speakWords("Returning to landing page from Garden Theme");
                props.onReturnToLandingPage?.();
              }}
              aria-label="Return to Landing Page - Garden Theme"
              className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 px-3 py-1.5 rounded border border-emerald-600 min-h-[44px] cursor-pointer transition shadow"
            >
              <span className="w-3 h-3 bg-lime-400 rounded-sm inline-block" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Landing Page</span>
            </button>
          )}

          {props.onOpenThemeModal && (
            <button
              type="button"
              onClick={props.onOpenThemeModal}
              aria-label="Switch Theme - Open Theme Selection Dialogue"
              className="bg-emerald-900 hover:bg-emerald-800 text-emerald-200 px-3 py-1.5 rounded text-xs font-bold uppercase border border-emerald-600 min-h-[44px] cursor-pointer transition"
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

export { MenuBarGardenGeneral };
