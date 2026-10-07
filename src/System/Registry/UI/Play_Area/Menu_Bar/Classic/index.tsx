/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Settings 
} from "lucide-react";
import { KeyboardLayoutType } from "../../../../../../types";
import { VisualPaletteType } from "../../../../../Visuals";

interface ClassicMenuBarProps {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  activeVisualPref: string;
  handleVisualPrefChange: (pref: string) => void;
  announceDoors: boolean;
  setAnnounceDoors: (val: boolean) => void;
  announceReverb: boolean;
  setAnnounceReverb: (val: boolean) => void;
  extendedInfo: boolean;
  setExtendedInfo: (val: boolean) => void;
  chatterNotifications: boolean;
  setChatterNotifications: (val: boolean) => void;
  announceSteering: boolean;
  setAnnounceSteering: (val: boolean) => void;
  layout: KeyboardLayoutType;
  handleLayoutChange: (lay: KeyboardLayoutType) => void;
  palette: VisualPaletteType;
  setPalette: (val: VisualPaletteType) => void;
  pixelation: number;
  setPixelation: (val: number) => void;
  viewMode: any;
  setViewMode: (val: any) => void;
  is3D: boolean;
  setIs3D: (val: boolean) => void;
  wireframe: boolean;
  setWireframe: (val: boolean) => void;
  showFeed: boolean;
  setShowFeed: (val: any) => void;
  showVisualHUD: boolean;
  setShowVisualHUD: (val: any) => void;
  showOpponentIndicators?: boolean;
  setShowOpponentIndicators?: (val: any) => void;
  speakWords: (text: string) => void;
}

