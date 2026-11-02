import React from "react";
import { VersionRegistry } from "../../../Registry/Version";
import { OPOSSUM_UI_CONSTANTS } from "../General";

export const OpossumSelectionFooter: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t border-green-950 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
       <div>{VersionRegistry.engine} // {VersionRegistry.stage} v{VersionRegistry.current}</div>
       <div className="flex gap-4">
          <span>Max Rider: {OPOSSUM_UI_CONSTANTS.MAX_RIDER_TOTAL_INCHES} IN</span>
          <span>Grid: {OPOSSUM_UI_CONSTANTS.GRID_SPACING} PX</span>
       </div>
       <div>© 2026 Fairies Dreams Fantasy</div>
    </footer>
  );
};
