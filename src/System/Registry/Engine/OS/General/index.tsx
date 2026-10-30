/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OSRecord {
  id: string;
  name: string;
  family: "Linux" | "DOS" | "BSD" | "Windows-NT" | "Unix" | "Microkernel" | "Real-Time";
  kernel: string;
  architecture: "x86" | "x64" | "ARM64" | "RISC-V" | "Multi-Arch";
  fileSystem: string;
  bootMode: "BIOS" | "UEFI" | "LEGACY";
  isRollingRelease: boolean;
  isOpenSource: boolean;
  description: string;
  deterministic: boolean;
}

export const OS_REGISTRY_METADATA = {
  registryVersion: "1.0.0-scientific",
  precisionStandard: "75,000,000,000%",
  lastUpdated: Date.now(),
  schemaType: "ENGINE_OS_DEFINITION"
};

export const OS_RECORDS_LIST: OSRecord[] = [
  {
    id: "linux",
    name: "Linux Distribution Ecosystem",
    family: "Linux",
    kernel: "Linux Kernel 6.x (POSIX Compliant)",
    architecture: "Multi-Arch",
    fileSystem: "EXT4 / BTRFS / ZFS / XFS",
    bootMode: "UEFI",
    isRollingRelease: true,
    isOpenSource: true,
    description: "Multi-user monolithic modular kernel runtime supporting Debian, Ubuntu, Xubuntu, Lubuntu, Kubuntu, Arch, and Mint.",
    deterministic: true
  },
  {
    id: "freedos",
    name: "FreeDOS Real-Time Engine",
    family: "DOS",
    kernel: "FreeDOS Kernel (Real-Mode x86)",
    architecture: "x86",
    fileSystem: "FAT12 / FAT16 / FAT32",
    bootMode: "BIOS",
    isRollingRelease: false,
    isOpenSource: true,
    description: "Complete 16-bit real-mode x86 operating environment for legacy games, direct port I/O, and low-latency execution.",
    deterministic: true
  },
  {
    id: "freebsd",
    name: "FreeBSD Unix Subsystem",
    family: "BSD",
    kernel: "FreeBSD Monolithic Kernel",
    architecture: "Multi-Arch",
    fileSystem: "UFS2 / OpenZFS",
    bootMode: "UEFI",
    isRollingRelease: false,
    isOpenSource: true,
    description: "High-performance POSIX Unix-like operating system with advanced networking and ZFS storage.",
    deterministic: true
  },
  {
    id: "openbsd",
    name: "OpenBSD Security Platform",
    family: "BSD",
    kernel: "OpenBSD Secure Kernel",
    architecture: "Multi-Arch",
    fileSystem: "FFS2",
    bootMode: "UEFI",
    isRollingRelease: false,
    isOpenSource: true,
    description: "Security-focused Unix operating system featuring proactive security hardening and strict memory bounds.",
    deterministic: true
  },
  {
    id: "netbsd",
    name: "NetBSD Multi-Platform OS",
    family: "BSD",
    kernel: "NetBSD Modular Kernel",
    architecture: "Multi-Arch",
    fileSystem: "FFS / LFS",
    bootMode: "BIOS",
    isRollingRelease: false,
    isOpenSource: true,
    description: "Ultra-portable Unix-like system designed to run cleanly across dozens of hardware architectures.",
    deterministic: true
  },
  {
    id: "redox",
    name: "Redox OS Microkernel",
    family: "Microkernel",
    kernel: "Redox Rust Microkernel",
    architecture: "x64",
    fileSystem: "RedoxFS",
    bootMode: "UEFI",
    isRollingRelease: true,
    isOpenSource: true,
    description: "Modern, memory-safe, Unix-like microkernel written entirely in Rust.",
    deterministic: true
  },
  {
    id: "haiku",
    name: "Haiku OS Multimedia System",
    family: "Unix",
    kernel: "Haiku Hybrid Kernel (BeOS inspired)",
    architecture: "x64",
    fileSystem: "OpenBFS",
    bootMode: "UEFI",
    isRollingRelease: false,
    isOpenSource: true,
    description: "Responsive, clean desktop OS engineered for high-throughput digital media and audio/visual rendering.",
    deterministic: true
  },
  {
    id: "reactos",
    name: "ReactOS Open Architecture",
    family: "Windows-NT",
    kernel: "ReactOS NT-Compatible Kernel",
    architecture: "x86",
    fileSystem: "FAT32 / BTRFS",
    bootMode: "BIOS",
    isRollingRelease: true,
    isOpenSource: true,
    description: "Open-source operating system providing native binary compatibility with Windows NT applications.",
    deterministic: true
  },
  {
    id: "templeos",
    name: "TempleOS Ring-0 System",
    family: "Real-Time",
    kernel: "TempleOS Monolithic Ring-0",
    architecture: "x64",
    fileSystem: "RedSea",
    bootMode: "BIOS",
    isRollingRelease: false,
    isOpenSource: true,
    description: "64-bit single-address space, ring-0, non-preemptive multi-tasking computing environment.",
    deterministic: true
  },
  {
    id: "plan9",
    name: "Plan 9 from Bell Labs",
    family: "Unix",
    kernel: "Plan 9 Distributed Kernel",
    architecture: "Multi-Arch",
    fileSystem: "Fossil / Venti",
    bootMode: "BIOS",
    isRollingRelease: false,
    isOpenSource: true,
    description: "Distributed research operating system treating all resources and interfaces as 9P file streams.",
    deterministic: true
  }
];
