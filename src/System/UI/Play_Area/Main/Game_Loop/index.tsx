/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { GameLoopGeneral, GameLoopStats } from "./General";

export * from "./General";

export interface GameLoopProps {
  onTick: (delta: number, stats: GameLoopStats) => void;
  isPaused?: boolean;
}

/**
 * Game Loop Controller using requestAnimationFrame for continuous smooth ticks.
 */
export const useGameLoop = ({ onTick, isPaused = false }: GameLoopProps) => {
  const statsRef = useRef<GameLoopStats>(GameLoopGeneral.createInitialStats());
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      return;
    }

    const loop = (time: number) => {
      const prev = statsRef.current.lastTime;
      const { delta, fps } = GameLoopGeneral.calculateDelta(prev, time);

      statsRef.current.delta = delta;
      statsRef.current.fps = fps;
      statsRef.current.frameCount += 1;
      statsRef.current.lastTime = time;

      onTick(delta, statsRef.current);

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [onTick, isPaused]);

  return statsRef;
};
