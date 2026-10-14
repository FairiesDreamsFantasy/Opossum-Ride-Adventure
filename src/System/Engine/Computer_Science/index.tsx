/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlgorithmsEngine, PathResult, GridNode } from "./Algorithms";
import { SpatialHashGrid, PriorityQueue, DisjointSetUnion, RingBuffer } from "./Data_Structures";
import { InformationTheoryEngine, HuffmanNode } from "./Information_Theory";
import { FiniteStateMachine, MarkovChainEngine, LSystemEngine } from "./Automata";

/**
 * Master Computer Science Engine for Opossum Ride Adventure.
 * Aggregates deterministic algorithms, memory-efficient data structures,
 * information theory, and procedural automata.
 */
export class ComputerScienceEngine {
  public static algorithms = AlgorithmsEngine;
  public static dataStructures = {
    SpatialHashGrid,
    PriorityQueue,
    DisjointSetUnion,
    RingBuffer,
  };
  public static informationTheory = InformationTheoryEngine;
  public static automata = {
    FiniteStateMachine,
    MarkovChainEngine,
    LSystemEngine,
  };
}

export {
  AlgorithmsEngine,
  SpatialHashGrid,
  PriorityQueue,
  DisjointSetUnion,
  RingBuffer,
  InformationTheoryEngine,
  FiniteStateMachine,
  MarkovChainEngine,
  LSystemEngine
};

export type { PathResult, GridNode, HuffmanNode };
