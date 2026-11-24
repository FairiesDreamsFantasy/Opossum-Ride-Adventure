/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * CourtyardCopyleftScene — Temple Courtyard Copyleft Parade, Tea Area Dynamic Picture Frame,
 * and Architectural Chalkboard Blueprint Overlay.
 */

import { drawGoatCameo3D } from "../../../../../../Characters/Goats";
import { AnimalItem } from "../../../../../../types";

export const TEMPLE_COURTYARD_OPEN_SOURCE_BANNER_HEADLINE =
  "Opossum Ride Adventure is open-source. Your console is working!";

export const TEMPLE_COURTYARD_OPEN_SOURCE_BANNER_PARAGRAPHS = [
  "Please get a free officially open-source copy of this game, that way; you can ride an opossum via this game. We overstand your privacy. There's no need to provide email for registration/account. We are NOT into harvesting your data.",
  "Obtain an open-source game what Fairies Dreams & Fantasy Staff has developed provides you premium content (free of charge)!",
  "Before you go; please take a screenshot, after you pressed ANY key, that way; you can let community of gamers know about your experience. Thanks for supporting our game developers, and our work!!"
] as const;

export const PARADE_GOAT_IDS = ["alpine", "aurum", "bella", "snowy"] as const;

function wrapBannerText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (let i = 0; i < words.length; i++) {
    const candidate = current ? `${current} ${words[i]}` : words[i];
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = words[i];
    }
  }
  if (current) lines.push(current);
  return lines;
}

export class CourtyardCopyleftScene {
  /**
   * Renders 4 authentic goats marching in parade formation at the Temple Courtyard,
   * holding a green canvas banner with black text displaying the open-source & privacy message.
   */
  public static renderCourtyardGoatParade3D(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    horizonY: number,
    nowMs: number,
    wireframe: boolean
  ): void {
    const safeTime = Number.isFinite(nowMs) ? nowMs : Date.now();
    const paradeOsc = Math.sin(safeTime * 0.00055);
    const centerX = width * 0.5 + paradeOsc * Math.min(45, width * 0.06);
    const groundY = Math.min(height - 34, Math.max(horizonY + 125, height * 0.74));

    const bannerW = Math.min(width - 28, 690);
    const bannerX = Math.max(14, Math.min(width - bannerW - 14, centerX - bannerW / 2));

    ctx.save();

    // Compute wrapped text lines first so banner height fits every word crisply
    const innerPadX = 14;
    const textMaxW = bannerW - innerPadX * 2;
    const wrappedLines: { text: string; bold: boolean }[] = [];

    ctx.font = "bold 11px monospace";
    for (const hl of wrapBannerText(ctx, TEMPLE_COURTYARD_OPEN_SOURCE_BANNER_HEADLINE, textMaxW)) {
      wrappedLines.push({ text: hl, bold: true });
    }

    ctx.font = "bold 9.5px sans-serif";
    for (const para of TEMPLE_COURTYARD_OPEN_SOURCE_BANNER_PARAGRAPHS) {
      for (const ln of wrapBannerText(ctx, para, textMaxW)) {
        wrappedLines.push({ text: ln, bold: false });
      }
    }

    const lineHeight = 12;
    const bannerH = 18 + wrappedLines.length * lineHeight;
    const bannerTopY = Math.max(44, groundY - bannerH - 44);

    // Support poles carried by the 4 parading goats
    const goatOffsets = [-0.36, -0.12, 0.12, 0.36];
    goatOffsets.forEach((ratio, idx) => {
      const gx = centerX + ratio * bannerW;
      const trotBounce = Math.abs(Math.sin(safeTime * 0.006 + idx * 1.1)) * 4;
      const poleBottomY = groundY - trotBounce - 8;

      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(gx, poleBottomY);
      ctx.lineTo(gx, bannerTopY + bannerH - 2);
      ctx.stroke();
    });

    // Green Banner Surface with Black Border & Crisp Black Text
    ctx.fillStyle = wireframe ? "rgba(22, 163, 74, 0.25)" : "#22c55e";
    ctx.fillRect(bannerX, bannerTopY, bannerW, bannerH);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(bannerX, bannerTopY, bannerW, bannerH);

    ctx.strokeStyle = "#14532d";
    ctx.lineWidth = 1;
    ctx.strokeRect(bannerX + 4, bannerTopY + 4, bannerW - 8, bannerH - 8);

    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    let cursorY = bannerTopY + 17;
    wrappedLines.forEach((lineObj) => {
      ctx.font = lineObj.bold ? "bold 11px monospace" : "bold 9.5px sans-serif";
      ctx.fillText(lineObj.text, bannerX + bannerW * 0.5, cursorY);
      cursorY += lineHeight;
    });

    // Render the 4 Marching Goats carrying the banner
    goatOffsets.forEach((ratio, idx) => {
      const gx = centerX + ratio * bannerW;
      const trotBounce = Math.abs(Math.sin(safeTime * 0.006 + idx * 1.1)) * 4;
      const goatAnimal: AnimalItem = {
        id: 9200 + idx,
        species: "goat",
        goatId: PARADE_GOAT_IDS[idx],
        lane: 0,
        z: 18,
        state: "trotting",
        goatBehaviorState: "trotting",
        nextVocalTime: safeTime + 60000,
        xOffset: 0,
        herdSide: paradeOsc >= 0 ? "left" : "right",
        headDip: 0.08,
        grazePhase: safeTime * 0.004 + idx
      };
      drawGoatCameo3D(ctx, gx, groundY - trotBounce, 9.2, goatAnimal, false);
    });

    ctx.restore();
  }

