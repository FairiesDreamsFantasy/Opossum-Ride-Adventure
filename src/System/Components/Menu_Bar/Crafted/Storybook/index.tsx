/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MenuBarComponentProps } from "../../General";
import { CraftedMenuBar as BaseMenuBar } from "../index";
import { MenuBarStorybookGeneral } from "./General";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export interface StorybookMenuBarProps extends MenuBarComponentProps {
  onReturnToLandingPage?: () => void;
  onOpenThemeModal?: () => void;
}

export const StorybookMenuBar: React.FC<StorybookMenuBarProps> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div id="Storybook_Vertical_Right_Sidebar" className={`fixed top-0 right-0 h-full z-40 flex transition-all duration-300 ${expanded ? "w-80" : "w-14"} bg-[#f4ebd9] text-[#433422] border-l-4 border-[#c5b597] shadow-2xl`}>
      {/* Sidebar Expand/Collapse Toggle Button */}
      <button
        type="button"
        onClick={() => {
          const next = !expanded;
          setExpanded(next);
          if (props.speakWords) props.speakWords(next ? "Expanded right sidebar menu" : "Collapsed right sidebar menu");
        }}
        aria-label={expanded ? "Collapse Right Sidebar Menu" : "Expand Right Sidebar Menu"}
        title={expanded ? "Collapse Menu" : "Expand Menu"}
        className="w-14 h-14 bg-[#e6d7b8] hover:bg-[#d8c7a3] border-b border-r border-[#c5b597] flex items-center justify-center cursor-pointer text-[#433422] transition min-h-[44px]"
      >
        {expanded ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
      </button>

      {/* Expanded Content View */}
      {expanded && (
        <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4 font-serif">
          <div className="flex items-center gap-2 border-b-2 border-[#d3c6aa] pb-2">
            <BookOpen className="w-6 h-6 text-[#8b5a2b]" />
            <h3 className="font-bold text-lg text-[#5a3e1b]">Storybook Menu</h3>
          </div>

          <div className="space-y-2">
            {props.onReturnToLandingPage && (
              <button
                type="button"
                onClick={() => {
                  if (props.speakWords) props.speakWords("Returning to landing page from Storybook Theme");
                  props.onReturnToLandingPage?.();
                }}
                aria-label="Return to Landing Page"
                className="w-full text-left bg-[#e6d7b8] hover:bg-[#d8c7a3] text-[#433422] font-bold px-3 py-2.5 rounded border border-[#c5b597] text-xs uppercase min-h-[44px] cursor-pointer transition flex items-center gap-2"
              >
                <span>📖</span>
                <span>Landing Page</span>
              </button>
            )}

            {props.onOpenThemeModal && (
              <button
                type="button"
                onClick={props.onOpenThemeModal}
                aria-label="Switch Theme - Open Theme Selection Dialogue"
                className="w-full text-left bg-[#8b5a2b] hover:bg-[#6e4620] text-amber-100 font-bold px-3 py-2.5 rounded text-xs uppercase min-h-[44px] cursor-pointer transition shadow"
              >
                Switch Theme
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-[#d3c6aa] flex-1">
            <BaseMenuBar {...props} />
          </div>
        </div>
      )}
    </div>
  );
};

export { MenuBarStorybookGeneral };
