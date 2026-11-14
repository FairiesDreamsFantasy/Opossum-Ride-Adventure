/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CropFieldBufferPoolRust = {
  id: "crop_field_buffer_pool_rust",
  maxTriangularPaversInViewport: 144,
  paletteCardinality: 36,
  borderStoneCardinality: 3,
  computePaverColorIndex: (tileIndex: number): number => {
    const absIdx = Math.abs(Math.floor(tileIndex));
    return absIdx % 36;
  },
  computeBorderColorIndex: (tileIndex: number): number => {
    const absIdx = Math.abs(Math.floor(tileIndex));
    return absIdx % 3;
  }
};

export default CropFieldBufferPoolRust;
