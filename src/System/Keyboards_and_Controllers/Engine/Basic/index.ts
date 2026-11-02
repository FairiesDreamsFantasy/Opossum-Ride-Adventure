/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BASIC Input Combo Sequencer & Macro Step Engine
 */

export interface InputComboStep {
  step: number;
  expectedKey: string;
  maxDelayMs: number;
}

export class BasicInputComboSequencer {
  private steps: InputComboStep[] = [];

  public addStep(step: number, expectedKey: string, maxDelayMs: number = 500): void {
    this.steps.push({ step, expectedKey, maxDelayMs });
    this.steps.sort((a, b) => a.step - b.step);
  }

  public getSteps(): InputComboStep[] {
    return [...this.steps];
  }
}

export default BasicInputComboSequencer;
