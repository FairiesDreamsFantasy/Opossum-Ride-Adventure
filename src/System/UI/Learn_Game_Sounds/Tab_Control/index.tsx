/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
export * from "./General";

interface TabControlProps {
  activeTab: "feral_pigs" | "monkeys" | "moose" | "obstacles" | "opossums";
  onTabChange: (tab: "feral_pigs" | "monkeys" | "moose" | "obstacles" | "opossums") => void;
}

export const TabControl: React.FC<TabControlProps> = ({ activeTab, onTabChange }) => {
  const tabList: Array<"feral_pigs" | "monkeys" | "moose" | "obstacles" | "opossums"> = [
    "feral_pigs",
    "monkeys",
    "moose",
    "obstacles",
    "opossums"
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabList.length;
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabList.length) % tabList.length;
      e.preventDefault();
    } else if (e.key === "Home") {
      nextIndex = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      nextIndex = tabList.length - 1;
      e.preventDefault();
    }

    if (nextIndex !== currentIndex) {
      const nextTab = tabList[nextIndex];
      onTabChange(nextTab);
      const targetBtn = document.getElementById(`tab-btn-${nextTab.replace("_", "-")}`);
      targetBtn?.focus();
    }
  };

  return (
    <nav
      id="Learn_Game_Sounds_Tab_Nav"
      aria-label="Sound Categories Navigation"
      className="w-full mb-6 border-b border-amber-400/40 pb-3"
    >
      <div
        role="tablist"
        aria-label="Sound Category Tabs"
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-4"
      >
        {/* Feral Pigs button placed to the left of Monkeys */}
        <button
          id="tab-btn-feral-pigs"
          role="tab"
          type="button"
          aria-selected={activeTab === "feral_pigs"}
          aria-controls="Learn_Game_Sounds_Feral_Pigs_Panel"
          tabIndex={activeTab === "feral_pigs" ? 0 : -1}
          onClick={() => onTabChange("feral_pigs")}
          onKeyDown={(e) => handleKeyDown(e, 0)}
          className={`cursor-pointer px-6 py-2.5 rounded-t-lg font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 min-h-[44px] flex items-center justify-center ${
            activeTab === "feral_pigs"
              ? "bg-amber-400 text-zinc-950 shadow-[0_-2px_10px_rgba(251,191,36,0.5)] border-t-2 border-x-2 border-amber-300 font-extrabold"
              : "bg-zinc-900/90 text-amber-200/90 hover:bg-zinc-800 hover:text-white border-t border-x border-zinc-700/80"
          }`}
        >
          Feral Pigs
        </button>

        <button
          id="tab-btn-monkeys"
          role="tab"
          type="button"
          aria-selected={activeTab === "monkeys"}
          aria-controls="Learn_Game_Sounds_Monkeys_Panel"
          tabIndex={activeTab === "monkeys" ? 0 : -1}
          onClick={() => onTabChange("monkeys")}
          onKeyDown={(e) => handleKeyDown(e, 1)}
          className={`cursor-pointer px-6 py-2.5 rounded-t-lg font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 min-h-[44px] flex items-center justify-center ${
            activeTab === "monkeys"
              ? "bg-amber-400 text-zinc-950 shadow-[0_-2px_10px_rgba(251,191,36,0.5)] border-t-2 border-x-2 border-amber-300 font-extrabold"
              : "bg-zinc-900/90 text-amber-200/90 hover:bg-zinc-800 hover:text-white border-t border-x border-zinc-700/80"
          }`}
        >
          Monkeys
        </button>

        <button
          id="tab-btn-moose"
          role="tab"
          type="button"
          aria-selected={activeTab === "moose"}
          aria-controls="Learn_Game_Sounds_Moose_Panel"
          tabIndex={activeTab === "moose" ? 0 : -1}
          onClick={() => onTabChange("moose")}
          onKeyDown={(e) => handleKeyDown(e, 2)}
          className={`cursor-pointer px-6 py-2.5 rounded-t-lg font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 min-h-[44px] flex items-center justify-center ${
            activeTab === "moose"
              ? "bg-amber-400 text-zinc-950 shadow-[0_-2px_10px_rgba(251,191,36,0.5)] border-t-2 border-x-2 border-amber-300 font-extrabold"
              : "bg-zinc-900/90 text-amber-200/90 hover:bg-zinc-800 hover:text-white border-t border-x border-zinc-700/80"
          }`}
        >
          Moose
        </button>

        <button
          id="tab-btn-obstacles"
          role="tab"
          type="button"
          aria-selected={activeTab === "obstacles"}
          aria-controls="Learn_Game_Sounds_Obstacles_Panel"
          tabIndex={activeTab === "obstacles" ? 0 : -1}
          onClick={() => onTabChange("obstacles")}
          onKeyDown={(e) => handleKeyDown(e, 3)}
          className={`cursor-pointer px-6 py-2.5 rounded-t-lg font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 min-h-[44px] flex items-center justify-center ${
            activeTab === "obstacles"
              ? "bg-amber-400 text-zinc-950 shadow-[0_-2px_10px_rgba(251,191,36,0.5)] border-t-2 border-x-2 border-amber-300 font-extrabold"
              : "bg-zinc-900/90 text-amber-200/90 hover:bg-zinc-800 hover:text-white border-t border-x border-zinc-700/80"
          }`}
        >
          Obstacles
        </button>

        <button
          id="tab-btn-opossums"
          role="tab"
          type="button"
          aria-selected={activeTab === "opossums"}
          aria-controls="Learn_Game_Sounds_Opossums_Panel"
          tabIndex={activeTab === "opossums" ? 0 : -1}
          onClick={() => onTabChange("opossums")}
          onKeyDown={(e) => handleKeyDown(e, 4)}
          className={`cursor-pointer px-6 py-2.5 rounded-t-lg font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 min-h-[44px] flex items-center justify-center ${
            activeTab === "opossums"
              ? "bg-amber-400 text-zinc-950 shadow-[0_-2px_10px_rgba(251,191,36,0.5)] border-t-2 border-x-2 border-amber-300 font-extrabold"
              : "bg-zinc-900/90 text-amber-200/90 hover:bg-zinc-800 hover:text-white border-t border-x border-zinc-700/80"
          }`}
        >
          Opossums
        </button>
      </div>
    </nav>
  );
};

export default TabControl;
