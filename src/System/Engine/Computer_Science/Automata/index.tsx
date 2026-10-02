/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Deterministic Finite Automaton (DFA) / Finite State Machine.
 */
export class FiniteStateMachine<TState extends string, TEvent extends string> {
  private currentState: TState;
  private transitions: Map<string, TState> = new Map();

  constructor(initialState: TState) {
    this.currentState = initialState;
  }

  public addTransition(from: TState, event: TEvent, to: TState): this {
    this.transitions.set(`${from}:${event}`, to);
    return this;
  }

  public handleEvent(event: TEvent): TState {
    const key = `${this.currentState}:${event}`;
    const next = this.transitions.get(key);
    if (next) {
      this.currentState = next;
    }
    return this.currentState;
  }

  public getState(): TState {
    return this.currentState;
  }
}

/**
 * Markov Chain Transition Matrix Engine.
 */
export class MarkovChainEngine {
  /**
   * Computes state distribution after k discrete steps:
   * v_k = v_0 * P^k
   */
  public static transitionKSteps(initialVector: number[], transitionMatrix: number[][], steps: number): number[] {
    let current = [...initialVector];
    const n = current.length;

    for (let s = 0; s < steps; s++) {
      const next = new Array(n).fill(0);
      for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
          next[j] += current[i] * transitionMatrix[i][j];
        }
      }
      current = next;
    }
    return current;
  }
}

/**
 * Lindenmayer System (L-System) for procedural generation of botanicals, vines, and terrain patterns
 * with ZERO heavy textures or pre-baked meshes.
 */
export class LSystemEngine {
  /**
   * Evaluates an L-System by iteratively applying string rewriting rules.
   */
  public static generate(axiom: string, rules: Record<string, string>, iterations: number): string {
    let current = axiom;
    for (let iter = 0; iter < iterations; iter++) {
      let next = "";
      for (let i = 0; i < current.length; i++) {
        const char = current[i];
        next += rules[char] !== undefined ? rules[char] : char;
      }
      current = next;
    }
    return current;
  }

  /**
   * Interprets L-System turtle string to generate 2D vector path segments.
   * F: Move forward and draw line
   * +: Turn right by angle
   * -: Turn left by angle
   * [: Push state (branch)
   * ]: Pop state (return to branch point)
   */
  public static interpretTurtle(
    instructions: string,
    stepLength: number,
    angleRad: number
  ): { lines: { x1: number; y1: number; x2: number; y2: number }[] } {
    let x = 0;
    let y = 0;
    let currentAngle = -Math.PI / 2; // Upwards
    const stack: { x: number; y: number; angle: number }[] = [];
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

    for (let i = 0; i < instructions.length; i++) {
      const cmd = instructions[i];
      if (cmd === "F") {
        const nx = x + stepLength * Math.cos(currentAngle);
        const ny = y + stepLength * Math.sin(currentAngle);
        lines.push({ x1: x, y1: y, x2: nx, y2: ny });
        x = nx;
        y = ny;
      } else if (cmd === "+") {
        currentAngle += angleRad;
      } else if (cmd === "-") {
        currentAngle -= angleRad;
      } else if (cmd === "[") {
        stack.push({ x, y, angle: currentAngle });
      } else if (cmd === "]") {
        const state = stack.pop();
        if (state) {
          x = state.x;
          y = state.y;
          currentAngle = state.angle;
        }
      }
    }

    return { lines };
  }
}
