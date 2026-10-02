import React from "react";

export interface TrajectoryProjection {
  projectedPositionInSeconds: number[];
  timeToCollision: number; // in seconds, Infinity if safe
}

/**
 * Projects physical coordinates forward in time.
 * Calculates time-to-collision based on distance vectors and relative speed differences.
 */
export function projectTrajectory(
  playerPositionZ: number,
  playerSpeed: number,
  targetPositionZ: number,
  targetSpeed: number
): TrajectoryProjection {
  const relativeDistance = targetPositionZ - playerPositionZ;
  const relativeSpeed = playerSpeed - targetSpeed;

  // If already past or speeds do not close the gap
  if (relativeDistance <= 0) {
    return { projectedPositionInSeconds: [], timeToCollision: Infinity };
  }

  const timeToCollision = relativeSpeed <= 0 ? Infinity : relativeDistance / relativeSpeed;

  const positions: number[] = [];
  for (let i = 1; i <= 5; i++) {
    positions.push(targetPositionZ + targetSpeed * i);
  }

  return {
    projectedPositionInSeconds: positions,
    timeToCollision
  };
}

export const TrajectoryPredictorView: React.FC<{
  playerZ: number;
  playerSpeed: number;
  opponentZ: number;
  opponentSpeed: number;
}> = ({ playerZ, playerSpeed, opponentZ, opponentSpeed }) => {
  const projection = projectTrajectory(playerZ, playerSpeed, opponentZ, opponentSpeed);

  return (
    <div id="TrajectoryPredictor" className="p-3 bg-zinc-950 border border-green-950 rounded text-xs select-none mt-2">
      <span className="text-green-500 font-mono block mb-1 font-semibold uppercase tracking-wider">
        Trajectory Projection (Collision Vector Estimator)
      </span>
      <p className="text-zinc-400 mb-2 font-sans">
        Projects kinematics vectors forward up to 5 seconds to prevent collision overhead.
      </p>
      
      <div className="bg-black/40 p-2 border border-green-950 rounded font-mono text-[11px] mb-2">
        <div className="flex justify-between text-zinc-500 mb-1">
          <span>Relative Velocity:</span>
          <span className="text-blue-400">{(playerSpeed - opponentSpeed).toFixed(1)} m/s</span>
        </div>
        <div className="flex justify-between text-zinc-500">
          <span>Predicted Collision Time:</span>
          {projection.timeToCollision === Infinity ? (
            <span className="text-green-400 font-bold">STABLE/SAFE</span>
          ) : (
            <span className={`${projection.timeToCollision < 2.5 ? "text-red-500 font-bold animate-pulse" : "text-yellow-400"}`}>
              {projection.timeToCollision.toFixed(2)} seconds
            </span>
          )}
        </div>
      </div>

      <div>
        <span className="text-[10px] text-zinc-500 font-mono block mb-1">5-SECOND POSITION FORECAST (Z-METERS)</span>
        <div className="flex justify-between gap-1">
          {projection.projectedPositionInSeconds.length > 0 ? (
            projection.projectedPositionInSeconds.map((pos, idx) => (
              <div key={idx} className="flex-1 bg-zinc-900 border border-green-950/60 p-1 text-center font-mono rounded">
                <span className="text-[9px] text-zinc-600 block">{idx + 1}s</span>
                <span className="text-[10px] text-zinc-300">{Math.round(pos)}m</span>
              </div>
            ))
          ) : (
            <span className="text-[11px] text-zinc-500 italic">No hazard forecast available</span>
          )}
        </div>
      </div>
    </div>
  );
};
