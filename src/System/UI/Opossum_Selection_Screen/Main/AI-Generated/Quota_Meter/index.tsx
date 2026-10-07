import React from "react";
import { OPOSSUM_UI_CONSTANTS } from "../../../General";

interface QuotaMeterProps {
  quota?: number;
}

export const QuotaMeter: React.FC<QuotaMeterProps> = ({ quota = OPOSSUM_UI_CONSTANTS.DEFAULT_QUOTA }) => {
  return (
    <div 
      id="Quota_Meter_Display"
      className="mb-4 bg-black border border-green-800 rounded p-3 flex items-center justify-between shadow-[0_0_10px_rgba(34,197,94,0.1)]"
    >
      <span className="text-green-500 font-bold text-xs uppercase tracking-tighter">AI Usage Quota</span>
      <div className="w-1/2 bg-green-900/30 rounded-full h-3 overflow-hidden border border-green-900/50">
        <div 
          className="bg-green-400 h-full transition-all duration-500 shadow-[0_0_8px_rgba(74,222,128,0.5)]" 
          style={{ width: `${quota}%` }}
        ></div>
      </div>
      <span className="text-green-300 font-mono text-xs ml-2 min-w-[40px] text-right">{quota}%</span>
    </div>
  );
};
