/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Bootstrap Layout Grid Specifications
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: 12-column subdivisions, layout margins, padding rules, and breakpoint mappings
 */

export interface BootstrapLayoutBounds {
  width: number;
  height: number;
  x: number;
  y: number;
}

export type BootstrapBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export class GridBreakpointMatcher {
  public static matchBreakpoint(width: number): BootstrapBreakpoint {
    if (width < 576) return "xs";
    if (width < 768) return "sm";
    if (width < 992) return "md";
    if (width < 1200) return "lg";
    return "xl";
  }
}
