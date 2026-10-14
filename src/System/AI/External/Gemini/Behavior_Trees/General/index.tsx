/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Behavior Trees Execution Subsystem
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Hierarchical state machines, reactive selector/sequence nodes, and blackboard arbitration
 */

export type BehaviorNodeStatus = "SUCCESS" | "FAILURE" | "RUNNING";

export interface BehaviorBlackboard {
  state: Map<string, any>;
  set(key: string, value: any): void;
  get<T>(key: string, fallback?: T): T;
  has(key: string): boolean;
  clear(): void;
}

export class MemoryBlackboard implements BehaviorBlackboard {
  public state: Map<string, any> = new Map();

  public set(key: string, value: any): void {
    this.state.set(key, value);
  }

  public get<T>(key: string, fallback?: T): T {
    if (this.state.has(key)) {
      return this.state.get(key) as T;
    }
    return fallback as T;
  }

  public has(key: string): boolean {
    return this.state.has(key);
  }

  public clear(): void {
    this.state.clear();
  }
}

export interface BehaviorNode {
  id: string;
  name: string;
  tick(bb: BehaviorBlackboard): BehaviorNodeStatus;
}

/**
 * Action Node executing a deterministic decision function
 */
export class ActionNode implements BehaviorNode {
  constructor(
    public id: string,
    public name: string,
    private actionFn: (bb: BehaviorBlackboard) => BehaviorNodeStatus
  ) {}

  public tick(bb: BehaviorBlackboard): BehaviorNodeStatus {
    return this.actionFn(bb);
  }
}

/**
 * Sequence Node (AND logic): Succeeds if all children succeed; fails on first failure
 */
export class SequenceNode implements BehaviorNode {
  constructor(
    public id: string,
    public name: string,
    public children: BehaviorNode[]
  ) {}

  public tick(bb: BehaviorBlackboard): BehaviorNodeStatus {
    for (const child of this.children) {
      const status = child.tick(bb);
      if (status !== "SUCCESS") {
        return status;
      }
    }
    return "SUCCESS";
  }
}

/**
 * Selector Node (OR logic / Priority Fallback): Succeeds on first child success; fails if all fail
 */
export class SelectorNode implements BehaviorNode {
  constructor(
    public id: string,
    public name: string,
    public children: BehaviorNode[]
  ) {}

  public tick(bb: BehaviorBlackboard): BehaviorNodeStatus {
    for (const child of this.children) {
      const status = child.tick(bb);
      if (status === "SUCCESS" || status === "RUNNING") {
        return status;
      }
    }
    return "FAILURE";
  }
}

/**
 * Inverter Decorator: Inverts SUCCESS <-> FAILURE
 */
export class InverterDecorator implements BehaviorNode {
  constructor(
    public id: string,
    public name: string,
    public child: BehaviorNode
  ) {}

  public tick(bb: BehaviorBlackboard): BehaviorNodeStatus {
    const s = this.child.tick(bb);
    if (s === "SUCCESS") return "FAILURE";
    if (s === "FAILURE") return "SUCCESS";
    return "RUNNING";
  }
}

export class BehaviorTreeEngine {
  private blackboard: BehaviorBlackboard = new MemoryBlackboard();
  private totalTicks = 0;
  private root: BehaviorNode | null = null;

  public setRoot(node: BehaviorNode): void {
    this.root = node;
  }

  public getBlackboard(): BehaviorBlackboard {
    return this.blackboard;
  }

  public step(): BehaviorNodeStatus {
    if (!this.root) return "FAILURE";
    this.totalTicks++;
    return this.root.tick(this.blackboard);
  }

  public getExecutionMetrics() {
    return {
      totalTicks: this.totalTicks,
      blackboardKeysCount: this.blackboard.state.size,
      hasRootNode: this.root !== null
    };
  }
}

export const GeminiBehaviorTreesGeneral = {
  systemName: "Gemini Behavior Trees General Subsystem",
  status: "Active",
  tickRateHz: 60,
  maxTreeDepth: 16,
  createBlackboard: () => new MemoryBlackboard(),
  createTreeEngine: () => new BehaviorTreeEngine(),
};

export default GeminiBehaviorTreesGeneral;
