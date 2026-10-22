/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Python Data Frames & Scientific Modeling Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Column selections, list slicing, NumPy statistics, and linear regression
 */

import React from "react";
import { PythonDataFrame, PythonMathUtils } from "./General";
import { EngineTelemetryHUD } from "../Components/TelemetryHUD";

export class GeminiPythonEngine {
  private activeFrame: PythonDataFrame = { columns: [], rows: [] };

  public loadDataFrame(columns: string[], rows: Array<Record<string, number | string>>): void {
    this.activeFrame = { columns, rows };
  }

  /**
   * Simulates Python list slicing: list[start:stop:step]
   */
  public sliceList<T>(list: T[], start?: number, stop?: number, step = 1): T[] {
    const listLen = list.length;
    const begin = start !== undefined ? (start < 0 ? listLen + start : start) : 0;
    const end = stop !== undefined ? (stop < 0 ? listLen + stop : stop) : listLen;
    const result: T[] = [];
    for (let i = begin; i < end; i += step) {
      if (i >= 0 && i < listLen) {
        result.push(list[i]);
      }
    }
    return result;
  }

  /**
   * Simulates pandas GroupBy and aggregation mean: df.groupby("col").mean()
   */
  public groupByMean(groupByCol: string, numericCol: string): Map<string, number> {
    const groups: Map<string, number[]> = new Map();
    for (const row of this.activeFrame.rows) {
      const key = String(row[groupByCol] || "default");
      const val = Number(row[numericCol] || 0);
      const list = groups.get(key) || [];
      list.push(val);
      groups.set(key, list);
    }
    const resultMean: Map<string, number> = new Map();
    for (const [key, values] of groups.entries()) {
      resultMean.set(key, PythonMathUtils.calculateMean(values));
    }
    return resultMean;
  }

  /**
   * Computes Pearson correlation coefficient between two numeric vectors
   * r = sum((x - mean_x) * (y - mean_y)) / sqrt(sum((x - mean_x)^2) * sum((y - mean_y)^2))
   */
  public calculatePearsonCorrelation(xCol: string, yCol: string): number {
    const xVals: number[] = [];
    const yVals: number[] = [];
    for (const row of this.activeFrame.rows) {
      if (typeof row[xCol] === "number" && typeof row[yCol] === "number") {
        xVals.push(row[xCol] as number);
        yVals.push(row[yCol] as number);
      }
    }
    const n = xVals.length;
    if (n < 2) return 0;

    const meanX = xVals.reduce((a, b) => a + b, 0) / n;
    const meanY = yVals.reduce((a, b) => a + b, 0) / n;

    let numerator = 0;
    let denomX = 0;
    let denomY = 0;

    for (let i = 0; i < n; i++) {
      const diffX = xVals[i] - meanX;
      const diffY = yVals[i] - meanY;
      numerator += diffX * diffY;
      denomX += diffX * diffX;
      denomY += diffY * diffY;
    }

    const denominator = Math.sqrt(denomX * denomY);
    if (denominator === 0) return 0;
    return Number((numerator / denominator).toFixed(6));
  }

  /**
   * Performs Ordinary Least Squares (OLS) linear regression: y = slope * x + intercept
   */
  public calculateLinearRegression(xCol: string, yCol: string): { slope: number; intercept: number; rSquared: number } {
    const r = this.calculatePearsonCorrelation(xCol, yCol);
    const xVals = this.activeFrame.rows.map(r => Number(r[xCol] || 0));
    const yVals = this.activeFrame.rows.map(r => Number(r[yCol] || 0));
    const n = xVals.length;
    if (n < 2) return { slope: 0, intercept: 0, rSquared: 0 };

    const meanX = xVals.reduce((a, b) => a + b, 0) / n;
    const meanY = yVals.reduce((a, b) => a + b, 0) / n;

    let stdX = 0;
    let stdY = 0;
    for (let i = 0; i < n; i++) {
      stdX += Math.pow(xVals[i] - meanX, 2);
      stdY += Math.pow(yVals[i] - meanY, 2);
    }
    stdX = Math.sqrt(stdX / (n - 1));
    stdY = Math.sqrt(stdY / (n - 1));

    if (stdX === 0) return { slope: 0, intercept: meanY, rSquared: 0 };

    const slope = r * (stdY / stdX);
    const intercept = meanY - slope * meanX;
    return {
      slope: Number(slope.toFixed(6)),
      intercept: Number(intercept.toFixed(6)),
      rSquared: Number((r * r).toFixed(6))
    };
  }

  /**
   * Computes mathematical quantiles (e.g. median, p25, p75, p99)
   */
  public calculateQuantile(column: string, q: number): number {
    const vals = this.activeFrame.rows
      .map(r => Number(r[column]))
      .filter(v => !isNaN(v))
      .sort((a, b) => a - b);
    if (vals.length === 0) return 0;
    const clampedQ = Math.max(0, Math.min(1, q));
    const index = (vals.length - 1) * clampedQ;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    return Number((vals[lower] * (1 - weight) + vals[upper] * weight).toFixed(4));
  }
}

export const GeminiPythonEngineComponent: React.FC = () => {
  return <EngineTelemetryHUD moduleName="GeminiPythonEngine" />;
};
