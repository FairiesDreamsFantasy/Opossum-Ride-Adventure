/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * General Input system utilities.
 */
export const InputGeneral = {
  /**
   * Translates raw events or state checks to action commands.
   */
  isValidAction: (action: string, activeActions: string[]): boolean => {
    return activeActions.includes(action);
  }
};
