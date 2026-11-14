/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class FoyerNarrationCSharp {
  private state: string = "IDLE";
  public transition(event: string): string {
    if (event === "speak") this.state = "SPEAKING";
    else if (event === "complete") this.state = "IDLE";
    return this.state;
  }
}
