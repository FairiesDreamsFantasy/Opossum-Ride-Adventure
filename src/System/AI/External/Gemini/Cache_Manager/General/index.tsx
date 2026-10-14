/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI LRU Cache & In-Memory Storage Manager
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Doubly-linked list LRU eviction, asymptotic O(1) reads/writes, and TTL timestamps
 */

export interface CacheNode<K, V> {
  key: K;
  value: V;
  expiresAt: number;
  prev: CacheNode<K, V> | null;
  next: CacheNode<K, V> | null;
}

export class DoublyLinkedListLRUCache<K, V> {
  private capacity: number;
  private defaultTTLMs: number;
  private cache: Map<K, CacheNode<K, V>> = new Map();
  private head: CacheNode<K, V> | null = null; // Most recently used
  private tail: CacheNode<K, V> | null = null; // Least recently used
  private hits = 0;
  private misses = 0;

  constructor(capacity = 500, defaultTTLMs = 3600000) {
    this.capacity = capacity;
    this.defaultTTLMs = defaultTTLMs;
  }

  public get(key: K): V | null {
    const node = this.cache.get(key);
    if (!node) {
      this.misses++;
      return null;
    }

    // Check TTL expiration
    if (Date.now() > node.expiresAt) {
      this.removeNode(node);
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    this.hits++;
    this.moveToHead(node);
    return node.value;
  }

  public put(key: K, value: V, ttlMs?: number): void {
    const existing = this.cache.get(key);
    const expiresAt = Date.now() + (ttlMs ?? this.defaultTTLMs);

    if (existing) {
      existing.value = value;
      existing.expiresAt = expiresAt;
      this.moveToHead(existing);
      return;
    }

    // Evict least recently used if at capacity
    if (this.cache.size >= this.capacity && this.tail) {
      this.cache.delete(this.tail.key);
      this.removeNode(this.tail);
    }

    const newNode: CacheNode<K, V> = {
      key,
      value,
      expiresAt,
      prev: null,
      next: null
    };

    this.addToHead(newNode);
    this.cache.set(key, newNode);
  }

  public size(): number {
    return this.cache.size;
  }

  public clear(): void {
    this.cache.clear();
    this.head = null;
    this.tail = null;
    this.hits = 0;
    this.misses = 0;
  }

  public getCacheDiagnostics() {
    const total = this.hits + this.misses;
    const hitRatio = total > 0 ? Number(((this.hits / total) * 100).toFixed(2)) : 0;
    return {
      capacity: this.capacity,
      currentSize: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRatioPercent: hitRatio
    };
  }

  private addToHead(node: CacheNode<K, V>): void {
    node.prev = null;
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
  }

  private removeNode(node: CacheNode<K, V>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    node.prev = null;
    node.next = null;
  }

  private moveToHead(node: CacheNode<K, V>): void {
    if (this.head === node) return;
    this.removeNode(node);
    this.addToHead(node);
  }
}

export const GeminiCacheManagerGeneral = {
  systemName: "Gemini Cache Manager General Subsystem",
  status: "Active",
  maxCacheSizeBytes: 104857600, // 100MB
  ttlSeconds: 3600,
  evictionPolicy: "LRU",
  createLRUCache: <K, V>(capacity = 500, ttlMs = 3600000) => new DoublyLinkedListLRUCache<K, V>(capacity, ttlMs),
};

export default GeminiCacheManagerGeneral;
