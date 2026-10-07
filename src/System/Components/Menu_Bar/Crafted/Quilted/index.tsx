/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MenuBarComponentProps } from "../../General";
import { CraftedMenuBar as BaseMenuBar } from "../index";
import { MenuBarQuiltedGeneral } from "./General";

export interface QuiltedMenuBarProps extends MenuBarComponentProps {
  onReturnToLandingPage?: () => void;
  onOpenThemeModal?: () => void;
}

export const QuiltedMenuBar: React.FC<QuiltedMenuBarProps> = (props) => {
  return (
    <div id="Quilted_Menu_Bar_Wrapper" className="w-full bg-indigo-950/90 border-b-2 border-indigo-700/80 shadow-[0_4px_20px_rgba(30,27,75,0.8)] backdrop-blur-md">
      <div className="flex items-center justify-between px-2 py-1 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {props.onReturnToLandingPage && (
            <button
              type="button"
              onClick={() => {
                if (props.speakWords) props.speakWords("Returning to Opossum Ride Adventure landing page");
                props.onReturnToLandingPage?.();
              }}
              aria-label="Return to Opossum Ride Adventure Landing Page - Icon of person riding on an opossum"
              title="Return to Landing Page"
              className="flex items-center gap-2 bg-indigo-900 hover:bg-indigo-800 text-indigo-100 px-3 py-1.5 rounded border border-indigo-500 min-h-[44px] cursor-pointer transition shadow-md"
            >
              {/* Opossum Rider Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-amber-300">
                <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                <path d="M19 13c0 3.5-2.5 6-7 6s-7-2.5-7-6c0-2.5 2-4.5 4.5-4.5h5c2.5 0 4.5 2 4.5 4.5z"/>
                <path d="M4 17l-2 3"/>
                <path d="M20 17l2 3"/>
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Landing Page</span>
            </button>
          )}

          {props.onOpenThemeModal && (
            <button
              type="button"
              onClick={props.onOpenThemeModal}
              aria-label="Switch Theme - Open Theme Selection Dialogue"
              className="bg-indigo-900 hover:bg-indigo-800 text-indigo-200 px-3 py-1.5 rounded text-xs font-bold uppercase border border-indigo-600 min-h-[44px] cursor-pointer transition flex items-center gap-1.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block animate-pulse" />
              <span>Switch Theme</span>
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

export { MenuBarQuiltedGeneral };
