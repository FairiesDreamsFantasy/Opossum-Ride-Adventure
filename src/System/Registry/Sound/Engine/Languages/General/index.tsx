/**
 * Opossum Ride Adventure - Sound Computer Languages Registry General Specifications
 * License: Apache-2.0 / Scientific Sound Registry Standard
 */

export interface SoundLanguageMetadata {
  id: string;
  name: string;
  category: "DSP" | "Systems" | "Interpreted" | "Bytecode" | "Statistical" | "Relational" | "Declarative" | "Spatial";
  audioTarget: "WebAudio-Oscillator" | "Buffer-Stream" | "Spatial-4D" | "Track-Timeline" | "Telemetry-Analytics";
  description: string;
  primaryUse: string;
  deterministic: boolean;
}

export const SoundLanguagesRegistryGeneral = {
  name: "Opossum Ride Sound Multi-Language Registry",
  version: "1.0.0-scientific",
  precisionStandard: "75,000,000,000%",
  languages: [
    {
      id: "dsp",
      name: "Audio DSP Math Frequency Engine",
      category: "DSP",
      audioTarget: "WebAudio-Oscillator",
      description: "Mathematical sine-wave synthesis, biquad filter calculus, and audio frequency sweep envelopes.",
      primaryUse: "Real-time procedural opossum chatter synthesis and audio spectrum processing.",
      deterministic: true
    },
    {
      id: "holophonic_4d",
      name: "Holophonic 4D Spatial Audio Engine",
      category: "Spatial",
      audioTarget: "Spatial-4D",
      description: "4D vector sound field positioning, HRTF acoustic modeling, and binaural phase delays.",
      primaryUse: "360-degree spatial sound localization and surface reflection dynamics.",
      deterministic: true
    },
    {
      id: "assembly",
      name: "Low-Level Sound Assembly Engine",
      category: "Systems",
      audioTarget: "Buffer-Stream",
      description: "Direct PCM sample buffer bit-shifting, integer sample synthesis, and low-latency audio pipes.",
      primaryUse: "Raw audio buffer mixing and deterministic waveform sample playback.",
      deterministic: true
    },
    {
      id: "csv",
      name: "CSV Sound Table Data Parser",
      category: "Declarative",
      audioTarget: "Track-Timeline",
      description: "Tabular frequency track definitions, pitch tables, and note duration sequences.",
      primaryUse: "Melody and SFX event tables parsed into deterministic audio timelines.",
      deterministic: true
    },
    {
      id: "cotlin",
      name: "Kotlin Sound Track State Manager",
      category: "Bytecode",
      audioTarget: "Track-Timeline",
      description: "Null-safe audio track lifecycle management and coroutine-like sound event triggers.",
      primaryUse: "Concurrent BGM track crossfades and sound state transitions.",
      deterministic: true
    },
    {
      id: "php",
      name: "PHP Sound Manifest Serializer",
      category: "Interpreted",
      audioTarget: "Track-Timeline",
      description: "Audio bank serialization, sound event dictionary encoding, and acoustic metadata.",
      primaryUse: "Sound pack manifest generation and audio profile formatting.",
      deterministic: true
    },
    {
      id: "python",
      name: "Scientific Python Audio Simulation Engine",
      category: "Interpreted",
      audioTarget: "Telemetry-Analytics",
      description: "Fast Fourier Transform (FFT) modeling, spectral density calculations, and harmonic ratios.",
      primaryUse: "Mathematical harmonic verification and acoustic resonance modeling.",
      deterministic: true
    },
    {
      id: "r",
      name: "R Statistical Audio Variance Engine",
      category: "Statistical",
      audioTarget: "Telemetry-Analytics",
      description: "Loudness variance analysis, dynamic range compression modeling, and acoustic regression.",
      primaryUse: "Audio peak balance verification and perceived loudness analytics.",
      deterministic: true
    },
    {
      id: "rust",
      name: "Rust Safe Audio Ring Buffer",
      category: "Systems",
      audioTarget: "Buffer-Stream",
      description: "Lock-free circular audio ring buffers and zero-allocation sample streaming.",
      primaryUse: "Thread-safe real-time audio playback without buffer underruns.",
      deterministic: true
    },
    {
      id: "sql",
      name: "Relational Sound Query Engine",
      category: "Relational",
      audioTarget: "Track-Timeline",
      description: "Relational querying of audio cue events, surface acoustic profiles, and sound triggers.",
      primaryUse: "Fast lookup of surface-specific footstep cues and character vocal profiles.",
      deterministic: true
    },
    {
      id: "swift",
      name: "Swift Audio Engine Bridge",
      category: "Systems",
      audioTarget: "WebAudio-Oscillator",
      description: "Protocol-oriented audio node routing and SIMD-accelerated volume envelope scaling.",
      primaryUse: "Audio channel bus routing and dynamic soundstage balancing.",
      deterministic: true
    },
    {
      id: "xml",
      name: "XML Sound Mix Graph Parser",
      category: "Declarative",
      audioTarget: "Track-Timeline",
      description: "Hierarchical audio mix graph parsing, audio bus hierarchies, and routing trees.",
      primaryUse: "Master mix hierarchies and environmental reverb bus schemas.",
      deterministic: true
    }
  ] as SoundLanguageMetadata[]
};
