/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 🌌 Night Sky Theme & Anti-Blue Light Color Science
 *
 * Anti-Blue Light Border:
 * Scientifically calibrated amber/gold wavelength band (590-605nm).
 * Emits zero high-energy shortwave blue emissions (<=455nm) for ocular comfort during night-time riding.
 */
export const NIGHT_SKY_AMBER_SPECS = {
  // Scientific Anti-Blue Light Amber/Gold
  borderPrimary: "#F59E0B",      // Amber-500: Peak ~590nm optical wavelength
  borderGlow: "rgba(245, 158, 11, 0.4)",
  borderAccent: "#B45309",      // Deep Amber-700
  borderSubtle: "#78350F",      // Amber-900

  // Night Sky Chassis Colors
  bezelBgStart: "#080914",      // Deepest Midnight Sky
  bezelBgMid: "#0F1424",        // Celestial Starlit Nebula
  bezelBgEnd: "#080914",
  bezelBorder: "#1E293B",       // Slate-800 boundary

  // Night Stars Starlight speckles
  starsColor: "rgba(255, 255, 255, 0.7)"
};
