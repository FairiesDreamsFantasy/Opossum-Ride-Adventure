/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VolumetricViewportMath, LightFieldVector } from "./General";

export * from "./General";

/**
 * Volumetric_Viewport Master Subsystem
 * 
 * Prepares Opossum Ride Adventure for the future of 
 * holographic and volumetric light-field interaction.
 */
export class VolumetricViewportSubsystem {
  public getStatus(): {
    renderer: "LIGHT_FIELD_SYNTHESIS";
    dimensionSupport: "4D_VOLUMETRIC";
    openDisplayProtocol: true;
  } {
    return {
      renderer: "LIGHT_FIELD_SYNTHESIS",
      dimensionSupport: "4D_VOLUMETRIC",
      openDisplayProtocol: true
    };
  }
}

export const VolumetricViewport = new VolumetricViewportSubsystem();
export default VolumetricViewport;