  /**
   * Renders the Dynamic Picture Frame in the South Tea Area of the Temple Courtyard:
   * - Top/Left Scene: Riders riding giant opossums across starlit hills
   * - Center/Right Scene: An employed modest-income person on a laptop displaying a legitimate open-source game
   * - Foreground/Table Scene: The same employed person having warm tea & flaky pastries with gentle animated steam
   */
  public static renderTeaAreaDynamicPictureFrame3D(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    baseY: number,
    frameScale: number,
    nowMs: number,
    wireframe: boolean
  ): void {
    const safeScale = Number.isFinite(frameScale) ? Math.max(0.45, Math.min(2.2, frameScale)) : 1.0;
    const safeTime = Number.isFinite(nowMs) ? nowMs : Date.now();
    const frameW = 240 * safeScale;
    const frameH = 128 * safeScale;
    const x = centerX - frameW * 0.5;
    const y = baseY - frameH;

    ctx.save();

    // Wooden Picture Stand / Easel Legs
    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = Math.max(2, 4 * safeScale);
    ctx.beginPath();
    ctx.moveTo(x + frameW * 0.18, baseY);
    ctx.lineTo(x + frameW * 0.25, baseY + 26 * safeScale);
    ctx.moveTo(x + frameW * 0.82, baseY);
    ctx.lineTo(x + frameW * 0.75, baseY + 26 * safeScale);
    ctx.stroke();

    // Ornate Gilded Picture Frame Outer Border
    ctx.fillStyle = wireframe ? "rgba(0,0,0,0)" : "#78350f";
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = Math.max(2, 3 * safeScale);
    ctx.fillRect(x - 6 * safeScale, y - 6 * safeScale, frameW + 12 * safeScale, frameH + 12 * safeScale);
    ctx.strokeRect(x - 6 * safeScale, y - 6 * safeScale, frameW + 12 * safeScale, frameH + 12 * safeScale);

    // Canvas Interior Backdrop
    ctx.fillStyle = wireframe ? "rgba(15, 23, 42, 0.4)" : "#0f172a";
    ctx.fillRect(x, y, frameW, frameH);
    ctx.beginPath();
    ctx.rect(x, y, frameW, frameH);
    ctx.clip();

    // Left Panel (Width 46%): Riders Riding Opossums under Stars
    const leftW = frameW * 0.46;
    if (!wireframe) {
      ctx.fillStyle = "#1e1b4b";
      ctx.fillRect(x, y, leftW, frameH * 0.65);
      ctx.fillStyle = "#14532d";
      ctx.fillRect(x, y + frameH * 0.65, leftW, frameH * 0.35);
    }

    // Animated Riding Opossums & Riders inside Left Panel
    const rideShift = Math.sin(safeTime * 0.0022) * 14 * safeScale;
    [0.32, 0.72].forEach((yRatio, idx) => {
      const ox = x + leftW * 0.48 + rideShift * (idx === 0 ? 1 : -0.7);
      const oy = y + frameH * (0.48 + yRatio * 0.34);
      // Giant opossum body
      ctx.fillStyle = "#9ca3af";
      ctx.beginPath();
      ctx.ellipse(ox, oy, 14 * safeScale, 8 * safeScale, 0, 0, Math.PI * 2);
      ctx.fill();
      // Snout & pink ear
      ctx.fillStyle = "#f9a8d4";
      ctx.beginPath();
      ctx.arc(ox + 13 * safeScale, oy - 2 * safeScale, 2.5 * safeScale, 0, Math.PI * 2);
      ctx.arc(ox + 8 * safeScale, oy - 7 * safeScale, 2.4 * safeScale, 0, Math.PI * 2);
      ctx.fill();
      // Pink tail
      ctx.strokeStyle = "#f472b6";
      ctx.lineWidth = Math.max(1, 2 * safeScale);
      ctx.beginPath();
      ctx.moveTo(ox - 13 * safeScale, oy);
      ctx.quadraticCurveTo(ox - 21 * safeScale, oy - 6 * safeScale, ox - 18 * safeScale, oy - 12 * safeScale);
      ctx.stroke();
      // Mounted Rider on Opossum
      ctx.fillStyle = idx === 0 ? "#38bdf8" : "#f43f5e";
      ctx.fillRect(ox - 4 * safeScale, oy - 15 * safeScale, 8 * safeScale, 9 * safeScale);
      ctx.fillStyle = "#fed7aa";
      ctx.beginPath();
      ctx.arc(ox, oy - 18 * safeScale, 4 * safeScale, 0, Math.PI * 2);
      ctx.fill();
    });

    // Divider Strip
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = Math.max(1, 1.5 * safeScale);
    ctx.beginPath();
    ctx.moveTo(x + leftW, y);
    ctx.lineTo(x + leftW, y + frameH);
    ctx.stroke();

    // Right Panel (Width 54%): Employed Person at Table with Laptop (Legitimate Game) + Tea & Pastries
    const rightX = x + leftW;
    const rightW = frameW - leftW;
    if (!wireframe) {
      ctx.fillStyle = "#292524"; // Warm modest indoor room
      ctx.fillRect(rightX, y, rightW, frameH);
    }

    // Wooden table surface
    const tableY = y + frameH * 0.68;
    ctx.fillStyle = "#92400e";
    ctx.fillRect(rightX + 8 * safeScale, tableY, rightW - 16 * safeScale, 8 * safeScale);

    // Modest Worker / Employed Person (honest patched shirt + high-vis work lanyard badge)
    const px = rightX + rightW * 0.34;
    const py = tableY - 2 * safeScale;
    // Torso (modest patched work shirt)
    ctx.fillStyle = "#475569";
    ctx.fillRect(px - 10 * safeScale, py - 28 * safeScale, 20 * safeScale, 28 * safeScale);
    // Visible neat employment ID badge / work lanyard
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = Math.max(1, 1.5 * safeScale);
    ctx.beginPath();
    ctx.moveTo(px - 4 * safeScale, py - 28 * safeScale);
    ctx.lineTo(px, py - 18 * safeScale);
    ctx.lineTo(px + 4 * safeScale, py - 28 * safeScale);
    ctx.stroke();
    ctx.fillStyle = "#fef08a";
    ctx.fillRect(px - 3 * safeScale, py - 19 * safeScale, 6 * safeScale, 5 * safeScale);
    // Head
    ctx.fillStyle = "#d97757";
    ctx.beginPath();
    ctx.arc(px, py - 36 * safeScale, 7.5 * safeScale, 0, Math.PI * 2);
    ctx.fill();

    // Open Laptop displaying Legitimate Open-Source Opossum Ride Adventure Game
    const lx = rightX + rightW * 0.45;
    const ly = tableY;
    // Laptop screen
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(lx, ly - 24 * safeScale, 28 * safeScale, 20 * safeScale);
    ctx.fillStyle = "#064e3b"; // Authentic green game sky/horizon
    ctx.fillRect(lx + 2 * safeScale, ly - 22 * safeScale, 24 * safeScale, 16 * safeScale);
    // Tiny opossum silhouette + rider on laptop screen
    ctx.fillStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.ellipse(lx + 14 * safeScale, ly - 12 * safeScale, 5 * safeScale, 3 * safeScale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4ade80";
    ctx.fillRect(lx + 12 * safeScale, ly - 17 * safeScale, 4 * safeScale, 4 * safeScale);
    // Laptop base
    ctx.fillStyle = "#64748b";
    ctx.fillRect(lx - 2 * safeScale, ly - 4 * safeScale, 32 * safeScale, 4 * safeScale);

    // Warm Tea Cup & Saucer + Golden Pastries right next to Laptop
    const teaX = rightX + rightW * 0.80;
    const teaY = tableY;
    // Pastry plate & flaky golden pastries
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.ellipse(teaX - 10 * safeScale, teaY - 1 * safeScale, 8 * safeScale, 2.5 * safeScale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(teaX - 12 * safeScale, teaY - 4 * safeScale, 3.2 * safeScale, 0, Math.PI * 2);
    ctx.arc(teaX - 8 * safeScale, teaY - 3.5 * safeScale, 2.8 * safeScale, 0, Math.PI * 2);
    ctx.fill();

    // Ceramic teacup with steaming tea
    ctx.fillStyle = "#e0f2fe";
    ctx.fillRect(teaX + 2 * safeScale, teaY - 9 * safeScale, 10 * safeScale, 8 * safeScale);
    ctx.fillStyle = "#b45309";
    ctx.fillRect(teaX + 3 * safeScale, teaY - 8 * safeScale, 8 * safeScale, 2 * safeScale);

    // Animated rising tea steam wisps
    const steamFloat = ((safeTime * 0.015) % 8) * safeScale;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
    ctx.lineWidth = Math.max(1, 1.2 * safeScale);
    ctx.beginPath();
    ctx.moveTo(teaX + 5 * safeScale, teaY - 11 * safeScale - steamFloat * 0.3);
    ctx.quadraticCurveTo(teaX + 8 * safeScale, teaY - 16 * safeScale - steamFloat * 0.6, teaX + 5 * safeScale, teaY - 21 * safeScale - steamFloat);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Draws an architectural CAD blueprint overlay (scale calibration bar, N/E/S/W compass rose,
   * drafting frame ticks) strictly for Chalkboard Only mode.
   */
  public static renderChalkboardBlueprintOverlay(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    lineHex: string,
    facingDirection: string
  ): void {
    ctx.save();
    ctx.strokeStyle = lineHex;
    ctx.fillStyle = lineHex;

    // 1. Subtle Blueprint Grid & Outer Drafting Frame
    ctx.save();
    ctx.globalAlpha = 0.14;
    ctx.lineWidth = 1;
    for (let gx = 40; gx < width; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, height);
      ctx.stroke();
    }
    for (let gy = 40; gy < height; gy += 40) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(width, gy);
      ctx.stroke();
    }
    ctx.restore();

    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Edge ruler ticks
    for (let x = 40; x < width - 20; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 8);
      ctx.lineTo(x, 14);
      ctx.moveTo(x, height - 8);
      ctx.lineTo(x, height - 14);
      ctx.stroke();
    }

    // 2. Compass Rose (Top-Right)
    const cx = width - 40;
    const cy = 42;
    const r = 16;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - r - 3);
    ctx.lineTo(cx, cy + r + 3);
    ctx.moveTo(cx - r - 3, cy);
    ctx.lineTo(cx + r + 3, cy);
    ctx.stroke();

    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillText("N", cx, cy - r - 5);
    ctx.fillText("S", cx, cy + r + 11);
    ctx.fillText("W", cx - r - 8, cy + 3);
    ctx.fillText("E", cx + r + 8, cy + 3);

    const dir = (facingDirection || "North").toLowerCase();
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    if (dir === "east") ctx.lineTo(cx + r - 3, cy);
    else if (dir === "west") ctx.lineTo(cx - r + 3, cy);
    else if (dir === "south") ctx.lineTo(cx, cy + r - 3);
    else ctx.lineTo(cx, cy - r + 3);
    ctx.stroke();

    // 3. Blueprint Scale Bar (Bottom-Left)
    const sbX = 18;
    const sbY = height - 20;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(sbX, sbY - 5);
    ctx.lineTo(sbX, sbY);
    ctx.lineTo(sbX + 100, sbY);
    ctx.lineTo(sbX + 100, sbY - 5);
    ctx.moveTo(sbX + 50, sbY - 3);
    ctx.lineTo(sbX + 50, sbY);
    ctx.stroke();

    ctx.font = "bold 9px monospace";
    ctx.textAlign = "left";
    ctx.fillText("0 ft        250 ft      500 ft [BLUEPRINT]", sbX, sbY - 8);

    ctx.restore();
  }
}
