import React from "react";
import { resolveMooseAndMonkeyBehavior, BehaviorState } from "./Moose_Gone_Wild";

export { resolveMooseAndMonkeyBehavior };
export type { BehaviorState };

export const BehaviorAnalyzerView: React.FC<{ isBull: boolean }> = ({ isBull }) => {
  const [randomSeed, setRandomSeed] = React.useState<number>(0.5);
  const resolved = resolveMooseAndMonkeyBehavior(randomSeed, isBull);

  return (
    <div id="BehaviorAnalyzer" className="p-3 bg-zinc-950 border border-green-950 rounded text-xs select-none">
      <span className="text-green-500 font-mono block mb-1 font-semibold uppercase tracking-wider">
        Bebehaviors Simulator (Markov-Ethology Engine)
      </span>
      <p className="text-zinc-400 mb-2 font-sans">
        Simulates accurate animal responses based on gender-scaled aggression vectors.
      </p>
      <div className="flex gap-2 items-center mb-2">
        <label className="text-zinc-500">Seed:</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={randomSeed} 
          onChange={(e) => setRandomSeed(parseFloat(e.target.value))}
          className="w-24 accent-green-500 bg-zinc-900 cursor-pointer"
        />
        <span className="font-mono text-green-400">{randomSeed.toFixed(2)}</span>
      </div>
      <div className="bg-black/60 p-2 border border-green-950 rounded">
        <div className="flex justify-between font-mono mb-1">
          <span className="text-zinc-500">Moose Action:</span>
          <span className="text-green-400 font-bold uppercase">{resolved.mooseState}</span>
        </div>
        <div className="flex justify-between font-mono mb-1">
          <span className="text-zinc-500">Monkey Action:</span>
          <span className="text-blue-400 uppercase">{resolved.monkeyState}</span>
        </div>
        <div className="flex justify-between font-mono mb-1.5">
          <span className="text-zinc-500">Aggression Index:</span>
          <span className="text-red-400">{(resolved.aggressionFactor * 100).toFixed(0)}%</span>
        </div>
        <p className="text-[11px] text-zinc-300 italic">{resolved.actionText}</p>
      </div>
    </div>
  );
};
