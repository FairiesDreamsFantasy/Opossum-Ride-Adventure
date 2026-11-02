/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GeminiItemsDecorGeneral = {
  systemName: "Gemini AI Items Decor General Subsystem",
  status: "Active",
  getDecorCatalog() {
    return [
      { id: "grand_tapestry", name: "Grand Tapestry", location: "Foyer Wall" },
      { id: "vintage_lantern", name: "Vintage Lantern", intensity: 0.8 }
    ];
  }
};

export default GeminiItemsDecorGeneral;
