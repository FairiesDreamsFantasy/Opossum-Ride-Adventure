import React from "react";

/**
 * Text Rendering Module
 * Ensures text is only implemented with developer intent for meaningful purposes
 * like scoring effects, object labels, or UI indicators.
 */
export interface TextObject {
  id: string;
  content: string;
  x: number;
  y: number;
  type: "score" | "label" | "status";
  lifeSpan?: number; // duration in ms
}

export const TextSystem = {
  isValidText: (content: string) => {
    return content.trim().length > 0;
  }
};

export const IntentionalText: React.FC<{
  text: string;
  x: number;
  y: number;
  className?: string;
}> = ({ text, x, y, className }) => {
  if (!text) return null;

  return (
    <div 
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ left: x, top: y }}
    >
      {text}
    </div>
  );
};
