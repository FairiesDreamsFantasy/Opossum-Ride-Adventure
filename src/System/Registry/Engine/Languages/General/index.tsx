/**
 * Opossum Ride Adventure - Computer Languages Registry General Specifications
 * License: Apache-2.0 / Scientific Registry Standard
 */

export interface LanguageRegistryMetadata {
  id: string;
  name: string;
  version: string;
  paradigm: "Systems" | "Interpreted" | "Bytecode" | "Concurrent" | "Statistical" | "Imperative" | "Relational" | "Declarative" | "Markup" | "Graphics";
  executionTarget: "Native-WASM" | "V8-Engine" | "Sandbox-Interpreter" | "JVM-Pipeline" | "Goroutine-Scheduler" | "AST-Evaluator" | "DOM-Pipeline";
  description: string;
  primaryUse: string;
  deterministic: boolean;
}

export const LanguagesRegistryGeneral = {
  name: "Opossum Ride Master Computer Languages Registry",
  version: "1.0.0-scientific",
  precisionStandard: "75,000,000,000%",
  languages: [
    {
      id: "assembly",
      name: "Low-Level Machine Assembly",
      version: "x86_64/ARM64-v1.0",
      paradigm: "Systems",
      executionTarget: "Sandbox-Interpreter",
      description: "Direct register-level bytecode synthesis and hardware-level arithmetic operations.",
      primaryUse: "Ultra-low-latency register calculations and instruction verification.",
      deterministic: true
    },
    {
      id: "c",
      name: "Native C Engine",
      version: "C17-Scientific",
      paradigm: "Systems",
      executionTarget: "Sandbox-Interpreter",
      description: "Deterministic pointer mathematics, struct memory layout, and linear memory allocators.",
      primaryUse: "Direct memory management simulation and fast memory block transformation.",
      deterministic: true
    },
    {
      id: "web_assembly",
      name: "WebAssembly (WASM) Core Engine",
      version: "WASM-2.0",
      paradigm: "Systems",
      executionTarget: "Native-WASM",
      description: "Binary instruction format for stack-based virtual machine execution at near-native speed.",
      primaryUse: "High-performance vector operations, collision raycasting, and fast physics loops.",
      deterministic: true
    },
    {
      id: "rust",
      name: "Rust Memory-Safe Engine",
      version: "2024-Edition",
      paradigm: "Systems",
      executionTarget: "Native-WASM",
      description: "Zero-cost abstractions, fearless concurrency, and compile-time memory safety invariants.",
      primaryUse: "Thread-safe spatial hashing and strict lifecycle asset tracking.",
      deterministic: true
    },
    {
      id: "python",
      name: "Scientific Python Engine",
      version: "3.12-Scientific",
      paradigm: "Interpreted",
      executionTarget: "AST-Evaluator",
      description: "Vectorized array calculations, matrix transformations, and numerical simulation routines.",
      primaryUse: "Scientific analysis, algorithmic proof verification, and machine learning tensor models.",
      deterministic: true
    },
    {
      id: "java",
      name: "JVM Physics Engine (Java)",
      version: "OpenJDK-21",
      paradigm: "Bytecode",
      executionTarget: "JVM-Pipeline",
      description: "Object-oriented structural modeling, heap memory management, and bytecode pipeline execution.",
      primaryUse: "Physics sub-pipelines, entity component trees, and rigid body simulation.",
      deterministic: true
    },
    {
      id: "go",
      name: "Concurrent Go Engine",
      version: "Go-1.22",
      paradigm: "Concurrent",
      executionTarget: "Goroutine-Scheduler",
      description: "Lightweight CSP channels, non-blocking multiplexing, and concurrent task pipelines.",
      primaryUse: "Multi-threaded game loop scheduler and asynchronous event routing.",
      deterministic: true
    },
    {
      id: "kotlin",
      name: "Kotlin Physics Pipeline",
      version: "Kotlin-2.0",
      paradigm: "Bytecode",
      executionTarget: "JVM-Pipeline",
      description: "Null-safe functional pipelines, coroutine pipelines, and expressive data flow structures.",
      primaryUse: "Streamlined physics pipelines and reactive state transformation chains.",
      deterministic: true
    },
    {
      id: "swift",
      name: "Scientific Swift Engine",
      version: "Swift-6.0",
      paradigm: "Systems",
      executionTarget: "Sandbox-Interpreter",
      description: "Protocol-oriented programming, ARC memory reference modeling, and high-precision SIMD math.",
      primaryUse: "Spatial trajectory calculations and protocol-driven behavior orchestration.",
      deterministic: true
    },
    {
      id: "r",
      name: "Scientific R Statistics Engine",
      version: "R-4.4",
      paradigm: "Statistical",
      executionTarget: "AST-Evaluator",
      description: "Statistical distributions, probability density functions, variance analysis, and sampling.",
      primaryUse: "Telemetry data analysis, player jump curve regression, and stochastic audits.",
      deterministic: true
    },
    {
      id: "basic",
      name: "Retro BASIC Engine",
      version: "Dartmouth-Extended",
      paradigm: "Imperative",
      executionTarget: "Sandbox-Interpreter",
      description: "Deterministic line-numbered scripting and sandbox execution for procedural triggers.",
      primaryUse: "Micro-scripting, level event scripts, and retro simulation loops.",
      deterministic: true
    },
    {
      id: "sql",
      name: "Relational SQL Engine",
      version: "SQL-99/DML",
      paradigm: "Relational",
      executionTarget: "Sandbox-Interpreter",
      description: "Relational algebra queries, table joins, indexing, and deterministic in-memory databases.",
      primaryUse: "In-memory game state queries, score indexing, and historical run analytics.",
      deterministic: true
    },
    {
      id: "php",
      name: "PHP Backend Scripting Engine",
      version: "PHP-8.3",
      paradigm: "Interpreted",
      executionTarget: "Sandbox-Interpreter",
      description: "Dynamic string evaluation, template rendering, and structured payload serialization.",
      primaryUse: "Payload formatting, data serialization, and legacy script compatibility.",
      deterministic: true
    },
    {
      id: "xml",
      name: "XML Document Engine",
      version: "XML-1.0",
      paradigm: "Markup",
      executionTarget: "DOM-Pipeline",
      description: "Hierarchical markup tree parsing, schema validation, and node extraction.",
      primaryUse: "Level configuration files and structured object interchange schemas.",
      deterministic: true
    },
    {
      id: "csv",
      name: "CSV Data Stream Engine",
      version: "RFC-4180",
      paradigm: "Declarative",
      executionTarget: "Sandbox-Interpreter",
      description: "Fast delimited tabular data parsing, vector serialization, and matrix streaming.",
      primaryUse: "Coordinate path loading, high-speed telemetry logging, and track definition files.",
      deterministic: true
    },
    {
      id: "3djs",
      name: "3-DJS WebGL Graphics Engine",
      version: "Three-r160",
      paradigm: "Graphics",
      executionTarget: "V8-Engine",
      description: "Hardware-accelerated 3D scene graphs, perspective projection, shaders, and polygon meshes.",
      primaryUse: "Volumetric rendering, coordinate raycasting, and 3D arena spatial transformations.",
      deterministic: true
    },
    {
      id: "bootstrap",
      name: "Bootstrap Layout Engine",
      version: "v5.3-Grid",
      paradigm: "Declarative",
      executionTarget: "DOM-Pipeline",
      description: "Mathematical flexbox grid systems, responsive breakpoints, and UI column partitioning.",
      primaryUse: "Deterministic HUD column alignment and viewport adaptation.",
      deterministic: true
    },
    {
      id: "xhtml",
      name: "XHTML Strict Engine",
      version: "XHTML-1.0-Strict",
      paradigm: "Markup",
      executionTarget: "DOM-Pipeline",
      description: "Strict XML-compliant HTML tree validation and semantic DOM generation.",
      primaryUse: "Strict accessibility markup verification and screen-reader tree validation.",
      deterministic: true
    },
    {
      id: "html_css",
      name: "HTML/CSS Render Engine",
      version: "HTML5/CSS3-Standard",
      paradigm: "Markup",
      executionTarget: "DOM-Pipeline",
      description: "Box model calculations, cascading style computations, and layout reflow solvers.",
      primaryUse: "UI styling, visual HUD layering, and responsive canvas wrapper scaling.",
      deterministic: true
    }
  ] as LanguageRegistryMetadata[]
};
