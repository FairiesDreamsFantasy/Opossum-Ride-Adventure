import React, { useEffect, useState } from "react";
import { AIOpossum } from "../../../General/AI_State";

interface GraphicsDisplayProps {
  loading?: boolean;
  selectedOpossum?: AIOpossum;
}

export const GraphicsDisplay: React.FC<GraphicsDisplayProps> = ({ loading, selectedOpossum }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (selectedOpossum) {
      setIsSpeaking(true);
      const timer = setTimeout(() => setIsSpeaking(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedOpossum]);

  return (
    <div 
      id="AI_Graphics_Core"
      className={`w-full bg-black border border-green-900 rounded p-4 flex flex-col items-center justify-center min-h-[400px] transition-all duration-700 relative overflow-hidden
        ${loading ? "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]" : ""}
        ${selectedOpossum ? (selectedOpossum.sex === "Jill" ? "border-green-800 shadow-[0_0_20px_rgba(34,197,94,0.2)]" : "border-blue-800 shadow-[0_0_20px_rgba(59,130,246,0.2)]") : ""}
      `}
    >
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4"></div>
          <span className="text-amber-500 font-mono text-[10px] uppercase animate-pulse">Synthesizing Opossum Geometry...</span>
        </div>
      ) : selectedOpossum ? (
        <>
          <div className="text-[10px] text-zinc-500 font-mono absolute top-4 left-4 uppercase tracking-tighter">
             AI Entity: {selectedOpossum.id}
          </div>
          
          <div className="relative mb-6" style={{ transform: `scale(${selectedOpossum.size})` }}>
            <div className={`w-40 h-40 border-2 rounded-2xl flex items-center justify-center relative bg-zinc-950 transition-all duration-500 ${selectedOpossum.sex === "Jill" ? "border-green-900 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "border-blue-900 shadow-[0_0_15px_rgba(59,130,246,0.3)]"}`}>
               <div className={`w-24 h-16 rounded-full relative ${selectedOpossum.sex === "Jill" ? "bg-zinc-800" : "bg-zinc-700"}`}>
                 <div className={`absolute right-[-10px] top-2 w-16 h-12 rounded-full ${selectedOpossum.faceType === "Furry" ? "bg-zinc-200" : "bg-zinc-300"}`} />
                 <div className="absolute right-0 top-5 w-2 h-2 rounded-full bg-black">
                   <div className={`w-1 h-1 rounded-full absolute top-0.5 right-0.5 ${selectedOpossum.eyeColor === "Blue" ? "bg-blue-400" : selectedOpossum.eyeColor === "Green" ? "bg-green-400" : "bg-zinc-500"}`} />
                 </div>
                 
                 {/* Multi-colored neck ribbon for free Jacks */}
                 {selectedOpossum.neckRibbonColor === "Multi-colored" && (
                   <div 
                     className="absolute right-[4px] top-[26px] w-2 h-7 bg-gradient-to-b from-red-500 via-yellow-400 via-green-500 to-blue-500 rounded-sm border border-black/40 shadow-md origin-center rotate-12 z-10"
                     title="Multi-colored neck ribbon"
                   />
                 )}

                 <div className="absolute right-[-14px] top-7 w-4 h-4 rounded-full" style={{ backgroundColor: selectedOpossum.noseColor.toLowerCase().replace(" ", "") }} />
                 <div className={`absolute top-[-10px] right-4 w-6 h-6 rounded-full border-2 ${selectedOpossum.sex === "Jack" ? "bg-zinc-900 border-zinc-700" : "bg-zinc-400 border-zinc-500"}`}>
                   <div className="w-3 h-3 rounded-full absolute top-1 left-1" style={{ backgroundColor: selectedOpossum.innerEarColor.toLowerCase() }} />
                 </div>
                 <div className="absolute left-[-20px] bottom-2 w-24 h-4 rounded-full origin-right -rotate-12" style={{ backgroundColor: selectedOpossum.tailColor.toLowerCase() }} />
               </div>
               
               {isSpeaking && (
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1 h-8">
                   {[0, 0.1, 0.2].map(delay => (
                     <div key={delay} className={`w-1 rounded-full animate-bounce ${selectedOpossum.sex === "Jill" ? "bg-green-500" : "bg-blue-500"}`} style={{ height: `${20 + Math.random() * 20}px`, animationDelay: `${delay}s` }}></div>
                   ))}
                 </div>
               )}
            </div>
          </div>
          
          <div className="text-center space-y-3 w-full">
            <h3 className={`font-bold text-xl uppercase tracking-widest ${selectedOpossum.sex === "Jill" ? "text-green-300" : "text-blue-300"}`}>{selectedOpossum.name}</h3>
            
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="bg-black/40 border border-zinc-800 p-2 rounded">
                 <p className="text-[9px] text-zinc-600 uppercase font-mono mb-1">Vitals</p>
                 <p className="text-[10px] text-zinc-400">Sex: {selectedOpossum.sex}</p>
                 <p className="text-[10px] text-zinc-400">Scale: {(selectedOpossum.size * 100).toFixed(0)}% ({selectedOpossum.sizeCategory || "Medium"})</p>
                 <p className="text-[10px] text-zinc-400">Skin: {selectedOpossum.skinTone}</p>
                 <p className="text-[10px] text-zinc-400">Furry Face: {selectedOpossum.furryFacePercent || 75}%</p>
              </div>
              <div className="bg-black/40 border border-zinc-800 p-2 rounded">
                 <p className="text-[9px] text-zinc-600 uppercase font-mono mb-1">Appearance</p>
                 <p className="text-[10px] text-zinc-400">Eyes: {selectedOpossum.eyeColor}</p>
                 <p className="text-[10px] text-zinc-400">Face Style: {selectedOpossum.faceType}</p>
                 <p className="text-[10px] text-zinc-400">Tail Color: {selectedOpossum.tailColor}</p>
                 <p className="text-[10px] text-zinc-400">Ear Size: {selectedOpossum.earSize || "Medium"}</p>
              </div>
              <div className="bg-black/40 border border-zinc-800 p-2 rounded col-span-2">
                 <p className="text-[9px] text-zinc-600 uppercase font-mono mb-1">Scientific Configurations</p>
                 <div className="grid grid-cols-2 gap-x-2 text-[10px] text-zinc-400">
                   <p>Neckwear: {selectedOpossum.neckRibbonColor === "Multi-colored" ? "Multi-colored Ribbon" : "None"}</p>
                   <p>Jewelry: {selectedOpossum.accessories && selectedOpossum.accessories.length > 0 ? selectedOpossum.accessories.join(", ") : "None"}</p>
                   <p>Eyebrows: {selectedOpossum.eyebrows || "None"}</p>
                   <p>Snout Length: {selectedOpossum.snoutLength || "Standard"}</p>
                   <p className="col-span-2 mt-1 border-t border-zinc-900 pt-1">Animation Style: {selectedOpossum.animationStyle || "Standard Opossum"}</p>
                 </div>
              </div>
            </div>

            <div className="mt-4 p-2 bg-zinc-900/50 border border-zinc-800 rounded">
               <span className={`text-[10px] font-mono italic ${selectedOpossum.sex === "Jill" ? "text-green-600" : "text-blue-600"}`}>
                 {selectedOpossum.sex === "Jill" 
                   ? `*Vocal Signature: Elegant Network Chatter (${selectedOpossum.size > 1 ? "Lower" : "Higher"} Pitch)*` 
                   : `*Vocal Signature: Robust Local Grunt (${selectedOpossum.size > 1 ? "Lower" : "Higher"} Pitch)*`}
               </span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 border border-green-900/30 rounded flex items-center justify-center mb-4 relative">
             <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>
             <span className="text-green-900/50 text-4xl">?</span>
          </div>
          <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">Visual Display Standby</span>
        </div>
      )}
    </div>
  );
};
