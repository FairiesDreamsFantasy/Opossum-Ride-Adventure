/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Dedicated 2D Blueprint and 3D Perspective Renderer for World 2 Level 0:
 * - Temple Courtyard (4000x3000 ft, 25 ft stone block walls, 007-inspired open East windows, locked West door overlooking crop fields)
 * - Flowers_Stars_Diamonds_and_Rainbow_Stone_Door_With_Carvings (20x20 ft pocket double sliding doors at X=4000, Y=1490..1510)
 * - North Flower Garden (4000x2000 ft, grass, 10 ft walls, 36 large flowers)
 * - South Outdoor Tea Area (4000x2000 ft, tile, 20 ft canopy with skylights, spaced tea tables)
 * - Temple Entrance Foyer (3000x3000 ft, 40 ft high ceiling, 24"x24" Black & Green checkerboard, sky/pyramid/horizon murals, East 20x20 Archway to World 2 Level 1)
 */

import { GameViewMode, OpossumCharacter, RiderCharacter } from "../../../../../../types";
import { VISUAL_CONSTANTS } from "../../../../../Visuals";
import { drawCarvedStoneDoorLeaf } from "../../../../../Building_Blocks/Doors/Sliding_Doors/Crafted/Flowers_Stars_Diamonds_and_Rainbow_Stone_Door_With_Carvings";
import {
  NORTH_GARDEN_LARGE_FLOWERS,
  SOUTH_TEA_TABLES,
  WORLD2_SOUTH_TEA_AREA_SPEC,
  WORLD2_TEMPLE_FOYER_SPEC,
  getTempleFoyerTileColor,
  resolveWorld2Level0Zone
} from "../../../../../../World/2/Levels/Level_0";
import { CourtyardPerspectiveKernel } from "./CourtyardPerspectiveKernel";
import { CanvasTextPurityPolicy } from "../../CanvasTextPurityPolicy";
import { isPiratedSwitchCartridge } from "../../../../../Security/Copyleft_Enforcement";
import { CourtyardCopyleftScene } from "./CourtyardCopyleftScene";
import { resolveOpossumPrimaryColorHex } from "../../CraftedOpossumRenderKernel";

export * from "./CourtyardPerspectiveKernel";
export * from "./CourtyardCopyleftScene";

type OpossumDrawCallback = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  selectedOpossum: OpossumCharacter,
  defaultRider: RiderCharacter,
  wireframe: boolean,
  viewMode: GameViewMode
) => void;

