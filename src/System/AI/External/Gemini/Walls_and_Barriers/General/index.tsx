/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GeminiWallsAndBarriersGeneral = {
  systemName: "Gemini AI Walls and Barriers General Subsystem",
  status: "Active",
  getBarrierTypes() {
    return {
      types: ["Brick Exterior", "Plaster Interior", "Stone Wall", "Wooden Fence"],
      collisionEngine: "Rigid Bounding Box"
    };
  }
};

export default GeminiWallsAndBarriersGeneral;
