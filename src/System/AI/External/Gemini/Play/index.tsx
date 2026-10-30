/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiPlayBooks, GeminiPlayBooksModal } from "./Books";

export * from "./Books";

export class GeminiPlaySubsystem {
  public readonly Books = GeminiPlayBooks;
}

export const GeminiPlay = new GeminiPlaySubsystem();
