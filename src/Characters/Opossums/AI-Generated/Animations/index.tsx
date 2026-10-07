import React from "react";
import { AIOpossum } from "../../../../System/UI/Opossum_Selection_Screen/General/AI_State";
export const AIAnimationParts: React.FC = () => {
  return (
    <div className="ai-animation-parts">
      {/* Individual anatomical parts for animation rigging */}
    </div>
  );
};
import { AICharacter3D } from "./3-D";
import { AICharacter2D } from "./2-D";
import { AIAnimationPolygons } from "./Polygons";
import { AIAnimationPixelations } from "./Pixelations";
import { AIAnimationGeometry } from "./Geometry";
import { AIColorPalette } from "./Color_Palette";
import { AIAnimationsMovements } from "./Movements";

export const AICharacterAnimations: React.FC<{ data: AIOpossum }> = ({ data }) => {
  return (
    <div className="ai-character-animations">
      <AICharacter3D data={data} />
      <AICharacter2D data={data} />
      <AIAnimationParts />
      <AIAnimationPolygons />
      <AIAnimationPixelations />
      <AIAnimationGeometry />
      <AIColorPalette />
      <AIAnimationsMovements />
    </div>
  );
};
