/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useRef } from "react";
import { AIGeneratedPages } from "./Pages";
import { GraphicsDisplay } from "./Graphics_Display";
import { QuotaMeter } from "./Quota_Meter";
import { useOpossumAIState, AIOpossum } from "../../General/AI_State";
import { ProceduralSoundSystem } from "../../../../Sound";

interface AIGeneratedViewProps {
  onAISelect?: (opossum: AIOpossum) => void;
  mode?: "CATALOG" | "PROMPT";
  onNavigateToPrompt?: () => void;
  onNavigateToCatalog?: () => void;
}

export const AIGeneratedView: React.FC<AIGeneratedViewProps> = ({ 
  onAISelect,
  mode = "CATALOG",
  onNavigateToPrompt,
  onNavigateToCatalog
}) => {
  const { 
    quota, isGenerating, generatedOpossums, generateOpossum, hasPaidKey,
    showNetworkFeed, setShowNetworkFeed, reset 
  } = useOpossumAIState();

  const [selectedAIId, setSelectedAIId] = useState<string | null>(
    generatedOpossums[0]?.id || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [promptText, setPromptText] = useState("");
  const [assistantResponse, setAssistantResponse] = useState<string | null>(null);
  const [assistantType, setAssistantType] = useState<"question" | "generate" | "error" | null>(null);

  const soundSystemRef = useRef(new ProceduralSoundSystem());

  const handleSelect = (id: string) => {
    setSelectedAIId(id);
    const op = generatedOpossums.find(o => o.id === id);
    if (op) {
      if (onAISelect) onAISelect(op);
      soundSystemRef.current.playAIOpossumSound(op.sex, op.size, op.vocalSource);
    }
  };

  const handleReset = () => {
    reset();
    setPromptText("");
    setAssistantResponse(null);
    setAssistantType(null);
    setSelectedAIId(generatedOpossums[0]?.id || null);
    setSearchQuery("");
  };

  const handlePromptSubmit = async () => {
    if (!promptText.trim() || isGenerating) return;
    const submitted = promptText;
    const result = await generateOpossum(submitted);
    
    setAssistantResponse(result.text);
    setAssistantType(result.type);
    
    if (result.type === "generate" && result.opossum) {
      handleSelect(result.opossum.id);
    }
    setPromptText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handlePromptSubmit();
    }
  };

  const filteredOpossums = generatedOpossums.filter(o => 
    searchQuery === "" || 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOpossum = generatedOpossums.find(o => o.id === selectedAIId) || generatedOpossums[0];

  return (
    <div id="AI_Generated_Container" className="flex flex-col gap-4 mt-2 bg-zinc-950 border border-green-900 rounded p-4 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column: Switchable between Catalog view and Prompt Console view */}
        <div className="md:w-1/2 flex flex-col gap-3">
          {/* Header Status Bar */}
          <div className="flex justify-between items-center bg-black/60 border border-green-950 px-3 py-1.5 rounded">
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${hasPaidKey ? "bg-amber-400" : "bg-emerald-400"}`} />
              Tier: <strong className={hasPaidKey ? "text-amber-300" : "text-emerald-300"}>{hasPaidKey ? "Unlimited Paid" : "Free Cloud"}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-zinc-500">API: Fullstack Proxy</span>
              <button
                onClick={() => setShowNetworkFeed(!showNetworkFeed)}
                className="text-[9px] bg-green-950 text-green-400 border border-green-900 px-2 py-0.5 rounded hover:bg-green-900 cursor-pointer"
              >
                {showNetworkFeed ? "Hide Feed" : "Feed"}
              </button>
            </div>
          </div>

          <QuotaMeter quota={quota} />

          {/* MODE: PROMPT CONSOLE */}
          {mode === "PROMPT" ? (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label htmlFor="gemini_console_prompt" className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                  Gemini Prompt Console
                </label>
                {onNavigateToCatalog && (
                  <button
                    onClick={onNavigateToCatalog}
                    className="text-[9px] text-zinc-400 hover:text-white font-mono underline cursor-pointer"
                  >
                    ← View Catalog ({generatedOpossums.length})
                  </button>
                )}
              </div>

              {/* Quick Prompt Presets */}
              <div className="flex flex-wrap gap-1.5">
                <button 
                  onClick={() => setPromptText("Synthesize an agile Jill with soft silver fur, pearl accessories, and high-cadence strides.")}
                  className="text-[9px] bg-zinc-900 text-zinc-300 border border-zinc-800 px-2 py-1 rounded hover:bg-zinc-800 hover:text-emerald-300 font-mono transition-colors cursor-pointer"
                >
                  + Silver Jill
                </button>
                <button 
                  onClick={() => setPromptText("Synthesize a sturdy Jack with a multi-colored neck ribbon and robust acoustic roar.")}
                  className="text-[9px] bg-zinc-900 text-zinc-300 border border-zinc-800 px-2 py-1 rounded hover:bg-zinc-800 hover:text-blue-300 font-mono transition-colors cursor-pointer"
                >
                  + Ribbon Jack
                </button>
                <button 
                  onClick={() => setPromptText("Remix crafted legends Melissa and Ashley with glowing midnight patterns.")}
                  className="text-[9px] bg-zinc-900 text-zinc-300 border border-zinc-800 px-2 py-1 rounded hover:bg-zinc-800 hover:text-amber-300 font-mono transition-colors cursor-pointer"
                >
                  + Remix Legends
                </button>
              </div>

              {/* Textarea Input */}
              <div className="relative">
                <textarea
                  id="gemini_console_prompt"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your desired opossum steed (gender, fur, markings, vocal characteristics, scale)..."
                  className="w-full bg-black border border-emerald-800 rounded p-3 text-white text-xs focus:border-emerald-400 outline-none placeholder:text-zinc-600 min-h-[100px] pr-20 resize-none font-mono"
                />
                <button
                  onClick={handlePromptSubmit}
                  disabled={isGenerating || !promptText.trim()}
                  className={`absolute bottom-3 right-3 px-3.5 py-1.5 rounded font-bold text-[10px] uppercase tracking-widest font-mono transition-all cursor-pointer
                    ${isGenerating || !promptText.trim()
                      ? "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800"
                      : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_10px_rgba(16,185,129,0.3)] active:translate-y-0.5"
                    }
                  `}
                >
                  {isGenerating ? "Synthesizing..." : "Generate"}
                </button>
              </div>
              <p className="text-[8px] text-zinc-500 font-mono text-right">Ctrl + Enter to Generate</p>

              {/* Chat / Synthesis Stream Response */}
              {(isGenerating || assistantResponse) && (
                <div className="bg-black/90 border border-emerald-950 p-3 rounded font-mono text-xs leading-relaxed max-h-[160px] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-emerald-950 pb-1 mb-2">
                    <span className="text-[9px] text-emerald-400 uppercase tracking-wider font-bold">
                      {isGenerating ? "Gemini Subsystem: Generating Specimen..." : `Subsystem Response`}
                    </span>
                    <button 
                      onClick={() => setAssistantResponse(null)}
                      className="text-[8px] text-zinc-500 hover:text-zinc-300 uppercase cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  {isGenerating ? (
                    <p className="text-zinc-400 animate-pulse text-[11px]">Contacting fullstack proxy & computing biological synthesis parameters...</p>
                  ) : (
                    <p className={assistantType === "error" ? "text-red-400 text-[11px]" : "text-emerald-300 text-[11px] whitespace-pre-wrap"}>
                      {assistantResponse}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* MODE: CATALOG VIEW (DECLUTTERED) */
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter dynamic catalog by name, color, or trait..."
                  className="flex-grow bg-black border border-green-900 rounded px-2.5 py-1 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-green-400 font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[10px] text-zinc-500 hover:text-zinc-300 font-mono cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <AIGeneratedPages
                opossums={filteredOpossums}
                loading={isGenerating}
                isPaid={hasPaidKey}
                selectedId={selectedAIId}
                onSelect={handleSelect}
                onNavigateToPrompt={onNavigateToPrompt}
              />

              {onNavigateToPrompt && (
                <button
                  onClick={onNavigateToPrompt}
                  className="w-full mt-1 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500 text-emerald-300 hover:text-white font-bold py-2 rounded text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                >
                  <span>✨</span>
                  <span>Open Prompt Console (Generate Custom Opossum)</span>
                </button>
              )}
            </div>
          )}

          {/* Live Network Feed Ticker */}
          {showNetworkFeed && (
            <div className="h-20 overflow-x-auto flex gap-2 p-1.5 bg-black/50 rounded border border-green-950 scrollbar-thin scrollbar-thumb-green-900 mt-1">
              {generatedOpossums.map(op => (
                <button
                  key={`feed-${op.id}`}
                  onClick={() => handleSelect(op.id)}
                  className={`flex-shrink-0 w-24 h-full bg-black/60 rounded border p-1.5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                    ${op.id === selectedAIId ? "border-emerald-400 bg-emerald-950/30" : "border-zinc-800 hover:border-zinc-600"}
                  `}
                >
                  <span className={`text-[8px] font-bold truncate w-full ${op.sex === "Jill" ? "text-green-300" : "text-blue-300"}`}>
                    {op.name}
                  </span>
                  <span className="text-[7px] text-zinc-500 font-mono">{op.sex} • {(op.size * 100).toFixed(0)}%</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Graphics Display & Spec Preview */}
        <div className="md:w-1/2">
          <GraphicsDisplay 
            selectedOpossum={selectedOpossum}
            loading={isGenerating} 
          />
        </div>
      </div>
    </div>
  );
};

export default AIGeneratedView;