function drawPlayerOpossum2D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  direction: string,
  opossumColor: string,
  riderSkinColor: string
) {
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(px, py);
  if (direction === "North") ctx.lineTo(px, py - 18);
  else if (direction === "South") ctx.lineTo(px, py + 18);
  else if (direction === "East") ctx.lineTo(px + 18, py);
  else ctx.lineTo(px - 18, py);
  ctx.stroke();

  ctx.fillStyle = opossumColor || "#d4d4d8";
  ctx.beginPath();
  ctx.arc(px, py, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = riderSkinColor || "#f59e0b";
  ctx.beginPath();
  ctx.arc(px, py, 4.5, 0, Math.PI * 2);
  ctx.fill();
}

export function renderWorld2Courtyard2D(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: {
    foyerX: number;
    foyerY: number;
    doorOpenProgress: number;
    foyerDirection: string;
  },
  selectedOpossum: OpossumCharacter,
  defaultRider: RiderCharacter,
  wireframe: boolean
) {
  // World spans X in [-450, 7200] (includes crop road west of X=0 and Temple Foyer east to 7000), Y in [-2100, 5100]
  const worldMinX = -450;
  const worldMaxX = 7200;
  const worldMinY = -2100;
  const worldMaxY = 5100;
  const worldW = worldMaxX - worldMinX;
  const worldH = worldMaxY - worldMinY;

  const pad = Math.min(width, height) * 0.05;
  const scale = Math.min((width - pad * 2) / worldW, (height - pad * 2) / worldH);
  const drawW = worldW * scale;
  const drawH = worldH * scale;
  const originX = (width - drawW) / 2;
  const originY = (height - drawH) / 2;

  const mapX = (gx: number) => originX + (gx - worldMinX) * scale;
  const mapY = (gy: number) => originY + (worldMaxY - gy) * scale;

  ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : "#0f172a";
  if (!wireframe) ctx.fillRect(0, 0, width, height);

  // 0. Distant Crop Field Horizon + Long Road West of Courtyard (X < 0)
  const cropL = mapX(-450);
  const cropR = mapX(0);
  if (!wireframe) {
    ctx.fillStyle = "#3f6212";
    ctx.fillRect(cropL, mapY(5000), cropR - cropL, mapY(-2000) - mapY(5000));
    ctx.fillStyle = "#78716c";
    ctx.fillRect(cropL, mapY(1560), cropR - cropL, mapY(1440) - mapY(1560));
  } else {
    ctx.strokeStyle = "#4ade80";
    ctx.strokeRect(cropL, mapY(5000), cropR - cropL, mapY(-2000) - mapY(5000));
  }

  // 1. North Flower Garden (0..4000 x 3000..5000, Grass)
  const ngX = mapX(0);
  const ngY = mapY(5000);
  const ngW = mapX(4000) - ngX;
  const ngH = mapY(3000) - ngY;
  if (!wireframe) {
    ctx.fillStyle = "#166534";
    ctx.fillRect(ngX, ngY, ngW, ngH);
  }
  ctx.strokeStyle = wireframe ? "#4ade80" : "#22c55e";
  ctx.lineWidth = 2;
  ctx.strokeRect(ngX, ngY, ngW, ngH);

  // Large Flowers in North Garden
  NORTH_GARDEN_LARGE_FLOWERS.forEach((f) => {
    const fx = mapX(f.x);
    const fy = mapY(f.y);
    const fr = Math.max(2.5, f.radiusFeet * scale * 1.8);
    ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : f.petalColor;
    ctx.strokeStyle = wireframe ? "#4ade80" : f.centerColor;
    ctx.beginPath();
    ctx.arc(fx, fy, fr, 0, Math.PI * 2);
    if (!wireframe) ctx.fill();
    ctx.stroke();
  });

  // 2. Central Temple Courtyard (0..4000 x 0..3000, Stone)
  const cyX = mapX(0);
  const cyY = mapY(3000);
  const cyW = mapX(4000) - cyX;
  const cyH = mapY(0) - cyY;
  if (!wireframe) {
    ctx.fillStyle = "#57534e";
    ctx.fillRect(cyX, cyY, cyW, cyH);
  }
  ctx.strokeStyle = wireframe ? "#4ade80" : "#d6d3d1";
  ctx.lineWidth = 3;
  ctx.strokeRect(cyX, cyY, cyW, cyH);

  // Stone block floor joints
  ctx.strokeStyle = wireframe ? "rgba(74,222,128,0.22)" : "rgba(214,211,209,0.18)";
  ctx.lineWidth = 1;
  for (let gx = 400; gx < 4000; gx += 400) {
    ctx.beginPath();
    ctx.moveTo(mapX(gx), mapY(0));
    ctx.lineTo(mapX(gx), mapY(3000));
    ctx.stroke();
  }
  for (let gy = 500; gy < 3000; gy += 500) {
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(gy));
    ctx.lineTo(mapX(4000), mapY(gy));
    ctx.stroke();
  }

  // 3. South Outdoor Tea Area (0..4000 x -2000..0, Tile + 20 ft Skylight Canopy + Tea Tables)
  const stX = mapX(0);
  const stY = mapY(0);
  const stW = mapX(4000) - stX;
  const stH = mapY(-2000) - stY;
  if (!wireframe) {
    ctx.fillStyle = "#0f766e";
    ctx.fillRect(stX, stY, stW, stH);
    // Skylight canopy bays
    ctx.fillStyle = "rgba(186, 230, 253, 0.25)";
    WORLD2_SOUTH_TEA_AREA_SPEC.canopy.skylightBays.forEach((bay) => {
      const bx = mapX(bay.xCenter - bay.widthFeet / 2);
      const by = mapY(bay.yCenter + bay.depthFeet / 2);
      ctx.fillRect(bx, by, bay.widthFeet * scale, bay.depthFeet * scale);
    });
  }
  ctx.strokeStyle = wireframe ? "#4ade80" : "#2dd4bf";
  ctx.lineWidth = 2;
  ctx.strokeRect(stX, stY, stW, stH);

  SOUTH_TEA_TABLES.forEach((tbl) => {
    const tx = mapX(tbl.x);
    const ty = mapY(tbl.y);
    const tr = Math.max(3, tbl.radiusFeet * scale * 2.2);
    ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : tbl.tableColor;
    ctx.strokeStyle = wireframe ? "#4ade80" : tbl.pastryTint;
    ctx.beginPath();
    ctx.arc(tx, ty, tr, 0, Math.PI * 2);
    if (!wireframe) ctx.fill();
    ctx.stroke();
  });

  // 4. Temple Entrance Foyer (4000..7000 x 0..3000, 24"x24" Black & Green checkerboard)
  const tfX = mapX(4000);
  const tfY = mapY(3000);
  const tfW = mapX(7000) - tfX;
  const tfH = mapY(0) - tfY;
  if (!wireframe) {
    const cells = 24; // 125 ft logical display cells showing the black/green checkerboard clearly
    const cw = tfW / cells;
    const ch = tfH / cells;
    for (let cx = 0; cx < cells; cx++) {
      for (let cy = 0; cy < cells; cy++) {
        ctx.fillStyle = (cx + cy) % 2 === 0 ? "#111827" : "#15803d";
        ctx.fillRect(tfX + cx * cw, tfY + cy * ch, cw + 0.5, ch + 0.5);
      }
    }
  }
  ctx.strokeStyle = wireframe ? "#4ade80" : "#facc15";
  ctx.lineWidth = 3;
  ctx.strokeRect(tfX, tfY, tfW, tfH);

  // 5. Doors, Gates & East Archway
  // North Gate (Y = 3000, X = 2990..3010) & South Gate (Y = 0, X = 2990..3010)
  ctx.strokeStyle = "#fde047";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(mapX(2980), mapY(3000));
  ctx.lineTo(mapX(3020), mapY(3000));
  ctx.moveTo(mapX(2980), mapY(0));
  ctx.lineTo(mapX(3020), mapY(0));
  ctx.stroke();

  // East Double Sliding Carved Stone Doors (X = 4000, Y = 1490..1510)
  const dHalf = 45 * scale * (1 - state.doorOpenProgress);
  ctx.strokeStyle = "#f472b6";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(mapX(4000), mapY(1500) - dHalf);
  ctx.lineTo(mapX(4000), mapY(1500) + dHalf);
  ctx.stroke();

  // Temple Foyer East Exit Archway (X = 7000, Y = 1490..1510)
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(mapX(7000), mapY(1530));
  ctx.lineTo(mapX(7000), mapY(1470));
  ctx.stroke();

  // Tea Area Dynamic Picture Frame Marker (2D Blueprint)
  ctx.strokeStyle = "#facc15";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(mapX(1760) - 8, mapY(-1050) - 5, 16, 10);

  // Pirated Cartridge 4-Goat Parade Marker in 2D / Chalkboard Blueprint
  if (isPiratedSwitchCartridge()) {
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(mapX(1850) - 36, mapY(1500) - 10, 72, 16);
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(mapX(1850) - 36, mapY(1500) - 10, 72, 16);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 8px monospace";
    ctx.fillText("4-GOAT BANNER", mapX(1850) - 32, mapY(1500) + 1);
  }

  // Labels
  ctx.fillStyle = wireframe ? "#86efac" : "#f8fafc";
  ctx.font = "bold 9px monospace";
  ctx.fillText("NORTH GARDEN (4000x2000 | GRASS)", ngX + 6, ngY + 12);
  ctx.fillText("COURTYARD (4000x3000 | STONE)", cyX + 6, cyY + 14);
  ctx.fillText("SOUTH TEA AREA (4000x2000 | TILE + 20FT CANOPY)", stX + 6, stY + 14);
  ctx.fillText("TEMPLE FOYER (3000x3000 | 40FT CEILING | TILE)", tfX + 6, tfY + 14);
  ctx.fillText("ARCH -> L1", mapX(7000) - 55, mapY(1500) - 8);
  ctx.fillText("CROP HORIZON", cropL + 2, mapY(1600));

  // Player + Direction
  drawPlayerOpossum2D(
    ctx,
    mapX(state.foyerX),
    mapY(state.foyerY),
    state.foyerDirection,
    resolveOpossumPrimaryColorHex(selectedOpossum),
    defaultRider.skinColor
  );
}

