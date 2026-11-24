/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimalItem } from "../../types";
import { getGoatCameoById } from "./index";

/**
 * Renders a Caprine Cameo (16 Core Goats or Juvenile Kids) in 2D top-down/orthographic view.
 * Strictly respects coat color, pattern (spotted/tricolor/dappled/bicolor), horn specs,
 * and grazing head-dip animation.
 */
export function drawGoatCameo2D(
  ctx: CanvasRenderingContext2D,
  screenX: number,
  screenY: number,
  animal: AnimalItem
): void {
  const cameo = getGoatCameoById(animal.goatId);
  const pal = cameo.palette;
  const isKid = Boolean(animal.isKid || cameo.ageClass === "kid");
  const sc = cameo.dimensions.renderScale;
  const headDip = animal.headDip ?? 0;
  const grazeBob = headDip > 0.25 ? Math.sin(animal.grazePhase || 0) * 1.4 : 0;

  ctx.save();

  // Optional wooden climbing platform / grassy knoll marker underneath perched goats
  if (animal.onRamp || (animal.heightOffset || 0) > 0.3) {
    ctx.fillStyle = "#92400E";
    ctx.fillRect(screenX - 13 * sc, screenY - 9 * sc, 26 * sc, 18 * sc);
    ctx.strokeStyle = "#78350F";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(screenX - 13 * sc, screenY - 9 * sc, 26 * sc, 18 * sc);
  }

  // Torso oval
  ctx.fillStyle = pal.coatPrimary;
  ctx.strokeStyle = pal.coatSecondary;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.ellipse(screenX, screenY, 10 * sc, 6.5 * sc, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Pattern markings (Freckles spots, Patches tri-color, Willow dappled, Alpine two-tone)
  if (pal.pattern === "spotted" || pal.pattern === "dappled") {
    ctx.fillStyle = pal.coatMarkings || pal.coatSecondary;
    ctx.beginPath();
    ctx.arc(screenX - 3 * sc, screenY - 1 * sc, 1.8 * sc, 0, Math.PI * 2);
    ctx.arc(screenX + 3.5 * sc, screenY + 1.5 * sc, 1.6 * sc, 0, Math.PI * 2);
    ctx.arc(screenX + 1 * sc, screenY - 2.5 * sc, 1.4 * sc, 0, Math.PI * 2);
    ctx.fill();
  } else if (pal.pattern === "tricolor") {
    ctx.fillStyle = pal.coatSecondary;
    ctx.beginPath();
    ctx.arc(screenX - 3.5 * sc, screenY - 1 * sc, 3.2 * sc, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = pal.coatMarkings || "#1F2937";
    ctx.beginPath();
    ctx.arc(screenX + 3.5 * sc, screenY + 1 * sc, 2.8 * sc, 0, Math.PI * 2);
    ctx.fill();
  } else if (pal.pattern === "bicolor_alpine") {
    ctx.fillStyle = pal.coatSecondary;
    ctx.beginPath();
    ctx.ellipse(screenX + 3 * sc, screenY, 4.5 * sc, 5.5 * sc, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Head extending slightly downward when grazing
  const headY = screenY - (6.5 + headDip * 2.2) * sc + grazeBob;
  ctx.fillStyle = pal.coatPrimary;
  ctx.beginPath();
  ctx.arc(screenX, headY, (isKid ? 3.8 : 4.6) * sc, 0, Math.PI * 2);
  ctx.fill();

  // Horns (respects hornStyle === "none" on Shadow/Sprout)
  if (pal.hornStyle !== "none" && pal.hornColorHex) {
    ctx.strokeStyle = pal.hornColorHex;
    ctx.lineWidth = pal.hornStyle === "curved_ram" ? 2.1 : 1.5;
    const hLen = pal.hornStyle === "budding" || pal.hornStyle === "kid_nub" ? 2.5 * sc : 4.8 * sc;
    ctx.beginPath();
    ctx.moveTo(screenX - 2.5 * sc, headY - 2 * sc);
    ctx.lineTo(screenX - 4.5 * sc, headY - 2 * sc - hLen);
    ctx.moveTo(screenX + 2.5 * sc, headY - 2 * sc);
    ctx.lineTo(screenX + 4.5 * sc, headY - 2 * sc - hLen);
    ctx.stroke();
  }

  // Eyes
  ctx.fillStyle = pal.eyeColorHex;
  ctx.beginPath();
  ctx.arc(screenX - 1.6 * sc, headY - 0.8 * sc, 1.0 * sc, 0, Math.PI * 2);
  ctx.arc(screenX + 1.6 * sc, headY - 0.8 * sc, 1.0 * sc, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Renders a Caprine Cameo (16 Core Goats or Juvenile Kids) in 3D perspective pasture view.
 * Draws wooden climbing ramps / grassy knolls underneath elevated goats,
 * authentic body dimensions, coat patterns, horns (or hornless Shadow), eyes,
 * and grazing head-dip / chewing animation.
 */
export function drawGoatCameo3D(
  ctx: CanvasRenderingContext2D,
  projX: number,
  projY: number,
  projScale: number,
  animal: AnimalItem,
  showIndicatorLabels: boolean = false
): void {
  const cameo = getGoatCameoById(animal.goatId);
  const pal = cameo.palette;
  const isKid = Boolean(animal.isKid || cameo.ageClass === "kid");
  const sc = projScale * 0.15 * cameo.dimensions.renderScale;

  const headDip = animal.headDip ?? 0;
  const grazeBob = headDip > 0.25 ? Math.sin(animal.grazePhase || 0) * 2.2 * sc : 0;
  const tailWag = Math.sin(Date.now() * 0.006 + animal.id) * 2.2 * sc;
  const facingDir = (animal.herdSide || ((animal.xOffset || 0) < 0 ? "left" : "right")) === "left" ? 1 : -1;

  ctx.save();

  // If perched on a wooden climbing ramp or pasture knoll, draw it cleanly beneath hooves
  if (animal.onRamp || (animal.heightOffset || 0) > 0.3) {
    const platW = 46 * sc;
    const platH = 12 * sc;
    // Wooden ramp / pasture deck
    ctx.fillStyle = "#92400E";
    ctx.beginPath();
    ctx.moveTo(projX - platW * 0.65, projY + 12 * sc);
    ctx.lineTo(projX - platW * 0.35, projY + 5 * sc);
    ctx.lineTo(projX + platW * 0.45, projY + 5 * sc);
    ctx.lineTo(projX + platW * 0.45, projY + 5 * sc + platH);
    ctx.lineTo(projX - platW * 0.65, projY + 12 * sc + platH);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#451A03";
    ctx.lineWidth = Math.max(1, 1.5 * sc);
    ctx.stroke();

    // Ramp planks
    ctx.fillStyle = "#B45309";
    ctx.fillRect(projX - platW * 0.35, projY + 4 * sc, platW * 0.8, 3.2 * sc);
  }

  // Orient facing inward toward herd center / slight angle toward path
  ctx.translate(projX, projY);
  ctx.scale(facingDir, 1);

  // 4 Nimble Caprine Legs & Cloven Hooves
  const legSwing = animal.state === "trotting" ? Math.sin(Date.now() * 0.012 + animal.id) * 3.5 * sc : 0;
  ctx.fillStyle = pal.coatSecondary;
  ctx.fillRect(-13 * sc + legSwing, 2 * sc, 3.4 * sc, 10 * sc);
  ctx.fillRect(-7 * sc - legSwing * 0.6, 3 * sc, 3.2 * sc, 9.5 * sc);
  ctx.fillRect(5 * sc - legSwing, 2.5 * sc, 3.4 * sc, 9.8 * sc);
  ctx.fillRect(10 * sc + legSwing * 0.6, 2 * sc, 3.2 * sc, 10 * sc);

  // Cloven hooves
  ctx.fillStyle = pal.hoofColor;
  ctx.fillRect(-13.3 * sc + legSwing, 10.5 * sc, 4 * sc, 2.5 * sc);
  ctx.fillRect(-7.3 * sc - legSwing * 0.6, 11 * sc, 3.8 * sc, 2.4 * sc);
  ctx.fillRect(4.7 * sc - legSwing, 10.8 * sc, 4 * sc, 2.5 * sc);
  ctx.fillRect(9.7 * sc + legSwing * 0.6, 10.5 * sc, 3.8 * sc, 2.5 * sc);

  // Torso (Barrel + lighter belly)
  ctx.fillStyle = pal.coatPrimary;
  ctx.beginPath();
  ctx.ellipse(0, -3 * sc, 18 * sc, 10.5 * sc, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = pal.bellyColor;
  ctx.beginPath();
  ctx.ellipse(0, 3 * sc, 13 * sc, 4.5 * sc, 0, 0, Math.PI);
  ctx.fill();

  // Coat Patterns
  if (pal.pattern === "spotted" || pal.pattern === "dappled") {
    ctx.fillStyle = pal.coatMarkings || pal.coatSecondary;
    ctx.beginPath();
    ctx.arc(-6 * sc, -5 * sc, 2.8 * sc, 0, Math.PI * 2);
    ctx.arc(3 * sc, -7 * sc, 2.4 * sc, 0, Math.PI * 2);
    ctx.arc(7 * sc, -2 * sc, 2.6 * sc, 0, Math.PI * 2);
    ctx.arc(-1 * sc, -1 * sc, 2.0 * sc, 0, Math.PI * 2);
    ctx.fill();
  } else if (pal.pattern === "tricolor") {
    ctx.fillStyle = pal.coatSecondary;
    ctx.beginPath();
    ctx.ellipse(-7 * sc, -4 * sc, 6.5 * sc, 6 * sc, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = pal.coatMarkings || "#1F2937";
    ctx.beginPath();
    ctx.ellipse(6 * sc, -3 * sc, 5.8 * sc, 5.5 * sc, 0.25, 0, Math.PI * 2);
    ctx.fill();
  } else if (pal.pattern === "bicolor_alpine") {
    ctx.fillStyle = pal.coatSecondary;
    ctx.beginPath();
    ctx.ellipse(-8 * sc, -3 * sc, 9 * sc, 9.5 * sc, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Upward curled caprine tail
  ctx.strokeStyle = pal.coatSecondary;
  ctx.lineWidth = Math.max(1.5, 3 * sc);
  ctx.beginPath();
  ctx.moveTo(-17 * sc, -7 * sc);
  ctx.quadraticCurveTo(-21 * sc, -13 * sc + tailWag, -18 * sc, -16 * sc + tailWag * 0.5);
  ctx.stroke();

  // Neck & Head with smooth Grazing Head-Dip kinematics
  const headCenterX = (17 + headDip * 4.5) * sc;
  const headCenterY = (-13 + headDip * 14.5) * sc + grazeBob;

  ctx.strokeStyle = pal.coatPrimary;
  ctx.lineWidth = Math.max(3, 8.5 * sc);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(12 * sc, -6 * sc);
  ctx.lineTo(headCenterX - 2 * sc, headCenterY + 2 * sc);
  ctx.stroke();

  // Head Skull & Tapered Goat Muzzle
  ctx.fillStyle = pal.coatPrimary;
  ctx.beginPath();
  ctx.ellipse(headCenterX, headCenterY, 7.2 * sc, 5.8 * sc, headDip * 0.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = pal.muzzleColor;
  ctx.beginPath();
  ctx.ellipse(
    headCenterX + 5.8 * sc,
    headCenterY + (1.6 + headDip * 2.0) * sc,
    4.2 * sc,
    3.0 * sc,
    headDip * 0.4,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Goat Chin Beard (subtle on adults, fuller on bucks)
  if (!isKid) {
    ctx.fillStyle = pal.coatSecondary;
    ctx.beginPath();
    ctx.moveTo(headCenterX + 4 * sc, headCenterY + 3.5 * sc);
    ctx.lineTo(headCenterX + (cameo.gender === "male" ? 7.5 : 5.5) * sc, headCenterY + (cameo.gender === "male" ? 10 : 7.5) * sc);
    ctx.lineTo(headCenterX + 1.5 * sc, headCenterY + 4.5 * sc);
    ctx.closePath();
    ctx.fill();
  }

  // Expressive Goat Ears
  ctx.fillStyle = pal.earOuter;
  ctx.beginPath();
  ctx.ellipse(headCenterX - 4.2 * sc, headCenterY - 2.5 * sc, 4.6 * sc, 2.0 * sc, -0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = pal.earInner;
  ctx.beginPath();
  ctx.ellipse(headCenterX - 4.0 * sc, headCenterY - 2.3 * sc, 3.0 * sc, 1.1 * sc, -0.45, 0, Math.PI * 2);
  ctx.fill();

  // Horns (Curved Ram, Standard, Budding, Kid Nubs, or None for Shadow)
  if (pal.hornStyle !== "none" && pal.hornColorHex) {
    ctx.strokeStyle = pal.hornColorHex;
    ctx.lineCap = "round";
    if (pal.hornStyle === "curved_ram") {
      ctx.lineWidth = Math.max(2, 3.6 * sc);
      ctx.beginPath();
      ctx.moveTo(headCenterX - 1 * sc, headCenterY - 4.5 * sc);
      ctx.bezierCurveTo(
        headCenterX - 8 * sc,
        headCenterY - 15 * sc,
        headCenterX - 13 * sc,
        headCenterY - 4 * sc,
        headCenterX - 7 * sc,
        headCenterY - 1 * sc
      );
      ctx.stroke();
    } else if (pal.hornStyle === "budding" || pal.hornStyle === "kid_nub") {
      ctx.lineWidth = Math.max(1.4, 2.2 * sc);
      ctx.beginPath();
      ctx.moveTo(headCenterX - 1 * sc, headCenterY - 4.5 * sc);
      ctx.lineTo(headCenterX - 3.2 * sc, headCenterY - 8.2 * sc);
      ctx.stroke();
    } else {
      ctx.lineWidth = Math.max(1.8, 2.8 * sc);
      ctx.beginPath();
      ctx.moveTo(headCenterX - 1 * sc, headCenterY - 4.5 * sc);
      ctx.quadraticCurveTo(headCenterX - 5.5 * sc, headCenterY - 13 * sc, headCenterX - 8.5 * sc, headCenterY - 14.5 * sc);
      ctx.stroke();
    }
  }

  // Eye (authentic eyeColor + horizontal caprine pupil)
  ctx.fillStyle = pal.eyeColorHex;
  ctx.beginPath();
  ctx.arc(headCenterX + 2.2 * sc, headCenterY - 1.2 * sc, 1.7 * sc, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0F172A";
  ctx.fillRect(headCenterX + 1.3 * sc, headCenterY - 1.5 * sc, 1.8 * sc, 0.7 * sc);

  // Subtle name label only when indicator tags are explicitly enabled
  const relDist = Math.abs(animal.z);
  if (showIndicatorLabels && projScale > 1.8 && sc > 0.32 && relDist > 0) {
    ctx.scale(facingDir, 1); // unflip text
    ctx.fillStyle = "rgba(15, 23, 42, 0.68)";
    ctx.font = `600 ${Math.max(9, Math.round(10 * Math.min(1.4, sc)))}px sans-serif`;
    ctx.textAlign = "center";
    const label = isKid ? `${cameo.name} (Kid)` : cameo.name;
    ctx.fillText(label, 0, -24 * sc);
  }

  ctx.restore();
}
