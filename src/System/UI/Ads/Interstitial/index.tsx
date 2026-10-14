/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { playProceduralSound } from "../../../Sound/TTS";

interface InterstitialAdProps {
  onAdComplete: () => void;
}

export const InterstitialAd: React.FC<InterstitialAdProps> = ({ onAdComplete }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const scriptInjectedRef = useRef(false);

  const canSkip = secondsElapsed >= 30;

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => {
        const next = prev + 1;
        return next;
      });

      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Dynamic insertion of Revive Adserver async script strictly per request
    if (!scriptInjectedRef.current) {
      scriptInjectedRef.current = true;
      const script = document.createElement("script");
      script.async = true;
      script.src = "//ads.fairiesdreamsfantasy.com/adserver/www/delivery/asyncjs.php";
      document.body.appendChild(script);

      // Also support triggering revive reload logic if it exists
      try {
        const windowWithRevive = window as any;
        if (windowWithRevive.reviveAsync) {
          // If already loaded, refresh
          windowWithRevive.reviveAsync.detect();
        }
      } catch (err) {
        console.warn("Revive re-detect warning:", err);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSkip = () => {
    if (canSkip) {
      playProceduralSound("chatter");
      onAdComplete();
    }
  };

  // Skip automatically if 120 seconds completes
  useEffect(() => {
    if (timeLeft === 0) {
      onAdComplete();
    }
  }, [timeLeft, onAdComplete]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-sans flex flex-col justify-between items-center p-6 md:p-12 relative overflow-hidden">
      {/* Background ambient details */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />

      {/* Aesthetic grid header */}
      <div className="text-center w-full max-w-xl z-10 mt-4">
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-green-200 animate-pulse">
          Preparing Opossum Ride Adventure
        </h2>
        <div className="h-0.5 w-16 bg-green-900/60 mx-auto mt-2 rounded" />
      </div>

      {/* Ad Box Layout strictly incorporating client's requested nodes with precise classes */}
      <div className="w-full max-w-2xl bg-zinc-950/80 border border-green-900/40 rounded-lg p-6 md:p-10 z-10 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative flex flex-col items-center justify-center min-h-[300px]">
        {/* Strictly matching requested HTML structure */}
        <h5 style={{ textAlign: "center", display: "block" }} className="text-zinc-400 text-xs uppercase tracking-widest font-mono mb-4">
          Advertisement
        </h5>

        <div style={{ textAlign: "center", display: "block" }} className="w-full min-h-[160px] flex flex-col items-center justify-center border border-zinc-900 rounded bg-black/60 p-4">
          {/* Revive Adserver Asynchronous JS Tag - Generated with Revive Adserver v6.0.8 */}
          <ins 
            data-revive-zoneid="13" 
            data-revive-id="fe1f19a638c05881542e31deb5ef01ad"
            className="block text-zinc-600 text-[10px] font-mono leading-relaxed"
          >
            [Loading Advertisement Zone 13...]
          </ins>
          
          {/* Prompting user that external adserver might be loading async */}
          <p className="text-[10px] text-green-700 font-mono mt-4 uppercase tracking-wider">
            Ads are served via ads.fairiesdreamsfantasy.com
          </p>
        </div>

        {/* Dynamic visual indicator for skip timer */}
        <div className="w-full mt-6 text-center">
          <div className="text-xs font-mono text-green-500 mb-2">
            {canSkip ? (
              <span className="text-green-400 font-bold uppercase">
                Skip availability active!
              </span>
            ) : (
              <span>
                Please standby &bull; Skip unlocks in <strong className="text-green-300 font-bold text-sm">{30 - secondsElapsed}s</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Button Section containing Skip Ad strictly */}
      <div className="w-full text-center z-10 mb-6 flex flex-col items-center gap-1">
        <button
          onClick={handleSkip}
          disabled={!canSkip}
          className={`cursor-pointer px-8 py-3.5 rounded font-mono font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
            canSkip
              ? "bg-green-500 text-black hover:bg-green-400 active:scale-95 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              : "bg-zinc-900 text-zinc-600 border border-zinc-850 cursor-not-allowed opacity-50"
          }`}
          style={{ minHeight: "44px" }}
        >
          {canSkip ? "Skip Ad" : `Skip in ${30 - secondsElapsed} s`}
        </button>
      </div>
    </div>
  );
};