export function renderWorld2Courtyard3D(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  horizonY: number,
  floorHeight: number,
  foyerX: number,
  foyerY: number,
  foyerDirection: string,
  doorOpenProgress: number,
  wireframe: boolean,
  viewMode: GameViewMode,
  selectedOpossum: OpossumCharacter,
  defaultRider: RiderCharacter,
  drawOpossumCallback: OpossumDrawCallback
) {
  const zone = resolveWorld2Level0Zone(foyerX, foyerY);
  const centerX = width / 2;

  // Compute compass camera basis vector via CourtyardPerspectiveKernel
  const { fwdX, fwdY, rightX, rightY } = CourtyardPerspectiveKernel.resolveDirectionBasis(foyerDirection);
  const isPiratedCart = isPiratedSwitchCartridge();
  const textCtx = {
    is3D: true,
    isChalkboard: false,
    isPiratedCart,
    showOpponentIndicators: false,
    viewMode: String(viewMode)
  };

  const projectWorld = (gx: number, gy: number, gzFeet = 0) => {
    const dx = gx - foyerX;
    const dy = gy - foyerY;
    const depth = dx * fwdX + dy * fwdY;
    const lat = dx * rightX + dy * rightY;
    const visible = depth > 8;
    const effDepth = Math.max(8, depth);
    const scale = 320 / (effDepth + 140);
    const screenX = centerX + lat * scale * 1.45;
    const eyeHeightFeet = 5.5;
    const screenY = horizonY + (eyeHeightFeet - gzFeet) * scale * 4.2 + (floorHeight * 120) / (effDepth + 180);
    return { x: screenX, y: screenY, scale, depth, visible };
  };

  // ================= 1. SKY / HORIZON / INDOOR CEILING =================
  if (zone === "temple_foyer") {
    // Enclosed 40-ft tall Temple Foyer Ceiling
    if (!wireframe) {
      const ceilGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      ceilGrad.addColorStop(0, "#1e1b4b");
      ceilGrad.addColorStop(1, "#312e81");
      ctx.fillStyle = ceilGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // Decorative ceiling stone beams
      ctx.strokeStyle = "rgba(250, 204, 21, 0.25)";
      ctx.lineWidth = 2;
      for (let i = 1; i <= 5; i++) {
        const yBeam = (horizonY * i) / 6;
        ctx.beginPath();
        ctx.moveTo(0, yBeam);
        ctx.lineTo(width, yBeam);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    }
  } else {
    // Outdoor sky system + green horizon + crop field horizon west
    if (!wireframe) {
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, "#0284c7");
      skyGrad.addColorStop(1, "#bae6fd");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // Distant green horizon band (crop fields when looking West)
      ctx.fillStyle = foyerDirection === "West" ? "#65a30d" : VISUAL_CONSTANTS.PALETTE.HORIZON_GREEN;
      ctx.fillRect(0, horizonY - 14, width, 16);

      if (foyerDirection === "West") {
        // Long road & distant crop field rows visible past West wall
        ctx.fillStyle = "#4d7c0f";
        ctx.fillRect(0, horizonY - 18, width, 6);
        ctx.fillStyle = "#78716c";
        ctx.beginPath();
        ctx.moveTo(centerX - 60, horizonY);
        ctx.lineTo(centerX - 16, horizonY - 14);
        ctx.lineTo(centerX + 16, horizonY - 14);
        ctx.lineTo(centerX + 60, horizonY);
        ctx.closePath();
        ctx.fill();
      }

      // South Outdoor Tea Area 20-ft canopy with skylights overhead
      if (zone === "south_tea_area") {
        ctx.fillStyle = "rgba(15, 118, 110, 0.85)";
        ctx.fillRect(0, 0, width, horizonY * 0.45);
        // Skylights revealing bright sky
        ctx.fillStyle = "rgba(186, 230, 253, 0.9)";
        for (let s = 0; s < 3; s++) {
          ctx.fillRect(width * (0.14 + s * 0.3), horizonY * 0.08, width * 0.16, horizonY * 0.25);
          ctx.strokeStyle = "#fde047";
          ctx.lineWidth = 2;
          ctx.strokeRect(width * (0.14 + s * 0.3), horizonY * 0.08, width * 0.16, horizonY * 0.25);
        }
      }
    } else {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    }
  }

  // ================= 2. GROUND FLOORING =================
  if (!wireframe) {
    if (zone === "temple_foyer") {
      // 24" x 24" Black & Green Checkerboard Floor Projection
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, horizonY, width, floorHeight);

      const tileStep = 40; // visual grid sampling of 2ft parity around camera
      const baseStartX = Math.floor((foyerX - 4000) / tileStep) * tileStep + 4000;
      const baseStartY = Math.floor(foyerY / tileStep) * tileStep;
      for (let gx = Math.max(4000, baseStartX - 1000); gx < Math.min(7000, baseStartX + 1000); gx += tileStep) {
        for (let gy = Math.max(0, baseStartY - 1000); gy < Math.min(3000, baseStartY + 1000); gy += tileStep) {
          const p1 = projectWorld(gx, gy, 0);
          const p2 = projectWorld(gx + tileStep, gy, 0);
          const p3 = projectWorld(gx + tileStep, gy + tileStep, 0);
          const p4 = projectWorld(gx, gy + tileStep, 0);
          if (!p1.visible && !p3.visible) continue;
          // Use exact analytical tile parity function (2 ft tiles scaled cleanly)
          const color = getTempleFoyerTileColor(Math.floor((gx - 4000) / 20) * 2, Math.floor(gy / 20) * 2);
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          ctx.fill();
        }
      }
    } else {
      const groundGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      if (zone === "north_garden") {
        groundGrad.addColorStop(0, "#15803d");
        groundGrad.addColorStop(1, "#14532d");
      } else if (zone === "south_tea_area") {
        groundGrad.addColorStop(0, "#0f766e");
        groundGrad.addColorStop(1, "#115e59");
      } else {
        groundGrad.addColorStop(0, "#78716c");
        groundGrad.addColorStop(1, "#44403c");
      }
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, horizonY, width, floorHeight);

      // Perspective stone/tile/grass grid cues
      ctx.strokeStyle = zone === "north_garden"
        ? "rgba(74, 222, 128, 0.2)"
        : zone === "south_tea_area"
          ? "rgba(45, 212, 191, 0.25)"
          : "rgba(214, 211, 209, 0.22)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 10; i++) {
        const yLine = horizonY + Math.pow(i / 10, 2) * floorHeight;
        ctx.beginPath();
        ctx.moveTo(0, yLine);
        ctx.lineTo(width, yLine);
        ctx.stroke();
      }
    }
  }

  // ================= 3. WALLS, WINDOWS, DOORS & MURALS =================
  if (zone === "temple_foyer") {
    // Draw Temple Foyer interior walls (40 ft tall) with carvings keeping 1490-1510 clear
    const ceilH = WORLD2_TEMPLE_FOYER_SPEC.dimensionsFeet.ceilingHeight; // 40 ft
    const facingEast = foyerDirection === "East";
    const facingNorth = foyerDirection === "North";
    const wallX = facingEast ? 7000 : (foyerDirection === "West" ? 4000 : foyerX);
    const wallY = facingNorth ? 3000 : (foyerDirection === "South" ? 0 : foyerY);

    if (facingEast || foyerDirection === "West") {
      const pBL = projectWorld(wallX, 0, 0);
      const pBR = projectWorld(wallX, 3000, 0);
      const pTL = projectWorld(wallX, 0, ceilH);
      const pTR = projectWorld(wallX, 3000, ceilH);
      if (pBL.visible || pBR.visible) {
        ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : "#7dd3fc";
        ctx.strokeStyle = wireframe ? "#4ade80" : "#eab308";
        ctx.beginPath();
        ctx.moveTo(pBL.x, pBL.y);
        ctx.lineTo(pBR.x, pBR.y);
        ctx.lineTo(pTR.x, pTR.y);
        ctx.lineTo(pTL.x, pTL.y);
        ctx.closePath();
        if (!wireframe) ctx.fill();
        ctx.stroke();

        // Carve Gold Pyramids & White Clouds outside [1490, 1510] marker band
        if (!wireframe) {
          [400, 950, 2050, 2600].forEach((pyCenter) => {
            const pL = projectWorld(wallX, pyCenter - 260, 0);
            const pR = projectWorld(wallX, pyCenter + 260, 0);
            const pPeak = projectWorld(wallX, pyCenter, 22);
            if (pPeak.visible) {
              ctx.fillStyle = "#facc15";
              ctx.beginPath();
              ctx.moveTo(pL.x, pL.y);
              ctx.lineTo(pR.x, pR.y);
              ctx.lineTo(pPeak.x, pPeak.y);
              ctx.closePath();
              ctx.fill();

              const cloudP = projectWorld(wallX, pyCenter, 31);
              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.arc(cloudP.x, cloudP.y, Math.max(4, 18 * cloudP.scale), 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }

        // East Wall 20x20 ft Archway at [1490, 1510] -> World 2 Level 1
        const aL = projectWorld(wallX, 1490, 0);
        const aR = projectWorld(wallX, 1510, 0);
        const aTL = projectWorld(wallX, 1490, 20);
        const aTR = projectWorld(wallX, 1510, 20);
        if (aL.visible && aR.visible) {
          const ax = Math.min(aL.x, aR.x);
          const aw = Math.max(12, Math.abs(aR.x - aL.x));
          const ay = Math.min(aTL.y, aTR.y);
          const ah = Math.max(20, aL.y - ay);
          ctx.fillStyle = facingEast ? "#020617" : "#44403c";
          ctx.fillRect(ax, ay, aw, ah);
          ctx.strokeStyle = "#fde047";
          ctx.lineWidth = 3;
          ctx.strokeRect(ax, ay, aw, ah);
          if (CanvasTextPurityPolicy.shouldRenderTextCategory("doorway_signage", textCtx)) {
            ctx.fillStyle = "#fde047";
            ctx.font = "bold 10px monospace";
            ctx.fillText(facingEast ? "ARCHWAY -> WORLD 2 LEVEL 1" : "TEMPLE FOYER ENTRANCE", ax - 35, ay - 8);
          }
        }
      }
    } else {
      // North or South Wall of Temple Foyer (40 ft tall)
      const pBL = projectWorld(4000, wallY, 0);
      const pBR = projectWorld(7000, wallY, 0);
      const pTL = projectWorld(4000, wallY, ceilH);
      const pTR = projectWorld(7000, wallY, ceilH);
      if (pBL.visible || pBR.visible) {
        ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : "#7dd3fc";
        ctx.strokeStyle = wireframe ? "#4ade80" : "#eab308";
        ctx.beginPath();
        ctx.moveTo(pBL.x, pBL.y);
        ctx.lineTo(pBR.x, pBR.y);
        ctx.lineTo(pTR.x, pTR.y);
        ctx.lineTo(pTL.x, pTL.y);
        ctx.closePath();
        if (!wireframe) ctx.fill();
        ctx.stroke();

        if (!wireframe) {
          // Leave [1490, 1510] local X (5490..5510) clear of carvings
          [[4000, 5490], [5510, 7000]].forEach(([segS, segE]) => {
            if (facingNorth) {
              // Green Horizon carving
              const hBL = projectWorld(segS, wallY, 0);
              const hBR = projectWorld(segE, wallY, 0);
              const hTL = projectWorld(segS, wallY, 12);
              const hTR = projectWorld(segE, wallY, 12);
              ctx.fillStyle = "#22c55e";
              ctx.beginPath();
              ctx.moveTo(hBL.x, hBL.y);
              ctx.lineTo(hBR.x, hBR.y);
              ctx.lineTo(hTR.x, hTR.y);
              ctx.lineTo(hTL.x, hTL.y);
              ctx.closePath();
              ctx.fill();
            } else {
              // South Wall: Gold Pyramids + White Clouds
              const mid = (segS + segE) / 2;
              const pL = projectWorld(mid - 350, wallY, 0);
              const pR = projectWorld(mid + 350, wallY, 0);
              const pPeak = projectWorld(mid, wallY, 22);
              ctx.fillStyle = "#facc15";
              ctx.beginPath();
              ctx.moveTo(pL.x, pL.y);
              ctx.lineTo(pR.x, pR.y);
              ctx.lineTo(pPeak.x, pPeak.y);
              ctx.closePath();
              ctx.fill();
              const cl = projectWorld(mid, wallY, 32);
              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.arc(cl.x, cl.y, Math.max(5, 20 * cl.scale), 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }
      }
    }
  } else if (foyerDirection === "East") {
    // Draw Courtyard/Garden East Temple Wall (X = 4000) with 007/N64 Large Windows + Pocket Carved Stone Doors
    const wBottomL = projectWorld(4000, 0, 0);
    const wBottomR = projectWorld(4000, 3000, 0);
    const wTopL = projectWorld(4000, 0, 25);
    const wTopR = projectWorld(4000, 3000, 25);

    if (wBottomL.visible || wBottomR.visible) {
      ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : "#a8a29e";
      ctx.strokeStyle = wireframe ? "#4ade80" : "#57534e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(wBottomL.x, wBottomL.y);
      ctx.lineTo(wBottomR.x, wBottomR.y);
      ctx.lineTo(wTopR.x, wTopR.y);
      ctx.lineTo(wTopL.x, wTopL.y);
      ctx.closePath();
      if (!wireframe) ctx.fill();
      ctx.stroke();

      // 007/N64 Inspired Large Window Openings
      [[520, 960], [2040, 2480]].forEach(([wy1, wy2]) => {
        const p1 = projectWorld(4000, wy1, 6);
        const p2 = projectWorld(4000, wy2, 6);
        const p3 = projectWorld(4000, wy2, 20);
        const p4 = projectWorld(4000, wy1, 20);
        if (p1.visible && p2.visible) {
          ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : "#0f172a";
          ctx.strokeStyle = wireframe ? "#4ade80" : "#44403c";
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          if (!wireframe) ctx.fill();
          ctx.stroke();
        }
      });
    }

    // Double Pocket Carved Stone Sliding Doors at X = 4000, Y = 1490..1510
    const dL = projectWorld(4000, 1510, 0);
    const dR = projectWorld(4000, 1490, 0);
    const dT = projectWorld(4000, 1500, 20);
    if (dL.visible || dR.visible) {
      const leftEdge = Math.min(dL.x, dR.x);
      const rightEdge = Math.max(dL.x, dR.x);
      const doorW = Math.max(24, rightEdge - leftEdge);
      const leafW = doorW / 2;
      const doorH = Math.max(36, dL.y - dT.y);
      const topY = dL.y - doorH;
      const pocketSlide = leafW * doorOpenProgress;

      // Dark Temple Foyer Threshold Visible Behind Opening
      ctx.fillStyle = "#111827";
      ctx.fillRect(leftEdge, topY, doorW, doorH);

      // Draw Sliding Stone Door Leaves retracting cleanly into wall pockets
      const visibleLeafW = Math.max(0, leafW - pocketSlide);
      if (visibleLeafW > 1) {
        drawCarvedStoneDoorLeaf(ctx, leftEdge, topY, visibleLeafW, doorH, wireframe);
        drawCarvedStoneDoorLeaf(ctx, rightEdge - visibleLeafW, topY, visibleLeafW, doorH, wireframe);
      }
    }
  } else if (foyerDirection === "West") {
    // Locked West Wall Door at X = 0, Y = 1490..1510
    const dL = projectWorld(0, 1490, 0);
    const dR = projectWorld(0, 1510, 0);
    const dT = projectWorld(0, 1500, 20);
    if (dL.visible || dR.visible) {
      const lx = Math.min(dL.x, dR.x);
      const dw = Math.max(24, Math.abs(dR.x - dL.x));
      const dh = Math.max(32, dL.y - dT.y);
      ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : "#44403c";
      ctx.strokeStyle = wireframe ? "#4ade80" : "#fbbf24";
      ctx.fillRect(lx, dL.y - dh, dw, dh);
      ctx.strokeRect(lx, dL.y - dh, dw, dh);
      if (CanvasTextPurityPolicy.shouldRenderTextCategory("doorway_signage", textCtx)) {
        ctx.fillStyle = "#fde047";
        ctx.font = "bold 9px monospace";
        ctx.fillText("LOCKED WEST GATE -> WORLD 1 ROAD", lx - 40, dL.y - dh - 8);
      }
    }
  }

  // Render Large Flowers in North Garden view
  if (zone === "north_garden" || (foyerDirection === "North" && foyerY > 2400)) {
    NORTH_GARDEN_LARGE_FLOWERS.forEach((f) => {
      const fp = projectWorld(f.x, f.y, 0);
      if (!fp.visible || fp.depth > 1800) return;
      const r = Math.max(4, f.radiusFeet * fp.scale * 0.45);
      ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : f.petalColor;
      ctx.strokeStyle = wireframe ? "#4ade80" : f.centerColor;
      ctx.beginPath();
      ctx.arc(fp.x, fp.y - r, r, 0, Math.PI * 2);
      if (!wireframe) ctx.fill();
      ctx.stroke();
    });
  }

  // Render Tea Tables & Pastries in South Tea Area view
  if (zone === "south_tea_area" || (foyerDirection === "South" && foyerY < 600)) {
    SOUTH_TEA_TABLES.forEach((tbl) => {
      const tp = projectWorld(tbl.x, tbl.y, 0);
      if (!tp.visible || tp.depth > 1800) return;
      const tw = Math.max(10, tbl.radiusFeet * tp.scale * 1.1);
      const th = tw * 0.55;
      ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : tbl.tableColor;
      ctx.strokeStyle = wireframe ? "#4ade80" : tbl.pastryTint;
      ctx.fillRect(tp.x - tw / 2, tp.y - th, tw, th * 0.35);
      ctx.strokeRect(tp.x - tw / 2, tp.y - th, tw, th * 0.35);
      if (!wireframe) {
        ctx.fillStyle = tbl.pastryTint;
        ctx.beginPath();
        ctx.arc(tp.x - tw * 0.18, tp.y - th - 2, Math.max(2, tw * 0.12), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = tbl.teaColor;
        ctx.beginPath();
        ctx.arc(tp.x + tw * 0.18, tp.y - th - 2, Math.max(2, tw * 0.12), 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Dynamic Picture Frame at the Tea Area depicting riders on opossums, an employed person on a laptop playing a legitimate game, and having tea with pastries
    const framePos = projectWorld(2000, -1050, 0);
    const frameCx = framePos.visible ? Math.max(130, Math.min(width - 130, framePos.x)) : width * 0.5;
    const frameBy = framePos.visible ? Math.min(height - 36, Math.max(horizonY + 80, framePos.y)) : horizonY + 135;
    const frameScale = framePos.visible ? Math.max(0.7, Math.min(1.25, framePos.scale * 3.8)) : 0.9;
    CourtyardCopyleftScene.renderTeaAreaDynamicPictureFrame3D(ctx, frameCx, frameBy, frameScale, Date.now(), wireframe);
  }

  // Meaningful Copyleft Enforcement Parade at Temple Courtyard (4 Goats carrying Green Banner with Black Text)
  if (isPiratedCart) {
    CourtyardCopyleftScene.renderCourtyardGoatParade3D(ctx, width, height, horizonY, Date.now(), wireframe);
  }

  // Render Mounted Opossum & Rider (3D canvas remains free of unconditional static zone HUD overlays)
  drawOpossumCallback(ctx, width, height, selectedOpossum, defaultRider, wireframe, viewMode);
}
