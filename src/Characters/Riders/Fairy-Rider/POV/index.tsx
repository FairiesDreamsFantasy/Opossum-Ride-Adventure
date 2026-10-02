/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

/**
 * POV (Point of View) Visuals for Fairy-Rider.
 * This view is fixed and does not apply smart rotation.
 */
export const FairyRiderPOV: React.FC = () => {
  return (
    <div id="fairy-rider-pov-container" className="absolute inset-0 flex items-end justify-center pointer-events-none">
      {/* Opossum Ears/Head in foreground */}
      <div id="pov-opossum-ears" className="flex gap-20 mb-[-20px]">
        <div className="w-16 h-24 bg-gray-200 rounded-t-full transform -rotate-12 border-4 border-gray-300" />
        <div className="w-16 h-24 bg-gray-200 rounded-t-full transform rotate-12 border-4 border-gray-300" />
      </div>
      
      {/* Hands on reins */}
      <div id="pov-rider-hands" className="absolute bottom-10 flex gap-40">
        <div className="w-12 h-12 bg-[#8D5524] rounded-full border-2 border-black" />
        <div className="w-12 h-12 bg-[#8D5524] rounded-full border-2 border-black" />
      </div>
    </div>
  );
};
