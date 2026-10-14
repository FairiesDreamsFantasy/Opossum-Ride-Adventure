/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  GameViewMode,
  KeyboardLayoutType
} from "../../../../types";
import {
  Wrench,
  Eye,
  Accessibility,
  Settings,
  Keyboard,
  ChevronUp,
  ChevronDown,
  Camera,
  Volume2,
  VolumeX,
  Sparkles,
  Palette,
  Music,
  QrCode,
  Network,
  ShoppingBag,
  BookOpen,
  Youtube
} from "lucide-react";
import { DOMEngine } from "../../../DOM";
import { VisualPaletteType } from "../../../Visuals";
import { ExternalAIModal } from "../../../AI/External";
import { 
  GeminiSystem, 
  GeminiShoppingModal, 
  GeminiPlayBooksModal,
  GeminiYouTubeModal,
  GeminiYouTubeNewsModal,
  GeminiLiveModal,
  GeminiToolboxMenu
} from "../../../AI/External/Gemini";
import { ChalkboardModeSettingsModal } from "../../../UI/Modal/Chalkboard_Mode_Settings";
import { WiiControllerManager } from "../../../Keyboards_and_Controllers/Controller/Wii";
import { DecentralizedNetworkModal } from "../../../UI/Modal/Decentralized_Network";
import { KeyboardCommandsModal } from "../../../UI/Modal/Keyboard_Commands";
import {
  MenuBarComponentProps,
  ChalkboardColorConfig,
  DEFAULT_CHALKBOARD_CONFIG,
  CHALKBOARD_LINE_COLORS,
  CHALKBOARD_BG_PRESETS
} from "../General";

