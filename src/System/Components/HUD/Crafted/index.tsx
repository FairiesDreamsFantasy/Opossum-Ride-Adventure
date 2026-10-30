/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { HUDComponentProps } from "../General";
import { HUD as StandardHUD } from "../../../UI/Play_Area/Main/HUD";
import { HUDCraftedGeneral } from "./General";

export const CraftedHUD: React.FC<HUDComponentProps> = (props) => {
  const { themeStyle = "default" } = props;

  if (themeStyle === "transparent") {
    return (
      <div id="Transparent_HUD_Overlay" className="w-full flex justify-between items-center px-4 py-2 bg-black/40 backdrop-blur-sm border-b border-white/20 text-white font-mono text-xs sm:text-sm z-30 shadow-lg">
        <div>
          <span className="text-yellow-300 font-bold">LVL {props.currentLevelId}</span> | {props.Measured_Distance_Value(props.playerZ)} / {props.Measured_Distance_Value(props.currentLevel.targetDistance)}
        </div>
        <div className="flex gap-4">
          <span>SCORE: <span className="font-bold text-green-300">{props.score}</span></span>
          <span>{props.getEdibleItemName(props.currentLevelId).toUpperCase()}: <span className="font-bold text-yellow-200">{props.ticksEaten}</span></span>
        </div>
      </div>
    );
  }

  if (themeStyle === "storybook") {
    return (
      <div id="Storybook_HUD_Bar" className="w-full bg-[#fdf6e3] text-[#433422] border-t-2 border-[#d3c6aa] px-6 py-3 font-serif flex justify-between items-center text-sm sm:text-base shadow-inner">
        <div>
          <span className="font-bold italic">Chapter {props.currentLevelId}:</span> {props.currentLevel.name}
        </div>
        <div className="flex gap-6 font-semibold">
          <span>Progress: {props.Measured_Distance_Value(props.playerZ)} / {props.Measured_Distance_Value(props.currentLevel.targetDistance)}</span>
          <span>Points: {props.score}</span>
          <span>{props.getEdibleItemName(props.currentLevelId)}: {props.ticksEaten}</span>
        </div>
      </div>
    );
  }

  if (themeStyle === "quilted") {
    return (
      <div id="Quilted_HUD_Bar" className="w-full bg-indigo-950/90 border-2 border-indigo-700/60 rounded-lg px-4 py-2 text-indigo-100 font-mono text-xs sm:text-sm flex flex-wrap justify-between items-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
        <div>
          <span className="text-yellow-300 font-bold uppercase">Stage {props.currentLevelId}</span> ({props.currentLevel.name})
        </div>
        <div className="flex gap-4">
          <span>Distance: <span className="text-white font-bold">{props.Measured_Distance_Value(props.playerZ)} / {props.Measured_Distance_Value(props.currentLevel.targetDistance)}</span></span>
          <span>Score: <span className="text-yellow-300 font-bold">{props.score}</span></span>
          <span>{props.getEdibleItemName(props.currentLevelId)}: <span className="text-emerald-300 font-bold">{props.ticksEaten}</span></span>
        </div>
      </div>
    );
  }

  return <StandardHUD {...props} />;
};

export { HUDCraftedGeneral };
