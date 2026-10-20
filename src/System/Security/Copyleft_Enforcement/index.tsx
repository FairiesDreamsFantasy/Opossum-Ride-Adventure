/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CopyleftEnforcementGeneral, evaluateCopyleftCompliance, CopyleftPlatformCheckResult } from "./General";

export * from "./General";

/**
 * React Component rendered whenever a closed-source DRM platform attempts execution.
 * Enforces the exact requested sovereign educational notice.
 */
export const CopyleftEnforcementNotice: React.FC<{
  result?: CopyleftPlatformCheckResult;
}> = ({ result }) => {
  const message = result?.enforcementMessage || CopyleftEnforcementGeneral.defaultEnforcementMessage;

  return (
    <div 
      id="copyleft-hard-enforcement-screen"
      className="min-h-screen bg-black text-amber-200 flex flex-col items-center justify-center p-6 text-center font-mono selection:bg-amber-900 selection:text-white"
    >
      <div className="max-w-xl w-full border-2 border-amber-600/70 bg-zinc-950 p-8 rounded-lg shadow-[0_0_50px_rgba(217,119,6,0.25)] space-y-6">
        <div className="space-y-2">
          <span className="text-4xl" role="img" aria-label="Shield">🛡️</span>
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-amber-400 uppercase">
            Fairies Dreams &amp; Fantasy
          </h1>
          <p className="text-xs text-amber-500/80 uppercase tracking-widest">
            Sovereign Copyleft Enforcement System
          </p>
        </div>

        <div className="h-0.5 w-24 bg-amber-700/60 mx-auto rounded" />

        <div className="p-4 bg-zinc-900/90 border border-amber-500/30 rounded">
          <p className="text-base md:text-lg text-amber-100 font-semibold leading-relaxed">
            {message}
          </p>
        </div>

        <div className="text-[11px] text-zinc-400 space-y-1">
          <p>License: GNU General Public License v3 (GPL v3)</p>
          <p>Anti-Tivoization &amp; Digital Sovereignty Guaranteed</p>
        </div>
      </div>
    </div>
  );
};

export const CopyleftEnforcement = {
  ...CopyleftEnforcementGeneral,
  NoticeComponent: CopyleftEnforcementNotice,
  check: evaluateCopyleftCompliance
};

export default CopyleftEnforcement;
