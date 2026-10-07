/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { MenuBarComponentProps } from "../../../General";
import { CraftedMenuBar as BaseMenuBar } from "../../index";
import { MenuBarImmersionLowGeneral } from "./General";

export interface ImmersionLowMenuBarProps extends MenuBarComponentProps {
  onReturnToLandingPage?: () => void;
  onOpenThemeModal?: () => void;
}

export const ImmersionLowMenuBar: React.FC<ImmersionLowMenuBarProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle menu bar on Alt+Shift+F
      if (e.altKey && e.shiftKey && (e.key === "F" || e.key === "f")) {
        e.preventDefault();
        setVisible((prev) => {
          const next = !prev;
          if (props.speakWords) props.speakWords(next ? "Opened Immersion Menu Bar" : "Closed Immersion Menu Bar");
          return next;
        });
      }
      if (e.key === "Escape" && visible) {
        setVisible(false);
        if (props.speakWords) props.speakWords("Closed Immersion Menu Bar");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, props.speakWords]);

  if (!visible) return null;

  return (
    <div id="Immersion_Low_Menu_Bar" className="fixed top-0 left-0 w-full bg-black/85 border-b border-cyan-500/50 shadow-2xl backdrop-blur-md z-50 animate-fade-in p-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto gap-2">
        <div className="flex items-center gap-2">
          {props.onReturnToLandingPage && (
            <button
              type="button"
              onClick={() => {
                if (props.speakWords) props.speakWords("Returning to landing page from Immersion Mode");
                props.onReturnToLandingPage?.();
              }}
              aria-label="Return to Landing Page"
              className="bg-cyan-950 hover:bg-cyan-900 text-cyan-200 px-3 py-1.5 rounded border border-cyan-600 font-mono text-xs uppercase min-h-[44px] cursor-pointer"
            >
              Landing Page
            </button>
          )}

          {props.onOpenThemeModal && (
            <button
              type="button"
              onClick={props.onOpenThemeModal}
              aria-label="Switch Theme - Open Theme Selection Dialogue"
              className="bg-cyan-900 hover:bg-cyan-800 text-white px-3 py-1.5 rounded font-mono text-xs uppercase border border-cyan-400 min-h-[44px] cursor-pointer"
            >
              Switch Theme
            </button>
          )}
        </div>

        <div className="flex-1 max-w-4xl">
          <BaseMenuBar {...props} />
        </div>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="text-xs text-cyan-400 font-mono px-2 py-1 border border-cyan-800 rounded hover:bg-cyan-950 min-h-[44px] cursor-pointer"
        >
          Close (Esc)
        </button>
      </div>
    </div>
  );
};

export { MenuBarImmersionLowGeneral };