export const ClassicMenuBar: React.FC<ClassicMenuBarProps> = ({
  activeMenu,
  setActiveMenu,
  activeVisualPref,
  handleVisualPrefChange,
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
  layout,
  handleLayoutChange,
  palette,
  setPalette,
  pixelation,
  setPixelation,
  viewMode,
  setViewMode,
  is3D,
  setIs3D,
  wireframe,
  setWireframe,
  showFeed,
  setShowFeed,
  showVisualHUD,
  setShowVisualHUD,
  showOpponentIndicators = false,
  setShowOpponentIndicators,
  speakWords
}) => {
  return (
    <div id="Menu_Bar" className="flex flex-col bg-zinc-950 border border-green-900 rounded-md shadow-lg overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 border-b border-green-900/30">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <button
            onClick={() => setActiveMenu(activeMenu === 'visual' ? null : 'visual')}
            aria-pressed={activeMenu === 'visual'}
            className={`flex items-center gap-2 text-[10px] font-mono uppercase font-bold px-3 py-1.5 rounded transition ${activeMenu === 'visual' ? 'bg-green-900 text-white' : 'text-green-500 hover:bg-green-950'}`}
          >
            Visual Settings {activeMenu === 'visual' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          <button
            onClick={() => setActiveMenu(activeMenu === 'announcement' ? null : 'announcement')}
            aria-pressed={activeMenu === 'announcement'}
            className={`flex items-center gap-2 text-[10px] font-mono uppercase font-bold px-3 py-1.5 rounded transition ${activeMenu === 'announcement' ? 'bg-green-900 text-white' : 'text-green-500 hover:bg-green-950'}`}
          >
            Announcement Preferences {activeMenu === 'announcement' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          <button
            onClick={() => setActiveMenu(activeMenu === 'layout' ? null : 'layout')}
            aria-pressed={activeMenu === 'layout'}
            className={`flex items-center gap-2 text-[10px] font-mono uppercase font-bold px-3 py-1.5 rounded transition ${activeMenu === 'layout' ? 'bg-green-900 text-white' : 'text-green-500 hover:bg-green-950'}`}
          >
            Layout {activeMenu === 'layout' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          <button
            onClick={() => setActiveMenu(activeMenu === 'palette' ? null : 'palette')}
            aria-pressed={activeMenu === 'palette'}
            className={`flex items-center gap-2 text-[10px] font-mono uppercase font-bold px-3 py-1.5 rounded transition ${activeMenu === 'palette' ? 'bg-green-900 text-white' : 'text-green-500 hover:bg-green-950'}`}
          >
            Palette {activeMenu === 'palette' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          {(activeVisualPref === "Pixelations" || activeVisualPref === "Dot Matrix") && (
            <button
              onClick={() => setActiveMenu(activeMenu === 'pixels' ? null : 'pixels')}
              aria-pressed={activeMenu === 'pixels'}
              className={`flex items-center gap-2 text-[10px] font-mono uppercase font-bold px-3 py-1.5 rounded transition ${activeMenu === 'pixels' ? 'bg-green-900 text-white' : 'text-green-500 hover:bg-green-950'}`}
            >
              Pixels {activeMenu === 'pixels' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2 px-2 py-1 bg-green-950/40 rounded border border-green-900/20">
          <Settings size={12} className="text-green-700" />
          <span className="text-[9px] font-mono text-green-800 uppercase font-bold tracking-widest">Opossum Ride Control v4.0</span>
        </div>
      </div>

      {activeMenu && (
        <div className="bg-black/60 p-3 flex flex-wrap gap-2 border-t border-green-900/20">
          {activeMenu === 'visual' && ["Auto Sense 2-D/3-D", "2-D", "Simulated 3-D", "Vintage 3-D", "3-D+", "Super 3-D", "Pixelations", "Dot Matrix"].map(opt => (
            <button
              key={opt}
              onClick={() => handleVisualPrefChange(opt)}
              aria-pressed={activeVisualPref === opt}
              className={`text-[10px] font-mono px-3 py-1.5 rounded border transition ${activeVisualPref === opt ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600 hover:text-green-200'}`}
            >
              {opt}
            </button>
          ))}

          {activeMenu === 'announcement' && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const next = !announceDoors;
                  setAnnounceDoors(next);
                  speakWords(`Door announcements ${next ? "on" : "off"}`);
                }}
                aria-pressed={announceDoors}
                className={`text-[10px] font-mono px-3 py-1.5 rounded border transition shadow-sm ${
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
                className={`text-[10px] font-mono px-3 py-1.5 rounded border transition shadow-sm ${
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
                className={`text-[10px] font-mono px-3 py-1.5 rounded border transition shadow-sm ${
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
                className={`text-[10px] font-mono px-3 py-1.5 rounded border transition shadow-sm ${
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
                className={`text-[10px] font-mono px-3 py-1.5 rounded border transition shadow-sm ${
                  announceSteering 
                    ? 'bg-green-300 text-black border-green-600 font-bold' 
                    : 'bg-indigo-700 text-yellow-400 border-indigo-900 font-bold'
                }`}
              >
                Announce Automated Turning {announceSteering ? "ON" : "OFF"}
              </button>
            </div>
          )}
          
          {activeMenu === 'layout' && [
            { id: KeyboardLayoutType.CEDELLA, label: "Cedella" },
            { id: KeyboardLayoutType.ARDEN_DENIS, label: "Arden Denis" }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => handleLayoutChange(opt.id)}
              aria-pressed={layout === opt.id}
              className={`text-[10px] font-mono px-3 py-1.5 rounded border transition ${layout === opt.id ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600 hover:text-green-200'}`}
            >
              {opt.label} Keyboard
            </button>
          ))}

          {activeMenu === 'palette' && [
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
              className={`text-[10px] font-mono px-3 py-1.5 rounded border transition ${palette === opt.id ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600 hover:text-green-200'}`}
            >
              {opt.label}
            </button>
          ))}

          {activeMenu === 'pixels' && [
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
              className={`text-[10px] font-mono px-3 py-1.5 rounded border transition ${pixelation === opt.id ? 'bg-green-900 text-white border-green-500 font-bold' : 'bg-zinc-900/50 text-green-400 border-green-900/50 hover:border-green-600 hover:text-green-200'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            const nextView = viewMode === "rider" ? "pov" : "rider";
            setViewMode(nextView);
            speakWords(`Toggled to ${nextView === "pov" ? "POV" : "Rider View"}`);
          }}
          className="cursor-pointer bg-green-950/80 hover:bg-green-900 border border-green-800 text-green-300 hover:text-white text-[10px] font-mono px-3 py-1.5 rounded uppercase transition font-bold"
        >
          Toggle View (&quot;T&quot;)
        </button>
        <button
          onClick={() => {
            const nextVal = !is3D;
            setIs3D(nextVal);
            speakWords(`Switched projection mechanism to ${nextVal ? "3-D Perspective" : "2-D Top-Down Blueprints"}`);
          }}
          className={`cursor-pointer bg-green-950/80 hover:bg-green-900 border text-[10px] font-mono px-3 py-1.5 rounded uppercase font-bold transition ${
            is3D ? "border-green-500 text-white bg-green-900" : "border-green-800 text-green-400"
          }`}
        >
          PROJECTION: {is3D ? "3-D" : "2-D"}
        </button>
        <button
          onClick={() => {
            const nextVal = !wireframe;
            setWireframe(nextVal);
            speakWords(nextVal ? "Render wireframe vectors" : "Render filled solid polygons");
          }}
          className={`cursor-pointer bg-green-950/80 hover:bg-green-900 border text-[10px] font-mono px-3 py-1.5 rounded uppercase font-bold transition ${
            wireframe ? "border-green-500 text-white bg-green-900" : "border-green-800 text-green-400"
          }`}
        >
          MESH: {wireframe ? "WIREFRAME" : "SOLID"}
        </button>
        <button
          onClick={() => {
            setShowFeed((p: boolean) => {
              const next = !p;
              speakWords(next ? "Live feed log visible" : "Live feed log hidden");
              return next;
            });
          }}
          className={`cursor-pointer border text-[10px] font-mono px-3 py-1.5 rounded uppercase transition font-bold ${
            showFeed
              ? "bg-green-900 text-white border-green-500"
              : "bg-green-950/80 border-green-900 text-green-400 hover:text-white"
          }`}
        >
          FEED: {showFeed ? "ON" : "OFF"}
        </button>
        <button
          onClick={() => {
            setShowVisualHUD((p: boolean) => {
              const next = !p;
              speakWords(next ? "Visual HUD enabled" : "Visual HUD disabled");
              return next;
            });
          }}
          className={`cursor-pointer border text-[10px] font-mono px-3 py-1.5 rounded uppercase transition font-bold ${
            showVisualHUD
              ? "bg-red-600 text-white border-red-400"
              : "bg-indigo-700 border-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          <b>VISUAL HUD: {showVisualHUD ? "ON" : "OFF"}</b>
        </button>
        {setShowOpponentIndicators && (
          <button
            id="btn-classic-toggle-opponent-indicators"
            onClick={() => {
              setShowOpponentIndicators((p: boolean) => {
                const next = !p;
                speakWords(next ? "Visual HUD tags enabled" : "Visual HUD tags disabled");
                return next;
              });
            }}
            className={`cursor-pointer border text-[10px] font-mono px-3 py-1.5 rounded uppercase transition font-bold ${
              showOpponentIndicators
                ? "bg-amber-600 text-white border-amber-400"
                : "bg-amber-950/80 border-amber-800 text-amber-300 hover:bg-amber-900/80"
            }`}
          >
            <b>VISUAL HUD TAGS: {showOpponentIndicators ? "ON" : "OFF"}</b>
          </button>
        )}
      </div>
    </div>
  );
};
