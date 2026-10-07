/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - PHP Hash Bucketing & Zend Engine Emulations
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Zend hash buckets, key hashing indexes, and weak typing helpers
 */

export interface HashBucket<T> {
  key: string;
  value: T;
  next: HashBucket<T> | null;
}

/**
 * Emulates the Zend Engine's HashTable array layout.
 * PHP arrays are ordered maps represented internally as bucket-linked tables.
 */
export class PHPHashTable<T> {
  private buckets: Array<HashBucket<T> | null>;
  private size: number;
  private orderedKeys: string[] = [];

  constructor(capacity = 64) {
    this.buckets = new Array(capacity).fill(null);
    this.size = capacity;
  }

  /**
   * DJB2 String Hashing Algorithm used to distribute keys
   */
  private hashKey(key: string): number {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 33) + key.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % this.size;
  }

  public put(key: string, value: T): void {
    const index = this.hashKey(key);
    let bucket = this.buckets[index];

    // Check if key already exists, update value
    while (bucket !== null) {
      if (bucket.key === key) {
        bucket.value = value;
        return;
      }
      bucket = bucket.next;
    }

    // Insert new bucket at the head of the list (collision chain)
    const newBucket: HashBucket<T> = {
      key,
      value,
      next: this.buckets[index],
    };
    this.buckets[index] = newBucket;

    if (!this.orderedKeys.includes(key)) {
      this.orderedKeys.push(key);
    }
  }

  public get(key: string): T | null {
    const index = this.hashKey(key);
    let bucket = this.buckets[index];

    while (bucket !== null) {
      if (bucket.key === key) {
        return bucket.value;
      }
      bucket = bucket.next;
    }
    return null;
  }

  public keys(): string[] {
    return this.orderedKeys;
  }
}

/**
 * Emulates PHP's loose type coercion equations.
 */
export function phpLooseCoercion(val1: any, val2: any): number {
  const parseNumeric = (v: any): number => {
    if (typeof v === "number") return v;
    if (typeof v === "boolean") return v ? 1.0 : 0.0;
    if (typeof v === "string") {
      const parsed = parseFloat(v);
      return isNaN(parsed) ? 0.0 : parsed;
    }
    return 0.0;
  };

  return parseNumeric(val1) + parseNumeric(val2);
}
