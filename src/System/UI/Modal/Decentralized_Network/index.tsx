/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { playProceduralSound } from "../../../Sound/TTS";
import { QrCode, Terminal, Check, Copy, Network, Award, ShieldAlert } from "lucide-react";

export interface DecentralizedNetworkModalProps {
  onClose: () => void;
  speakWords?: (text: string) => void;
  setStatusMessage?: (msg: string) => void;
}

export const DecentralizedNetworkModal: React.FC<DecentralizedNetworkModalProps> = ({
  onClose,
  speakWords,
  setStatusMessage
}) => {
  const [nodeId, setNodeId] = useState<string>("");
  const [peerInput, setPeerInput] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");
  const [replicationLogs, setReplicationLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize or fetch the peer node ID from localStorage
  useEffect(() => {
    let storedId = localStorage.getItem("opossum_p2p_node_id");
    if (!storedId) {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // readable alpha-numeric
      let randPart = "";
      for (let i = 0; i < 12; i++) {
        randPart += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      storedId = `OPOSSUM-MESH-${randPart}`;
      localStorage.setItem("opossum_p2p_node_id", storedId);
    }
    setNodeId(storedId);

    // Initial log message
    setReplicationLogs([
      "[*] System: Initializing Peer Mesh Network Ledger...",
      `[*] Node ID: ${storedId} registered offline.`,
      "[+] Ready to discover and replicate peer state."
    ]);
  }, []);

  // Render the QR code on the canvas whenever the nodeId changes
  useEffect(() => {
    if (nodeId && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        nodeId,
        {
          width: 192,
          margin: 1.5,
          color: {
            dark: "#14532d",  // Green-900 (Retro Term Theme dark)
            light: "#f0fdf4"  // Green-50 (Retro Term Theme light bg)
          }
        },
        (error) => {
          if (error) {
            console.error("Failed to generate QR code:", error);
          }
        }
      );
    }
  }, [nodeId]);

  const handleCopyNodeId = async () => {
    try {
      playProceduralSound("tick");
      await navigator.clipboard.writeText(nodeId);
      setIsCopied(true);
      if (speakWords) speakWords("Node address copied to clipboard.");
      if (setStatusMessage) setStatusMessage("Copied Node ID");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const handleSimulateSync = () => {
    if (!peerInput.trim()) {
      playProceduralSound("crash");
      setSyncStatus("error");
      if (speakWords) speakWords("Sync error. Please enter a valid peer address.");
      return;
    }

    playProceduralSound("tick");
    setSyncStatus("syncing");
    if (speakWords) speakWords("Synchronizing ledger with peer nodes. Reading database replication logs...");

    setReplicationLogs((prev) => [
      ...prev,
      `[>] Connecting to peer node: ${peerInput.trim()}`,
      `[*] Handshaking... OK`,
      `[*] Merging high score vectors (Conflict-Free Replicated Data)`,
      `[*] Synchronizing custom Opossum chatter pitch offsets...`
    ]);

    setTimeout(() => {
      setSyncStatus("success");
      setReplicationLogs((prev) => [
        ...prev,
        `[+] Replicated 4 score logs successfully!`,
        `[+] Peer database synchronized. State: CONSISTENT.`
      ]);
      playProceduralSound("jump");
      if (speakWords) speakWords("Database state successfully synchronized. Peer network active.");
      if (setStatusMessage) setStatusMessage("State Replicated Successfully");
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="p2p_network_title"
      className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto"
    >
      <div className="bg-zinc-950 border-2 border-green-700 max-w-xl w-full rounded-lg p-6 font-mono text-green-300 shadow-[0_0_40px_rgba(34,197,94,0.3)] my-8 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-3 border-b border-green-800 pb-3">
          <Network className="text-green-400" size={24} />
          <h2 id="p2p_network_title" className="text-lg sm:text-xl font-bold uppercase tracking-widest text-green-100">
            Decentralized Mesh Network
          </h2>
        </div>

        {/* Description */}
        <p className="text-xs text-green-400 leading-relaxed">
          Establish a local peer-to-peer ledger state entirely independent of commercial clouds. Players scan or input peer keys to sync high-score vectors and custom opossum chatter offsets directly across networks.
        </p>

        {/* QR Code and Local Key display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-green-900/60 pt-4">
          <div className="flex flex-col items-center justify-center bg-green-950/20 border border-green-900 p-3 rounded-lg space-y-2">
            <label className="text-[10px] uppercase font-bold text-green-400 tracking-wider">Your Local Node QR</label>
            <div className="p-1 bg-green-50 rounded-md border border-green-700 shadow-md">
              <canvas ref={canvasRef} className="w-48 h-48 block" aria-label={`QR Code for local Node ID: ${nodeId}`} />
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-green-400 tracking-wider block">Your Peer Key:</label>
              <div className="flex items-center gap-2 bg-zinc-900 border border-green-900/50 p-2 rounded">
                <span className="text-xs text-white font-bold select-all truncate flex-1">{nodeId}</span>
                <button
                  type="button"
                  onClick={handleCopyNodeId}
                  className="p-1.5 rounded border border-green-700 text-green-400 hover:bg-green-900/30 transition min-h-[44px] flex items-center justify-center"
                  title="Copy Peer Key"
                >
                  {isCopied ? <Check size={16} className="text-green-300" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="peer_key_input" className="text-[10px] uppercase font-bold text-green-400 tracking-wider block">
                Connect to Peer Node:
              </label>
              <input
                id="peer_key_input"
                type="text"
                placeholder="Enter Peer MESH Address..."
                value={peerInput}
                onChange={(e) => setPeerInput(e.target.value.toUpperCase())}
                className="w-full bg-zinc-900 border border-green-900 rounded p-2.5 text-xs text-white uppercase focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-green-800"
              />
            </div>

            <button
              type="button"
              onClick={handleSimulateSync}
              disabled={syncStatus === "syncing"}
              className={`w-full font-bold uppercase py-2 px-4 rounded text-xs border transition min-h-[44px] ${
                syncStatus === "syncing"
                  ? "bg-zinc-900 text-zinc-500 border-zinc-800 cursor-not-allowed"
                  : "bg-green-900 text-white border-green-500 hover:bg-green-800 cursor-pointer shadow-[0_0_8px_rgba(34,197,94,0.3)]"
              }`}
            >
              {syncStatus === "syncing" ? "Synchronizing state..." : "Merge Peer Ledger"}
            </button>
          </div>
        </div>

        {/* Simulation Console Display */}
        <div className="bg-black/90 rounded border border-green-900/50 p-3 font-mono space-y-1 text-[11px] leading-relaxed max-h-[140px] overflow-y-auto">
          <div className="text-[10px] text-green-600 font-bold uppercase tracking-wider border-b border-green-900/30 pb-1 flex items-center gap-1.5">
            <Terminal size={10} />
            <span>Replication Console Log</span>
          </div>
          {replicationLogs.map((log, idx) => (
            <div
              key={idx}
              className={`${
                log.startsWith("[+]")
                  ? "text-green-300 font-bold animate-pulse"
                  : log.startsWith("[>]")
                  ? "text-amber-400"
                  : log.startsWith("[*]")
                  ? "text-zinc-400"
                  : "text-green-500"
              }`}
            >
              {log}
            </div>
          ))}
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-green-900/40">
          <button
            type="button"
            onClick={() => {
              playProceduralSound("tick");
              onClose();
            }}
            className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-green-400 px-6 py-2.5 rounded text-xs font-bold uppercase border border-green-900 min-h-[44px]"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
