/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, RiderCharacter, GameViewMode, GameLevel, TickItem, Opponent, ObstacleItem, AnimalItem } from "../../../../types";
import { VISUAL_CONSTANTS } from "../../../Visuals";
import { 
  MelissaOpossum, 
  AshleyOpossum, 
  AmaraQinOpossum, 
  SaffronRoseOpossum, 
  JalissaChinOpossum, 
  ArdenRosieOpossum, 
  JahmellaRoseOpossum, 
  DagmarKoneReynoldsOpossum,
  AgapeRoseOpossum,
  RoxanneKoneReynoldsOpossum,
  TianaQinOpossum
} from "../../../../Characters/Opossums";
import { AIGeneratedOpossum } from "../../../../Characters/Opossums/AI-Generated/Drawing";
import { MonkeyCharacterModel } from "../../../../Characters/Monkeys";
import { MooseCharacterModel } from "../../../../Characters/Moose";

import { drawEdibleItem, getEdibleItemName } from "./Items";
import { IntegrityShadow } from "../../../Security/Phantom/Integrity_Shadow";
import { INITIAL_PLACES, PlaceDefinition } from "../../../../Arena";
export { drawEdibleItem, getEdibleItemName };

/**
 * Renders the 2D Top-Down Blueprint or World view.
 */
export function render2DView(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  currentLevel: GameLevel,
  state: {
    foyerX: number;
    foyerY: number;
    doorOpenProgress: number;
    foyerDirection: string;
    playerZ: number;
    visualLaneX: number;
    playerY: number;
  },
  localTicks: TickItem[],
  localObstacles: ObstacleItem[],
  localOpponents: Opponent[],
  localAnimals: AnimalItem[],
  selectedOpossum: OpossumCharacter,
  defaultRider: RiderCharacter,
  wireframe: boolean
) {
  // --- 🛡️ Distributed Security Heartbeat (Phantom Tier) ---
  IntegrityShadow.performShadowAudit();
  if (currentLevel.id === 0) {
    // ==================== LEVEL 0 FOYER 2D BLUEPRINT VIEW ====================
    const sideMargin = Math.min(width, height) * 0.08;
    const roomSize = Math.min(width, height) - sideMargin * 2;
    const startX = (width - roomSize) / 2;
    const startY = (height - roomSize) / 2;

    const mapX = (gx: number) => startX + (gx / 2000) * roomSize;
    const mapY = (gy: number) => startY + (1 - gy / 2200) * roomSize;

    ctx.fillStyle = "#0f172a"; 
    ctx.fillRect(startX, startY, roomSize, roomSize);

    const foyY0 = mapY(0);
    const foyY2000 = mapY(2000);
    const foyH = foyY0 - foyY2000;

    ctx.fillStyle = "#1e1b4b"; 
    ctx.fillRect(startX, foyY2000, roomSize, foyH);

    const tilesOnSide = 10;
    const tileW = roomSize / tilesOnSide;
    const tileH = foyH / tilesOnSide;
    for (let tx = 0; tx < tilesOnSide; tx++) {
      for (let ty = 0; ty < tilesOnSide; ty++) {
        ctx.fillStyle = ((tx + ty) % 2 === 0) ? "rgba(249, 115, 22, 0.08)" : "rgba(124, 58, 237, 0.08)";
        ctx.fillRect(startX + tx * tileW, foyY2000 + ty * tileH, tileW, tileH);
      }
    }

    ctx.strokeStyle = "rgba(139, 92, 246, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= tilesOnSide; i++) {
      ctx.moveTo(startX + i * tileW, foyY2000);
      ctx.lineTo(startX + i * tileW, foyY0);
      ctx.moveTo(startX, foyY2000 + i * tileH);
      ctx.lineTo(startX + roomSize, foyY2000 + i * tileH);
    }
    ctx.stroke();

    const porY2200 = mapY(2200);
    const porH = foyY2000 - porY2200;
    ctx.fillStyle = "#7c2d12"; 
    ctx.fillRect(startX, porY2200, roomSize, porH);

    ctx.strokeStyle = "rgba(251, 146, 60, 0.25)";
    ctx.lineWidth = 1;
    const deckLinesCount = 3;
    const deckLineH = porH / deckLinesCount;
    ctx.beginPath();
    for (let i = 1; i < deckLinesCount; i++) {
      ctx.moveTo(startX, porY2200 + i * deckLineH);
      ctx.lineTo(startX + roomSize, porY2200 + i * deckLineH);
    }
    ctx.stroke();

    ctx.strokeStyle = "#475569"; 
    ctx.lineWidth = 4;
    const wallX990 = mapX(990);
    const wallX1010 = mapX(1010);

    ctx.beginPath();
    ctx.moveTo(startX, foyY2000);
    ctx.lineTo(wallX990, foyY2000);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(wallX1010, foyY2000);
    ctx.lineTo(startX + roomSize, foyY2000);
    ctx.stroke();

    ctx.strokeStyle = "#a855f7"; 
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(startX, foyY0);
    ctx.lineTo(startX, porY2200);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(startX + roomSize, foyY0);
    ctx.lineTo(startX + roomSize, porY2200);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(startX, foyY0);
    ctx.lineTo(startX + roomSize, foyY0);
    ctx.stroke();

    ctx.strokeStyle = "#22c55e"; 
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(startX, porY2200);
    ctx.lineTo(startX + roomSize, porY2200);
    ctx.stroke();
    ctx.setLineDash([]); 

    const doorW = wallX1010 - wallX990;
    const halfDoorW = doorW / 2;
    const slideOffset2D = halfDoorW * state.doorOpenProgress;

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#fbbf24"; 
    ctx.beginPath();
    ctx.moveTo(wallX990 - slideOffset2D, foyY2000);
    ctx.lineTo((wallX990 + halfDoorW) - slideOffset2D, foyY2000);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo((wallX990 + halfDoorW) + slideOffset2D, foyY2000);
    ctx.lineTo(wallX1010 + slideOffset2D, foyY2000);
    ctx.stroke();

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 9px monospace";
    ctx.fillText("BRASS SLIDING DOORS", wallX990 - 35, foyY2000 - 15);
    ctx.fillStyle = "#fb923c";
    ctx.fillText("EXPANDED PORCH (ALWAYS OPEN NORTH)", startX + 15, porY2200 + 15);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "8px monospace";
    for (let val = 0; val <= 2000; val += 200) {
      const pos = mapX(val);
      ctx.fillText(`${val}ft`, pos - 10, foyY0 + 12);
      ctx.fillText(`${val}ft`, pos - 10, foyY2000 - 4);
    }

    localTicks.forEach((tick: TickItem) => {
      if (tick.collected) return;
      const tx = mapX(tick.x || 0);
      const ty = mapY(tick.y || 0);
      drawEdibleItem(ctx, tx, ty, 5, 0, wireframe, !!tick.isTick);
    });

    const pScaleX = mapX(state.foyerX);
    const pScaleY = mapY(state.foyerY);

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pScaleX, pScaleY);
    if (state.foyerDirection === "North") ctx.lineTo(pScaleX, pScaleY - 20);
    else if (state.foyerDirection === "South") ctx.lineTo(pScaleX, pScaleY + 20);
    else if (state.foyerDirection === "East") ctx.lineTo(pScaleX + 20, pScaleY);
    else if (state.foyerDirection === "West") ctx.lineTo(pScaleX - 20, pScaleY);
    ctx.stroke();

    const isAshley = selectedOpossum.id === "ashley";
    const isAmara = selectedOpossum.id === "amara_qin";
    const isSaffron = selectedOpossum.id === "saffron_rose";
    const isJalissa = selectedOpossum.id === "jalissa_chin";
    const isJahmella = selectedOpossum.id === "jahmella_rose";
    const isDagmar = selectedOpossum.id === "dagmar_kone_reynolds";
    const isAgape = selectedOpossum.id === "agape_rose";
    const isRoxanne = selectedOpossum.id === "roxanne_kone_reynolds";
    const isTiana = selectedOpossum.id === "tiana_qin";

    if (selectedOpossum.isAI) {
      AIGeneratedOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    } else if (isAshley) {
      AshleyOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    } else if (isAmara) {
      AmaraQinOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    } else if (isSaffron) {
      SaffronRoseOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    } else if (isJalissa) {
      JalissaChinOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    } else if (isJahmella) {
      JahmellaRoseOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    } else if (isDagmar) {
      DagmarKoneReynoldsOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    } else if (isAgape) {
      AgapeRoseOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    } else if (isRoxanne) {
      RoxanneKoneReynoldsOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    } else if (isTiana) {
      TianaQinOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    } else {
      MelissaOpossum.draw2D(ctx, pScaleX, pScaleY, selectedOpossum);
    }

    ctx.fillStyle = defaultRider.skinColor;
    ctx.beginPath();
    ctx.arc(pScaleX, pScaleY, 6, 0, Math.PI * 2);
    ctx.fill();

  } else {
    // ==================== COURSE/STANDARD LEVEL 2D WORLD VIEW ====================
    const roadWidth = 180;
    const roadCenter = width / 2;

    ctx.strokeStyle = wireframe ? "#22c55e" : "#1e3a1e";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(roadCenter - roadWidth / 2, 0);
    ctx.lineTo(roadCenter - roadWidth / 2, height);
    ctx.moveTo(roadCenter + roadWidth / 2, 0);
    ctx.lineTo(roadCenter + roadWidth / 2, height);
    ctx.stroke();

    ctx.strokeStyle = wireframe ? "rgba(34, 197, 94, 0.4)" : "#15803d";
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 12]);
    ctx.beginPath();
    ctx.moveTo(roadCenter - roadWidth / 6, 0);
    ctx.lineTo(roadCenter - roadWidth / 6, height);
    ctx.moveTo(roadCenter + roadWidth / 6, 0);
    ctx.lineTo(roadCenter + roadWidth / 6, height);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = "rgba(21, 128, 61, 0.15)";
    ctx.lineWidth = 1;
    const gridOffset = (state.playerZ * 3) % 40;
    for (let gy = gridOffset; gy < height; gy += 40) {
      ctx.beginPath();
      ctx.moveTo(roadCenter - roadWidth / 2, gy);
      ctx.lineTo(roadCenter + roadWidth / 2, gy);
      ctx.stroke();
    }

    localTicks.forEach((tick) => {
      if (tick.collected) return;
      const screenY = height - (((tick.z || 0) - state.playerZ) * 8) - 100;
      if (screenY < -10 || screenY > height + 10) return;
      const screenX = roadCenter + (tick.lane || 0) * (roadWidth / 3);
      drawEdibleItem(ctx, screenX, screenY, 6, currentLevel.id, wireframe, !!tick.isTick);
    });

    localObstacles.forEach((obs) => {
      const screenY = height - ((obs.z - state.playerZ) * 8) - 100;
      if (screenY < -20 || screenY > height + 20) return;
      const screenX = roadCenter + obs.lane * (roadWidth / 3);
      if (wireframe) {
        ctx.strokeStyle = "#4ade80";
        ctx.strokeRect(screenX - 10, screenY - 5, 20, 10);
      } else {
        ctx.fillStyle = obs.type === "fence" ? "#d97706" : (obs.type === "rock" ? "#6b7280" : "#16a34a");
        ctx.fillRect(screenX - 12, screenY - 6, 24, 12);
      }
    });

    localOpponents.forEach((opp) => {
      const screenY = height - ((opp.z - state.playerZ) * 8) - 100;
      if (screenY < -25 || screenY > height + 25) return;
      const screenX = roadCenter + opp.lane * (roadWidth / 3);
      if (wireframe) {
        ctx.strokeStyle = opp.mooseName === "Angelica" ? "#fde047" : "#f43f5e";
        ctx.strokeRect(screenX - 14, screenY - 14, 28, 28);
      } else {
        ctx.fillStyle = opp.mooseName === "Angelica" ? (opp.isCleaning ? "#fde047" : "#ffffff") : "#ef4444";
        ctx.fillRect(screenX - 14, screenY - 14, 28, 28);
        ctx.fillStyle = opp.mooseName === "Angelica" ? "#000" : "#fff";
        ctx.font = "8px monospace";
        ctx.fillText(opp.mooseName === "Angelica" ? "A" : opp.mooseType[0], screenX - 3, screenY + 3);
      }
    });

    // Draw Animals (Wildlife)
    localAnimals.forEach((animal) => {
      const relZ = animal.z - state.playerZ;
      if (relZ < -10 || relZ > 150) return;

      const screenX = roadCenter + (animal.lane * 4 + (animal.xOffset || 0)) * (roadWidth / 12);
      const screenY = height - 100 - (relZ * 4); // mapping depth to Y for orthographic-ish 2D

      if (wireframe) {
        ctx.strokeStyle = "#4ade80";
        ctx.strokeRect(screenX - 10, screenY - 10, 20, 20);
      } else {
        if (animal.species === "feral_pig") {
          // Authentic Feral Pig 2D Blueprint (Body, Snout, Ears, and Tusks for Boars)
          const baseCol = animal.coatColor || "#5C3A21";
          const secCol = animal.secondaryColor || "#3E2715";
          const isSmashed = animal.state === "smashed";

          ctx.save();
          if (isSmashed) {
            ctx.translate(screenX, screenY);
            ctx.scale(1.3, 0.25);
            ctx.translate(-screenX, -screenY);
          }
          
          ctx.fillStyle = baseCol;
          ctx.beginPath();
          ctx.ellipse(screenX, screenY, 11, 7, 0, 0, Math.PI * 2);
          ctx.fill();

          // Head & Snout
          ctx.fillStyle = secCol;
          ctx.beginPath();
          ctx.arc(screenX, screenY - 6, 5, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = "#D48888"; // Pig snout pink
          ctx.beginPath();
          ctx.ellipse(screenX, screenY - 9, 3, 2, 0, 0, Math.PI * 2);
          ctx.fill();

          // Ivory tusks for Boar
          if (animal.gender === "Boar") {
            ctx.fillStyle = "#FFFBF0";
            ctx.beginPath();
            ctx.moveTo(screenX - 4, screenY - 8);
            ctx.lineTo(screenX - 7, screenY - 11);
            ctx.lineTo(screenX - 3, screenY - 9);
            ctx.moveTo(screenX + 4, screenY - 8);
            ctx.lineTo(screenX + 7, screenY - 11);
            ctx.lineTo(screenX + 3, screenY - 9);
            ctx.fill();
          }

          ctx.restore();
        } else {
          ctx.fillStyle = animal.species === "owl" ? "#451a03" : "#22c55e";
          ctx.beginPath();
          ctx.arc(screenX, screenY, 8, 0, Math.PI * 2);
          ctx.fill();
          if (animal.species === "owl") {
             ctx.fillStyle = "#fde047";
             ctx.beginPath();
             ctx.arc(screenX - 3, screenY - 2, 2, 0, Math.PI * 2);
             ctx.arc(screenX + 3, screenY - 2, 2, 0, Math.PI * 2);
             ctx.fill();
          }
        }
      }
    });

    const plX = roadCenter + state.visualLaneX * (roadWidth / 12);
    const plY = height - 100 - state.playerY * 4;

    const isAshley = selectedOpossum.id === "ashley";
    const isAmara = selectedOpossum.id === "amara_qin";
    const isSaffron = selectedOpossum.id === "saffron_rose";
    const isJalissa = selectedOpossum.id === "jalissa_chin";
    const isJahmella = selectedOpossum.id === "jahmella_rose";
    const isDagmar = selectedOpossum.id === "dagmar_kone_reynolds";
    const isAgape = selectedOpossum.id === "agape_rose";
    const isRoxanne = selectedOpossum.id === "roxanne_kone_reynolds";
    const isTiana = selectedOpossum.id === "tiana_qin";

    if (selectedOpossum.isAI) {
      AIGeneratedOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    } else if (isAshley) {
      AshleyOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    } else if (isAmara) {
      AmaraQinOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    } else if (isSaffron) {
      SaffronRoseOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    } else if (isJalissa) {
      JalissaChinOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    } else if (isJahmella) {
      JahmellaRoseOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    } else if (isDagmar) {
      DagmarKoneReynoldsOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    } else if (isAgape) {
      AgapeRoseOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    } else if (isRoxanne) {
      RoxanneKoneReynoldsOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    } else if (isTiana) {
      TianaQinOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    } else {
      MelissaOpossum.draw2D(ctx, plX, plY, selectedOpossum);
    }

    ctx.fillStyle = defaultRider.skinColor;
    ctx.beginPath();
    ctx.arc(plX, plY, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ffb6c1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(plX, plY + 25);
    ctx.quadraticCurveTo(plX - 15, plY + 40, plX - 5, plY + 45);
    ctx.stroke();
  }
}

