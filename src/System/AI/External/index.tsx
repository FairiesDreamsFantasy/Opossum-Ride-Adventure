/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";

import React, { useState, useEffect } from "react";
import { playProceduralSound } from "../../Sound/TTS";
import { 
  GeminiSystem, 
  GeminiConfig, 
  AIVisualsMode, 
  AITier, 
  SystemInstructionFormat, 
  AVAILABLE_GEMINI_MODELS,
  TTSVoice,
  GeminiShoppingModal,
  GeminiPlayBooksModal,
  GeminiYouTubeModal
} from "./Gemini";

export interface ExternalAIModalProps {
  onClose: () => void;
}

export const ExternalAIModal: React.FC<ExternalAIModalProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState("");
  const [strength, setStrength] = useState<"Light" | "Medium" | "Heavy">("Light");
  const [showShoppingModal, setShowShoppingModal] = useState(false);
  const [showBooksModal, setShowBooksModal] = useState(false);
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [cloudTTS, setCloudTTS] = useState(true);
  const [ttsVoice, setTtsVoice] = useState<TTSVoice>("Kore");
  const [smartVisuals, setSmartVisuals] = useState(true);
  const [smartMP3, setSmartMP3] = useState(false);
  const [visualsMode, setVisualsMode] = useState<AIVisualsMode>("3-D+");
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState<"Idle" | "Connected" | "Error">("Idle");
  const [isConfigured, setIsConfigured] = useState(false);
  const [selectedTier, setSelectedTier] = useState<AITier>("Free");

  // Fetch toggles
  const [fetchBuildingBlocks, setFetchBuildingBlocks] = useState(true);
  const [fetchItems, setFetchItems] = useState(true);
  const [fetchSound, setFetchSound] = useState(true);
  const [fetchVisuals, setFetchVisuals] = useState(true);
  const [fetchLocalArenas, setFetchLocalArenas] = useState(true);

  // System instructions & format
  const [systemInstructions, setSystemInstructions] = useState("");
  const [instructionsFormat, setInstructionsFormat] = useState<SystemInstructionFormat>("markdown");
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);

  // Model selection
  const [selectedModel, setSelectedModel] = useState("gemini-flash-latest");

  // Generation switches
  const [generateLevelsOnDemand, setGenerateLevelsOnDemand] = useState(false);
  const [aiGeneratedOpossums, setAiGeneratedOpossums] = useState(true);
  const [liveEnabled, setLiveEnabled] = useState(false);
  const [youtubeEnabled, setYoutubeEnabled] = useState(false);

  // Check if gameplay is currently active
  const [isGameActive, setIsGameActive] = useState(false);

  // Load existing config if available
  useEffect(() => {
    // Check if the gameplay canvas or gameplay element is active
    const gameplayEl = document.getElementById("Game_Canvas_Container");
    setIsGameActive(!!gameplayEl);

    const existing = GeminiSystem.getConfig();
    if (existing) {
      setApiKey(existing.apiKey || "");
      setStrength(existing.strength || "Light");
      setCloudTTS(existing.cloudTTS ?? true);
      setTtsVoice(existing.ttsVoice || "Kore");
      setSmartVisuals(existing.smartVisuals ?? true);
      setSmartMP3(existing.smartMP3 ?? false);
      if (existing.visualsMode) setVisualsMode(existing.visualsMode);
      if (existing.tier) setSelectedTier(existing.tier);
      if (existing.fetchBuildingBlocksEnabled !== undefined) setFetchBuildingBlocks(existing.fetchBuildingBlocksEnabled);
      if (existing.fetchItemsEnabled !== undefined) setFetchItems(existing.fetchItemsEnabled);
      if (existing.fetchSoundEnabled !== undefined) setFetchSound(existing.fetchSoundEnabled);
      if (existing.fetchVisualsEnabled !== undefined) setFetchVisuals(existing.fetchVisualsEnabled);
      if (existing.fetchLocalArenasEnabled !== undefined) setFetchLocalArenas(existing.fetchLocalArenasEnabled);
      if (existing.systemInstructions) setSystemInstructions(existing.systemInstructions);
      if (existing.instructionsFormat) setInstructionsFormat(existing.instructionsFormat);
      if (existing.selectedModel) setSelectedModel(existing.selectedModel);
      if (existing.generateLevelsOnDemand !== undefined) setGenerateLevelsOnDemand(existing.generateLevelsOnDemand);
      if (existing.aiGeneratedOpossums !== undefined) setAiGeneratedOpossums(existing.aiGeneratedOpossums);
      if (existing.liveEnabled !== undefined) setLiveEnabled(existing.liveEnabled);
      if (existing.youtubeEnabled !== undefined) setYoutubeEnabled(existing.youtubeEnabled);

      if (existing.apiKey) {
        setStatus("Connected");
        setIsConfigured(true);
      }
    }
  }, []);

  // Listen to quota/usage updates for real-time precise stats
  const [, setQuotaTrigger] = useState(0);
  useEffect(() => {
    return GeminiSystem.subscribe(() => {
      setQuotaTrigger(prev => prev + 1);
    });
  }, []);

  const hasApiKey = apiKey.trim().length > 0;
  const isPaid = selectedTier === "Paid";

  // Switches appear automatically once an API key is set/connected or tested
  const showAdjustableSwitches = (status === "Connected" || isConfigured) && hasApiKey;

  const handleSet = async () => {
    if (!apiKey.trim()) {
      alert("Scientific Alert: Please enter an API key before establishing connection.");
      return;
    }
    playProceduralSound("tick");
    const config: GeminiConfig = {
      apiKey: apiKey.trim(),
      strength,
      cloudTTS,
      ttsVoice,
      smartVisuals,
      smartMP3: isPaid ? smartMP3 : false,
      visualsMode,
      tier: selectedTier,
      fetchBuildingBlocksEnabled: fetchBuildingBlocks,
      fetchItemsEnabled: fetchItems,
      fetchSoundEnabled: fetchSound,
      fetchVisualsEnabled: fetchVisuals,
      fetchLocalArenasEnabled: fetchLocalArenas,
      systemInstructions,
      instructionsFormat,
      selectedModel,
      generateLevelsOnDemand,
      aiGeneratedOpossums,
      liveEnabled
    };

    const success = await GeminiSystem.initialize(config);
    if (success) {
      setStatus("Connected");
      setIsConfigured(true);
      playProceduralSound("tick");
      // Modal closes when changes are saved/set
      onClose();
    } else {
      setStatus("Error");
      alert("AI Configuration Error: Please verify your API key and network connection.");
    }
  };

  const handleClear = () => {
    setApiKey("");
    setStatus("Idle");
    setIsConfigured(false);
    setSelectedTier("Free");
    setCloudTTS(true);
    setTtsVoice("Kore");
    setFetchBuildingBlocks(true);
    setFetchItems(true);
    setFetchSound(true);
    setFetchVisuals(true);
    setFetchLocalArenas(true);
    setSystemInstructions("");
    setInstructionsFormat("markdown");
    setSelectedModel("gemini-flash-latest");
    setGenerateLevelsOnDemand(false);
    setAiGeneratedOpossums(true);
    setLiveEnabled(false);

    GeminiSystem.initialize({
      apiKey: "",
      strength: "Light",
      cloudTTS: true,
      ttsVoice: "Kore",
      smartVisuals: true,
      smartMP3: false,
      visualsMode: "3-D+",
      tier: "Free",
      fetchBuildingBlocksEnabled: true,
      fetchItemsEnabled: true,
      fetchSoundEnabled: true,
      fetchVisualsEnabled: true,
      fetchLocalArenasEnabled: true,
      systemInstructions: "",
      instructionsFormat: "markdown",
      selectedModel: "gemini-flash-latest",
      generateLevelsOnDemand: false,
      aiGeneratedOpossums: true,
      liveEnabled: false
    });
    playProceduralSound("tick");
  };

  const handleTest = async () => {
    if (!apiKey) {
      alert("Scientific Alert: No API key detected for testing.");
      return;
    }

    setIsTesting(true);
    playProceduralSound("chatter");
    
    const initSuccess = await GeminiSystem.initialize({ 
      apiKey: apiKey.trim(), 
      strength, 
      cloudTTS, 
      ttsVoice,
      smartVisuals, 
      smartMP3: isPaid ? smartMP3 : false, 
      visualsMode, 
      tier: selectedTier,
      fetchBuildingBlocksEnabled: fetchBuildingBlocks,
      fetchItemsEnabled: fetchItems,
      fetchSoundEnabled: fetchSound,
      fetchVisualsEnabled: fetchVisuals,
      fetchLocalArenasEnabled: fetchLocalArenas,
      systemInstructions,
      instructionsFormat,
      selectedModel,
      generateLevelsOnDemand,
      aiGeneratedOpossums
    });

    if (!initSuccess) {
      setIsTesting(false);
      setStatus("Error");
      alert("AI Provider Test: Initialization failed. Check scientific parameters.");
      return;
    }

    await GeminiSystem.resolveScientificReaction({
      mooseName: "Test Moose",
      monkeyName: "Test Monkey",
      environment: "Lab",
      isOpossumEvent: false
    });

    setIsTesting(false);
    setStatus("Connected");
    setIsConfigured(true);
    alert("AI Provider Test: Scientific connection established.");
  };

  const stats = GeminiSystem.getDetailedStats();

  const allVisualModes: { mode: AIVisualsMode; isHighPower?: boolean }[] = [
    { mode: "Pixelations Only" },
    { mode: "2-D Only" },
    { mode: "Simulated 3-D (recommended)" },
    { mode: "Split 3-D" },
    { mode: "3-D (mathematical)" },
    { mode: "3-D+" },
    { mode: "High Power 3-D", isHighPower: true },
    { mode: "Very High Power 3-D", isHighPower: true },
    { mode: "Ultra-High Power 3-D", isHighPower: true }
  ];

  const visibleVisualModes = allVisualModes.filter(m => !m.isHighPower || isPaid);

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai_modal_title"
      className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto"
    >
      <div className="bg-zinc-950 border-2 border-green-700 max-w-3xl w-full rounded-lg p-6 font-mono text-green-300 shadow-[0_0_40px_rgba(34,197,94,0.3)] my-8 max-h-[90vh] overflow-y-auto">
        <header className="border-b border-green-800 pb-3 mb-4 flex items-center justify-between">
          <div>
            <h1 id="ai_modal_title" className="text-2xl font-bold uppercase tracking-widest text-green-100">
              {isConfigured ? "Edit/Check AI" : "Insert AI"}
            </h1>
            <p className="text-[11px] text-green-500 mt-1 uppercase">External AI Provider Interface &amp; Context Pipeline</p>
          </div>
          <div className="text-right">
            <span className={`text-xs px-2.5 py-1 rounded font-bold uppercase border ${isPaid ? 'bg-amber-950 text-amber-300 border-amber-600' : 'bg-zinc-900 text-green-400 border-green-800'}`}>
              Selected: {selectedTier} Tier
            </span>
          </div>
        </header>

        <section className="space-y-4 text-sm leading-relaxed mb-6">
          <p>
            Use this interface to insert or edit AI from your provider. Entering an API key enables on-demand level generation, unpredictable opponent reactions, module context fetching, and simulated 3-D rendering modes.
          </p>

          {/* API KEY INPUT */}
          <div className="space-y-3 bg-black/40 p-4 rounded border border-green-900">
            <div className="flex flex-col gap-1">
              <label htmlFor="gemini_key" className="text-[10px] font-bold uppercase text-green-600">Google Gemini API Key:</label>
              <input
                id="gemini_key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter Gemini API Key..."
                className="bg-black border border-green-800 rounded px-3 py-2 text-white focus:border-green-400 outline-none w-full"
              />
            </div>

            <div className="flex flex-col gap-1 pt-2">
              <span className="text-[10px] font-bold uppercase text-green-600 block mb-1">Select API Key Tier:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTier("Free");
                    playProceduralSound("tick");
                  }}
                  className={`px-3 py-2 rounded text-xs font-bold uppercase border transition min-h-[44px] ${
                    selectedTier === "Free"
                      ? "bg-green-950 text-green-400 border-green-600"
                      : "bg-black text-zinc-600 border-zinc-900 hover:border-zinc-850"
                  }`}
                >
                  Free Tier (No Smart MP3)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTier("Paid");
                    playProceduralSound("tick");
                  }}
                  className={`px-3 py-2 rounded text-xs font-bold uppercase border transition min-h-[44px] ${
                    selectedTier === "Paid"
                      ? "bg-amber-950/80 text-amber-300 border-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                      : "bg-black text-zinc-600 border-zinc-900 hover:border-zinc-850"
                  }`}
                >
                  Paid Tier (Enables Smart MP3)
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button 
                type="button"
                onClick={handleTest}
                disabled={isTesting}
                className="cursor-pointer bg-green-900 hover:bg-green-800 text-green-100 px-4 py-2 rounded text-xs font-bold uppercase transition min-h-[44px]"
              >
                {isTesting ? "Testing..." : "Test"}
              </button>
              <button 
                type="button"
                onClick={handleClear}
                className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-green-400 px-4 py-2 rounded text-xs font-bold uppercase transition border border-green-900 min-h-[44px]"
              >
                Clear
              </button>
              <button 
                type="button"
                onClick={handleSet}
                className="cursor-pointer bg-green-500 hover:bg-green-400 text-black px-6 py-2 rounded text-xs font-bold uppercase transition shadow-lg min-h-[44px]"
              >
                {isConfigured ? "Save Changes" : "Set"}
              </button>
            </div>
          </div>
        </section>

        {/* GEMINI MODEL SELECTION SECTION */}
        <section className="mb-6 bg-black/50 p-4 rounded border border-green-900/80">
          <h2 className="text-sm font-bold uppercase text-green-300 border-b border-green-800 pb-2 mb-3">
            Gemini Model Selection
          </h2>
          <p className="text-[10px] text-green-500 mb-3">
            Choose the Gemini AI model used for procedural world generation, terminal chatters, and opponent logic:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AVAILABLE_GEMINI_MODELS.map((model) => {
              const isSelected = selectedModel === model.id;
              const isPaidModel = model.tierRequirement === "Paid";
              const isAvailable = !isPaidModel || isPaid;

              return (
                <button
                  key={model.id}
                  type="button"
                  aria-pressed={isSelected}
                  disabled={!isAvailable}
                  onClick={() => {
                    setSelectedModel(model.id);
                    GeminiSystem.setModel(model.id);
                    playProceduralSound("tick");
                  }}
                  className={`text-left p-2.5 rounded border transition min-h-[44px] flex flex-col justify-between ${
                    isSelected
                      ? "bg-green-900/80 border-green-400 text-white shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                      : isAvailable
                      ? "bg-zinc-900/60 border-green-900/60 text-green-300 hover:border-green-600"
                      : "bg-black/40 border-zinc-900 text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{model.name}</span>
                    {isSelected && (
                      <span className="text-[9px] bg-green-500 text-black px-1.5 py-0.5 rounded font-extrabold">
                        ACTIVE
                      </span>
                    )}
                    {isPaidModel && !isSelected && (
                      <span className="text-[9px] text-amber-400 border border-amber-900 px-1.5 py-0.5 rounded">
                        PAID TIER
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-green-600 mt-1 block">
                    {model.description}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* DATA & MODULE FETCHING TOGGLES (WHEN SUPPORTED) */}
        <section className="mb-6 bg-black/50 p-4 rounded border border-green-900/80">
          <h2 className="text-sm font-bold uppercase text-green-300 border-b border-green-800 pb-2 mb-3">
            System Manifest Context Fetching (Ahead of Time)
          </h2>
          <p className="text-[10px] text-green-500 mb-3">
            Fetch building blocks, items, sound synthesizers, and visuals to provide rich game context to Gemini when generating arenas or characters:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Building Blocks */}
            <div className="flex items-center justify-between p-2.5 bg-black/60 rounded border border-green-950">
              <span className="text-xs font-bold text-green-300">Fetch Building Blocks (when supported)</span>
              <button
                type="button"
                aria-pressed={fetchBuildingBlocks}
                onClick={() => {
                  const next = !fetchBuildingBlocks;
                  setFetchBuildingBlocks(next);
                  GeminiSystem.setFetchToggles({ buildingBlocks: next });
                  playProceduralSound("tick");
                }}
                className={`px-3 py-1.5 rounded text-xs font-bold border min-h-[44px] transition ${
                  fetchBuildingBlocks 
                    ? "bg-green-950 text-green-200 border-green-500" 
                    : "bg-black text-zinc-600 border-zinc-900"
                }`}
              >
                {fetchBuildingBlocks ? "ON" : "OFF"}
              </button>
            </div>

            {/* Items */}
            <div className="flex items-center justify-between p-2.5 bg-black/60 rounded border border-green-950">
              <span className="text-xs font-bold text-green-300">Fetch Items (when supported)</span>
              <button
                type="button"
                aria-pressed={fetchItems}
                onClick={() => {
                  const next = !fetchItems;
                  setFetchItems(next);
                  GeminiSystem.setFetchToggles({ items: next });
                  playProceduralSound("tick");
                }}
                className={`px-3 py-1.5 rounded text-xs font-bold border min-h-[44px] transition ${
                  fetchItems 
                    ? "bg-green-950 text-green-200 border-green-500" 
                    : "bg-black text-zinc-600 border-zinc-900"
                }`}
              >
                {fetchItems ? "ON" : "OFF"}
              </button>
            </div>

            {/* Sound Synthesizer */}
            <div className="flex items-center justify-between p-2.5 bg-black/60 rounded border border-green-950">
              <span className="text-xs font-bold text-green-300">Fetch BGM &amp; SFX Synth in System/Sound/ (when supported)</span>
              <button
                type="button"
                aria-pressed={fetchSound}
                onClick={() => {
                  const next = !fetchSound;
                  setFetchSound(next);
                  GeminiSystem.setFetchToggles({ sound: next });
                  playProceduralSound("tick");
                }}
                className={`px-3 py-1.5 rounded text-xs font-bold border min-h-[44px] transition ${
                  fetchSound 
                    ? "bg-green-950 text-green-200 border-green-500" 
                    : "bg-black text-zinc-600 border-zinc-900"
                }`}
              >
                {fetchSound ? "ON" : "OFF"}
              </button>
            </div>

            {/* Visuals */}
            <div className="flex items-center justify-between p-2.5 bg-black/60 rounded border border-green-950">
              <span className="text-xs font-bold text-green-300">Fetch System/Visuals/ (when supported)</span>
              <button
                type="button"
                aria-pressed={fetchVisuals}
                onClick={() => {
                  const next = !fetchVisuals;
                  setFetchVisuals(next);
                  GeminiSystem.setFetchToggles({ visuals: next });
                  playProceduralSound("tick");
                }}
                className={`px-3 py-1.5 rounded text-xs font-bold border min-h-[44px] transition ${
                  fetchVisuals 
                    ? "bg-green-950 text-green-200 border-green-500" 
                    : "bg-black text-zinc-600 border-zinc-900"
                }`}
              >
                {fetchVisuals ? "ON" : "OFF"}
              </button>
            </div>

            {/* Local Arenas */}
            <div className="flex items-center justify-between p-2.5 bg-black/60 rounded border border-green-950">
              <span className="text-xs font-bold text-green-300">Fetch local Arena/ via local game (when supported)</span>
              <button
                type="button"
                aria-pressed={fetchLocalArenas}
                onClick={() => {
                  const next = !fetchLocalArenas;
                  setFetchLocalArenas(next);
                  GeminiSystem.setFetchToggles({ localArenas: next });
                  playProceduralSound("tick");
                }}
                className={`px-3 py-1.5 rounded text-xs font-bold border min-h-[44px] transition ${
                  fetchLocalArenas 
                    ? "bg-green-950 text-green-200 border-green-500" 
                    : "bg-black text-zinc-600 border-zinc-900"
                }`}
              >
                {fetchLocalArenas ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </section>

        {/* SYSTEM INSTRUCTIONS SECTION (WITH EXPAND/COLLAPSE & FORMAT BUTTONS) */}
        <section className="mb-6 bg-black/50 p-4 rounded border border-green-900/80">
          <div className="flex flex-wrap items-center justify-between border-b border-green-800 pb-2 mb-3 gap-2">
            <h2 className="text-sm font-bold uppercase text-green-300">
              System Instructions for Gemini
            </h2>
            
            {/* Format Selection Buttons */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-green-600 uppercase mr-1">Format:</span>
              {(["markdown", "html", "text"] as const).map((fmt) => {
                const isFmtPressed = instructionsFormat === fmt;
                return (
                  <button
                    key={fmt}
                    type="button"
                    aria-pressed={isFmtPressed}
                    onClick={() => {
                      setInstructionsFormat(fmt);
                      GeminiSystem.setSystemInstructions(systemInstructions, fmt);
                      playProceduralSound("tick");
                    }}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border min-h-[32px] transition ${
                      isFmtPressed
                        ? "bg-green-600 text-black border-green-400 font-extrabold"
                        : "bg-black text-green-500 border-green-900 hover:border-green-700"
                    }`}
                  >
                    {fmt.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-green-500">
              Provide custom system instructions to guide Gemini during world generation and character creation:
            </p>
            <button
              type="button"
              onClick={() => {
                setIsInstructionsExpanded(!isInstructionsExpanded);
                playProceduralSound("tick");
              }}
              className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-green-400 border border-green-800 rounded text-xs uppercase font-bold min-h-[36px] transition"
            >
              {isInstructionsExpanded ? "Collapse Instructions ▲" : "Expand Instructions ▼"}
            </button>
          </div>

          {isInstructionsExpanded && (
            <div className="mt-2 animate-fade-in">
              <textarea
                value={systemInstructions}
                onChange={(e) => {
                  setSystemInstructions(e.target.value);
                  GeminiSystem.setSystemInstructions(e.target.value, instructionsFormat);
                }}
                placeholder="Enter custom Gemini system instructions in Markdown, HTML, or plain Text..."
                rows={5}
                className="w-full bg-black border border-green-800 rounded p-3 text-xs text-green-200 font-mono focus:border-green-400 outline-none leading-relaxed"
              />
            </div>
          )}
        </section>

        {/* LEVEL GENERATION ON DEMAND & AI OPOSSUMS SWITCHES */}
        <section className="mb-6 bg-black/50 p-4 rounded border border-green-900/80">
          <h2 className="text-sm font-bold uppercase text-green-300 border-b border-green-800 pb-2 mb-3">
            Procedural Generation Controls
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Generate Levels/Arenas on demand */}
            <div className="p-3 bg-black/60 rounded border border-green-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-green-200">
                  Generate Levels/Arenas on Demand
                </span>
                <button
                  type="button"
                  aria-pressed={generateLevelsOnDemand}
                  onClick={() => {
                    const next = !generateLevelsOnDemand;
                    setGenerateLevelsOnDemand(next);
                    GeminiSystem.setGenerateLevelsOnDemand(next);
                    playProceduralSound("tick");
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-bold border min-h-[44px] transition ${
                    generateLevelsOnDemand
                      ? "bg-green-950 text-green-200 border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                      : "bg-black text-zinc-600 border-zinc-900 hover:border-zinc-700"
                  }`}
                >
                  {generateLevelsOnDemand ? "ON" : "OFF"}
                </button>
              </div>
              <p className="text-[9px] text-green-600">
                When ON, Gemini dynamically synthesizes custom procedural arenas and sectors ahead of time.
              </p>
            </div>

            {/* AI-Generated Opossums */}
            <div className="p-3 bg-black/60 rounded border border-green-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-green-200">
                  AI-Generated Opossums
                </span>
                <button
                  type="button"
                  aria-pressed={aiGeneratedOpossums}
                  onClick={() => {
                    const next = !aiGeneratedOpossums;
                    setAiGeneratedOpossums(next);
                    GeminiSystem.setAIGeneratedOpossums(next);
                    playProceduralSound("tick");
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-bold border min-h-[44px] transition ${
                    aiGeneratedOpossums
                      ? "bg-green-950 text-green-200 border-green-500"
                      : "bg-black text-zinc-600 border-zinc-900 hover:border-zinc-700"
                  }`}
                >
                  {aiGeneratedOpossums ? "ON (Default)" : "OFF"}
                </button>
              </div>
              <p className="text-[9px] text-green-600">
                Enables AI generation terminal on the Opossum Selection Screen for custom characters.
              </p>
            </div>
          </div>
        </section>

        {/* AI VISUALS MODE SECTION */}
        <section className="mb-6 bg-black/50 p-4 rounded border border-green-900/80">
          <h2 className="text-sm font-bold uppercase text-green-300 border-b border-green-800 pb-2 mb-3">
            AI Visuals Mode
          </h2>
          <p className="text-[10px] text-green-500 mb-3">
            Select a scientific rendering system. The 3-D+ system is the default setting for optimal perspective projection, spatial curvature, and lighting depth.
          </p>

          <div className="flex flex-col gap-2">
            {visibleVisualModes.map(({ mode, isHighPower }) => {
              const isPressed = visualsMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={isPressed}
                  onClick={() => {
                    setVisualsMode(mode);
                    GeminiSystem.setVisualsMode(mode);
                    playProceduralSound("tick");
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded text-xs font-mono uppercase font-bold transition flex items-center justify-between border min-h-[44px] ${
                    isPressed
                      ? "bg-green-900/80 text-white border-green-400 shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                      : "bg-zinc-900/60 text-green-400 border-green-900/60 hover:border-green-700"
                  }`}
                >
                  <span>{mode}</span>
                  {isPressed && <span className="text-[10px] bg-green-500 text-black px-2 py-0.5 rounded font-extrabold">ACTIVE</span>}
                  {isHighPower && !isPressed && <span className="text-[9px] text-amber-400 border border-amber-900 px-1.5 py-0.5 rounded">PAID</span>}
                </button>
              );
            })}
          </div>
        </section>

        <hr className="border-green-900 mb-6" />

        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-green-500 border-b border-green-900 pb-1">Mandatory Presets</h3>
              <ul className="text-[10px] space-y-1 text-green-400">
                <li className="flex justify-between"><span>Profanity Block:</span> <span className="text-green-200">TRUE (Locked)</span></li>
                <li className="flex justify-between"><span>Erotica-Free:</span> <span className="text-green-200">TRUE (Locked)</span></li>
                <li className="flex justify-between"><span>Babylon-Free:</span> <span className="text-green-200">TRUE</span></li>
              </ul>
            </div>

            {/* ADJUSTABLE SETTINGS: Hidden until API Key is provided and Set/Tested */}
            {showAdjustableSwitches ? (
              <div className="space-y-2 animate-fade-in">
                <h3 className="text-xs font-bold uppercase text-green-500 border-b border-green-900 pb-1">Adjustable Settings</h3>
                <div className="space-y-2 text-[10px]">
                  <div className="flex items-center justify-between">
                    <label htmlFor="ai_strength">AI Strength:</label>
                    <select 
                      id="ai_strength"
                      value={strength}
                      onChange={(e) => setStrength(e.target.value as any)}
                      className="bg-black border border-green-800 rounded px-1 text-white"
                    >
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="Heavy">Heavy</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label>Cloud TTS:</label>
                    <div className="flex items-center gap-2">
                      {cloudTTS && (
                        <select
                          value={ttsVoice}
                          onChange={(e) => {
                            const v = e.target.value as any;
                            setTtsVoice(v);
                            GeminiSystem.setSmartTTS(true, v);
                            playProceduralSound("tick");
                          }}
                          className="bg-black border border-green-800 rounded px-1 text-[10px] text-green-200 h-[36px]"
                        >
                          <option value="Kore">Voice: Kore</option>
                          <option value="Zephyr">Voice: Zephyr</option>
                          <option value="Puck">Voice: Puck</option>
                          <option value="Charon">Voice: Charon</option>
                          <option value="Fenrir">Voice: Fenrir</option>
                        </select>
                      )}
                      <button 
                        type="button"
                        onClick={() => {
                          const next = !cloudTTS;
                          setCloudTTS(next);
                          GeminiSystem.setSmartTTS(next);
                        }}
                        className={`px-2 py-1 rounded border min-h-[36px] ${cloudTTS ? 'border-green-500 text-green-200 bg-green-950' : 'border-green-900 text-green-800 bg-black'}`}
                      >
                        {cloudTTS ? "ON" : "OFF"}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label>Smart Visuals:</label>
                    <button 
                      type="button"
                      onClick={() => setSmartVisuals(!smartVisuals)}
                      className={`px-2 py-1 rounded border min-h-[36px] ${smartVisuals ? 'border-green-500 text-green-200 bg-green-950' : 'border-green-900 text-green-800 bg-black'}`}
                    >
                      {smartVisuals ? "ON" : "OFF"}
                    </button>
                  </div>
                  
                  {/* GEMINI LIVE TOGGLE */}
                  <div className="flex items-center justify-between border-t border-green-900/40 pt-2">
                    <label className="text-green-300 font-bold">Gemini Live (Shift-C):</label>
                    <button 
                      type="button"
                      onClick={() => {
                        const next = !liveEnabled;
                        setLiveEnabled(next);
                        GeminiSystem.setLiveEnabled(next);
                      }}
                      className={`px-2 py-1 rounded border min-h-[36px] ${liveEnabled ? 'border-green-500 text-green-200 bg-green-950 shadow-[0_0_8px_rgba(34,197,94,0.3)]' : 'border-green-900 text-green-800 bg-black'}`}
                    >
                      {liveEnabled ? "ON" : "OFF"}
                    </button>
                  </div>
                  
                  {/* SMART MP3 TOGGLE: Shown only for Paid tier when switches are active */}
                  {isPaid && (
                    <div className="flex items-center justify-between border-t border-green-900/40 pt-2">
                      <label className="text-amber-300 font-bold">Smart MP3 (Paid Feature):</label>
                      <button 
                        type="button"
                        onClick={() => {
                          const next = !smartMP3;
                          setSmartMP3(next);
                          GeminiSystem.setSmartMP3(next);
                        }}
                        className={`px-2 py-1 rounded border min-h-[36px] ${smartMP3 ? 'border-amber-400 text-amber-200 bg-amber-950' : 'border-amber-900 text-amber-700 bg-black'}`}
                      >
                        {smartMP3 ? "ON" : "OFF"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2 p-3 bg-black/30 rounded border border-green-950">
                <h3 className="text-xs font-bold uppercase text-green-700 border-b border-green-950 pb-1">Adjustable Settings</h3>
                <p className="text-[10px] text-green-600 italic">
                  Insert API key and activate "Set" or "Test" to reveal adjustable function controls (Cloud TTS, Smart Visuals, Smart MP3, Gemini Live).
                </p>
              </div>
            )}
          </div>

          {/* REAL-TIME QUOTA MONITOR & TEXT STATS */}
          <div className="bg-black/60 p-4 rounded border border-green-900">
            <h3 className="text-sm font-bold uppercase text-green-300 mb-2">Real-Time Quota &amp; Token Statistics</h3>
            <p className="text-[10px] text-green-500 leading-relaxed mb-3">
              This screen-reader accessible stat feed updates in real-time. Connected Status: {status === "Connected" ? "ACTIVE_LINK" : "DISCONNECTED"}. Active Model: {stats.selectedModel}.
            </p>
            <div className="text-[10px] font-mono grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-zinc-900/60 p-2 rounded border border-green-900/50">
                <span className="text-green-600 block">TOTAL REQUESTS:</span>
                <span className="text-white text-xs font-bold">{stats.totalRequests}</span>
              </div>
              <div className="bg-zinc-900/60 p-2 rounded border border-green-900/50">
                <span className="text-green-600 block">INPUT TOKENS:</span>
                <span className="text-white text-xs font-bold">{stats.totalInputTokens}</span>
              </div>
              <div className="bg-zinc-900/60 p-2 rounded border border-green-900/50">
                <span className="text-green-600 block">OUTPUT TOKENS:</span>
                <span className="text-white text-xs font-bold">{stats.totalOutputTokens}</span>
              </div>
              <div className="bg-zinc-900/60 p-2 rounded border border-green-900/50">
                <span className="text-green-600 block">TOTAL TOKENS:</span>
                <span className="text-white text-xs font-bold">{stats.totalTokens}</span>
              </div>
              <div className="bg-zinc-900/60 p-2 rounded border border-green-900/50">
                <span className="text-green-600 block">QUOTA REMAINING:</span>
                <span className="text-white text-xs font-bold">{stats.quotaPercent.toFixed(1)}% ({stats.currentQuotaCalls}/{stats.maxQuotaCalls})</span>
              </div>
              <div className="bg-zinc-900/60 p-2 rounded border border-green-900/50">
                <span className="text-green-600 block">ACTIVE MODEL:</span>
                <span className="text-white text-[10px] font-bold truncate block">{stats.selectedModel}</span>
              </div>
            </div>
          </div>

          {/* PLAYER-CONTROLLED EXTERNAL SUBSYSTEMS: GOOGLE SHOPPING & PLAY BOOKS */}
          <div className="p-4 bg-zinc-950/80 rounded border border-green-900/60 space-y-3">
            <div className="border-b border-green-900/40 pb-2">
              <h3 className="text-sm font-bold uppercase text-green-300">
                Player-Controlled External Subsystems
              </h3>
              <p className="text-[10px] text-green-500">
                Google Shopping &amp; Play Books explorers are player-driven, completely silent for native screen readers, and safe for active gameplay.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  playProceduralSound("tick");
                  setShowShoppingModal(true);
                }}
                className="p-3 bg-stone-900 hover:bg-stone-800 border border-emerald-600/60 rounded-xl text-left transition flex items-center justify-between group min-h-[48px]"
                aria-label="Open Google Shopping & Field Equipment Modal"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-300 group-hover:text-emerald-200">
                    Google Shopping &amp; Field Gear
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Marsupial care supplies &amp; FTC fair-price monitored
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300">
                  Open
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playProceduralSound("tick");
                  setShowBooksModal(true);
                }}
                className="p-3 bg-stone-900 hover:bg-stone-800 border border-indigo-600/60 rounded-xl text-left transition flex items-center justify-between group min-h-[48px]"
                aria-label="Open Google Play Books & Literature Library Modal"
              >
                <div>
                  <div className="text-xs font-bold text-indigo-300 group-hover:text-indigo-200">
                    Google Play Books Library
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Marsupial biology treatises, Zion &amp; forest stories
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-950 border border-indigo-700 text-indigo-300">
                  Open
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playProceduralSound("tick");
                  setShowYouTubeModal(true);
                }}
                className="p-3 bg-stone-900 hover:bg-stone-800 border border-amber-600/60 rounded-xl text-left transition flex items-center justify-between group min-h-[48px]"
                aria-label="Open The Zion Way & Babylon-Free YouTube Explorer Modal"
              >
                <div>
                  <div className="text-xs font-bold text-amber-300 group-hover:text-amber-200">
                    The Zion Way YouTube Explorer
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Nyabinghi drumming, Ital livity &amp; Babylon-Free wisdom
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-950 border border-amber-700 text-amber-300">
                  Open
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button 
              type="button"
              onClick={handleSet}
              className="cursor-pointer bg-green-500 hover:bg-green-400 text-black px-10 py-3 rounded text-sm font-bold uppercase transition shadow-lg min-h-[44px]"
            >
              {isConfigured ? "Save Changes" : "Set Configuration"}
            </button>
            <button 
              type="button"
              onClick={() => {
                playProceduralSound("tick");
                onClose();
              }}
              className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-green-400 px-6 py-3 rounded text-sm font-bold uppercase transition border border-green-900 min-h-[44px]"
            >
              Close
            </button>
          </div>
        </section>
      </div>

      {/* On-Demand Player-Controlled Modals */}
      {showShoppingModal && (
        <GeminiShoppingModal
          isOpen={showShoppingModal}
          onClose={() => setShowShoppingModal(false)}
        />
      )}

      {showBooksModal && (
        <GeminiPlayBooksModal
          isOpen={showBooksModal}
          onClose={() => setShowBooksModal(false)}
        />
      )}

      {showYouTubeModal && (
        <GeminiYouTubeModal
          isOpen={showYouTubeModal}
          onClose={() => setShowYouTubeModal(false)}
        />
      )}
    </div>
  );
};
