import React from "react";

/**
 * Calculates local risk probability profile using a standard Gaussian Radial Decay model.
 * Higher values designate maximum spatial proximity to unpredictable moose.
 *
 * formula: Risk = e ^ (- (distance^2) / (2 * sigma_sq))
 */
export function calculateHotspotRisk(distance: number, sigma: number = 40): number {
  if (distance < 0) return 0;
  const sigmaSq = sigma * sigma;
  return Math.exp(-(distance * distance) / (2 * sigmaSq));
}

export const HotspotVisualizerView: React.FC<{ playerZ: number; opponentZ: number }> = ({ playerZ, opponentZ }) => {
  const currentDistance = Math.abs(opponentZ - playerZ);
  const activeRisk = calculateHotspotRisk(currentDistance, 60);

  return (
    <div id="HotspotVisualizer" className="p-3 bg-zinc-950 border border-green-950 rounded text-xs select-none mt-2">
      <span className="text-green-500 font-mono block mb-1 font-semibold uppercase tracking-wider">
        Proximity Hotspot Analyzer (Radial Gaussian Decay)
      </span>
      <p className="text-zinc-400 mb-2 font-sans">
        Computes the physical trigger influence field based on real distance metrics.
      </p>
      <div className="grid grid-cols-2 gap-2 text-zinc-300 font-mono mb-2">
        <div className="bg-black/40 p-1.5 rounded border border-green-950">
          <span className="text-[10px] text-zinc-500 block">RELATIVE DISTANCE</span>
          <span className="text-green-400 font-bold">{currentDistance.toFixed(1)} meters</span>
        </div>
        <div className="bg-black/40 p-1.5 rounded border border-green-950">
          <span className="text-[10px] text-zinc-500 block">HOTSPOT INFLUENCE</span>
          <span className={`${activeRisk > 0.5 ? "text-red-400 font-bold" : "text-green-400"}`}>
            {(activeRisk * 100).toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="relative w-full h-3 bg-zinc-900 rounded overflow-hidden border border-green-950">
        <div 
          className="absolute h-full bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 transition-all duration-300"
          style={{ width: `${Math.min(100, activeRisk * 100)}%` }}
        />
      </div>
      {activeRisk > 0.7 && (
        <p className="text-[10px] text-red-500 animate-pulse mt-1.5 font-sans">
          ⚠ WARNING: Severe hotspot proximity detected. Opossum chatter will auto-trigger charging behavior!
        </p>
      )}
    </div>
  );
};
