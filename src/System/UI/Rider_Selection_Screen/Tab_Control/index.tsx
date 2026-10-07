/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export * from "./General";

interface RiderTabControlProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const RiderTabControl: React.FC<RiderTabControlProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex justify-center mb-6 border-b border-green-900/60 pb-3">
      <button
        onClick={() => onTabChange("Primary")}
        aria-pressed={activeTab === "Primary"}
        className={`px-8 py-2.5 uppercase font-extrabold tracking-widest text-sm rounded-md transition-all cursor-pointer ${
          activeTab === "Primary"
            ? "bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            : "text-green-500 hover:text-green-300 bg-zinc-950 border border-green-900"
        }`}
      >
        Primary
      </button>
    </div>
  );
};
