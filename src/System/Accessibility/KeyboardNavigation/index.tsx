/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class KeyboardNavigationManager {
  private static instance: KeyboardNavigationManager;
  private focusVisible: boolean = true;

  private constructor() {}

  public static getInstance(): KeyboardNavigationManager {
    if (!KeyboardNavigationManager.instance) {
      KeyboardNavigationManager.instance = new KeyboardNavigationManager();
    }
    return KeyboardNavigationManager.instance;
  }

  public setFocusVisible(visible: boolean): void {
    this.focusVisible = visible;
  }

  public isFocusVisible(): boolean {
    return this.focusVisible;
  }
}

export const KeyboardNavigation = KeyboardNavigationManager.getInstance();
