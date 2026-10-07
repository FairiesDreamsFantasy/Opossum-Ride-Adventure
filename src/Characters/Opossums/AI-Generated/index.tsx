import React from "react";
import { AICharacterGeneral } from "./General";
import { AICharacterAccessories } from "./Accessories";
import { AICharacterAnimations } from "./Animations";

export const AIGeneratedOpossumRenderer: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="ai-generated-opossum-renderer">
      <AICharacterGeneral data={data} />
      <AICharacterAccessories data={data} />
      <AICharacterAnimations data={data} />
    </div>
  );
};
