/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { RiderTabControl } from "../../../Rider_Selection_Screen/Tab_Control";
import { PrimaryRiderSelection } from "../../../Rider_Selection_Screen/Primary";
import { RIDER_CHARACTERS } from "../../../../../Characters/Riders";

interface RiderSelectionMainProps {
  selectedId: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}

export const RiderSelectionMain: React.FC<RiderSelectionMainProps> = ({
  selectedId,
  onSelect,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState("Primary");
  const currentRider =
    RIDER_CHARACTERS.find(
      (r) => (r.id || r.name.toLowerCase()) === selectedId
    ) || RIDER_CHARACTERS[0];

  return (
    <main className="flex-grow flex flex-col items-center w-full max-w-6xl mx-auto px-2">
      <h2 className="text-2xl md:text-3.5xl font-extrabold uppercase text-green-300 mb-2 text-center tracking-wide">
        Choose A Rider
      </h2>
      <p className="text-center text-sm md:text-base text-green-400/90 mb-6 max-w-xl">
        Each rider varies from size to size. Each rider is unique.
      </p>

      {/* Tab Controls */}
      <RiderTabControl activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Rider Selection 8x6 Grid with Checked Quilt Design */}
      {activeTab === "Primary" && (
        <PrimaryRiderSelection
          selectedRiderId={selectedId}
          onSelect={onSelect}
        />
      )}

      {/* Rider Description Section */}
      <div className="w-full max-w-3xl my-6 bg-black/85 border border-green-900/70 rounded-xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.8)] backdrop-blur-sm">
        <h2 className="text-xl md:text-2xl font-bold uppercase text-green-300 mb-4 text-center tracking-wider">
          Rider Description
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
          <div className="flex justify-between border-b border-green-900/40 pb-2">
            <span className="text-green-600 uppercase font-mono text-xs">
              Name
            </span>
            <span className="text-green-200 font-bold">{currentRider.name}</span>
          </div>

          <div className="flex justify-between border-b border-green-900/40 pb-2">
            <span className="text-green-600 uppercase font-mono text-xs">
              Height
            </span>
            <span className="text-green-200">{currentRider.height}</span>
          </div>

          <div className="flex justify-between border-b border-green-900/40 pb-2">
            <span className="text-green-600 uppercase font-mono text-xs">
              Ethnicity
            </span>
            <span className="text-green-200">{currentRider.ethnicity}</span>
          </div>

          <div className="flex justify-between border-b border-green-900/40 pb-2">
            <span className="text-green-600 uppercase font-mono text-xs">
              Heritage / Faith
            </span>
            <span className="text-green-200">
              {currentRider.heritage || "Rider"}
            </span>
          </div>

          <div className="flex justify-between border-b border-green-900/40 pb-2">
            <span className="text-green-600 uppercase font-mono text-xs">
              Hair
            </span>
            <span className="text-green-200">{currentRider.hair}</span>
          </div>

          <div className="flex justify-between border-b border-green-900/40 pb-2">
            <span className="text-green-600 uppercase font-mono text-xs">
              Footwear
            </span>
            <span className="text-green-200">{currentRider.shoes}</span>
          </div>

          <div className="flex justify-between border-b border-green-900/40 pb-2 md:col-span-2">
            <span className="text-green-600 uppercase font-mono text-xs">
              Outfit
            </span>
            <span className="text-green-200">{currentRider.outfit}</span>
          </div>
        </div>
      </div>

      {/* Next Confirmation Button */}
      <div className="w-full max-w-xs flex justify-center mb-6">
        <button
          onClick={onNext}
          className="w-full py-3.5 px-8 bg-green-500 hover:bg-green-400 text-black font-extrabold text-xl uppercase tracking-widest rounded-md transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_0_15px_rgba(34,197,94,0.4)] cursor-pointer text-center"
        >
          Next&gt;
        </button>
      </div>
    </main>
  );
};
