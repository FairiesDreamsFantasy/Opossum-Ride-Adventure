/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI jQuery Chained Contexts & Easing
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Chained contexts, event listeners, and easing animation frames
 */

export interface SpatialEntityRecord {
  id: string;
  className: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isJumping: boolean;
  velocity_x: number;
  velocity_y: number;
}

export type EventCallback = (event: { type: string; target: SpatialEntityRecord }) => void;

/**
 * Emulates the chained collection wrapper returned by jQuery ($(...)).
 */
export class SpatialSelectorSet {
  private entities: SpatialEntityRecord[] = [];
  private static globalEvents: Map<string, Array<{ selector: string; callback: EventCallback }>> = new Map();

  constructor(entities: SpatialEntityRecord[]) {
    this.entities = entities;
  }

  public getEntities(): SpatialEntityRecord[] {
    return this.entities;
  }

  public length(): number {
    return this.entities.length;
  }

  /**
   * Chained CSS-style filter matching attributes or classNames
   */
  public filter(selector: string): SpatialSelectorSet {
    if (selector.startsWith(".")) {
      const className = selector.slice(1);
      return new SpatialSelectorSet(this.entities.filter(e => e.className === className));
    }
    if (selector.startsWith("[")) {
      // Attribute selection: [attr='val']
      const content = selector.slice(1, -1);
      const [attr, rawVal] = content.split("=");
      const val = rawVal ? rawVal.replace(/['"]/g, "") : "";
      
      return new SpatialSelectorSet(this.entities.filter(e => {
        const actual = (e as any)[attr];
        return String(actual) === val;
      }));
    }
    return this;
  }

  /**
   * Chained action setting dynamic velocities
   */
  public applyVelocity(vx: number, vy: number): this {
    for (const e of this.entities) {
      e.velocity_x = vx;
      e.velocity_y = vy;
    }
    return this;
  }

  /**
   * jQuery-style Event binding using event delegation on spatial nodes
   */
  public on(event: string, selector: string, callback: EventCallback): this {
    let list = SpatialSelectorSet.globalEvents.get(event);
    if (!list) {
      list = [];
      SpatialSelectorSet.globalEvents.set(event, list);
    }
    list.push({ selector, callback });
    return this;
  }

  /**
   * Triggers a simulated spatial event on the selected items
   */
  public trigger(event: string): this {
    const list = SpatialSelectorSet.globalEvents.get(event);
    if (!list) return this;

    for (const e of this.entities) {
      for (const handler of list) {
        // Simple class or tag matching
        const matchesClass = handler.selector.startsWith(".") && e.className === handler.selector.slice(1);
        const matchesTag = handler.selector === e.className || handler.selector === "*";

        if (matchesClass || matchesTag) {
          handler.callback({ type: event, target: e });
        }
      }
    }
    return this;
  }
}

/**
 * Calculates cubic bezier coordinates for visual animations easing curves.
 * Formula: B(t) = (1-t)^3*P0 + 3(1-t)^2*t*P1 + 3(1-t)*t^2*P2 + t^3*P3
 */
export function cubicBezierEase(t: number, p1: number, p2: number): number {
  const p0 = 0.0;
  const p3 = 1.0;
  const mt = 1.0 - t;
  
  return (mt * mt * mt * p0) + 
         (3.0 * mt * mt * t * p1) + 
         (3.0 * mt * t * t * p2) + 
         (t * t * t * p3);
}
