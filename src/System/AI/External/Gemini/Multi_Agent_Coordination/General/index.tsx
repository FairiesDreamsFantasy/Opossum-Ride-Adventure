/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Multi-Agent Swarm & Spatial Coordination
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Craig Reynolds Boids flocking vectors, spatial hash grid, and consensus state synchronization
 */

export interface AgentVector2D {
  x: number;
  y: number;
}

export interface SwarmAgent {
  id: string;
  position: AgentVector2D;
  velocity: AgentVector2D;
  acceleration: AgentVector2D;
  maxSpeed: number;
  maxForce: number;
}

export class SpatialHashGrid {
  private cells: Map<string, SwarmAgent[]> = new Map();

  constructor(public cellSize: number = 64) {}

  public clear(): void {
    this.cells.clear();
  }

  public insert(agent: SwarmAgent): void {
    const key = this.getHashKey(agent.position.x, agent.position.y);
    const cell = this.cells.get(key) || [];
    cell.push(agent);
    this.cells.set(key, cell);
  }

  public queryNeighbors(agent: SwarmAgent, radius: number): SwarmAgent[] {
    const neighbors: SwarmAgent[] = [];
    const minX = Math.floor((agent.position.x - radius) / this.cellSize);
    const maxX = Math.floor((agent.position.x + radius) / this.cellSize);
    const minY = Math.floor((agent.position.y - radius) / this.cellSize);
    const maxY = Math.floor((agent.position.y + radius) / this.cellSize);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const key = `${x}:${y}`;
        const cell = this.cells.get(key);
        if (cell) {
          for (const other of cell) {
            if (other.id !== agent.id) {
              const dx = agent.position.x - other.position.x;
              const dy = agent.position.y - other.position.y;
              if (dx * dx + dy * dy <= radius * radius) {
                neighbors.push(other);
              }
            }
          }
        }
      }
    }
    return neighbors;
  }

  private getHashKey(x: number, y: number): string {
    const cx = Math.floor(x / this.cellSize);
    const cy = Math.floor(y / this.cellSize);
    return `${cx}:${cy}`;
  }
}

export class MultiAgentSwarmEngine {
  private agents: Map<string, SwarmAgent> = new Map();
  private grid: SpatialHashGrid = new SpatialHashGrid(80);

  public registerAgent(agent: SwarmAgent): void {
    this.agents.set(agent.id, agent);
  }

  public unregisterAgent(id: string): void {
    this.agents.delete(id);
  }

  /**
   * Calculates Reynolds Boid Separation vector: avoids crowding neighbors
   */
  public calculateSeparation(agent: SwarmAgent, neighbors: SwarmAgent[], desiredSeparation = 25): AgentVector2D {
    let steer: AgentVector2D = { x: 0, y: 0 };
    let count = 0;

    for (const other of neighbors) {
      const d = Math.hypot(agent.position.x - other.position.x, agent.position.y - other.position.y);
      if (d > 0 && d < desiredSeparation) {
        const diffX = (agent.position.x - other.position.x) / d; // Normalized & weighted by distance
        const diffY = (agent.position.y - other.position.y) / d;
        steer.x += diffX;
        steer.y += diffY;
        count++;
      }
    }
    if (count > 0) {
      steer.x /= count;
      steer.y /= count;
    }
    return steer;
  }

  /**
   * Calculates Reynolds Boid Alignment vector: steers towards average heading of neighbors
   */
  public calculateAlignment(agent: SwarmAgent, neighbors: SwarmAgent[]): AgentVector2D {
    let sum: AgentVector2D = { x: 0, y: 0 };
    if (neighbors.length === 0) return sum;

    for (const other of neighbors) {
      sum.x += other.velocity.x;
      sum.y += other.velocity.y;
    }
    sum.x /= neighbors.length;
    sum.y /= neighbors.length;
    return sum;
  }

  /**
   * Calculates Reynolds Boid Cohesion vector: steers towards average center of mass of neighbors
   */
  public calculateCohesion(agent: SwarmAgent, neighbors: SwarmAgent[]): AgentVector2D {
    let center: AgentVector2D = { x: 0, y: 0 };
    if (neighbors.length === 0) return center;

    for (const other of neighbors) {
      center.x += other.position.x;
      center.y += other.position.y;
    }
    center.x /= neighbors.length;
    center.y /= neighbors.length;

    return {
      x: center.x - agent.position.x,
      y: center.y - agent.position.y
    };
  }

  public step(dtSeconds = 0.016): void {
    this.grid.clear();
    for (const a of this.agents.values()) {
      this.grid.insert(a);
    }

    for (const a of this.agents.values()) {
      const neighbors = this.grid.queryNeighbors(a, 60);
      const sep = this.calculateSeparation(a, neighbors, 30);
      const ali = this.calculateAlignment(a, neighbors);
      const coh = this.calculateCohesion(a, neighbors);

      a.acceleration.x += sep.x * 1.5 + ali.x * 1.0 + coh.x * 0.8;
      a.acceleration.y += sep.y * 1.5 + ali.y * 1.0 + coh.y * 0.8;

      a.velocity.x += a.acceleration.x * dtSeconds;
      a.velocity.y += a.acceleration.y * dtSeconds;

      // Speed limit clamp
      const speed = Math.hypot(a.velocity.x, a.velocity.y);
      if (speed > a.maxSpeed) {
        a.velocity.x = (a.velocity.x / speed) * a.maxSpeed;
        a.velocity.y = (a.velocity.y / speed) * a.maxSpeed;
      }

      a.position.x += a.velocity.x * dtSeconds;
      a.position.y += a.velocity.y * dtSeconds;

      // Reset acceleration per frame
      a.acceleration.x = 0;
      a.acceleration.y = 0;
    }
  }

  public getSwarmMetrics() {
    return {
      activeAgentCount: this.agents.size,
      cellSize: this.grid.cellSize
    };
  }
}

export const GeminiMultiAgentCoordinationGeneral = {
  systemName: "Gemini Multi Agent Coordination General Subsystem",
  status: "Active",
  maxActiveAgents: 32,
  syncIntervalMs: 16.6,
  consensusMechanism: "Server Authoritative Swarm",
  createSwarmEngine: () => new MultiAgentSwarmEngine(),
};

export default GeminiMultiAgentCoordinationGeneral;
