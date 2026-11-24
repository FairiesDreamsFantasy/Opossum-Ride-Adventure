/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Crafted Building Block Sign: Grand Tea Room Wall Sign (Manor 1st Floor - Floor Foyer West Wall)
 * - Size: 48 inches x 48 inches (4 ft x 4 ft)
 * - Border: 1 cm thick Gold (#D4AF37)
 * - Background: Black (#000000)
 * - Artwork: Rainbow design of a teacup inside a saucer
 * - Text: "Grand Tea Room"
 * - Placement: West Wall (X = 0), 984 ft to 988 ft from South Wall (24 in left of the 990-1010 ft doors),
 *   placed 12 ft from the floor (bottom at 12 ft, top at 16 ft).
 */

export interface PhysicalWallSignSpec {
  readonly id: string;
  readonly label: string;
  readonly locationArena: string;
  readonly wall: "North" | "South" | "East" | "West";
  readonly mountType: "wall" | "post";
  readonly widthInches: number;
  readonly heightInches: number;
  readonly widthFeet: number;
  readonly heightFeet: number;
  readonly borderThicknessCm: number;
  readonly borderThicknessInches: number;
  readonly borderThicknessFeet: number;
  readonly borderColor: string;
  readonly backgroundColor: string;
  readonly motif: "rainbow_teacup_in_saucer";
  readonly startFromSouthFeet: number;
  readonly endFromSouthFeet: number;
  readonly gapLeftOfDoorInches: number;
  readonly elevationBottomFeet: number;
  readonly elevationTopFeet: number;
}

const CM_PER_INCH = 2.54;
const INCHES_PER_FOOT = 12;
const CM_PER_FOOT = CM_PER_INCH * INCHES_PER_FOOT; // 30.48 cm/ft

export const GRAND_TEA_ROOM_SIGN_SPEC: PhysicalWallSignSpec = {
  id: "grand_tea_room_wall_sign",
  label: "Grand Tea Room",
  locationArena: "Manor 1st Floor - Floor Foyer West Wall",
  wall: "West",
  mountType: "wall",
  widthInches: 48,
  heightInches: 48,
  widthFeet: 48 / INCHES_PER_FOOT, // 4 ft
  heightFeet: 48 / INCHES_PER_FOOT, // 4 ft
  borderThicknessCm: 1,
  borderThicknessInches: 1 / CM_PER_INCH,
  borderThicknessFeet: 1 / CM_PER_FOOT,
  borderColor: "#D4AF37",
  backgroundColor: "#000000",
  motif: "rainbow_teacup_in_saucer",
  startFromSouthFeet: 984,
  endFromSouthFeet: 988,
  gapLeftOfDoorInches: 24,
  elevationBottomFeet: 12,
  elevationTopFeet: 16
};

const RAINBOW_SPECTRUM_STOPS: ReadonlyArray<{ offset: number; color: string }> = [
  { offset: 0.0, color: "#ef4444" },
  { offset: 0.17, color: "#f97316" },
  { offset: 0.34, color: "#eab308" },
  { offset: 0.51, color: "#22c55e" },
  { offset: 0.68, color: "#3b82f6" },
  { offset: 0.84, color: "#6366f1" },
  { offset: 1.0, color: "#a855f7" }
];

/**
 * Draws the 48" x 48" Grand Tea Room crafted sign on a wall in 3D or blueprint space.
 */
export function drawGrandTeaRoomSign(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  widthPx: number,
  heightPx: number,
  wireframe: boolean,
  showText = true
): void {
  if (!Number.isFinite(widthPx) || !Number.isFinite(heightPx) || widthPx < 2 || heightPx < 2) {
    return;
  }

  ctx.save();

  // 1 cm border converted accurately to sign pixel ratio (1 cm / 121.92 cm total width), with crisp min floor
  const borderFraction = GRAND_TEA_ROOM_SIGN_SPEC.borderThicknessFeet / GRAND_TEA_ROOM_SIGN_SPEC.widthFeet;
  const borderPx = Math.max(1.5, widthPx * borderFraction);

  // Black background panel
  ctx.fillStyle = wireframe ? "rgba(0, 0, 0, 0.25)" : GRAND_TEA_ROOM_SIGN_SPEC.backgroundColor;
  ctx.fillRect(x, y, widthPx, heightPx);

  // 1 cm Gold Border
  ctx.strokeStyle = wireframe ? "#4ade80" : GRAND_TEA_ROOM_SIGN_SPEC.borderColor;
  ctx.lineWidth = borderPx;
  ctx.strokeRect(x + borderPx * 0.5, y + borderPx * 0.5, widthPx - borderPx, heightPx - borderPx);

  // Inner fine gold trim line for crafted museum finish
  if (widthPx >= 18) {
    ctx.strokeStyle = wireframe ? "#86efac" : "#fde047";
    ctx.lineWidth = Math.max(0.75, borderPx * 0.45);
    const inset = borderPx + Math.max(1.5, widthPx * 0.03);
    ctx.strokeRect(x + inset, y + inset, widthPx - inset * 2, heightPx - inset * 2);
  }

  // Rainbow Teacup inside Saucer Artwork (centered in upper 66% of the plaque)
  const cx = x + widthPx * 0.5;
  const artCenterY = y + heightPx * 0.44;
  const s = Math.min(widthPx, heightPx);

  // Rainbow gradient spanning across cup and saucer
  const rainbowGrad = ctx.createLinearGradient(cx - s * 0.32, artCenterY - s * 0.22, cx + s * 0.32, artCenterY + s * 0.18);
  RAINBOW_SPECTRUM_STOPS.forEach((stop) => rainbowGrad.addColorStop(stop.offset, stop.color));

  // Gentle Rainbow Steam Wisps rising from teacup
  if (s >= 14) {
    ctx.strokeStyle = wireframe ? "#86efac" : rainbowGrad;
    ctx.lineWidth = Math.max(1, s * 0.025);
    [-0.08, 0.0, 0.08].forEach((offsetRatio, idx) => {
      const sx = cx + offsetRatio * s;
      const syBottom = artCenterY - s * 0.15;
      const syTop = artCenterY - s * (0.26 + (idx === 1 ? 0.04 : 0.01));
      ctx.beginPath();
      ctx.moveTo(sx, syBottom);
      ctx.quadraticCurveTo(sx + s * 0.03, (syBottom + syTop) * 0.5, sx - s * 0.01, syTop);
      ctx.stroke();
    });
  }

  // Teacup Handle on the right side
  ctx.strokeStyle = wireframe ? "#4ade80" : rainbowGrad;
  ctx.lineWidth = Math.max(1.2, s * 0.045);
  ctx.beginPath();
  ctx.arc(cx + s * 0.16, artCenterY - s * 0.01, s * 0.07, -Math.PI * 0.45, Math.PI * 0.45);
  ctx.stroke();

  // Teacup Bowl sitting inside the Saucer
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.17, artCenterY - s * 0.12);
  ctx.lineTo(cx + s * 0.17, artCenterY - s * 0.12);
  ctx.bezierCurveTo(
    cx + s * 0.16,
    artCenterY + s * 0.10,
    cx - s * 0.16,
    artCenterY + s * 0.10,
    cx - s * 0.17,
    artCenterY - s * 0.12
  );
  ctx.closePath();
  if (!wireframe) {
    ctx.fillStyle = rainbowGrad;
    ctx.fill();
  }
  ctx.strokeStyle = wireframe ? "#4ade80" : "#fde047";
  ctx.lineWidth = Math.max(0.8, s * 0.018);
  ctx.stroke();

  // Tea Rim & Liquid Accent
  if (!wireframe && s >= 14) {
    ctx.fillStyle = "#1c1917";
    ctx.beginPath();
    ctx.ellipse(cx, artCenterY - s * 0.12, s * 0.155, s * 0.028, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rainbow Saucer cradling the teacup base
  ctx.beginPath();
  ctx.ellipse(cx, artCenterY + s * 0.085, s * 0.27, s * 0.055, 0, 0, Math.PI * 2);
  if (!wireframe) {
    ctx.fillStyle = rainbowGrad;
    ctx.fill();
  }
  ctx.strokeStyle = wireframe ? "#4ade80" : "#fef08a";
  ctx.lineWidth = Math.max(0.8, s * 0.02);
  ctx.stroke();

  // Inner saucer well ring
  if (s >= 16) {
    ctx.strokeStyle = wireframe ? "#86efac" : "#000000";
    ctx.lineWidth = Math.max(0.6, s * 0.012);
    ctx.beginPath();
    ctx.ellipse(cx, artCenterY + s * 0.075, s * 0.14, s * 0.025, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Inscription: "Grand Tea Room"
  if (showText && widthPx >= 18) {
    const fontSize = Math.max(6, Math.min(18, Math.floor(s * 0.125)));
    ctx.font = `bold ${fontSize}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = wireframe ? "#86efac" : "#fde047";
    ctx.fillText(GRAND_TEA_ROOM_SIGN_SPEC.label, cx, y + heightPx * 0.80, widthPx * 0.86);
  }

  ctx.restore();
}

export const GrandTeaRoomSign = {
  spec: GRAND_TEA_ROOM_SIGN_SPEC,
  draw: drawGrandTeaRoomSign
};

export default GrandTeaRoomSign;
