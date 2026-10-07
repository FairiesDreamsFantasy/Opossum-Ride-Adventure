/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface RiderSelectionHeaderProps {
  onBack: () => void;
}

export const RiderSelectionHeader: React.FC<RiderSelectionHeaderProps> = ({
  onBack,
}) => {
  return (
    <header className="mb-6 border-b border-green-900 pb-4 text-center">
      <h1 className="text-2xl md:text-3xl font-black tracking-wide text-green-400 text-center">
        <button
          onClick={onBack}
          className="hover:text-green-300 transition-colors cursor-pointer inline-block"
        >
          Opossum Ride Adventure
        </button>
      </h1>
    </header>
  );
};
