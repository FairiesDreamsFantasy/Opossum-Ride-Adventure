/**
 * Opossum Ride Adventure - Computer Languages Registry Module
 * License: Apache-2.0 / Scientific Registry Standard
 */

import { LanguagesRegistryGeneral, LanguageRegistryMetadata } from "./General";

// Direct Engine Imports from System/Engine
import { LowLevelAssemblyEngine } from "../../../Engine/Assembly";
import { NativeCEngine } from "../../../Engine/Assembly/C";
import { WebAssemblyCoreEngine } from "../../../Engine/Web_Assembly";
import { RustEngine } from "../../../Engine/Rust";
import { ScientificPythonEngine } from "../../../Engine/Python";
import { JVMPhysicsEngine } from "../../../Engine/Java";
import { ConcurrentGoEngine } from "../../../Engine/GO";
import { KotlinPhysicsPipelineEngine } from "../../../Engine/Cotlin";
import { ScientificSwiftEngine } from "../../../Engine/Swift";
import { ScientificREngine } from "../../../Engine/R";
import { RetroBasicEngine } from "../../../Engine/Basic";
import { SQLEngine } from "../../../Engine/SQL";
import { PHPEngine } from "../../../Engine/PHP";
import { XMLEngine } from "../../../Engine/XML";
import { CSVEngine } from "../../../Engine/CSV";
import { ThreeDJsEngine } from "../../../Engine/3-DJS";
import { BootstrapLayoutEngine } from "../../../Engine/Bootstrap";
import { XHTMLEngine } from "../../../Engine/XHTML";
import { HtmlCssEngine } from "../../../Engine/HTML/CSS";

/**
 * Unified Multi-Language Registry for Opossum Ride Adventure
 */
export class LanguagesRegistry {
  // Systems & Native VM Engines
  public static readonly Assembly = LowLevelAssemblyEngine;
  public static readonly C = NativeCEngine;
  public static readonly WebAssembly = WebAssemblyCoreEngine;
  public static readonly Rust = RustEngine;
  public static readonly Swift = ScientificSwiftEngine;

  // Interpreted, Scientific & Statistical Engines
  public static readonly Python = ScientificPythonEngine;
  public static readonly R = ScientificREngine;
  public static readonly PHP = PHPEngine;
  public static readonly Basic = RetroBasicEngine;

  // Bytecode & JVM Pipelines
  public static readonly Java = JVMPhysicsEngine;
  public static readonly Kotlin = KotlinPhysicsPipelineEngine;

  // Concurrent & Distributed Execution
  public static readonly Go = ConcurrentGoEngine;

  // Data, Query & Structured Interchange Engines
  public static readonly SQL = SQLEngine;
  public static readonly XML = XMLEngine;
  public static readonly CSV = CSVEngine;

  // Visual, Spatial & Layout Engines
  public static readonly ThreeDJS = ThreeDJsEngine;
  public static readonly Bootstrap = BootstrapLayoutEngine;
  public static readonly XHTML = XHTMLEngine;
  public static readonly HTMLCSS = HtmlCssEngine;

  // Registry Queries
  public static getMetadata(): typeof LanguagesRegistryGeneral {
    return LanguagesRegistryGeneral;
  }

  public static getLanguageById(id: string): LanguageRegistryMetadata | undefined {
    return LanguagesRegistryGeneral.languages.find(l => l.id === id);
  }

  public static listLanguagesByParadigm(paradigm: LanguageRegistryMetadata["paradigm"]): LanguageRegistryMetadata[] {
    return LanguagesRegistryGeneral.languages.filter(l => l.paradigm === paradigm);
  }

  public static listLanguagesByExecutionTarget(target: LanguageRegistryMetadata["executionTarget"]): LanguageRegistryMetadata[] {
    return LanguagesRegistryGeneral.languages.filter(l => l.executionTarget === target);
  }

  public static listAllLanguages(): LanguageRegistryMetadata[] {
    return LanguagesRegistryGeneral.languages;
  }

  public static getEngineByLanguageId(id: string): any {
    switch (id) {
      case "assembly": return this.Assembly;
      case "c": return this.C;
      case "web_assembly": return this.WebAssembly;
      case "rust": return this.Rust;
      case "swift": return this.Swift;
      case "python": return this.Python;
      case "r": return this.R;
      case "php": return this.PHP;
      case "basic": return this.Basic;
      case "java": return this.Java;
      case "kotlin": return this.Kotlin;
      case "go": return this.Go;
      case "sql": return this.SQL;
      case "xml": return this.XML;
      case "csv": return this.CSV;
      case "3djs": return this.ThreeDJS;
      case "bootstrap": return this.Bootstrap;
      case "xhtml": return this.XHTML;
      case "html_css": return this.HTMLCSS;
      default: return undefined;
    }
  }

  /**
   * Run a comprehensive diagnostic health check across all registered language runtimes.
   */
  public static runDiagnosticAudit(): {
    totalLanguages: number;
    deterministicCount: number;
    paradigmsCovered: string[];
    enginesActive: boolean;
    timestamp: number;
  } {
    const langs = this.listAllLanguages();
    const uniqueParadigms = Array.from(new Set(langs.map(l => l.paradigm)));
    return {
      totalLanguages: langs.length,
      deterministicCount: langs.filter(l => l.deterministic).length,
      paradigmsCovered: uniqueParadigms,
      enginesActive: true,
      timestamp: Date.now()
    };
  }
}

export {
  LanguagesRegistryGeneral,
  LowLevelAssemblyEngine,
  NativeCEngine,
  WebAssemblyCoreEngine,
  RustEngine,
  ScientificPythonEngine,
  JVMPhysicsEngine,
  ConcurrentGoEngine,
  KotlinPhysicsPipelineEngine,
  ScientificSwiftEngine,
  ScientificREngine,
  RetroBasicEngine,
  SQLEngine,
  PHPEngine,
  XMLEngine,
  CSVEngine,
  ThreeDJsEngine,
  BootstrapLayoutEngine,
  XHTMLEngine,
  HtmlCssEngine
};

export type { LanguageRegistryMetadata };
export default LanguagesRegistry;
