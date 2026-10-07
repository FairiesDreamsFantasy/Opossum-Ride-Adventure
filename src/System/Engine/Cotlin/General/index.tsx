/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Kotlin Immutable Data Classes & Scope Dispatchers
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Kotlin Coroutine Dispatch contexts, immutable models, and flow streams
 */

/**
 * Emulates Kotlin's immutable 'data class' with automatic copy construct capability.
 */
export class KotlinDataClass<T extends Record<string, any>> {
  protected properties: Readonly<T>;

  constructor(props: T) {
    this.properties = Object.freeze({ ...props });
  }

  public copy(changes: Partial<T>): this {
    const updatedProps = { ...this.properties, ...changes };
    return new (this.constructor as any)(updatedProps);
  }

  public getProps(): Readonly<T> {
    return this.properties;
  }
}

export interface CoroutineContext {
  name: string;
  isCompleted: boolean;
}

/**
 * Emulates a basic Kotlin Coroutine Scope & Dispatcher context.
 */
export class KotlinCoroutineScope {
  private activeJobs: CoroutineContext[] = [];

  public launch(jobName: string, block: () => void): CoroutineContext {
    const job: CoroutineContext = {
      name: jobName,
      isCompleted: false,
    };
    this.activeJobs.push(job);

    // Run block asynchronously, analogous to launching in a coroutine thread
    setTimeout(() => {
      try {
        block();
      } finally {
        job.isCompleted = true;
      }
    }, 0);

    return job;
  }

  public getActiveJobsCount(): number {
    return this.activeJobs.filter(j => !j.isCompleted).length;
  }
}
