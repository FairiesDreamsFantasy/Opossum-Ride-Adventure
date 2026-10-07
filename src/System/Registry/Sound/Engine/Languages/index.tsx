/**
 * Opossum Ride Adventure - Sound Computer Languages Registry
 * License: Apache-2.0 / Scientific Sound Registry Standard
 */

import { SoundLanguagesRegistryGeneral, SoundLanguageMetadata } from "./General";
import SoundEngine, {
  AudioDSPMathEngine,
  KotlinSoundTrackState,
  Holophonic4DEngine,
  PHPSoundManifestSerializer,
  RSoundStatisticalEngine,
  RustSoundRingBuffer,
  SQLSoundQueryEngine,
  SwiftAudioEngineBridge,
  XMLSoundMixGraphParser,
  CSVSoundTableParser
} from "../../../../Sound/Engine";
import * as SoundAssembly from "../../../../Sound/Engine/Assembly";
import * as Python from "../../../../Sound/Engine/Python";

export class SoundLanguagesRegistry {
  public static readonly Engine = SoundEngine;
  public static readonly DSP = AudioDSPMathEngine;
  public static readonly Holophonic4D = Holophonic4DEngine;
  public static readonly Assembly = SoundAssembly;
  public static readonly CSV = CSVSoundTableParser;
  public static readonly Cotlin = KotlinSoundTrackState;
  public static readonly PHP = PHPSoundManifestSerializer;
  public static readonly Python = Python;
  public static readonly R = RSoundStatisticalEngine;
  public static readonly Rust = RustSoundRingBuffer;
  public static readonly SQL = SQLSoundQueryEngine;
  public static readonly Swift = SwiftAudioEngineBridge;
  public static readonly XML = XMLSoundMixGraphParser;

  public static getMetadata(): typeof SoundLanguagesRegistryGeneral {
    return SoundLanguagesRegistryGeneral;
  }

  public static listAllLanguages(): SoundLanguageMetadata[] {
    return SoundLanguagesRegistryGeneral.languages;
  }

  public static getLanguageById(id: string): SoundLanguageMetadata | undefined {
    return SoundLanguagesRegistryGeneral.languages.find(l => l.id === id);
  }

  public static getEngineByLanguageId(id: string): any {
    switch (id) {
      case "dsp": return this.DSP;
      case "holophonic_4d": return this.Holophonic4D;
      case "assembly": return this.Assembly;
      case "csv": return this.CSV;
      case "cotlin": return this.Cotlin;
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
    audioTargets: string[];
    enginesActive: boolean;
    timestamp: number;
  } {
    const langs = this.listAllLanguages();
    const targets = Array.from(new Set(langs.map(l => l.audioTarget)));
    return {
      totalLanguages: langs.length,
      deterministicCount: langs.filter(l => l.deterministic).length,
      audioTargets: targets,
      enginesActive: true,
      timestamp: Date.now()
    };
  }
}

export {
  SoundLanguagesRegistryGeneral,
  SoundEngine,
  AudioDSPMathEngine,
  SoundAssembly,
  CSVSoundTableParser,
  KotlinSoundTrackState,
  Holophonic4DEngine,
  PHPSoundManifestSerializer,
  Python,
  RSoundStatisticalEngine,
  RustSoundRingBuffer,
  SQLSoundQueryEngine,
  SwiftAudioEngineBridge,
  XMLSoundMixGraphParser
};

export type { SoundLanguageMetadata };
export default SoundLanguagesRegistry;