/**
 * Renders the Standard Level (Course) 3D perspective.
 */
export function renderStandardLevel(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  horizonY: number,
  focalLength: number,
  cameraX: number,
  cameraY: number,
  cameraZ: number,
  localTicks: TickItem[],
  localObstacles: ObstacleItem[],
  localOpponents: Opponent[],
  localAnimals: AnimalItem[],
  currentLevel: GameLevel,
  wireframe: boolean,
  viewMode: GameViewMode,
  selectedOpossum: OpossumCharacter,
  defaultRider: RiderCharacter,
  playerY: number,
  project3D: (x: number, y: number, z: number, cx: number, cy: number, cz: number, fl: number, w: number, h: number, hy: number) => { x: number, y: number, scale: number, visible: boolean },
  gameState: any
) {
  // Determine active place definition from placeId for dynamic lighting & visuals
  const activePlace: PlaceDefinition | undefined = currentLevel.placeId ? INITIAL_PLACES[currentLevel.placeId] : undefined;
  // Determine if active place is an artistic simulated mine
  const isMine = currentLevel.placeId && currentLevel.placeId.startsWith("simulated_");

  // Dynamic relative lighting level (1.0 = baseline, custom lighting can scale smoothly)
  const arenaLighting = activePlace?.lightingLevel ?? 1.0;

  // 1. Draw Sky or Tunnel Ceiling
  if (isMine) {
    if (currentLevel.placeId === "simulated_emerald_mine") {
      ctx.fillStyle = activePlace?.skyColor || "#000000"; // Black ceiling
      ctx.fillRect(0, 0, width, horizonY);
    } else if (currentLevel.placeId === "simulated_diamond_mine") {
      // Shimmering dark indigo diamond ceiling with starry shine
      const ceilingGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      ceilingGrad.addColorStop(0, activePlace?.skyColor || "#082f49");
      ceilingGrad.addColorStop(1, activePlace?.horizonColor || "#020617");
      ctx.fillStyle = ceilingGrad;
      ctx.fillRect(0, 0, width, horizonY);
      
      // Starry diamond glints
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      for (let i = 0; i < 20; i++) {
        const cx = (i * 179 + 30) % width;
        const cy = (i * 97 + 10) % horizonY;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 3);
        ctx.lineTo(cx + 3, cy);
        ctx.lineTo(cx, cy + 3);
        ctx.lineTo(cx - 3, cy);
        ctx.closePath();
        ctx.fill();
      }
    } else if (currentLevel.placeId === "simulated_salt_mine") {
      // Salt-white ceiling
      ctx.fillStyle = activePlace?.skyColor || "#f8fafc";
      ctx.fillRect(0, 0, width, horizonY);
    } else {
      // Gold and Silver mines: Stone ceiling with warm support beams
      const stoneGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      stoneGrad.addColorStop(0, activePlace?.skyColor || "#1c1917");
      stoneGrad.addColorStop(1, activePlace?.horizonColor || "#292524");
      ctx.fillStyle = stoneGrad;
      ctx.fillRect(0, 0, width, horizonY);
      
      // Arc support contours
      ctx.strokeStyle = currentLevel.placeId === "simulated_gold_mine" ? "rgba(234, 179, 8, 0.25)" : "rgba(148, 163, 184, 0.25)";
      ctx.lineWidth = 3;
      for (let i = 0; i < width; i += 160) {
        ctx.beginPath();
        ctx.arc(i + 80, horizonY, 70, Math.PI, 2 * Math.PI);
        ctx.stroke();
      }
    }
  } else {
    // Standard Sky - Dynamically read from active arena definition with exact color parity
    const isOrchard = currentLevel.placeId === "the_grand_orchard";
    const skyColor = currentLevel.visuals?.skyColor || activePlace?.skyColor || (isOrchard ? "#0c4a6e" : (wireframe ? "#052e16" : "#022c22"));
    const horizonColor = currentLevel.visuals?.horizonColor || activePlace?.horizonColor || (isOrchard ? "#0ea5e9" : (wireframe ? "#052e16" : "#064e3b"));
    
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGrad.addColorStop(0, skyColor);
    skyGrad.addColorStop(1, horizonColor);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, horizonY);

    // Stars / garden fireflies
    ctx.fillStyle = activePlace?.fireflyColor || ((wireframe || isOrchard) ? "rgba(255, 255, 255, 0.4)" : "#4ade80");
    for (let i = 0; i < 30; i++) {
      const fx = ((i * 123 + 20) % width);
      const fy = ((i * 456) % (horizonY));
      ctx.beginPath();
      ctx.arc(fx, fy, isOrchard ? 2 : 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Draw Dynamic Scenery Objects
  if (!isMine) {
    const isOrchard = currentLevel.placeId === "the_grand_orchard";
    const sceneryCount = isOrchard ? 8 : 4;
    for (let i = 0; i < sceneryCount; i++) {
      const sx = (i * (width / sceneryCount) + 50) % width;
      const sy = horizonY;
      ctx.save();
      if (isOrchard) {
        // Fancy Houses for Orchard
        ctx.fillStyle = "#f8fafc"; // White stone
        ctx.fillRect(sx - 30, sy - 40, 60, 40);
        ctx.fillStyle = "#1e293b"; // Dark roof
        ctx.beginPath();
        ctx.moveTo(sx - 35, sy - 40);
        ctx.lineTo(sx, sy - 60);
        ctx.lineTo(sx + 35, sy - 40);
        ctx.closePath();
        ctx.fill();
      } else if (currentLevel.visuals?.scenery) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.beginPath();
        ctx.moveTo(sx - 40, sy);
        ctx.lineTo(sx, sy - 60);
        ctx.lineTo(sx + 40, sy);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // 2. Custom Ground & Wall Renderers
  const leftLimitX = -6;
  const rightLimitX = 6;

  if (currentLevel.placeId === "the_grand_orchard") {
    // Draw lush orchard ground
    const groundGrad = ctx.createLinearGradient(0, horizonY, 0, height);
    groundGrad.addColorStop(0, activePlace?.groundColor || "#365314");
    groundGrad.addColorStop(1, "#1a2e05");
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, horizonY, width, height - horizonY);
  } else if (isMine && !wireframe) {
    // Draw solid back floor/walls space below horizon
    if (currentLevel.placeId === "simulated_emerald_mine") {
      ctx.fillStyle = activePlace?.groundColor || "#022c22";
    } else if (currentLevel.placeId === "simulated_diamond_mine") {
      ctx.fillStyle = activePlace?.groundColor || "#0f172a";
    } else if (currentLevel.placeId === "simulated_salt_mine") {
      ctx.fillStyle = activePlace?.groundColor || "#cbd5e1";
    } else {
      ctx.fillStyle = activePlace?.groundColor || "#1c1917";
    }
    ctx.fillRect(0, horizonY, width, height - horizonY);

    // Render floor checks and side walls in 3D segments (back-to-front depth buffering)
    const segDist = 12;
    for (let zVal = Math.floor((cameraZ + 120) / segDist) * segDist; zVal >= Math.floor(cameraZ / segDist) * segDist; zVal -= segDist) {
      const relZStart = zVal - cameraZ;
      if (relZStart <= 0.1) continue;

      const pLStart = project3D(leftLimitX, 0, zVal, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      const pRStart = project3D(rightLimitX, 0, zVal, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      const pLEnd = project3D(leftLimitX, 0, zVal + segDist, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      const pREnd = project3D(rightLimitX, 0, zVal + segDist, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);

      if (!pLStart.visible || !pLEnd.visible) continue;

      const checkAlt = Math.floor(zVal / segDist) % 2 === 0;

      // Draw perspective track floor tile
      if (currentLevel.placeId === "simulated_gold_mine" || currentLevel.placeId === "simulated_silver_mine") {
        ctx.fillStyle = checkAlt ? "#fef3c7" : "#312e81"; // cream & indigo flooring
      } else if (currentLevel.placeId === "simulated_emerald_mine") {
        ctx.fillStyle = checkAlt ? "#a7f3d0" : "#064e3b"; // green flooring
      } else if (currentLevel.placeId === "simulated_diamond_mine") {
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)"; // white ceramic glass
      } else if (currentLevel.placeId === "simulated_salt_mine") {
        ctx.fillStyle = "#ffffff"; // pristine white ceramic
      }

      ctx.beginPath();
      ctx.moveTo(pLStart.x, pLStart.y);
      ctx.lineTo(pRStart.x, pRStart.y);
      ctx.lineTo(pREnd.x, pREnd.y);
      ctx.lineTo(pLEnd.x, pLEnd.y);
      ctx.closePath();
      ctx.fill();

      // Small rainbow circles on diamond glass floor (2 inches, spaced 6 inches)
      if (currentLevel.placeId === "simulated_diamond_mine") {
        ctx.strokeStyle = checkAlt ? "#f43f5e" : "#06b6d4";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const centerFloorX = (pLStart.x + pRStart.x) / 2;
        const centerFloorY = (pLStart.y + pRStart.y) / 2;
        ctx.arc(centerFloorX, centerFloorY, 6 * pLStart.scale, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Project top of 25ft wall panels
      const wallHeight = 5.0; // wall scale
      const pLStartTop = project3D(leftLimitX, wallHeight, zVal, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      const pLEndTop = project3D(leftLimitX, wallHeight, zVal + segDist, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      const pRStartTop = project3D(rightLimitX, wallHeight, zVal, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      const pREndTop = project3D(rightLimitX, wallHeight, zVal + segDist, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);

      // LEFT WALL
      ctx.beginPath();
      ctx.moveTo(0, pLStartTop.y);
      ctx.lineTo(pLStartTop.x, pLStartTop.y);
      ctx.lineTo(pLStart.x, pLStart.y);
      ctx.lineTo(0, pLStart.y);
      ctx.closePath();
      if (currentLevel.placeId === "simulated_gold_mine" || currentLevel.placeId === "simulated_silver_mine") {
        ctx.fillStyle = "#292524"; // stone block
      } else if (currentLevel.placeId === "simulated_emerald_mine") {
        ctx.fillStyle = "#34d399"; // light green
      } else if (currentLevel.placeId === "simulated_diamond_mine") {
        ctx.fillStyle = "#0284c7"; // diamond sky-blue
      } else if (currentLevel.placeId === "simulated_salt_mine") {
        ctx.fillStyle = checkAlt ? "#ffffff" : "#0f172a"; // white & black salt blocks
      }
      ctx.fill();

      // RIGHT WALL
      ctx.beginPath();
      ctx.moveTo(width, pRStartTop.y);
      ctx.lineTo(pRStartTop.x, pRStartTop.y);
      ctx.lineTo(pRStart.x, pRStart.y);
      ctx.lineTo(width, pRStart.y);
      ctx.closePath();
      ctx.fill();

      // Embedded glistening ores and symbols on walls
      const sc = pLStart.scale;
      if (currentLevel.placeId === "simulated_gold_mine") {
        // Glowing gold ore
        ctx.fillStyle = "#eab308";
        ctx.beginPath();
        ctx.arc(pLStart.x - 30 * sc, pLStart.y - 25 * sc, 8 * sc, 0, 2 * Math.PI);
        ctx.arc(pRStart.x + 35 * sc, pRStart.y - 15 * sc, 6 * sc, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.arc(pLStart.x - 30 * sc, pLStart.y - 25 * sc, 3 * sc, 0, 2 * Math.PI);
        ctx.fill();
      } else if (currentLevel.placeId === "simulated_silver_mine") {
        // Glowing silver ore
        ctx.fillStyle = "#cbd5e1";
        ctx.beginPath();
        ctx.arc(pLStart.x - 25 * sc, pLStart.y - 18 * sc, 7 * sc, 0, 2 * Math.PI);
        ctx.arc(pRStart.x + 30 * sc, pRStart.y - 28 * sc, 5 * sc, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pLStart.x - 25 * sc, pLStart.y - 18 * sc, 2 * sc, 0, 2 * Math.PI);
        ctx.fill();
      } else if (currentLevel.placeId === "simulated_emerald_mine") {
        // Floaty Islands colorful geometry & embossed emerald half spheres
        const shapes = [
          () => { ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(pLStart.x - 40 * sc, pLStart.y - 30 * sc, 10 * sc, 0, 2 * Math.PI); ctx.fill(); },
          () => { ctx.fillStyle = "#a855f7"; ctx.fillRect(pLStart.x - 30 * sc, pLStart.y - 50 * sc, 12 * sc, 12 * sc); },
          () => { ctx.fillStyle = "#ef4444"; ctx.beginPath(); ctx.moveTo(pRStart.x + 40 * sc, pRStart.y - 25 * sc); ctx.lineTo(pRStart.x + 52 * sc, pRStart.y - 45 * sc); ctx.lineTo(pRStart.x + 28 * sc, pRStart.y - 45 * sc); ctx.closePath(); ctx.fill(); },
          () => { ctx.fillStyle = "#eab308"; ctx.fillRect(pRStart.x + 32 * sc, pRStart.y - 50 * sc, 18 * sc, 8 * sc); },
          () => { 
            ctx.fillStyle = "#10b981"; 
            ctx.beginPath(); 
            ctx.arc(pLStart.x - 18 * sc, pLStart.y - 22 * sc, 8 * sc, 0, 2 * Math.PI); 
            ctx.fill(); 
            ctx.strokeStyle = "#a7f3d0"; 
            ctx.stroke(); 
          }
        ];
        shapes[Math.floor(zVal / segDist) % shapes.length]();
      } else if (currentLevel.placeId === "simulated_diamond_mine") {
        // Glistening real diamonds on walls
        ctx.fillStyle = "#bae6fd";
        ctx.beginPath();
        const dx = pLStart.x - 25 * sc;
        const dy = pLStart.y - 30 * sc;
        ctx.moveTo(dx, dy - 8 * sc);
        ctx.lineTo(dx + 6 * sc, dy);
        ctx.lineTo(dx, dy + 8 * sc);
        ctx.lineTo(dx - 6 * sc, dy);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(dx, dy - 3 * sc);
        ctx.lineTo(dx + 2 * sc, dy);
        ctx.lineTo(dx, dy + 3 * sc);
        ctx.lineTo(dx - 2 * sc, dy);
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  // 3. Structural Wooden Beams (Portal Framing for Mine Tunnels)
  if (isMine) {
    ctx.strokeStyle = activePlace?.frameColor || "#7c2d12"; // Amber timber wood support
    ctx.lineWidth = 4;
  } else {
    ctx.strokeStyle = activePlace?.frameColor || "#166534";
    ctx.lineWidth = 1.5;
  }

  // Fence posts
  for (let zPost = Math.floor(cameraZ / 15) * 15; zPost < cameraZ + 150; zPost += 15) {
    const relZ = zPost - cameraZ;
    if (relZ <= 1) continue;

    const proj = project3D(-7, 0, zPost, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
    const projTop = project3D(-7, 3, zPost, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
    const projR = project3D(7, 0, zPost, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
    const projRTop = project3D(7, 3, zPost, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);

    if (proj.visible && projTop.visible) {
      ctx.beginPath();
      ctx.moveTo(proj.x, proj.y);
      ctx.lineTo(projTop.x, projTop.y);
      ctx.stroke();
    }
    if (projR.visible && projRTop.visible) {
      ctx.beginPath();
      ctx.moveTo(projR.x, projR.y);
      ctx.lineTo(projRTop.x, projRTop.y);
      ctx.stroke();
    }
    // Draw horizontal timber collar overhead inside mine shafts
    if (isMine && projTop.visible && projRTop.visible) {
      ctx.beginPath();
      ctx.moveTo(projTop.x, projTop.y);
      ctx.lineTo(projRTop.x, projRTop.y);
      ctx.stroke();
    }
    // Draw Orchard Elevated Train Track
    if (currentLevel.placeId === "the_grand_orchard") {
      const trackHeight = 9.144; // 30 feet
      const trackWidth = 15.24; // 50 feet
      const pT_L = project3D(-trackWidth / 2, trackHeight, zPost, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      const pT_R = project3D(trackWidth / 2, trackHeight, zPost, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      
      // Pillars
      ctx.strokeStyle = "#94a3b8"; // Steel pillars
      ctx.lineWidth = 10 * pT_L.scale;
      const pillarL = project3D(-7, 0, zPost, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      const pillarR = project3D(7, 0, zPost, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      
      if (pillarL.visible && pT_L.visible) {
        ctx.beginPath();
        ctx.moveTo(pillarL.x, pillarL.y);
        ctx.lineTo(pT_L.x, pT_L.y);
        ctx.stroke();
      }
      if (pillarR.visible && pT_R.visible) {
        ctx.beginPath();
        ctx.moveTo(pillarR.x, pillarR.y);
        ctx.lineTo(pT_R.x, pT_R.y);
        ctx.stroke();
      }

      // Track platform
      ctx.fillStyle = "#334155";
      const pT_L_Next = project3D(-trackWidth / 2, trackHeight, zPost + 15, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      const pT_R_Next = project3D(trackWidth / 2, trackHeight, zPost + 15, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      if (pT_L.visible && pT_L_Next.visible) {
        ctx.beginPath();
        ctx.moveTo(pT_L.x, pT_L.y);
        ctx.lineTo(pT_R.x, pT_R.y);
        ctx.lineTo(pT_R_Next.x, pT_R_Next.y);
        ctx.lineTo(pT_L_Next.x, pT_L_Next.y);
        ctx.fill();
        
        // Track beams
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 2 * pT_L.scale;
        ctx.beginPath();
        ctx.moveTo(pT_L.x, pT_L.y);
        ctx.lineTo(pT_L_Next.x, pT_L_Next.y);
        ctx.moveTo(pT_R.x, pT_R.y);
        ctx.lineTo(pT_R_Next.x, pT_R_Next.y);
        ctx.stroke();
      }

      // Fancy Houses & Apple Trees on sides
      const sideInterval = 40;
      const hZ = Math.floor(zPost / sideInterval) * sideInterval;
      if (hZ === zPost) {
        [-15, 15].forEach((sideX) => {
          const houseProj = project3D(sideX, 0, zPost, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
          if (houseProj.visible) {
            const hs = houseProj.scale;
            // House Base
            ctx.fillStyle = "#f8fafc";
            ctx.fillRect(houseProj.x - 30 * hs, houseProj.y - 40 * hs, 60 * hs, 40 * hs);
            // Roof
            ctx.fillStyle = "#450a0a"; // Dark red brick/tile roof
            ctx.beginPath();
            ctx.moveTo(houseProj.x - 35 * hs, houseProj.y - 40 * hs);
            ctx.lineTo(houseProj.x, houseProj.y - 65 * hs);
            ctx.lineTo(houseProj.x + 35 * hs, houseProj.y - 40 * hs);
            ctx.fill();
            // Windows
            ctx.fillStyle = "#fde047";
            ctx.fillRect(houseProj.x - 20 * hs, houseProj.y - 25 * hs, 10 * hs, 10 * hs);
            ctx.fillRect(houseProj.x + 10 * hs, houseProj.y - 25 * hs, 10 * hs, 10 * hs);
          }
        });
      }

      // Apple Trees
      const treeInterval = 15;
      const tZ = Math.floor(zPost / treeInterval) * treeInterval;
      if (tZ === zPost) {
        [-10, 10].forEach((sideX) => {
          const treeProj = project3D(sideX, 0, zPost, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
          if (treeProj.visible) {
            const ts = treeProj.scale;
            // Trunk
            ctx.fillStyle = "#451a03";
            ctx.fillRect(treeProj.x - 4 * ts, treeProj.y - 20 * ts, 8 * ts, 20 * ts);
            // Leaves
            ctx.fillStyle = "#166534";
            ctx.beginPath();
            ctx.arc(treeProj.x, treeProj.y - 25 * ts, 15 * ts, 0, Math.PI * 2);
            ctx.fill();
            // Apples
            ctx.fillStyle = "#ef4444";
            for (let a = 0; a < 3; a++) {
              ctx.beginPath();
              ctx.arc(treeProj.x + (a - 1) * 6 * ts, treeProj.y - 25 * ts + (a % 2) * 5 * ts, 2 * ts, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      }
    }
  }

  // Lane dividers
  ctx.strokeStyle = wireframe ? "#22c55e" : (isMine ? "#f59e0b" : "#15803d");
  ctx.lineWidth = 2;
  const trackLanesLines = [leftLimitX, -2, 2, rightLimitX];
  trackLanesLines.forEach((laneLine) => {
    ctx.beginPath();
    for (let relZ = 2; relZ < 150; relZ += 10) {
      const proj = project3D(laneLine, 0, cameraZ + relZ, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      if (relZ === 2) ctx.moveTo(proj.x, proj.y);
      else ctx.lineTo(proj.x, proj.y);
    }
    ctx.stroke();
  });

  // Horizontal grid guides
  ctx.strokeStyle = isMine ? "rgba(245, 158, 11, 0.25)" : "rgba(34, 197, 94, 0.4)";
  ctx.lineWidth = 1;
  const segmentLen = 12;
  for (let segZ = Math.floor(cameraZ / segmentLen) * segmentLen; segZ < cameraZ + 150; segZ += segmentLen) {
    const relZ = segZ - cameraZ;
    if (relZ <= 1) continue;
    const projL = project3D(leftLimitX, 0, segZ, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
    const projR = project3D(rightLimitX, 0, segZ, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
    if (projL.visible && projR.visible) {
      ctx.beginPath();
      ctx.moveTo(projL.x, projL.y);
      ctx.lineTo(projR.x, projR.y);
      ctx.stroke();
    }
  }

  // Draw Ticks
  localTicks.forEach((tick) => {
    if (tick.collected) return;
    const relZ = (tick.z || 0) - cameraZ;
    if (relZ < 1 || relZ > 160) return;

    const proj = project3D((tick.lane || 0) * 4, 0, tick.z || 0, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
    if (!proj.visible) return;

    const radius = Math.max(3, 8 * proj.scale * 0.15);
    drawEdibleItem(ctx, proj.x, proj.y, radius, currentLevel.id, wireframe, !!tick.isTick);
  });

  // Draw Obstacles
  localObstacles.forEach((obs) => {
    const relZ = obs.z - cameraZ;
    if (relZ < 1 || relZ > 160) return;

    const proj = project3D(obs.lane * 4, 0, obs.z, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
    if (!proj.visible) return;

    const ow = obs.width * 20 * proj.scale * 0.15;
    const oh = obs.height * 20 * proj.scale * 0.15;

    if (wireframe) {
      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 1;
      ctx.strokeRect(proj.x - ow / 2, proj.y - oh, ow, oh);
      return;
    }

    if (obs.type === "fence") {
      ctx.fillStyle = "#7c2d12";
      ctx.fillRect(proj.x - ow / 2, proj.y - oh, ow, oh * 0.25);
      ctx.fillRect(proj.x - ow / 2.5, proj.y - oh, ow * 0.15, oh);
      ctx.fillRect(proj.x + ow / 4, proj.y - oh, ow * 0.15, oh);
      ctx.strokeStyle = "#b45309";
      ctx.strokeRect(proj.x - ow / 2, proj.y - oh, ow, oh * 0.25);
    } else if (obs.type === "rock") {
      ctx.fillStyle = "#4b5563";
      ctx.beginPath();
      ctx.moveTo(proj.x - ow / 2, proj.y);
      ctx.lineTo(proj.x - ow / 3, proj.y - oh);
      ctx.lineTo(proj.x + ow / 3, proj.y - oh * 0.9);
      ctx.lineTo(proj.x + ow / 2, proj.y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#9ca3af";
      ctx.stroke();
    } else if (obs.type === "stone_platform") {
      const preset = (obs as any).colorPreset || { fill: "#5a5a5a", stroke: "#3a3a3a" };
      ctx.fillStyle = preset.fill;
      ctx.strokeStyle = preset.stroke;
      ctx.lineWidth = 2 * proj.scale;
      
      // Draw a solid 3D-ish block for platform
      // Front face
      ctx.fillRect(proj.x - ow / 2, proj.y - oh, ow, oh);
      ctx.strokeRect(proj.x - ow / 2, proj.y - oh, ow, oh);
      
      // Top face perspective overlap
      ctx.fillStyle = preset.stroke; // darker/accentuated color for top surface depth
      ctx.beginPath();
      ctx.moveTo(proj.x - ow / 2, proj.y - oh);
      ctx.lineTo(proj.x - ow / 2 + 10 * proj.scale, proj.y - oh - 10 * proj.scale);
      ctx.lineTo(proj.x + ow / 2 + 10 * proj.scale, proj.y - oh - 10 * proj.scale);
      ctx.lineTo(proj.x + ow / 2, proj.y - oh);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Add elegant bricks/masonry grid pattern inside the platform
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1;
      // horizontal brick lines
      const rowCount = 4;
      for (let r = 1; r < rowCount; r++) {
        const yLine = proj.y - oh + (oh / rowCount) * r;
        ctx.beginPath();
        ctx.moveTo(proj.x - ow / 2, yLine);
        ctx.lineTo(proj.x + ow / 2, yLine);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = "#15803d";
      ctx.beginPath();
      ctx.arc(proj.x, proj.y - oh * 0.5, oh * 0.5, 0, Math.PI * 2);
      ctx.arc(proj.x - ow * 0.3, proj.y - oh * 0.4, oh * 0.4, 0, Math.PI * 2);
      ctx.arc(proj.x + ow * 0.3, proj.y - oh * 0.4, oh * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(proj.x, proj.y - oh * 0.6, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Draw Opponents
  localOpponents.forEach((opp) => {
    const relZ = opp.z - cameraZ;
    if (relZ < 1 || relZ > 160) return;

    const proj = project3D(opp.lane * 4, 0, opp.z, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
    if (!proj.visible) return;

    const ow = opp.width * 20 * proj.scale * 0.15;
    const oh = opp.height * 20 * proj.scale * 0.15;
    const moY = ((opp as any).mooseLocalY || 0) * (oh / 100);

    if (wireframe) {
      MooseCharacterModel.drawPolygons(ctx, proj.x, proj.y + moY, ow, oh);
      return;
    }

    const isBull = opp.mooseType === "Bull";
    const colorOverride = opp.mooseName === "Rebecca" ? "#ffffff" : (opp.isWildMoose ? "#522510" : undefined);
    
    const isSmashed = opp.mooseState === "smashed";
    if (isSmashed) {
      ctx.save();
      ctx.translate(proj.x, proj.y + moY);
      ctx.scale(1, 0.15); // Squish flat!
      ctx.translate(-proj.x, -(proj.y + moY));
    }

    if (opp.mooseName === "Omarosa") {
      MooseCharacterModel.Omarosa.draw3D(ctx, proj.x, proj.y + moY, ow, oh);
    } else if (opp.mooseName === "Ethan") {
      MooseCharacterModel.Ethan.draw3D(ctx, proj.x, proj.y + moY, ow, oh);
    } else if (opp.mooseName === "Darrell") {
      MooseCharacterModel.Darrell.draw3D(ctx, proj.x, proj.y + moY, ow, oh);
    } else if (opp.mooseName === "Payton") {
      MooseCharacterModel.Payton.draw3D(ctx, proj.x, proj.y + moY, ow, oh);
    } else if (opp.mooseName === "Susanna-Belili") {
      MooseCharacterModel.Susanna.draw3D(ctx, proj.x, proj.y + moY, ow, oh);
    } else if (opp.mooseName === "Angelica") {
      MooseCharacterModel.Angelica.draw3D(ctx, proj.x, proj.y + moY, ow, oh, !!opp.isCleaning);
    } else if (opp.isWildMoose || opp.mooseName === "Rebecca") {
      MooseCharacterModel.drawExtreme3D(ctx, proj.x, proj.y + moY, ow, oh, isBull, colorOverride);
    } else {
      MooseCharacterModel.draw3D(ctx, proj.x, proj.y + moY, ow, oh, isBull, colorOverride);
    }

    if (isSmashed) {
      ctx.restore();
    }

    const isFemale = opp.monkeyGender === "Female";
    const mY = ((opp as any).monkeyLocalY || 0) * (oh / 100);
    const mRot = (opp as any).monkeyRotation || 0;
    const mSway = ((opp as any).monkeySway || 0) * (ow / 100);
    const mArmSway = (opp as any).monkeyArmSway || 0;

    if (opp.monkeyBehavior === "tossed") {
      const tossTime = (opp as any).monkeyFlightTime || 0;
      const hoverX = (tossTime - 1.0) * ow * 1.5;
      MonkeyCharacterModel.draw3D(ctx, proj.x + hoverX, proj.y + mY, ow, oh, isFemale, opp.monkeyName, mRot, mSway, mArmSway);
    } else if (!opp.isCharging && !opp.isWildMoose) {
      MonkeyCharacterModel.draw3D(ctx, proj.x, proj.y + mY, ow, oh, isFemale, opp.monkeyName, mRot, mSway, mArmSway);
    }

    const textScale = Math.max(9, 11 * proj.scale * 0.15);
    const isWild = opp.isWildMoose || !opp.mooseName || opp.mooseName.trim() === "";
    const hasRider = !!(opp.monkeyName && opp.monkeyName.trim() !== "");
    const shouldDrawOpponentIndicator = Boolean(gameState?.showOpponentIndicators);

    if (proj.scale > 0.1 && shouldDrawOpponentIndicator) {
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(proj.x - ow * 0.75, proj.y - oh - 22, ow * 1.5, 14);
      ctx.strokeStyle = hasRider ? (isFemale ? "#f472b6" : "#60a5fa") : "#fbbf24";
      ctx.lineWidth = 1;
      ctx.strokeRect(proj.x - ow * 0.75, proj.y - oh - 22, ow * 1.5, 14);
      
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${textScale}px monospace`;
      ctx.textAlign = "center";
      
      if (isWild || !hasRider) {
        ctx.fillText(`Wild ${opp.mooseType} Moose`, proj.x, proj.y - oh - 11);
      } else {
        ctx.fillText(`${opp.monkeyName} on ${opp.mooseName}`, proj.x, proj.y - oh - 11);
      }
      ctx.restore();
    }

    if (opp.isCharging) {
      ctx.fillStyle = "#ef4444";
      ctx.font = `bold ${Math.max(10, 14 * proj.scale * 0.15)}px sans-serif`;
      ctx.fillText("CHARGED!", proj.x - ow / 2, proj.y - oh - 5);
    }
  });

  // Draw Animals (Owls, Frogs, Feral Pigs)
  localAnimals.forEach((animal) => {
    const relZ = animal.z - cameraZ;
    if (relZ < 1 || relZ > 160) return;

    const proj = project3D(animal.lane * 4 + (animal.xOffset || 0), animal.heightOffset || 0, animal.z, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
    if (!proj.visible) return;

    const sc = proj.scale * 0.15;
    if (animal.species === "feral_pig") {
      // 3D Perspective Feral Pig
      const baseCol = animal.coatColor || "#5C3A21";
      const secCol = animal.secondaryColor || "#3E2715";
      const isSmashed = animal.state === "smashed";

      ctx.save();
      if (isSmashed) {
        // Flat squish effect mirroring smashed moose
        ctx.translate(proj.x, proj.y);
        ctx.scale(1.25, 0.22);
        ctx.translate(-proj.x, -proj.y);
      }

      // 4 Trotter Legs
      ctx.fillStyle = "#1E1E1E"; // Hooves
      ctx.fillRect(proj.x - 12 * sc, proj.y + 4 * sc, 4 * sc, 8 * sc);
      ctx.fillRect(proj.x - 5 * sc, proj.y + 5 * sc, 4 * sc, 7 * sc);
      ctx.fillRect(proj.x + 4 * sc, proj.y + 5 * sc, 4 * sc, 7 * sc);
      ctx.fillRect(proj.x + 10 * sc, proj.y + 4 * sc, 4 * sc, 8 * sc);

      // Barrel Body
      ctx.fillStyle = baseCol;
      ctx.beginPath();
      ctx.ellipse(proj.x, proj.y - 2 * sc, 18 * sc, 12 * sc, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bristle ridge along back
      ctx.fillStyle = secCol;
      ctx.beginPath();
      ctx.moveTo(proj.x - 14 * sc, proj.y - 12 * sc);
      ctx.lineTo(proj.x, proj.y - 15 * sc);
      ctx.lineTo(proj.x + 12 * sc, proj.y - 12 * sc);
      ctx.lineTo(proj.x + 12 * sc, proj.y - 8 * sc);
      ctx.lineTo(proj.x - 14 * sc, proj.y - 8 * sc);
      ctx.fill();

      // Head & Snout (Rooting downward or forward)
      ctx.fillStyle = secCol;
      ctx.beginPath();
      ctx.ellipse(proj.x - 14 * sc, proj.y + 1 * sc, 8 * sc, 7 * sc, 0, 0, Math.PI * 2);
      ctx.fill();

      // Snout disc
      ctx.fillStyle = "#D48888";
      ctx.beginPath();
      ctx.ellipse(proj.x - 20 * sc, proj.y + 3 * sc, 4 * sc, 3 * sc, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nostrils
      ctx.fillStyle = "#5A2828";
      ctx.beginPath();
      ctx.arc(proj.x - 21 * sc, proj.y + 3 * sc, 1 * sc, 0, Math.PI * 2);
      ctx.arc(proj.x - 19 * sc, proj.y + 3 * sc, 1 * sc, 0, Math.PI * 2);
      ctx.fill();

      // Sharp ivory tusks for boars
      if (animal.gender === "Boar") {
        ctx.fillStyle = "#FFFDF5";
        ctx.beginPath();
        ctx.moveTo(proj.x - 18 * sc, proj.y + 3 * sc);
        ctx.lineTo(proj.x - 22 * sc, proj.y - 2 * sc);
        ctx.lineTo(proj.x - 16 * sc, proj.y + 2 * sc);
        ctx.fill();
      }

      // Eye
      ctx.fillStyle = "#2B1B0E";
      ctx.beginPath();
      ctx.arc(proj.x - 14 * sc, proj.y - 2 * sc, 2 * sc, 0, Math.PI * 2);
      ctx.fill();

      // Small curled tail
      ctx.strokeStyle = secCol;
      ctx.lineWidth = Math.max(1, 2 * sc);
      ctx.beginPath();
      ctx.arc(proj.x + 18 * sc, proj.y - 5 * sc, 4 * sc, Math.PI * 0.8, Math.PI * 2.2);
      ctx.stroke();

      ctx.restore();
    } else if (animal.species === "owl") {
      ctx.fillStyle = "#451a03";
      ctx.beginPath();
      ctx.ellipse(proj.x, proj.y, 10 * sc, 15 * sc, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(proj.x - 4 * sc, proj.y - 5 * sc, 3 * sc, 0, Math.PI * 2);
      ctx.arc(proj.x + 4 * sc, proj.y - 5 * sc, 3 * sc, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "#16a34a";
      ctx.beginPath();
      ctx.ellipse(proj.x, proj.y, 12 * sc, 8 * sc, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(proj.x - 5 * sc, proj.y - 3 * sc, 2 * sc, 0, Math.PI * 2);
      ctx.arc(proj.x + 5 * sc, proj.y - 3 * sc, 2 * sc, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Draw Poof particles
  const particlePool = (gameState as any).particlePool;
  if (particlePool) {
    const now = Date.now();
    particlePool.getItems().forEach((p: any) => {
      if (p.spawnTime === 0 || now - p.spawnTime > 1000) return;
      const elapsed = now - p.spawnTime;
      const progress = elapsed / 1000; // 0 to 1
      const currentRadius = p.radius + progress * (p.maxRadius - p.radius);
      const alpha = 1.0 - progress;

      const proj = project3D(p.lane * 4, 1.0, p.z, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      if (proj.visible) {
        const scRadius = currentRadius * 20 * proj.scale * 0.15;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Draw expanding cartoon-style poof clouds!
        ctx.fillStyle = "rgba(240, 240, 240, 0.9)";
        ctx.strokeStyle = "rgba(200, 200, 200, 0.6)";
        ctx.lineWidth = 1.5;

        // Overlapping circles for fluffy puff cloud look
        const numPuffs = 6;
        for (let i = 0; i < numPuffs; i++) {
          const angle = (i / numPuffs) * Math.PI * 2;
          const px = proj.x + Math.cos(angle) * (scRadius * 0.4);
          const py = proj.y + Math.sin(angle) * (scRadius * 0.4);
          ctx.beginPath();
          ctx.arc(px, py, scRadius * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      }
    });
  }

  // Draw Floating Score texts
  const floatingTextPool = (gameState as any).floatingTextPool;
  if (floatingTextPool) {
    const now = Date.now();
    floatingTextPool.getItems().forEach((t: any) => {
      if (t.spawnTime === 0 || now - t.spawnTime > 2000) return;
      const elapsed = now - t.spawnTime;
      const progress = elapsed / 2000; // 0 to 1
      const curYOffset = t.yOffset + progress * 2.0; // Float upwards
      const alpha = 1.0 - progress;

      const proj = project3D(t.lane * 4, curYOffset, t.z, cameraX, cameraY, cameraZ, focalLength, width, height, horizonY);
      if (proj.visible) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#fde047"; // bright yellow
        ctx.strokeStyle = "#000000"; // dark border
        ctx.lineWidth = 3;
        
        const fontSize = Math.max(12, 28 * proj.scale * 0.15);
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.textAlign = "center";
        
        ctx.strokeText(t.text, proj.x, proj.y);
        ctx.fillText(t.text, proj.x, proj.y);
        ctx.restore();
      }
    });
  }

  // Opossum Player
  if (viewMode === GameViewMode.RIDER) {
    const playerRelativeZ = 14;
    const scale = focalLength / playerRelativeZ;
    const px = width / 2;
    const py = height - 35 - playerY * scale * 0.4;
    renderOpossumRider(ctx, px, py, width, height, selectedOpossum, defaultRider, wireframe);
  } else if (viewMode === GameViewMode.POV) {
    const px = width / 2;
    const py = height + 10;
    renderOpossumPOV(ctx, px, py, selectedOpossum);
  }
}

/**
 * Renders the Level 0 Foyer 3D perspective.
 */
export function renderFoyer3D(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  horizonY: number,
  floorHeight: number,
  foyerX: number,
  foyerY: number,
  doorOpenProgress: number,
  localTicks: TickItem[],
  wireframe: boolean,
  viewMode: GameViewMode,
  selectedOpossum: OpossumCharacter,
  defaultRider: RiderCharacter
) {
  const centerX = width / 2;

  // Draw indigo sky backdrop above horizon
  ctx.fillStyle = VISUAL_CONSTANTS.PALETTE.INDIGO_SKY;
  ctx.fillRect(0, 0, width, horizonY);

  // Draw yellow stars
  ctx.fillStyle = VISUAL_CONSTANTS.PALETTE.STAR_YELLOW;
  for (let i = 0; i < 24; i++) {
    const sx = (i * 79 + 42) % width;
    const sy = (i * 37 + 15) % (horizonY - 10);
    ctx.beginPath();
    ctx.arc(sx, sy, (i % 2 === 0 ? 1 : 2), 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw shadow tree silhouettes along horizon line
  ctx.fillStyle = VISUAL_CONSTANTS.PALETTE.FOREST_SHADOW;
  for (let i = 0; i < width; i += 75) {
    const tx = i;
    const ty = horizonY;
    ctx.beginPath();
    ctx.moveTo(tx - 25, ty);
    ctx.lineTo(tx, ty - 25);
    ctx.lineTo(tx + 25, ty);
    ctx.closePath();
    ctx.fill();
  }

  // Draw horizontal green horizon separating wall line
  ctx.strokeStyle = VISUAL_CONSTANTS.PALETTE.HORIZON_GREEN;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(width, horizonY);
  ctx.stroke();

  // Perspective grid view of the Foyer floor (orange & purple tiles)
  ctx.strokeStyle = "rgba(139, 92, 246, 0.45)";
  ctx.lineWidth = 1;
  const lineCount = 12;
  for (let i = 0; i <= lineCount; i++) {
    const ratio = Math.pow(i / lineCount, 2.5);
    const py = horizonY + ratio * floorHeight;
    
    // Draw checker bands
    if (i < lineCount) {
      const nextRatio = Math.pow((i + 1) / lineCount, 2.5);
      const nextPy = horizonY + nextRatio * floorHeight;
      ctx.fillStyle = (i % 2 === 0) ? "rgba(249, 115, 22, 0.2)" : "rgba(124, 58, 237, 0.2)"; 
      ctx.fillRect(0, py, width, nextPy - py);
    }

    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
    ctx.stroke();
  }

  // Diagonal rays for perspective tile grids
  const rayCount = 16;
  for (let i = -rayCount / 2; i <= rayCount / 2; i++) {
    const targetX = centerX + i * (width / (rayCount / 4.5));
    ctx.strokeStyle = "rgba(249, 115, 22, 0.3)";
    ctx.beginPath();
    ctx.moveTo(centerX, horizonY);
    ctx.lineTo(targetX, height);
    ctx.stroke();
  }

  const project3D = (gx: number, gy: number, verticalOffset = 0) => {
    const dx = gx - foyerX;
    const dy = gy - foyerY;
    const relativeYRatio = (dy + 1000) / 2000;
    const depthScale = 0.5 + relativeYRatio * 0.5;
    const fx = centerX + dx * (0.35 * depthScale);
    const fy = horizonY + (1 - relativeYRatio) * floorHeight;
    return { x: fx, y: fy - verticalOffset * depthScale, scale: depthScale };
  };

  // 1. Porch Floordeck (Y = 2000 to Y = 2200)
  const pLT = project3D(0, 2200);
  const pRT = project3D(2000, 2200);
  const pRB = project3D(2000, 2000);
  const pLB = project3D(0, 2000);

  if (pLB.y > horizonY && pLT.y < height) {
    ctx.fillStyle = VISUAL_CONSTANTS.PALETTE.WOOD_DECK; 
    ctx.beginPath();
    ctx.moveTo(pLB.x, pLB.y);
    ctx.lineTo(pRB.x, pRB.y);
    ctx.lineTo(pRT.x, pRT.y);
    ctx.lineTo(pLT.x, pLT.y);
    ctx.closePath();
    ctx.fill();

    // wood planks on porch
    ctx.strokeStyle = "rgba(251, 146, 60, 0.25)";
    ctx.lineWidth = 2;
    for (let pxVal = 0; pxVal <= 2000; pxVal += 100) {
      const ptB = project3D(pxVal, 2000);
      const ptT = project3D(pxVal, 2200);
      ctx.beginPath();
      ctx.moveTo(ptB.x, ptB.y);
      ctx.lineTo(ptT.x, ptT.y);
      ctx.stroke();
    }
  }

  // 2. North Wall segments at Y = 2000
  const wallH = 180; 
  const wL_B_L = project3D(0, 2000);
  const wL_B_R = project3D(990, 2000);
  const wR_B_L = project3D(1010, 2000);
  const wR_B_R = project3D(2000, 2000);

  const wL_T_L = project3D(0, 2000, wallH);
  const wL_T_R = project3D(990, 2000, wallH);
  const wR_T_L = project3D(1010, 2000, wallH);
  const wR_T_R = project3D(2000, 2000, wallH);

  ctx.fillStyle = VISUAL_CONSTANTS.PALETTE.FLOOR_SLATE; 
  ctx.beginPath();
  ctx.moveTo(wL_B_L.x, wL_B_L.y);
  ctx.lineTo(wL_B_R.x, wL_B_R.y);
  ctx.lineTo(wL_T_R.x, wL_T_R.y);
  ctx.lineTo(wL_T_L.x, wL_T_L.y);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(wR_B_L.x, wR_B_L.y);
  ctx.lineTo(wR_B_R.x, wR_B_R.y);
  ctx.lineTo(wR_T_R.x, wR_T_R.y);
  ctx.lineTo(wR_T_L.x, wR_T_L.y);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = VISUAL_CONSTANTS.PALETTE.WALL_STONE;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 3. Double sliding brass doors
  const dHeight = 150; 
  const dL_base = wL_B_R;
  const dR_base = wR_B_L;
  const doorwayW = dR_base.x - dL_base.x;
  const singleDoorW = doorwayW / 2;
  const doorOffset = singleDoorW * doorOpenProgress;

  // Left brass door profile
  const dL_L_X = dL_base.x - doorOffset;
  const dL_R_X = (dL_base.x + singleDoorW) - doorOffset;
  const dL_Y_B = dL_base.y;
  const dL_Y_T = dL_base.y - dHeight * dL_base.scale;

  ctx.fillStyle = VISUAL_CONSTANTS.PALETTE.BRASS_POLISHED; 
  ctx.fillRect(dL_L_X, dL_Y_T, dL_R_X - dL_L_X, dL_Y_B - dL_Y_T);
  ctx.strokeStyle = VISUAL_CONSTANTS.PALETTE.BRASS_SHINY; 
  ctx.lineWidth = Math.max(1, 2.5 * dL_base.scale);
  ctx.strokeRect(dL_L_X, dL_Y_T, dL_R_X - dL_L_X, dL_Y_B - dL_Y_T);

  // Left door glass window
  const glassMargin_L = (dL_R_X - dL_L_X) * 0.15;
  const glassW_L = (dL_R_X - dL_L_X) * 0.7;
  const glassH_L = (dL_Y_B - dL_Y_T) * 0.53;
  ctx.fillStyle = "rgba(186, 230, 253, 0.55)"; 
  ctx.fillRect(dL_L_X + glassMargin_L, dL_Y_T + glassMargin_L, glassW_L, glassH_L);
  ctx.strokeStyle = VISUAL_CONSTANTS.PALETTE.SKY_CYAN;
  ctx.strokeRect(dL_L_X + glassMargin_L, dL_Y_T + glassMargin_L, glassW_L, glassH_L);

  // Right brass door profile
  const dR_L_X = (dL_base.x + singleDoorW) + doorOffset;
  const dR_R_X = dR_base.x + doorOffset;
  const dR_Y_B = dR_base.y;
  const dR_Y_T = dR_base.y - dHeight * dR_base.scale;

  ctx.fillStyle = "#d97706"; 
  ctx.fillRect(dR_L_X, dR_Y_T, dR_R_X - dR_L_X, dR_Y_B - dR_Y_T);
  ctx.strokeStyle = "#fbbf24";
  ctx.strokeRect(dR_L_X, dR_Y_T, dR_R_X - dR_L_X, dR_Y_B - dR_Y_T);

  // Right door glass window
  const glassMargin_R = (dR_R_X - dR_L_X) * 0.15;
  const glassW_R = (dR_R_X - dR_L_X) * 0.7;
  const glassH_R = (dR_Y_B - dR_Y_T) * 0.53;
  ctx.fillStyle = "rgba(186, 230, 253, 0.55)";
  ctx.fillRect(dR_L_X + glassMargin_R, dR_Y_T + glassMargin_R, glassW_R, glassH_R);
  ctx.strokeStyle = "#38bdf8";
  ctx.strokeRect(dR_L_X + glassMargin_R, dR_Y_T + glassMargin_R, glassW_R, glassH_R);

  // Foyer wall markers
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 11px monospace";
  ctx.fillText("SOUTH WALL Marker: Y = 0 FT", 15, height - 15);
  ctx.fillText("NORTH WALL Marker: Y = 2000 FT", 15, horizonY + 20);
  ctx.fillText("WEST WALL Marker: X = 0 FT", 15, height / 2);
  ctx.fillText("EAST WALL Marker: X = 2000 FT", width - 195, height / 2);

  // Foyer ticks
  localTicks.forEach((tick: TickItem) => {
    if (tick.collected) return;
    const dx = (tick.x || 0) - foyerX;
    const dy = (tick.y || 0) - foyerY;
    const relativeYRatio = (dy + 1000) / 2000;
    const depthScale = 0.5 + relativeYRatio * 0.5;
    const fx = centerX + dx * (0.35 * depthScale);
    const fy = horizonY + (1 - relativeYRatio) * floorHeight;

    if (fy > horizonY && fy < height && fx > 0 && fx < width) {
      const radius = Math.max(3, 8 * (1 - relativeYRatio));
      drawEdibleItem(ctx, fx, fy, radius, 0, wireframe, !!tick.isTick);
    }
  });

  // Opossum Player
  if (viewMode === GameViewMode.RIDER) {
    const px = width / 2;
    const py = height - 100;
    renderOpossumRider(ctx, px, py, width, height, selectedOpossum, defaultRider, wireframe);
  } else if (viewMode === GameViewMode.POV) {
    const px = width / 2;
    const py = height + 10;
    renderOpossumPOV(ctx, px, py, selectedOpossum);
  }
}

/**
 * Renders the Opossum and Rider in 3rd person RIDER view.
 */
export function renderOpossumRider(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number,
  selectedOpossum: OpossumCharacter,
  defaultRider: RiderCharacter,
  wireframe: boolean
) {
  const isAshley = selectedOpossum.id === "ashley";
  const isArden = selectedOpossum.id === "arden_rosie";
  const isJahmella = selectedOpossum.id === "jahmella_rose";
  const isDagmar = selectedOpossum.id === "dagmar_kone_reynolds";
  const isAmara = selectedOpossum.id === "amara_qin";
  const isSaffron = selectedOpossum.id === "saffron_rose";
  const isJalissa = selectedOpossum.id === "jalissa_chin";
  const isAgape = selectedOpossum.id === "agape_rose";
  const isRoxanne = selectedOpossum.id === "roxanne_kone_reynolds";
  const isTiana = selectedOpossum.id === "tiana_qin";
  
  const pWidth = isSaffron ? 48 : (isJalissa || isArden ? 38 : (isRoxanne ? 45 : (isAgape ? 42 : (isTiana ? 38 : (isJahmella || isDagmar ? 40 : (isAshley ? 45 : 40))))));

  if (wireframe) {
    if (isAshley) {
      AshleyOpossum.drawPolygons(ctx, px, py, pWidth);
    } else if (isAmara) {
      AmaraQinOpossum.drawPolygons(ctx, px, py, pWidth);
    } else if (isSaffron) {
      SaffronRoseOpossum.drawPolygons(ctx, px, py, pWidth);
    } else if (isJalissa) {
      JalissaChinOpossum.drawPolygons(ctx, px, py, pWidth);
    } else if (isArden) {
      ArdenRosieOpossum.drawPolygons(ctx, px, py, pWidth);
    } else if (isJahmella) {
      JahmellaRoseOpossum.drawPolygons(ctx, px, py, pWidth);
    } else if (isDagmar) {
      DagmarKoneReynoldsOpossum.drawPolygons(ctx, px, py, pWidth);
    } else if (isAgape) {
      AgapeRoseOpossum.drawPolygons(ctx, px, py, pWidth);
    } else if (isRoxanne) {
      RoxanneKoneReynoldsOpossum.drawPolygons(ctx, px, py, pWidth);
    } else if (isTiana) {
      TianaQinOpossum.drawPolygons(ctx, px, py, pWidth);
    } else {
      MelissaOpossum.drawPolygons(ctx, px, py, pWidth);
    }
  } else {
    if (selectedOpossum.isAI) {
      AIGeneratedOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else if (isAshley) {
      AshleyOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else if (isAmara) {
      AmaraQinOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else if (isSaffron) {
      SaffronRoseOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else if (isJalissa) {
      JalissaChinOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else if (isArden) {
      ArdenRosieOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else if (isJahmella) {
      JahmellaRoseOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else if (isDagmar) {
      DagmarKoneReynoldsOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else if (isAgape) {
      AgapeRoseOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else if (isRoxanne) {
      RoxanneKoneReynoldsOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else if (isTiana) {
      TianaQinOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    } else {
      MelissaOpossum.draw3D(ctx, px, py, width, height, selectedOpossum);
    }
  }

  // Rider Rendering (Fairy-Rider, Mary, Edward, George, Angela)
  const isGeorge = defaultRider.id === "george";
  const isAngela = defaultRider.id === "angela";
  const isMary = defaultRider.id === "mary";
  const isEdward = defaultRider.id === "edward";

  // Outfit body
  if (isGeorge) {
    // Gold onesie with yellow hexagonal beehive pattern
    ctx.fillStyle = "#E5A93C"; // Rich Gold base
    ctx.beginPath();
    ctx.ellipse(px, py - 10, 9, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Upper torso
    ctx.fillStyle = "#D4982B";
    ctx.fillRect(px - 7, py - 30, 14, 14);

    // Fine hexagon pattern simulation
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    for (let hx = px - 6; hx <= px + 6; hx += 3.5) {
      for (let hy = py - 29; hy <= py - 18; hy += 3.5) {
        ctx.strokeRect(hx - 1, hy - 1, 2.5, 2.5);
      }
    }

    // Honey-skin head
    ctx.fillStyle = defaultRider.skinColor || "#C68A4C";
    ctx.beginPath();
    ctx.arc(px, py - 38, 7, 0, Math.PI * 2);
    ctx.fill();

    // Black dreadlocks
    ctx.fillStyle = "#111111";
    ctx.beginPath();
    ctx.arc(px, py - 41, 7.5, Math.PI, Math.PI * 2);
    ctx.fill();

    // Red Rastafari Crown atop head
    ctx.fillStyle = "#DC2626"; // Vibrant Rastafari Red
    ctx.beginPath();
    ctx.moveTo(px - 5, py - 44);
    ctx.lineTo(px - 6, py - 49);
    ctx.lineTo(px - 2, py - 46);
    ctx.lineTo(px, py - 50);
    ctx.lineTo(px + 2, py - 46);
    ctx.lineTo(px + 6, py - 49);
    ctx.lineTo(px + 5, py - 44);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#B91C1C";
    ctx.lineWidth = 0.8;
    ctx.stroke();
  } else if (isAngela) {
    // Large white dress resembling Cinderella's gown with pink apron
    ctx.fillStyle = "#F8FAFC"; // Clean pristine white gown
    ctx.beginPath();
    ctx.ellipse(px, py - 14, 15, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pink apron overlay
    ctx.fillStyle = "#F472B6"; // Modest pink apron
    ctx.beginPath();
    ctx.ellipse(px, py - 13, 8, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Upper torso (modest, dignified neckline)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(px - 9, py - 44, 18, 17);

    // Peach skin head (6'8" tall stature)
    ctx.fillStyle = defaultRider.skinColor || "#F5C7A9";
    ctx.beginPath();
    ctx.arc(px, py - 52, 8, 0, Math.PI * 2);
    ctx.fill();

    // Long Red hair
    ctx.fillStyle = "#B91C1C";
    ctx.beginPath();
    ctx.arc(px, py - 55, 8.5, Math.PI * 0.85, Math.PI * 2.15);
    ctx.fill();
    // Hair flowing down shoulders
    ctx.fillRect(px - 10, py - 54, 3, 14);
    ctx.fillRect(px + 7, py - 54, 3, 14);

    // Gold tiara with diamond-shaped red shiny gem
    ctx.fillStyle = "#FBBF24"; // Gold tiara
    ctx.beginPath();
    ctx.moveTo(px - 6, py - 58);
    ctx.lineTo(px, py - 63);
    ctx.lineTo(px + 6, py - 58);
    ctx.lineTo(px + 5, py - 56);
    ctx.lineTo(px - 5, py - 56);
    ctx.closePath();
    ctx.fill();
    // Diamond-shaped red shiny gem
    ctx.fillStyle = "#EF4444";
    ctx.beginPath();
    ctx.moveTo(px, py - 62);
    ctx.lineTo(px + 2, py - 60);
    ctx.lineTo(px, py - 58);
    ctx.lineTo(px - 2, py - 60);
    ctx.closePath();
    ctx.fill();
  } else if (isMary) {
    // Mary: Pink onesie with flower patterns
    ctx.fillStyle = "#F472B6";
    ctx.beginPath();
    ctx.ellipse(px, py - 12, 10, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#EC4899";
    ctx.fillRect(px - 8, py - 35, 16, 15);

    ctx.fillStyle = defaultRider.skinColor || "#F5F5F5";
    ctx.beginPath();
    ctx.arc(px, py - 43, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Long white hair
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(px, py - 47, 8, Math.PI, Math.PI * 2);
    ctx.fill();
  } else if (isEdward) {
    // Edward: Green onesie with yellow stripes & football helmet
    ctx.fillStyle = "#16A34A";
    ctx.beginPath();
    ctx.ellipse(px, py - 12, 10, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#EAB308";
    ctx.fillRect(px - 8, py - 28, 16, 4);

    ctx.fillStyle = defaultRider.skinColor || "#E6C199";
    ctx.beginPath();
    ctx.arc(px, py - 43, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Helmet
    ctx.fillStyle = "#15803D";
    ctx.beginPath();
    ctx.arc(px, py - 46, 8.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Default / Fairy-Rider: Blue onesie
    ctx.fillStyle = "#2563eb";
    ctx.beginPath();
    ctx.ellipse(px, py - 12, 10, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1d4ed8";
    ctx.fillRect(px - 8, py - 35, 16, 15);

    ctx.fillStyle = defaultRider.skinColor || "#8B5A2B";
    ctx.beginPath();
    ctx.arc(px, py - 43, 7.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(px, py - 47, 8, Math.PI, Math.PI * 2);
    ctx.fill();
  }

  // Molded/fused legs of the 5'4" rider merging into the opossum's fur base
  const furColor = isAshley ? "#facc15" : (isArden ? "#fff7ed" : (isJahmella ? "#f97316" : (isDagmar ? "#ffffff" : "#9ca3af")));
  ctx.fillStyle = furColor;
  // Left leg
  ctx.beginPath();
  ctx.ellipse(px - 11, py - 6, 7, 11, Math.PI / 10, 0, Math.PI * 2);
  ctx.fill();
  // Left foot boot blended smoothly into the fur base
  ctx.fillStyle = isAshley ? "#eab308" : (isArden ? "#fff1e2" : (isJahmella ? "#ea580c" : (isDagmar ? "#f3f4f6" : "#6a7280")));
  ctx.beginPath();
  ctx.ellipse(px - 14, py + 4, 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Right leg
  ctx.fillStyle = furColor;
  ctx.beginPath();
  ctx.ellipse(px + 11, py - 6, 7, 11, -Math.PI / 10, 0, Math.PI * 2);
  ctx.fill();
  // Right foot boot blended smoothly into the fur base
  ctx.fillStyle = isAshley ? "#eab308" : (isArden ? "#fff1e2" : (isJahmella ? "#ea580c" : (isDagmar ? "#f3f4f6" : "#6a7280")));
  ctx.beginPath();
  ctx.ellipse(px + 14, py + 4, 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Renders the Opossum head/nose and Rider legs in POV view.
 */
export function renderOpossumPOV(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  selectedOpossum: OpossumCharacter
) {
  const isAshley = selectedOpossum.id === "ashley";
  const isArden = selectedOpossum.id === "arden_rosie";
  const isJahmella = selectedOpossum.id === "jahmella_rose";
  const isDagmar = selectedOpossum.id === "dagmar_kone_reynolds";
  const furColor = isAshley ? "#facc15" : (isArden ? "#fff7ed" : (isJahmella ? "#f97316" : (isDagmar ? "#ffffff" : "#9ca3af")));
  const strokeColor = isAshley ? "#eab308" : (isArden ? "#fff1e2" : (isJahmella ? "#ea580c" : (isDagmar ? "#f3f4f6" : "#6b7280")));

  ctx.save();

  // Draw the rider's legs molded into the opossum's fur, clinging on the sides
  ctx.fillStyle = furColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 4;

  // Left leg hugging side of opossum body
  ctx.beginPath();
  ctx.ellipse(px - 44, py + 22, 18, 38, -Math.PI / 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Right leg hugging side of opossum body
  ctx.beginPath();
  ctx.ellipse(px + 44, py + 22, 18, 38, Math.PI / 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  if (isAshley) {
    // Draw ears
    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.arc(px - 14, py - 18, 9, 0, Math.PI * 2);
    ctx.arc(px + 14, py - 18, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e11d48";
    ctx.beginPath();
    ctx.arc(px - 14, py - 18, 6, 0, Math.PI * 2);
    ctx.arc(px + 14, py - 18, 6, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = "#facc15"; // Ashley body yellow
    ctx.beginPath();
    ctx.ellipse(px, py, 30, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f9fafb"; // Head white snout
    ctx.beginPath();
    ctx.ellipse(px, py - 10, 22, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose pink tip
    ctx.fillStyle = "#ffb6c1";
    ctx.beginPath();
    ctx.arc(px, py - 20, 5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Melissa/Standard style drawing
    // Draw ears
    ctx.fillStyle = "#4b5563";
    ctx.beginPath();
    ctx.arc(px - 12, py - 16, 8, 0, Math.PI * 2);
    ctx.arc(px + 12, py - 16, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fda4af"; // Pink inner ears
    ctx.beginPath();
    ctx.arc(px - 12, py - 16, 5, 0, Math.PI * 2);
    ctx.arc(px + 12, py - 16, 5, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = furColor;
    ctx.beginPath();
    ctx.ellipse(px, py, 28, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff"; // Head white snout
    ctx.beginPath();
    ctx.ellipse(px, py - 8, 20, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nose pink tip
    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.arc(px, py - 18, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Graphical Rendering module for Opossum Ride Adventure.
 * Handles the visual presentation of the game world.
 */
export const GraphicalRenderer = {};
