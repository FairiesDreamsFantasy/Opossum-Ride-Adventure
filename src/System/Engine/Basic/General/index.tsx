/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Retro BASIC Procedural Line-Jumps & Lookup Tables
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Line numbering index, GOSUB stack frames, and fast fixed trig lookups
 */

export interface BasicStackFrame {
  gosubLine: number;
  returnToLine: number;
}

/**
 * Emulates procedural line numbering logic found in retro BASIC systems (e.g. GW-BASIC / QBasic).
 */
export class BasicExecutionEnvironment {
  private programLines: Map<number, string> = new Map();
  private gosubStack: BasicStackFrame[] = [];
  private currentLinePointerIndex = 0;
  private orderedLinesList: number[] = [];

  public registerLine(lineNumber: number, statement: string): void {
    this.programLines.set(lineNumber, statement);
    this.orderedLinesList = Array.from(this.programLines.keys()).sort((a, b) => a - b);
  }

  public getStatement(lineNumber: number): string | undefined {
    return this.programLines.get(lineNumber);
  }

  public getOrderedLines(): number[] {
    return this.orderedLinesList;
  }

  public gosubPush(gosubLine: number, returnToLine: number): void {
    this.gosubStack.push({ gosubLine, returnToLine });
  }

  public gosubPop(): BasicStackFrame {
    if (this.gosubStack.length === 0) {
      throw new Error("[BASIC Engine] Return without GOSUB error at current program index");
    }
    return this.gosubStack.pop()!;
  }

  public clear(): void {
    this.programLines.clear();
    this.gosubStack = [];
    this.orderedLinesList = [];
    this.currentLinePointerIndex = 0;
  }
}

/**
 * Procedural low-precision (360-degree integer lookup) trig tables.
 * Emulates vintage 8-bit math co-processor tables.
 */
export class BasicTrigTables {
  private static sinTable: Float32Array = new Float32Array(360);
  private static cosTable: Float32Array = new Float32Array(360);
  private static initialized = false;

  private static init(): void {
    for (let i = 0; i < 360; i++) {
      const rad = (i * Math.PI) / 180.0;
      BasicTrigTables.sinTable[i] = Math.sin(rad);
      BasicTrigTables.cosTable[i] = Math.cos(rad);
    }
    BasicTrigTables.initialized = true;
  }

  public static sinLookup(degree: number): number {
    if (!BasicTrigTables.initialized) BasicTrigTables.init();
    const normalizedDeg = Math.floor(Math.abs(degree)) % 360;
    return BasicTrigTables.sinTable[normalizedDeg] * (degree < 0 ? -1 : 1);
  }

  public static cosLookup(degree: number): number {
    if (!BasicTrigTables.initialized) BasicTrigTables.init();
    const normalizedDeg = Math.floor(Math.abs(degree)) % 360;
    return BasicTrigTables.cosTable[normalizedDeg];
  }
}