export const CraftedMenuBar: React.FC<MenuBarComponentProps> = ({
  activeMenu,
  setActiveMenu,
  activeSubMenu,
  setActiveSubMenu,
  activeVisualPref,
  handleVisualPrefChange,
  colorDotMatrix,
  setColorDotMatrix,
  setPalette,
  is3D,
  setIs3D,
  wireframe,
  setWireframe,
  palette,
  pixelation,
  setPixelation,
  ttsEnabled,
  setTtsEnabled,
  announceDoors,
  setAnnounceDoors,
  announceReverb,
  setAnnounceReverb,
  extendedInfo,
  setExtendedInfo,
  chatterNotifications,
  setChatterNotifications,
  announceSteering,
  setAnnounceSteering,
  showVisualHUD,
  setShowVisualHUD,
  showOpponentIndicators = false,
  setShowOpponentIndicators,
  showFeed,
  setShowFeed,
  viewMode,
  setViewMode,
  layout,
  handleLayoutChange,
  canvasRef,
  stateRef,
  speakWords,
  setStatusMessage,
  isSpeechEnabled,
  setSpeechEnabled,
  genericCrashSound = false,
  setGenericCrashSound,
  largeText = false,
  setLargeText,
  chalkboardConfig = DEFAULT_CHALKBOARD_CONFIG,
  setChalkboardConfig,
  onOpenThemeModal,
  announceMooseSmash = false,
  setAnnounceMooseSmash,
  musicEnabled = false,
  setMusicEnabled,
  customTrackId = null,
  onSetCustomTrack
}) => {
  const [showAIModal, setShowAIModal] = useState(false);
  const [showShoppingModal, setShowShoppingModal] = useState(false);
  const [showBooksModal, setShowBooksModal] = useState(false);
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [showChalkboardModal, setShowChalkboardModal] = useState(false);
  const [tempChalkboardCfg, setTempChalkboardCfg] = useState<ChalkboardColorConfig>(chalkboardConfig);
  const [musicMenuMode, setMusicMenuMode] = useState<"none" | "main" | "list">("none");
  const [wiiConnected, setWiiConnected] = useState(false);
  const [showP2PModal, setShowP2PModal] = useState(false);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);

  useEffect(() => {
    setWiiConnected(WiiControllerManager.getWiiInput() !== null);

    const handleWiiState = () => {
      setWiiConnected(true);
    };

    WiiControllerManager.registerCallback(handleWiiState);
    return () => {
      WiiControllerManager.unregisterCallback(handleWiiState);
    };
  }, []);

  useEffect(() => {
    if (activeMenu === null) {
      setMusicMenuMode("none");
    }
  }, [activeMenu]);

  // Focus index for keyboard menu bar navigation (0: Toolbox, 1: Visual Settings, 2: Accessibility, 3: View, 4: Layout)
  const [focusedHeaderIdx, setFocusedHeaderIdx] = useState<number>(0);
  const menuBarRef = useRef<HTMLDivElement | null>(null);
  const headerBtnsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const hasApiKey = !!GeminiSystem.getConfig()?.apiKey;
  const menuKeys = hasApiKey 
    ? ["gemini", "toolbox", "visual", "accessibility", "view", "layout"] 
    : ["toolbox", "visual", "accessibility", "view", "layout"];
  const isVisualsOff = activeVisualPref === "Visuals OFF";
  const isChalkboard = activeVisualPref === "Chalkboard Only";

  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);

  // Global Alt-Shift-F shortcut listener to focus the Menu Bar
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key === "F" || e.key === "f")) {
        e.preventDefault();
        headerBtnsRef.current[focusedHeaderIdx]?.focus();
        speakWords("Menu bar focused");
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [focusedHeaderIdx, speakWords]);

  // Key navigation for Menu Bar header buttons & ESC key handling
  const handleMenuBarKeyDown = (e: React.KeyboardEvent) => {
    // ALWAYS stop propagation of key events inside the menu bar so game steering is not triggered
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      if (activeMenu !== null) {
        setActiveMenu(null);
        setActiveSubMenu(null);
        headerBtnsRef.current[focusedHeaderIdx]?.focus();
        speakWords("Menu closed");
      } else {
        canvasRef.current?.focus();
        speakWords("Focus returned to canvas");
      }
      return;
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIdx = (focusedHeaderIdx + 1) % menuKeys.length;
      setFocusedHeaderIdx(nextIdx);
      const nextMenuKey = menuKeys[nextIdx];
      if (activeMenu !== null) {
        setActiveMenu(nextMenuKey);
        setActiveSubMenu(null);
      }
      setTimeout(() => {
        headerBtnsRef.current[nextIdx]?.focus();
      }, 0);
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIdx = (focusedHeaderIdx - 1 + menuKeys.length) % menuKeys.length;
      setFocusedHeaderIdx(prevIdx);
      const prevMenuKey = menuKeys[prevIdx];
      if (activeMenu !== null) {
        setActiveMenu(prevMenuKey);
        setActiveSubMenu(null);
      }
      setTimeout(() => {
        headerBtnsRef.current[prevIdx]?.focus();
      }, 0);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const targetMenu = menuKeys[focusedHeaderIdx];
      
      // If menu is closed, open it first
      if (activeMenu === null || activeMenu !== targetMenu) {
        setActiveMenu(targetMenu);
        setActiveSubMenu(null);
        speakWords(`${targetMenu} menu opened`);
      }

      // Move focus down into the dropdown container items
      setTimeout(() => {
        if (dropdownContainerRef.current) {
          const focusables = Array.from(
            dropdownContainerRef.current.querySelectorAll("button, input, select, [tabindex='0']")
          ) as HTMLElement[];
          if (focusables.length > 0) {
            const currentIdx = focusables.indexOf(document.activeElement as HTMLElement);
            if (currentIdx === -1) {
              focusables[0].focus();
            } else {
              const nextIdx = (currentIdx + 1) % focusables.length;
              focusables[nextIdx].focus();
            }
          }
        }
      }, 20);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (dropdownContainerRef.current) {
        const focusables = Array.from(
          dropdownContainerRef.current.querySelectorAll("button, input, select, [tabindex='0']")
        ) as HTMLElement[];
        const currentIdx = focusables.indexOf(document.activeElement as HTMLElement);
        if (currentIdx > 0) {
          focusables[currentIdx - 1].focus();
          return;
        }
      }
      
      // Return focus to header button or close menu
      if (activeMenu !== null) {
        headerBtnsRef.current[focusedHeaderIdx]?.focus();
      }
      return;
    }
  };

  // Helper for TTS toggle auto-closing the menu
  const toggleTTS = () => {
    const nextTts = !isSpeechEnabled();
    setSpeechEnabled(nextTts);
    setTtsEnabled(nextTts);
    // Auto-close menu on TTS toggle as specified
    setActiveMenu(null);
    setActiveSubMenu(null);

    if (nextTts) {
      speakWords("Text to speech enabled");
      setStatusMessage("Text to speech enabled (Shift-Z-Z)");
    } else {
      setSpeechEnabled(true);
      speakWords("Text to speech disabled");
      setSpeechEnabled(false);
      setTtsEnabled(false);
      setStatusMessage("Text to speech disabled (Shift-Z-Z)");
    }
  };

  // Font size classes based on largeText toggle
  const headerTextClass = largeText ? "text-xs md:text-sm" : "text-[10px]";
  const itemTextClass = largeText ? "text-xs md:text-sm font-bold" : "text-[10px]";
  const badgeTextClass = largeText ? "text-xs" : "text-[9px]";

  return (
    <div 
      ref={menuBarRef}
      id="Menu_Bar" 
      tabIndex={0}
      onKeyDown={handleMenuBarKeyDown} 
      onKeyUp={(e) => e.stopPropagation()}
      className="flex flex-col bg-zinc-950 border border-green-900 rounded-md shadow-lg overflow-hidden  outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
    >
      {/* External AI Modal */}
      {showAIModal && (
        <ExternalAIModal onClose={() => setShowAIModal(false)} />
      )}

      {/* Gemini Shopping Modal */}
      {showShoppingModal && (
        <GeminiShoppingModal
          isOpen={showShoppingModal}
          onClose={() => setShowShoppingModal(false)}
        />
      )}

      {/* Gemini Play Books Modal */}
      {showBooksModal && (
        <GeminiPlayBooksModal
          isOpen={showBooksModal}
          onClose={() => setShowBooksModal(false)}
        />
      )}

      {/* The Zion Way YouTube Modal */}
      {showYouTubeModal && (
        <GeminiYouTubeModal
          isOpen={showYouTubeModal}
          onClose={() => setShowYouTubeModal(false)}
        />
      )}

      {/* YouTube News & Live Broadcasts Modal */}
      {showNewsModal && (
        <GeminiYouTubeNewsModal
          isOpen={showNewsModal}
          onClose={() => setShowNewsModal(false)}
        />
      )}

      {/* Gemini Live Preferences Modal */}
      {showLiveModal && (
        <GeminiLiveModal
          isOpen={showLiveModal}
          onClose={() => setShowLiveModal(false)}
        />
      )}

      {/* Change Chalkboard Colors Modal */}
      {showChalkboardModal && (
        <ChalkboardModeSettingsModal
          chalkboardConfig={chalkboardConfig}
          onSave={(newCfg) => {
            if (setChalkboardConfig) {
              setChalkboardConfig(newCfg);
            }
            setShowChalkboardModal(false);
          }}
          onCancel={() => {
            setShowChalkboardModal(false);
          }}
          speakWords={speakWords}
        />
      )}

      {/* Decentralized Mesh Network Modal */}
      {showP2PModal && (
        <DecentralizedNetworkModal
          onClose={() => setShowP2PModal(false)}
          speakWords={speakWords}
          setStatusMessage={setStatusMessage}
        />
      )}

      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 border-b border-green-900/30">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {menuKeys.map((key, index) => {
            let icon = <Wrench size={12} className="text-green-500" />;
            let label = "Toolbox";
            if (key === "gemini") {
              icon = <Sparkles size={12} className="text-amber-400 animate-pulse" />;
              label = "Gemini Toolbox";
            } else if (key === "visual") {
              icon = <Eye size={12} className="text-green-500" />;
              label = "Visuals Settings";
            } else if (key === "accessibility") {
              icon = <Accessibility size={12} className="text-green-500" />;
              label = "Accessibility";
            } else if (key === "view") {
              icon = <Settings size={12} className="text-green-500" />;
              label = "View";
            } else if (key === "layout") {
              icon = <Keyboard size={12} className="text-green-500" />;
              label = "Layout";
            }

            const isSelected = activeMenu === key;

            return (
              <button
                key={key}
                ref={(el) => { headerBtnsRef.current[index] = el; }}
                onClick={() => {
                  setActiveMenu(activeMenu === key ? null : key);
                  setActiveSubMenu(null);
                  setFocusedHeaderIdx(index);
                }}
                aria-pressed={isSelected}
                className={`flex items-center gap-2 font-mono uppercase font-bold px-3 py-1.5 rounded transition ${headerTextClass} ${
                  isSelected 
                    ? key === "gemini" 
                      ? 'bg-amber-950 text-white shadow-[0_0_8px_rgba(245,158,11,0.4)] border border-amber-600/30'
                      : 'bg-green-900 text-white shadow-[0_0_8px_rgba(34,197,94,0.4)]' 
                    : key === "gemini"
                      ? 'text-amber-500 hover:bg-amber-950/40'
                      : 'text-green-500 hover:bg-green-950'
                }`}
              >
                {icon}
                <span>{label}</span>
                {isSelected ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center gap-2 px-2 py-1 bg-green-950/40 rounded border border-green-900/20">
          <Settings size={12} className="text-green-700 animate-spin-slow" />
          <span className={`font-mono text-green-800 uppercase font-bold tracking-widest ${badgeTextClass}`}>Opossum Ride Control v5.0</span>
        </div>
      </div>

      {/* Sub-menu Dropdowns */}
      {activeMenu && (
        <div ref={dropdownContainerRef} className="bg-black/80 p-4 flex flex-col gap-4 border-t border-green-900/20">
          
          {/* GEMINI TOOLBOX MENU */}
          {activeMenu === 'gemini' && (
            <GeminiToolboxMenu
              onOpenShopping={() => setShowShoppingModal(true)}
              onOpenYouTube={() => setShowYouTubeModal(true)}
              onOpenNews={() => setShowNewsModal(true)}
              onOpenPreferences={() => setShowLiveModal(true)}
              itemTextClass={itemTextClass}
            />
          )}

          {/* TOOLBOX MENU */}
          {activeMenu === 'toolbox' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2 items-center">
                {onOpenThemeModal && (
                  <button
                    onClick={() => {
                      if (speakWords) speakWords("Opening Theme Switcher Dialogue");
                      onOpenThemeModal();
                    }}
                    className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold bg-amber-950 text-amber-200 border-amber-600 hover:bg-amber-900 shadow-[0_0_8px_rgba(245,158,11,0.3)] min-h-[44px] ${itemTextClass}`}
                  >
                    <Palette size={12} className="text-amber-400" />
                    <span>Switch Theme</span>
                  </button>
                )}

                <button
                  onClick={() => setShowAIModal(true)}
                  className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold bg-green-950 text-green-200 border-green-600 hover:bg-green-900 shadow-[0_0_8px_rgba(34,197,94,0.3)] min-h-[44px] ${itemTextClass}`}
                >
                  <Sparkles size={12} className="text-amber-400" />
                  <span>{hasApiKey ? "Edit/Check AI" : "Insert AI"}</span>
                </button>

                {!hasApiKey && (
                  <>
                    <button
                      onClick={() => {
                        setShowShoppingModal(true);
                        if (speakWords) speakWords("Opening Google Shopping modal");
                      }}
                      className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold bg-emerald-950 text-emerald-200 border-emerald-600 hover:bg-emerald-900 shadow-[0_0_8px_rgba(16,185,129,0.3)] min-h-[44px] ${itemTextClass}`}
                      aria-label="Open Google Shopping & Field Supplies"
                    >
                      <ShoppingBag size={12} className="text-emerald-400" />
                      <span>Shopping</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowBooksModal(true);
                      }}
                      className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold bg-indigo-950 text-indigo-200 border-indigo-600 hover:bg-indigo-900 shadow-[0_0_8px_rgba(99,102,241,0.3)] min-h-[44px] ${itemTextClass}`}
                      aria-label="Open Google Play Books & Literature Library"
                    >
                      <BookOpen size={12} className="text-indigo-400" />
                      <span>Play Books</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowYouTubeModal(true);
                      }}
                      className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold bg-amber-950 text-amber-200 border-amber-600 hover:bg-amber-900 shadow-[0_0_8px_rgba(245,158,11,0.3)] min-h-[44px] ${itemTextClass}`}
                      aria-label="Open The Zion Way & Babylon-Free YouTube Explorer"
                    >
                      <Youtube size={12} className="text-amber-400" />
                      <span>Zion YouTube</span>
                    </button>
                  </>
                )}

                <button
                  onClick={() => {
                    setShowP2PModal(true);
                    if (speakWords) speakWords("Opening Decentralized Mesh Network Panel");
                  }}
                  className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold bg-green-950 text-green-200 border-green-600 hover:bg-green-900 shadow-[0_0_8px_rgba(34,197,94,0.3)] min-h-[44px] ${itemTextClass}`}
                >
                  <QrCode size={12} className="text-green-400 animate-pulse" />
                  <span>Get QR Code</span>
                </button>

                {/* Screenshot Submenu Trigger (Hidden if Visuals OFF) */}
                {!isVisualsOff && (
                  <button
                    onClick={() => setActiveSubMenu(activeSubMenu === 'screenshot' ? null : 'screenshot')}
                    aria-pressed={activeSubMenu === 'screenshot'}
                    className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold min-h-[44px] ${itemTextClass} ${
                      activeSubMenu === 'screenshot'
                        ? 'bg-zinc-800 text-white border-green-500'
                        : 'bg-zinc-900/60 text-green-400 border-green-900/50 hover:border-green-700'
                    }`}
                  >
                    <Camera size={12} />
                    <span className="bg-gradient-to-r from-red-500 via-green-400 to-blue-500 bg-clip-text text-transparent font-extrabold">
                      Take Screenshot
                    </span>
                    {activeSubMenu === 'screenshot' ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                  </button>
                )}

                <button
                  onClick={() => {
                    const nextVal = !genericCrashSound;
                    if (setGenericCrashSound) setGenericCrashSound(nextVal);
                    speakWords(`Generic Crash Sound turned ${nextVal ? "ON" : "OFF"}`);
                    setStatusMessage(`Generic Crash Sound: ${nextVal ? "ON" : "OFF"}`);
                  }}
                  aria-pressed={genericCrashSound}
                  className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold min-h-[44px] ${itemTextClass} ${
                    genericCrashSound
                      ? 'bg-green-900 text-white border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'
                      : 'bg-zinc-900/60 text-green-400 border-green-900/50 hover:border-green-700'
                  }`}
                >
                  {genericCrashSound ? <Volume2 size={12} className="text-green-300" /> : <VolumeX size={12} className="text-green-600" />}
                  <span>Generic Crash Sound {genericCrashSound ? "ON" : "OFF"}</span>
                </button>

                {musicMenuMode === "none" ? (
                  <button
                    onClick={() => {
                      setMusicMenuMode("main");
                      speakWords("Music submenu opened. Choose Ambience Only or select from track list.");
                    }}
                    className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold min-h-[44px] ${itemTextClass} bg-zinc-900/60 text-green-400 border-green-900/50 hover:border-green-700`}
                  >
                    <Music size={12} className="text-green-600" />
                    <span>Music Menu</span>
                  </button>
                ) : musicMenuMode === "main" ? (
                  <div className="flex flex-col gap-2 p-2 bg-zinc-950/60 border border-green-900/40 rounded w-full">
                    <div className="text-[10px] text-green-500 font-mono font-bold uppercase tracking-wider mb-1">
                      Music Options
                    </div>
                    <button
                      onClick={() => {
                        if (setMusicEnabled) setMusicEnabled(false);
                        if (onSetCustomTrack) onSetCustomTrack(null);
                        speakWords("Ambience only activated. Background music stopped.");
                        setStatusMessage("Ambience Only Activated");
                        setActiveMenu(null);
                        setActiveSubMenu(null);
                        setMusicMenuMode("none");
                      }}
                      className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold min-h-[44px] ${itemTextClass} bg-green-900 text-white border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]`}
                    >
                      <Volume2 size={12} className="text-green-300" />
                      <span>Ambience Only (Default)</span>
                    </button>
                    <button
                      onClick={() => {
                        setMusicMenuMode("list");
                        speakWords("Choose Music From List. Select a track.");
                      }}
                      className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-2 font-bold min-h-[44px] ${itemTextClass} bg-zinc-900/60 text-green-400 border-green-900/50 hover:border-green-700`}
                    >
                      <Music size={12} className="text-green-300" />
                      <span>Choose Music From List</span>
                    </button>
                    <button
                      onClick={() => {
                        setMusicMenuMode("none");
                        speakWords("Back to Toolbox.");
                      }}
                      className={`font-mono uppercase px-3 py-1 text-zinc-400 hover:text-white transition text-xs font-bold min-h-[44px] mt-1`}
                    >
                      <span>← Back to Toolbox</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 p-2 bg-zinc-950/60 border border-green-900/40 rounded w-full max-h-[300px] overflow-y-auto">
                    <div className="text-[10px] text-green-500 font-mono font-bold uppercase tracking-wider mb-1">
                      Select Track
                    </div>
                    {[
                      { label: "The Grand Orchard", id: "the_grand_orchard" },
                      { label: "Zen Stone Garden", id: "zen_stone_garden" },
                      { label: "Botanical Maze", id: "botanical_maze" },
                      { label: "Butterfly Sanctuary", id: "butterfly_sanctuary" },
                      { label: "Orchid Glasshouse", id: "orchid_glasshouse" },
                      { label: "Edible Berry Garden", id: "edible_berry_garden" },
                      { label: "Garden of Wisdom", id: "garden_of_wisdom" },
                      { label: "Play Each Track Via Arena", id: null }
                    ].map((track) => (
                      <button
                        key={track.label || "dynamic"}
                        onClick={() => {
                          if (setMusicEnabled) setMusicEnabled(track.id !== null);
                          if (onSetCustomTrack) onSetCustomTrack(track.id);
                          speakWords(`${track.label} music selected.`);
                          setStatusMessage(`Music: ${track.label}`);
                          setActiveMenu(null);
                          setActiveSubMenu(null);
                          setMusicMenuMode("none");
                        }}
                        className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center justify-between gap-2 font-bold min-h-[44px] text-left ${itemTextClass} ${
                          customTrackId === track.id
                            ? "bg-green-900 text-white border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                            : "bg-zinc-900/60 text-green-400 border-green-900/50 hover:border-green-700"
                        }`}
                      >
                        <span>{track.label}</span>
                        {customTrackId === track.id && <span className="text-[9px] bg-green-500 text-black px-1.5 py-0.5 rounded font-extrabold">Active</span>}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setMusicMenuMode("main");
                        speakWords("Back to Music Control.");
                      }}
                      className={`font-mono uppercase px-3 py-1 text-zinc-400 hover:text-white transition text-xs font-bold min-h-[44px] mt-1`}
                    >
                      <span>← Back</span>
                    </button>
                  </div>
                )}
              </div>

              {activeSubMenu === 'screenshot' && !isVisualsOff && (
                <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-green-900 p-2 bg-zinc-950/40 rounded">
                  <button
                    onClick={() => {
                      DOMEngine.takeScreenshot(canvasRef.current, "png");
                    }}
                    className={`cursor-pointer font-mono px-3 py-2 bg-green-900 text-white hover:bg-green-800 border border-green-600 rounded transition font-bold min-h-[44px] ${itemTextClass}`}
                  >
                    Save Image As... (PNG)
                  </button>
                  <button
                    onClick={() => {
                      DOMEngine.takeScreenshot(canvasRef.current, "jpg");
                    }}
                    className={`cursor-pointer font-mono px-3 py-2 bg-green-900 text-white hover:bg-green-800 border border-green-600 rounded transition font-bold min-h-[44px] ${itemTextClass}`}
                  >
                    Save Image As... (JPG)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* VISUALS SETTINGS MENU */}
          {activeMenu === 'visual' && (
            <div className="flex flex-col gap-3">
              
              {/* Special Toggles: Display Visuals Normally, Chalkboard Only, Visuals OFF */}
              <div className="flex flex-col gap-1.5">
                <span className={`font-mono text-green-700 uppercase font-bold tracking-wider ${badgeTextClass}`}>Scientific Modes</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleVisualPrefChange("Display Visuals Normally");
                      speakWords("Visuals mode set to Display Visuals Normally");
                    }}
                    aria-pressed={activeVisualPref !== "Chalkboard Only" && activeVisualPref !== "Visuals OFF"}
                    className={`font-mono px-3 py-2 rounded border transition min-h-[44px] ${itemTextClass} ${
                      activeVisualPref !== "Chalkboard Only" && activeVisualPref !== "Visuals OFF"
                        ? 'bg-green-900 text-white border-green-400 font-bold shadow-[0_0_8px_rgba(34,197,94,0.4)]'
                        : 'bg-zinc-900/60 text-green-400 border-green-900/60 hover:border-green-600'
                    }`}
                  >
                    Display Visuals Normally
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleVisualPrefChange("Chalkboard Only");
                      speakWords("Visuals mode set to Chalkboard Only");
                    }}
                    aria-pressed={isChalkboard}
                    className={`font-mono px-3 py-2 rounded border transition min-h-[44px] ${itemTextClass} ${
                      isChalkboard
                        ? 'bg-emerald-950 text-emerald-200 border-emerald-400 font-bold shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                        : 'bg-zinc-900/60 text-green-400 border-green-900/60 hover:border-green-600'
                    }`}
                  >
                    Chalkboard Only
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleVisualPrefChange("Visuals OFF");
                      speakWords("Visuals turned OFF completely. Sound output active.");
                    }}
                    aria-pressed={isVisualsOff}
                    className={`font-mono px-3 py-2 rounded border transition min-h-[44px] ${itemTextClass} ${
                      isVisualsOff
                        ? 'bg-red-950 text-red-200 border-red-500 font-bold shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                        : 'bg-zinc-900/60 text-green-400 border-green-900/60 hover:border-green-600'
                    }`}
                  >
                    Visuals OFF
                  </button>

                  {/* Change Chalkboard Colors button (Visible ONLY when Chalkboard Only is active) */}
                  {isChalkboard && (
                    <button
                      type="button"
                      onClick={() => {
                        setTempChalkboardCfg(chalkboardConfig);
                        setShowChalkboardModal(true);
                      }}
                      className={`font-mono px-3 py-2 rounded border transition flex items-center gap-2 bg-amber-950 text-amber-200 border-amber-600 hover:bg-amber-900 min-h-[44px] ${itemTextClass}`}
                    >
                      <Palette size={14} className="text-amber-400" />
                      <span>Change Colors</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Standard Presets & Settings (Hidden if Visuals OFF) */}
              {!isVisualsOff && (
                <>
                  <div className="flex flex-col gap-1 pt-2 border-t border-green-900/20">
                    <span className={`font-mono text-green-700 uppercase font-bold tracking-wider ${badgeTextClass}`}>Presets</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Auto Sense 2-D/3-D", "2-D", "Simulated 3-D", "Vintage 3-D", "3-D+", "Super 3-D", "Pixelations", "Dot Matrix"].map(opt => (
                        <button
                          key={opt}
                          onClick={() => {
                            handleVisualPrefChange(opt);
                            if (opt === "Dot Matrix" && colorDotMatrix) {
                              setPalette("full-color");
                            }
                          }}
                          aria-pressed={activeVisualPref === opt}
                          className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${itemTextClass} ${activeVisualPref === opt ? 'bg-green-900 text-white border-green-500 font-bold shadow-[0_0_6px_rgba(34,197,94,0.3)]' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600 hover:text-green-200'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Settings submenus */}
                  {!isChalkboard && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-green-900/10">
                      
                      {/* Projection Submenu Trigger */}
                      <button
                        onClick={() => setActiveSubMenu(activeSubMenu === 'projection' ? null : 'projection')}
                        aria-pressed={activeSubMenu === 'projection'}
                        className={`font-mono uppercase px-2.5 py-1 rounded border transition flex items-center gap-1.5 min-h-[44px] ${itemTextClass} ${
                          activeSubMenu === 'projection' ? 'bg-zinc-800 text-white border-green-500' : 'bg-zinc-900/30 text-green-500 border-green-900/30'
                        }`}
                      >
                        Projection {activeSubMenu === 'projection' ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                      </button>

                      {/* Polygons Submenu Trigger */}
                      <button
                        onClick={() => setActiveSubMenu(activeSubMenu === 'polygons' ? null : 'polygons')}
                        aria-pressed={activeSubMenu === 'polygons'}
                        className={`font-mono uppercase px-2.5 py-1 rounded border transition flex items-center gap-1.5 min-h-[44px] ${itemTextClass} ${
                          activeSubMenu === 'polygons' ? 'bg-zinc-800 text-white border-green-500' : 'bg-zinc-900/30 text-green-500 border-green-900/30'
                        }`}
                      >
                        Polygons {activeSubMenu === 'polygons' ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                      </button>

                      {/* Palette Submenu Trigger */}
                      <button
                        onClick={() => setActiveSubMenu(activeSubMenu === 'palette' ? null : 'palette')}
                        aria-pressed={activeSubMenu === 'palette'}
                        className={`font-mono uppercase px-2.5 py-1 rounded border transition flex items-center gap-1.5 min-h-[44px] ${itemTextClass} ${
                          activeSubMenu === 'palette' ? 'bg-zinc-800 text-white border-green-500' : 'bg-zinc-900/30 text-green-500 border-green-900/30'
                        }`}
                      >
                        Palette {activeSubMenu === 'palette' ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                      </button>

                      {/* Pixels Submenu Trigger */}
                      {(activeVisualPref === "Pixelations" || activeVisualPref === "Dot Matrix") && (
                        <button
                          onClick={() => setActiveSubMenu(activeSubMenu === 'pixels' ? null : 'pixels')}
                          aria-pressed={activeSubMenu === 'pixels'}
                          className={`font-mono uppercase px-2.5 py-1 rounded border transition flex items-center gap-1.5 min-h-[44px] ${itemTextClass} ${
                            activeSubMenu === 'pixels' ? 'bg-zinc-800 text-white border-green-500' : 'bg-zinc-900/30 text-green-500 border-green-900/30'
                          }`}
                        >
                          Pixels {activeSubMenu === 'pixels' ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                        </button>
                      )}
                    </div>
                  )}

                  {/* PROJECTION SUBMENU CONTENT */}
                  {activeSubMenu === 'projection' && !isChalkboard && (
                    <div className="flex gap-2 pl-4 border-l-2 border-green-900 p-2 bg-zinc-950/40 rounded">
                      <button
                        onClick={() => {
                          setIs3D(true);
                          speakWords("Switched projection mechanism to 3-D Perspective");
                        }}
                        aria-pressed={is3D}
                        className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${itemTextClass} ${is3D ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'}`}
                      >
                        3-D Projection
                      </button>
                      <button
                        onClick={() => {
                          setIs3D(false);
                          speakWords("Switched projection mechanism to 2-D Top-Down Blueprints");
                        }}
                        aria-pressed={!is3D}
                        className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${itemTextClass} ${!is3D ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'}`}
                      >
                        2-D Projection
                      </button>
                    </div>
                  )}

                  {/* POLYGONS SUBMENU CONTENT */}
                  {activeSubMenu === 'polygons' && !isChalkboard && (
                    <div className="flex gap-2 pl-4 border-l-2 border-green-900 p-2 bg-zinc-950/40 rounded">
                      <button
                        onClick={() => {
                          setWireframe(false);
                          speakWords("Render filled solid polygons");
                        }}
                        aria-pressed={!wireframe}
                        className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${itemTextClass} ${!wireframe ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'}`}
                      >
                        Solid
                      </button>
                      <button
                        onClick={() => {
                          setWireframe(true);
                          speakWords("Render wireframe vectors");
                        }}
                        aria-pressed={wireframe}
                        className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${itemTextClass} ${wireframe ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'}`}
                      >
                        Wire Frame
                      </button>
                    </div>
                  )}

                  {/* PALETTE SUBMENU CONTENT */}
                  {activeSubMenu === 'palette' && !isChalkboard && (
                    <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-green-900 p-2 bg-zinc-950/40 rounded">
                      {[
                        { id: "full-color", label: "Full RGB Color" },
                        { id: "grayscale", label: "Grayscale" },
                        { id: "phosphor-green", label: "Matrix Green" },
                        { id: "cyberpunk-amber", label: "Cyberpunk Amber" }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            const nextVal = opt.id as VisualPaletteType;
                            setPalette(nextVal);
                            speakWords(`Applied ${opt.label} palette`);
                          }}
                          aria-pressed={palette === opt.id}
                          className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${itemTextClass} ${palette === opt.id ? 'bg-green-900 text-white border-green-500 font-bold shadow-[0_0_6px_rgba(34,197,94,0.3)]' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600 hover:text-green-200'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* PIXELS SUBMENU CONTENT */}
                  {activeSubMenu === 'pixels' && !isChalkboard && (activeVisualPref === "Pixelations" || activeVisualPref === "Dot Matrix") && (
                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-green-900 p-2 bg-zinc-950/40 rounded">
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { id: 1, label: "Sharp (Native)" },
                          { id: 2, label: "HD (2x2)" },
                          { id: 4, label: "SD (4x4)" },
                          { id: 6, label: "Vintage (6x6)" },
                          { id: 8, label: "Arcade (8x8)" },
                          { id: 12, label: "Low-Res (12x12)" },
                          { id: 16, label: "Retro (16x16)" }
                        ].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => {
                              setPixelation(opt.id);
                              speakWords(`Pixel setting set to block size ${opt.id}`);
                            }}
                            aria-pressed={pixelation === opt.id}
                            className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${itemTextClass} ${pixelation === opt.id ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600 hover:text-green-200'}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>

                      {activeVisualPref === "Dot Matrix" && (
                        <div className="pt-1 flex items-center gap-2">
                          <button
                            onClick={() => {
                              const next = !colorDotMatrix;
                              setColorDotMatrix(next);
                              if (next) {
                                setPalette("full-color");
                                speakWords("Color Dot Matrix mode activated. Rendering in true colors!");
                              } else {
                                setPalette("phosphor-green");
                                speakWords("Green Phosphor Dot Matrix mode activated.");
                              }
                            }}
                            aria-pressed={colorDotMatrix}
                            className={`font-mono px-3 py-1.5 rounded border transition flex items-center gap-1.5 font-bold min-h-[44px] ${itemTextClass} ${
                              colorDotMatrix
                                ? 'bg-green-900 text-white border-green-500'
                                : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'
                            }`}
                          >
                            Color Dot Matrix: {colorDotMatrix ? "ON" : "OFF"}
                          </button>
                          <span className={`font-mono text-zinc-500 uppercase ${badgeTextClass}`}>True color replication for dot matrices</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ACCESSIBILITY MENU */}
          {activeMenu === 'accessibility' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSubMenu(activeSubMenu === 'non_visual' ? null : 'non_visual')}
                  aria-pressed={activeSubMenu === 'non_visual'}
                  className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-1.5 font-bold min-h-[44px] ${itemTextClass} ${
                    activeSubMenu === 'non_visual' ? 'bg-zinc-800 text-white border-green-500' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'
                  }`}
                >
                  Non-Visual/Low Vision {activeSubMenu === 'non_visual' ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                </button>
              </div>

              {activeSubMenu === 'non_visual' && (
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-green-900 p-2 bg-zinc-950/40 rounded">
                  
                  {/* TTS ON/OFF Button */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                    <button
                      onClick={toggleTTS}
                      aria-pressed={ttsEnabled}
                      className={`font-mono px-3 py-1.5 rounded border transition font-bold min-h-[44px] ${itemTextClass} ${
                        ttsEnabled
                          ? 'bg-green-900 text-white border-green-500 shadow-[0_0_6px_rgba(34,197,94,0.3)]'
                          : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'
                      }`}
                    >
                      TTS ON/OFF (Shift-Z-Z): {ttsEnabled ? "ON" : "OFF"}
                    </button>
                  </div>

                  {/* Large Text ON/OFF Button (Placed directly below TTS toggle) */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                    <button
                      onClick={() => {
                        const nextVal = !largeText;
                        if (setLargeText) setLargeText(nextVal);
                        speakWords(`Large Text turned ${nextVal ? "ON" : "OFF"}`);
                        setStatusMessage(`Large Text: ${nextVal ? "ON" : "OFF"}`);
                      }}
                      aria-pressed={largeText}
                      className={`font-mono px-3 py-1.5 rounded border transition font-bold min-h-[44px] ${itemTextClass} ${
                        largeText
                          ? 'bg-amber-900 text-amber-100 border-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                          : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'
                      }`}
                    >
                      Large Text ON/OFF: {largeText ? "ON" : "OFF"}
                    </button>
                  </div>

                  {/* Announcement Preferences */}
                  {ttsEnabled && (
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-green-900/10">
                      <span className={`font-mono text-green-700 uppercase font-bold tracking-wider ${badgeTextClass}`}>Announcement Preferences</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            const next = !announceDoors;
                            setAnnounceDoors(next);
                            speakWords(`Door announcements ${next ? "on" : "off"}`);
                          }}
                          aria-pressed={announceDoors}
                          className={`font-mono px-3 py-1.5 rounded border transition shadow-sm min-h-[44px] ${itemTextClass} ${
                            announceDoors 
                              ? 'bg-green-300 text-black border-green-600 font-bold' 
                              : 'bg-indigo-700 text-yellow-400 border-indigo-900 font-bold'
                          }`}
                        >
                          Announce Opening Or Closing Of Doors {announceDoors ? "ON" : "OFF"}
                        </button>

                        <button
                          onClick={() => {
                            const next = !announceReverb;
                            setAnnounceReverb(next);
                            speakWords(`Reverb type announcement ${next ? "on" : "off"}`);
                          }}
                          aria-pressed={announceReverb}
                          className={`font-mono px-3 py-1.5 rounded border transition shadow-sm min-h-[44px] ${itemTextClass} ${
                            announceReverb 
                              ? 'bg-yellow-400 text-black border-yellow-600 font-bold' 
                              : 'bg-indigo-700 text-yellow-400 border-indigo-900 font-bold'
                          }`}
                        >
                          Announce Reverb Type {announceReverb ? "ON" : "OFF"}
                        </button>

                        <button
                          onClick={() => {
                            const next = !extendedInfo;
                            setExtendedInfo(next);
                            speakWords(`Extended information ${next ? "on" : "off"}`);
                          }}
                          aria-pressed={extendedInfo}
                          className={`font-mono px-3 py-1.5 rounded border transition shadow-sm min-h-[44px] ${itemTextClass} ${
                            extendedInfo 
                              ? 'bg-red-600 text-white border-red-800 font-bold' 
                              : 'bg-indigo-700 text-yellow-400 border-indigo-900 font-bold'
                          }`}
                        >
                          Extended Information {extendedInfo ? "ON" : "OFF"}
                        </button>

                        <button
                          onClick={() => {
                            const next = !chatterNotifications;
                            setChatterNotifications(next);
                            speakWords(`Chatter notifications ${next ? "on" : "off"}`);
                          }}
                          aria-pressed={chatterNotifications}
                          className={`font-mono px-3 py-1.5 rounded border transition shadow-sm min-h-[44px] ${itemTextClass} ${
                            chatterNotifications 
                              ? 'bg-green-300 text-black border-green-600 font-bold' 
                              : 'bg-indigo-700 text-yellow-400 border-indigo-900 font-bold'
                          }`}
                        >
                          Chatter Notifications {chatterNotifications ? "ON" : "OFF"}
                        </button>

                        <button
                          onClick={() => {
                            const next = !announceSteering;
                            setAnnounceSteering(next);
                            speakWords(`Automated steering announcements ${next ? "on" : "off"}`);
                          }}
                          aria-pressed={announceSteering}
                          className={`font-mono px-3 py-1.5 rounded border transition shadow-sm min-h-[44px] ${itemTextClass} ${
                            announceSteering 
                              ? 'bg-green-300 text-black border-green-600 font-bold' 
                              : 'bg-indigo-700 text-yellow-400 border-indigo-900 font-bold'
                          }`}
                        >
                          Announce Automated Turning {announceSteering ? "ON" : "OFF"}
                        </button>

                        <button
                          onClick={() => {
                            if (setAnnounceMooseSmash) {
                              const next = !announceMooseSmash;
                              setAnnounceMooseSmash(next);
                              speakWords(`Opossum jump smash announcements ${next ? "on" : "off"}`);
                            }
                          }}
                          aria-pressed={announceMooseSmash}
                          className={`font-mono px-3 py-1.5 rounded border transition shadow-sm min-h-[44px] ${itemTextClass} ${
                            announceMooseSmash 
                              ? 'bg-yellow-400 text-black border-yellow-600 font-bold' 
                              : 'bg-indigo-700 text-yellow-400 border-indigo-900 font-bold'
                          }`}
                        >
                          Announce Opossum Jump Smash {announceMooseSmash ? "ON" : "OFF"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* VIEW MENU */}
          {activeMenu === 'view' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                
                {/* Visual HUD toggler (Hidden if Visuals OFF) */}
                {!isVisualsOff && (
                  <button
                    id="btn-toggle-visual-hud"
                    onClick={() => {
                      setShowVisualHUD((p: boolean) => {
                        const next = !p;
                        speakWords(next ? "Visual HUD enabled" : "Visual HUD disabled");
                        return next;
                      });
                    }}
                    aria-pressed={showVisualHUD}
                    className={`cursor-pointer border font-mono px-3 py-1.5 rounded uppercase transition font-bold min-h-[44px] ${itemTextClass} ${
                      showVisualHUD
                        ? "bg-red-600 text-white border-red-400 shadow-[0_0_6px_rgba(239,68,68,0.3)]"
                        : "bg-indigo-700 border-indigo-500 text-white hover:bg-indigo-600"
                    }`}
                  >
                    Visual HUD: {showVisualHUD ? "ON" : "OFF"}
                  </button>
                )}

                {/* Opponent Indicators / Visual HUD Tags toggler (Hidden if Visuals OFF) */}
                {!isVisualsOff && setShowOpponentIndicators && (
                  <button
                    id="btn-toggle-opponent-indicators"
                    onClick={() => {
                      setShowOpponentIndicators((p: boolean) => {
                        const next = !p;
                        speakWords(next ? "Visual HUD tags enabled" : "Visual HUD tags disabled");
                        return next;
                      });
                    }}
                    aria-pressed={showOpponentIndicators}
                    className={`cursor-pointer border font-mono px-3 py-1.5 rounded uppercase transition font-bold min-h-[44px] ${itemTextClass} ${
                      showOpponentIndicators
                        ? "bg-amber-600 text-white border-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.3)]"
                        : "bg-amber-950/80 border-amber-800 text-amber-300 hover:bg-amber-900/80 hover:text-white"
                    }`}
                  >
                    Visual HUD Tags: {showOpponentIndicators ? "ON" : "OFF"}
                  </button>
                )}

                {/* Prospective Mode Trigger (Hidden if Visuals OFF) */}
                {!isVisualsOff && (
                  <button
                    onClick={() => setActiveSubMenu(activeSubMenu === 'prospective' ? null : 'prospective')}
                    aria-pressed={activeSubMenu === 'prospective'}
                    className={`font-mono uppercase px-3 py-1.5 rounded border transition flex items-center gap-1.5 font-bold min-h-[44px] ${itemTextClass} ${
                      activeSubMenu === 'prospective' ? 'bg-zinc-800 text-white border-green-500' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'
                    }`}
                  >
                    Prospective Mode {activeSubMenu === 'prospective' ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                  </button>
                )}

                {/* Live Feed log toggler */}
                <button
                  onClick={() => {
                    setShowFeed((p: boolean) => {
                      const next = !p;
                      speakWords(next ? "Live feed log visible" : "Live feed log hidden");
                      return next;
                    });
                  }}
                  aria-pressed={showFeed}
                  className={`cursor-pointer border font-mono px-3 py-1.5 rounded uppercase transition font-bold min-h-[44px] ${itemTextClass} ${
                    showFeed
                      ? "bg-green-900 text-white border-green-500 shadow-[0_0_6px_rgba(34,197,94,0.3)]"
                      : "bg-green-950/80 border-green-800 text-green-400 hover:text-white"
                  }`}
                >
                  Feed Log: {showFeed ? "ON" : "OFF"}
                </button>
              </div>

              {/* PROSPECTIVE MODE CONTENT */}
              {activeSubMenu === 'prospective' && !isVisualsOff && (
                <div className="flex gap-2 pl-4 border-l-2 border-green-900 p-2 bg-zinc-950/40 rounded">
                  <button
                    onClick={() => {
                      setViewMode(GameViewMode.POV);
                      stateRef.current.viewMode = GameViewMode.POV;
                      speakWords("Toggled to POV view");
                    }}
                    aria-pressed={viewMode === GameViewMode.POV}
                    className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${itemTextClass} ${viewMode === GameViewMode.POV ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'}`}
                  >
                    POV Mode
                  </button>
                  <button
                    onClick={() => {
                      setViewMode(GameViewMode.RIDER);
                      stateRef.current.viewMode = GameViewMode.RIDER;
                      speakWords("Toggled to Rider View");
                    }}
                    aria-pressed={viewMode === GameViewMode.RIDER}
                    className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${itemTextClass} ${viewMode === GameViewMode.RIDER ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600'}`}
                  >
                    Rider Mode
                  </button>
                </div>
              )}
            </div>
          )}

          {/* LAYOUT MENU */}
          {activeMenu === 'layout' && (
            <div className="flex flex-wrap gap-2">
              {[
                { id: KeyboardLayoutType.CEDELLA, label: "Cedella" },
                { id: KeyboardLayoutType.ARDEN_DENIS, label: "Arden Denis" }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleLayoutChange(opt.id)}
                  aria-pressed={layout === opt.id}
                  className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${itemTextClass} ${layout === opt.id ? 'bg-green-900 text-white border-green-500 font-bold shadow-[0_0_6px_rgba(34,197,94,0.3)]' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600 hover:text-green-200'}`}
                >
                  {opt.label} Keyboard
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setShowKeyboardModal(true);
                  speakWords("Keyboard shortcuts modal opened");
                }}
                className={`font-mono px-3 py-1.5 rounded border transition flex items-center gap-1.5 font-bold min-h-[44px] ${itemTextClass} bg-emerald-950/80 text-emerald-300 border-emerald-700 hover:bg-emerald-900 hover:text-white`}
              >
                <Keyboard className="w-4 h-4" />
                Keyboard Shortcuts
              </button>

              {WiiControllerManager.isSupported() ? (
                <button
                  type="button"
                  onClick={async () => {
                    if (wiiConnected) {
                      WiiControllerManager.triggerRumble(200);
                      speakWords("Wii remote connected and rumbled");
                    } else {
                      try {
                        const ok = await WiiControllerManager.connectWiiRemote();
                        if (ok) {
                          setWiiConnected(true);
                          speakWords("Wii remote successfully paired and connected");
                        }
                      } catch (err: any) {
                        speakWords("Connection failed. Press sync on your remote");
                      }
                    }
                  }}
                  className={`font-mono px-3 py-1.5 rounded border transition min-h-[44px] ${wiiConnected ? 'bg-green-950 text-green-300 border-green-500 font-bold shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600 hover:text-green-200'}`}
                >
                  {wiiConnected ? "Wii Remote Connected 🟢" : "Pair Wii Remote (WebHID)"}
                </button>
              ) : (
                <span className="font-mono px-3 py-1.5 rounded border border-zinc-800 text-zinc-500 bg-zinc-900/30 text-xs flex items-center">
                  Wii Remote Support (Requires Chrome/Edge)
                </span>
              )}
            </div>
          )}

        </div>
      )}

      {showKeyboardModal && (
        <KeyboardCommandsModal
          onClose={() => setShowKeyboardModal(false)}
          activeLayout={layout}
          onLayoutSelect={handleLayoutChange}
        />
      )}
    </div>
  );
};
