import React from "react";

export type OpossumSelectionTabType = "CRAFTED" | "COMPACT" | "AI_GENERATED" | "GENERATE_OPOSSUM";

interface OpossumSelectionTabsProps {
  activeTab: OpossumSelectionTabType;
  onTabChange: (tab: OpossumSelectionTabType) => void;
  showAITab: boolean;
  showCompactTab: boolean;
}

export const OpossumSelectionTabs: React.FC<OpossumSelectionTabsProps> = ({ 
  activeTab, 
  onTabChange,
  showAITab,
  showCompactTab
}) => {
  return (
    <div
      id="Tab_Bar"
      title="Opossum Preferences"
      className="bg-black flex flex-wrap border-[#ff00ff] w-full"
      style={{ borderWidth: "3px" }}
    >
      <button
        onClick={() => onTabChange("CRAFTED")}
        aria-pressed={activeTab === "CRAFTED"}
        className={`px-4 py-2 bg-black hover:bg-zinc-900 border-r border-[#ff00ff] font-bold text-sm focus:outline-none ${activeTab === "CRAFTED" ? "text-white" : "text-zinc-500"}`}
        style={{ borderRightWidth: "3px" }}
        aria-live="off"
      >
        Crafted By Fairies Dreams & Fantasy
      </button>

      {showCompactTab && (
        <button
          onClick={() => onTabChange("COMPACT")}
          aria-pressed={activeTab === "COMPACT"}
          className={`px-4 py-2 bg-black hover:bg-zinc-900 border-r border-[#ff00ff] font-bold text-sm focus:outline-none flex items-center gap-1.5 ${activeTab === "COMPACT" ? "text-amber-300" : "text-zinc-500"}`}
          style={{ borderRightWidth: "3px" }}
          aria-live="off"
        >
          <span>Compact (3'0" Jills)</span>
          <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-600 px-1.5 py-0.2 rounded font-mono">
            64
          </span>
        </button>
      )}

      {showAITab && (
        <>
          <button
            onClick={() => onTabChange("AI_GENERATED")}
            aria-pressed={activeTab === "AI_GENERATED"}
            className={`px-4 py-2 bg-black hover:bg-zinc-900 border-r border-[#ff00ff] font-bold text-sm focus:outline-none ${activeTab === "AI_GENERATED" ? "text-white" : "text-zinc-500"}`}
            style={{ borderRightWidth: "3px" }}
            aria-live="off"
          >
            AI Opossums
          </button>
          <button
            id="Generate_Opossum_Tab"
            onClick={() => onTabChange("GENERATE_OPOSSUM")}
            aria-pressed={activeTab === "GENERATE_OPOSSUM"}
            className={`px-4 py-2 bg-black hover:bg-zinc-900 font-bold text-sm focus:outline-none flex items-center gap-1.5 transition-colors ${activeTab === "GENERATE_OPOSSUM" ? "text-emerald-300 bg-emerald-950/40" : "text-zinc-500"}`}
            aria-live="off"
          >
            <span>✨</span>
            <span>Generate Opossum</span>
          </button>
        </>
      )}
    </div>
  );
};
