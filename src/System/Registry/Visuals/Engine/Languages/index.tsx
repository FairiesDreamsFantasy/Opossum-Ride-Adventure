/**
 * Opossum Ride Adventure - Visuals Computer Languages Registry
 * License: Apache-2.0 / Scientific Visual Registry Standard
 */

import { VisualsLanguagesRegistryGeneral, VisualLanguageMetadata } from "./General";
import VisualEngine, {
  ThreeDJSMathEngine,
  KotlinSpatialState,
  JavaVisualSceneTree,
  PHPAssociativeSceneSerializer,
  RStatisticalVisualEngine,
  RustVisualSafeBuffer,
  RelationalSceneGraphQueryEngine,
  SwiftVisualGeometryBridge,
  XMLVisualLayoutParser,
  NonEuclideanRenderer
} from "../../../../Visuals/Engine";
import * as Assembly from "../../../../Visuals/Engine/Assembly";
import * as Python from "../../../../Visuals/Engine/Python";
import { BasicVisualSequencer } from "../../../../Visuals/Engine/Basic";

export class VisualsLanguagesRegistry {
  public static readonly Engine = VisualEngine;
  public static readonly ThreeDJS = ThreeDJSMathEngine;
  public static readonly Assembly = Assembly;
  public static readonly Basic = BasicVisualSequencer;
  public static readonly Cotlin = KotlinSpatialState;
  public static readonly Java = JavaVisualSceneTree;
  public static readonly PHP = PHPAssociativeSceneSerializer;
  public static readonly Python = Python;
  public static readonly R = RStatisticalVisualEngine;
  public static readonly Rust = RustVisualSafeBuffer;
  public static readonly SQL = RelationalSceneGraphQueryEngine;
  public static readonly Swift = SwiftVisualGeometryBridge;
  public static readonly XML = XMLVisualLayoutParser;
  public static readonly NonEuclideanRenderer = NonEuclideanRenderer;

  public static getMetadata(): typeof VisualsLanguagesRegistryGeneral {
    return VisualsLanguagesRegistryGeneral;
  }

  public static listAllLanguages(): VisualLanguageMetadata[] {
    return VisualsLanguagesRegistryGeneral.languages;
  }

  public static getLanguageById(id: string): VisualLanguageMetadata | undefined {
    return VisualsLanguagesRegistryGeneral.languages.find(l => l.id === id);
  }

  public static getEngineByLanguageId(id: string): any {
    switch (id) {
      case "3djs": return this.ThreeDJS;
      case "assembly": return this.Assembly;
      case "basic": return this.Basic;
      case "cotlin": return this.Cotlin;
      case "java": return this.Java;
      case "php": return this.PHP;
      case "python": return this.Python;
      case "r": return this.R;
      case "rust": return this.Rust;
      case "sql": return this.SQL;
      case "swift": return this.Swift;
      case "xml": return this.XML;
      default: return undefined;
    }
  }

  public static runDiagnosticAudit(): {
    totalLanguages: number;
    deterministicCount: number;
    renderTargets: string[];
    enginesActive: boolean;
    timestamp: number;
  } {
    const langs = this.listAllLanguages();
    const targets = Array.from(new Set(langs.map(l => l.renderTarget)));
    return {
      totalLanguages: langs.length,
      deterministicCount: langs.filter(l => l.deterministic).length,
      renderTargets: targets,
      enginesActive: true,
      timestamp: Date.now()
    };
  }
}

export {
  VisualsLanguagesRegistryGeneral,
  VisualEngine,
  ThreeDJSMathEngine,
  Assembly,
  BasicVisualSequencer,
  KotlinSpatialState,
  JavaVisualSceneTree,
  PHPAssociativeSceneSerializer,
  Python,
  RStatisticalVisualEngine,
  RustVisualSafeBuffer,
  RelationalSceneGraphQueryEngine,
  SwiftVisualGeometryBridge,
  XMLVisualLayoutParser,
  NonEuclideanRenderer
};

export type { VisualLanguageMetadata };
export default VisualsLanguagesRegistry;
