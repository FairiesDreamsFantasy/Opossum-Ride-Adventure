/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GeminiArenasGeneral = {
  systemName: "Gemini AI Arenas General Subsystem",
  status: "Active",
  getArenaProfiles() {
    return [
      { id: "manor_grounds", name: "Manor Grounds Arena", width: 4000, height: 4000 },
      { id: "forest_clearing", name: "Forest Clearing Arena", width: 5000, height: 5000 }
    ];
  }
};

export default GeminiArenasGeneral;
