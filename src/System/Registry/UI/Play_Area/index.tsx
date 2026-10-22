/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
export * from "./Menu_Bar";
export * from "./HUD";
export * from "./Game_View";
export * from "./Portrait_Orientation_4_Tablets";
export * from "./Mobile_Landscape_4_Phones";
export * from "./Mobile_Portrait_4_Phone";
export * from "./General";
export * from "./Index";

export const PlayAreaRegistry = {
  Header: () => (
    <header className="mb-4 flex flex-col md:flex-row items-center justify-between border-b border-green-800 pb-3 gap-3">
      <h1>
        <a
          href=""
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-green-300 uppercase hover:text-white transition"
        >
          Opossum Ride<br />Adventure
        </a>
      </h1>
    </header>
  )
};
