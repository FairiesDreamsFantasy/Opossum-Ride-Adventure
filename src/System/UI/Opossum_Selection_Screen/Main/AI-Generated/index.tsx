import React, { useState, useRef } from "react";
import { AIGeneratedPages } from "./Pages";
import { GraphicsDisplay } from "./Graphics_Display";
import { QuotaMeter } from "./Quota_Meter";
import { useOpossumAIState, AIOpossum } from "../../General/AI_State";
import { ProceduralSoundSystem } from "../../../../Sound";

interface AIGeneratedViewProps {
  onAISelect?: (opossum: AIOpossum) => void;
}

export const AIGeneratedView: React.FC<AIGeneratedViewProps> = ({ onAISelect }) => {
  const { 
    quota, isGenerating, generatedOpossums, generateOpossum, hasPaidKey,
    showNetworkFeed, setShowNetworkFeed, reset 
  } = useOpossumAIState();
  const [selectedAIId, setSelectedAIId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [promptText, setPromptText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState<string | null>(null);
  const [assistantType, setAssistantType] = useState<"question" | "generate" | "error" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const soundSystemRef = useRef(new ProceduralSoundSystem());

  const handleSelect = (id: string) => {
    setSelectedAIId(id);
    const op = generatedOpossums.find(o => o.id === id);
    if (op) {
      if (onAISelect) onAISelect(op);
      soundSystemRef.current.playAIOpossumSound(op.sex, op.size);
    }
  };

  const handleReset = () => {
    reset();
    setPromptText("");
    setAssistantResponse(null);
    setAssistantType(null);
    setSelectedAIId(null);
    setHasSearched(false);
    setSearchQuery("");
  };

  const handlePromptSubmit = async () => {
    if (!promptText.trim() || isGenerating) return;
    setHasSearched(true);
    setSearchQuery(promptText);
    const result = await generateOpossum(promptText);
    
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
    searchQuery === "" || o.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resultsPerPage = 20;
  const totalPages = Math.ceil(filteredOpossums.length / resultsPerPage);
  const paginatedResults = filteredOpossums.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

  const selectedOpossum = generatedOpossums.find(o => o.id === selectedAIId);

  return (
    <div id="AI_Generated_Container" className="flex flex-col gap-4 mt-4 bg-zinc-950 border border-green-900 rounded p-4 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="bg-black/40 border border-green-900 rounded p-2">
            <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Network Mode: {hasPaidKey ? "Unlimited" : "Free"}</span>
               <button 
                 onClick={() => setShowNetworkFeed(!showNetworkFeed)}
                 className="text-[9px] bg-green-950 text-green-400 border border-green-900 px-2 py-0.5 rounded hover:bg-green-900"
               >
                 {showNetworkFeed ? "Hide Feed" : "Show Feed"}
               </button>
            </div>
            <QuotaMeter quota={quota} />
            
            <AIGeneratedPages
              opossums={generatedOpossums}
              loading={isGenerating}
              isPaid={hasPaidKey}
              selectedId={selectedAIId}
              onSelect={handleSelect}
            />
            
            {/* Unified Gemini Textarea Console */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center">
                <label htmlFor="gemini_console_prompt" className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Gemini Prompt Console</label>
                <button 
                  onClick={() => setPromptText("Remix the 'Crafted Opossums' like Melissa and Ashley into something new and unique!")}
                  className="text-[9px] bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded hover:bg-zinc-800 hover:text-green-400 transition-colors"
                >
                  Remix "Crafted Opossums"
                </button>
              </div>
              <div className="relative">
                <textarea
                  id="gemini_console_prompt"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Gemini to generate/customize an opossum, look up fictional opossums, or ask questions..."
                  className="w-full bg-black border border-green-800 rounded p-3 text-white text-xs focus:border-green-400 outline-none placeholder:text-zinc-700 min-h-[90px] pr-16 resize-none font-mono"
                />
                <button
                  onClick={handlePromptSubmit}
                  disabled={isGenerating || !promptText.trim()}
                  className={`absolute bottom-3 right-3 px-3 py-1.5 rounded font-bold text-[10px] uppercase tracking-widest transition-all
                    ${isGenerating || !promptText.trim()
                      ? "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800"
                      : "bg-green-600 hover:bg-green-500 text-black active:translate-y-0.5"
                    }
                  `}
                >
                  {isGenerating ? "..." : "Send"}
                </button>
              </div>
              <p className="text-[8px] text-zinc-600 font-mono uppercase text-right">Press Ctrl + Enter to Send</p>
            </div>
          </div>

          {/* Chat Stream Window */}
          {(isGenerating || assistantResponse) && (
            <div className="bg-black/80 border border-green-900/60 p-3 rounded font-mono text-xs leading-relaxed max-h-[220px] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-green-950 pb-1 mb-2">
                <span className="text-[9px] text-green-500 uppercase tracking-wider font-bold">
                  {isGenerating ? "Gemini Subsystem: Processing..." : `Gemini Subsystem: ${assistantType === "question" ? "Response" : "Synthesis Complete"}`}
                </span>
                <div className="flex gap-2 items-center">
                  {!isGenerating && assistantType === "generate" && (
                    <span className="text-[8px] bg-green-950 text-green-400 border border-green-900 px-1.5 rounded uppercase font-bold">New Entity</span>
                  )}
                  <button 
                    onClick={handleReset}
                    className="text-[8px] bg-zinc-900 text-zinc-400 border border-zinc-800 px-1.5 py-0.5 rounded hover:bg-zinc-800 hover:text-red-400 uppercase font-bold transition-colors"
                  >
                    Reset Chat
                  </button>
                </div>
              </div>
              {isGenerating ? (
                <p className="text-zinc-500 animate-pulse">Running advanced Gemini quantum synthesis algorithms...</p>
              ) : (
                <p className={assistantType === "error" ? "text-red-400" : "text-green-300 whitespace-pre-wrap"}>
                  {assistantResponse}
                </p>
              )}
            </div>
          )}

          {showNetworkFeed && (
            <div className="h-28 overflow-x-auto flex gap-4 p-2 bg-zinc-900/50 rounded border border-green-950 scrollbar-thin scrollbar-thumb-green-900">
               {generatedOpossums.map(op => (
                 <div 
                   key={`feed-${op.id}`} 
                   onClick={() => handleSelect(op.id)}
                   className="flex-shrink-0 w-20 h-full bg-black/40 rounded border border-zinc-800 p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border-green-600 transition-colors"
                 >
                    <div className={`w-8 h-8 rounded-full mb-1 ${op.sex === "Jill" ? "bg-green-900/40 border border-green-600" : "bg-blue-900/40 border border-blue-600"}`} />
                    <span className="text-[8px] text-zinc-400 truncate w-full">{op.name}</span>
                 </div>
               ))}
            </div>
          )}

          {/* Search Results hidden until a search query has actually been entered */}
          {hasSearched && (
            <div className="flex flex-col gap-4 mt-2 animate-fade-in">
               <h2 className="text-[11px] font-bold text-green-500 uppercase tracking-widest border-b border-green-900 pb-1">
                 Best Results For "{searchQuery || "Global Search"}"
               </h2>
               
               <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                 {paginatedResults.length > 0 ? (
                   paginatedResults.map(op => (
                     <div key={op.id} className="group border border-zinc-900 hover:border-green-800 p-3 rounded bg-black/20 transition-colors">
                       <h3 className="mb-0.5">
                         <button 
                           onClick={() => handleSelect(op.id)}
                           title={op.description}
                           className={`font-bold text-[13px] text-left hover:underline ${selectedAIId === op.id ? (op.sex === "Jill" ? "text-green-300" : "text-blue-300") : "text-zinc-400"}`}
                         >
                           {op.name} — AI Entity
                         </button>
                       </h3>
                       <p className="text-[10px] text-zinc-500 line-clamp-1 italic">{op.description}</p>
                       <p className="text-[9px] font-mono text-zinc-600 uppercase mt-1 tracking-tighter">{op.rides} rides registered</p>
                     </div>
                   ))
                 ) : (
                   <p className="text-zinc-600 text-[10px] italic">No matching synthesized opossums.</p>
                 )}
               </div>

               {/* Pagination */}
               {totalPages > 1 && (
                 <div className="flex items-center gap-1 mt-2 justify-center">
                    {Array.from({ length: Math.min(10, totalPages) }, (_, i) => (
                      <button
                        key={`page-${i + 1}`}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold border transition-colors ${
                          currentPage === i + 1 
                            ? "bg-green-600 border-green-500 text-black" 
                            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    {totalPages > 10 && (
                      <button 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        className="px-2 h-6 flex items-center justify-center rounded text-[10px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300"
                      >
                        Next
                      </button>
                    )}
                 </div>
               )}
            </div>
          )}
        </div>

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
