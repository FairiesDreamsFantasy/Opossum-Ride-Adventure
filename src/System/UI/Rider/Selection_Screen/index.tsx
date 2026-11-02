/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { RiderCharacter } from "../../../../types";
import { RIDER_CHARACTERS } from "../../../../Characters/Riders";
import { RiderSelectionHeader } from "./Header";
import { RiderSelectionMain } from "./Main";
import { RiderSelectionFooter } from "./Footer";

interface RiderSelectionProps {
  onSelectRider: (rider: RiderCharacter) => void;
  onBack: () => void;
}

export const RiderSelection: React.FC<RiderSelectionProps> = ({
  onSelectRider,
  onBack,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    RIDER_CHARACTERS[0].id || RIDER_CHARACTERS[0].name.toLowerCase()
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleNext = () => {
    const chosen =
      RIDER_CHARACTERS.find(
        (r) => (r.id || r.name.toLowerCase()) === selectedId
      ) || RIDER_CHARACTERS[0];
    onSelectRider(chosen);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#090514] via-[#0d091e] to-[#04020a] text-green-400 font-sans flex flex-col p-4 md:p-8 relative overflow-hidden"
      id="Rider_Selection_Screen_Tea_Room"
    >
      {/* Dark Sky celestial ambient background decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-purple-950/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col flex-grow">
        <RiderSelectionHeader onBack={onBack} />

        <RiderSelectionMain
          selectedId={selectedId}
          onSelect={handleSelect}
          onNext={handleNext}
        />

        <RiderSelectionFooter />
      </div>
    </div>
  );
};
