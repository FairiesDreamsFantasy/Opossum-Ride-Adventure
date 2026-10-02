/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class HighContrastManager {
  private static instance: HighContrastManager;
  private isHighContrast: boolean = false;

  private constructor() {}

  public static getInstance(): HighContrastManager {
    if (!HighContrastManager.instance) {
      HighContrastManager.instance = new HighContrastManager();
    }
    return HighContrastManager.instance;
  }

  public toggleHighContrast(): boolean {
    this.isHighContrast = !this.isHighContrast;
    if (typeof document !== "undefined") {
      if (this.isHighContrast) {
        document.documentElement.classList.add("high-contrast-mode");
      } else {
        document.documentElement.classList.remove("high-contrast-mode");
      }
    }
    return this.isHighContrast;
  }

  public isEnabled(): boolean {
    return this.isHighContrast;
  }
}

export const HighContrast = HighContrastManager.getInstance();
