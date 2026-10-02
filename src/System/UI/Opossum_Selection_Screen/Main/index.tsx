import React, { useRef, useEffect, useState } from "react";
import { OpossumId, OpossumCharacter, RiderCharacter } from "../../../../types";
import { OpossumSelectionTabs, OpossumSelectionTabType } from "./Tabs";
import { OpossumSelectionCrafted } from "./Crafted";
import { OpossumSelectionPagination } from "./Pagination";
import { AIGeneratedView } from "./AI-Generated";
import { CompactOpossumSelection } from "./Compact";
import { COMPACT_OPOSSUMS_REGISTRY, CompactOpossumDefinition } from "../../../Registry/Characters/Opossums/Compact";
import { OPOSSUM_CHARACTERS } from "../../../../Characters/Opossums";
import { calculateMaxRiderHeight, getOpossumAestheticDescription, OPOSSUM_UI_CONSTANTS, GAME_ARENAS } from "../General";
import { AIOpossum, useOpossumAIState } from "../General/AI_State";
import { getOpossumPreviewConfig } from "../../../AI/In-Game/Category/UI/Opossum_Selection_Screen/General";

interface OpossumSelectionMainProps {
  selectedId: OpossumId;
  currentOpossum: OpossumCharacter;
  onSelect: (id: OpossumId) => void;
  onStart: (entity?: any) => void;
  onBack: () => void;
  selectedRider?: RiderCharacter | null;
}

export const OpossumSelectionMain: React.FC<OpossumSelectionMainProps> = ({
  selectedId,
  currentOpossum,
  onSelect,
  onStart,
  onBack,
  selectedRider,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { hasAnyKey } = useOpossumAIState();
  const [activeTab, setActiveTab] = useState<OpossumSelectionTabType>("CRAFTED");
  const [selectedAIOpossum, setSelectedAIOpossum] = useState<AIOpossum | null>(null);
  const [selectedCompactOpossum, setSelectedCompactOpossum] = useState<CompactOpossumDefinition | null>(
    COMPACT_OPOSSUMS_REGISTRY[0] || null
  );
  const [craftedCurrentPage, setCraftedCurrentPage] = useState<number>(1);
  const CRAFTED_PAGE_SIZE = 16;
  const craftedTotalPages = Math.ceil(OPOSSUM_CHARACTERS.length / CRAFTED_PAGE_SIZE);
  const craftedStartIndex = (craftedCurrentPage - 1) * CRAFTED_PAGE_SIZE;
  const visibleCraftedOpossums = OPOSSUM_CHARACTERS.slice(
    craftedStartIndex,
    craftedStartIndex + CRAFTED_PAGE_SIZE
  );

  // Check if current rider is short (George Blake or Sean White or height <= 4 feet)
  const isShortRider = Boolean(
    selectedRider && (
      selectedRider.id === "george" ||
      selectedRider.id === "george_blake" ||
      selectedRider.id === "sean_white" ||
      selectedRider.name.toLowerCase().includes("george") ||
      selectedRider.name.toLowerCase().includes("sean") ||
      (selectedRider.height && (
        selectedRider.height.includes("3 feet") ||
        selectedRider.height.includes("3'") ||
        selectedRider.height.includes("4 feet") ||
        selectedRider.height.includes("4'") ||
        selectedRider.height.includes("38") ||
        selectedRider.height.includes("40") ||
        selectedRider.height.includes("42") ||
        selectedRider.height.includes("44") ||
        selectedRider.height.includes("46") ||
        selectedRider.height.includes("48")
      ))
    )
  );

  const activeArena = GAME_ARENAS[0]; 

  const handleAISelect = (op: AIOpossum) => {
    setSelectedAIOpossum(op);
  };

  const handleCompactSelect = (op: CompactOpossumDefinition) => {
    setSelectedCompactOpossum(op);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines - Resolving hardcoding using arena colors
    ctx.strokeStyle = activeArena.color;
    ctx.lineWidth = 0.5;
    const spacing = OPOSSUM_UI_CONSTANTS.GRID_SPACING;
    for (let x = 0; x < width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Border - Resolving hardcoding using arena accent
    ctx.strokeStyle = activeArena.accent;
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Center point for drawing
    const cx = width / 2;
    const cy = height / 2 + 10;

    if (activeTab === "AI_GENERATED" && selectedAIOpossum) {
      // Use standard conversion for drawing
      import("../../../../utils/ai-conversion").then(({ convertAItoCharacter }) => {
        import("../../../../Characters/Opossums/AI-Generated/Drawing").then(({ AIGeneratedOpossum }) => {
           const char = convertAItoCharacter(selectedAIOpossum);
           AIGeneratedOpossum.draw3D(ctx, cx, cy, 160, 90, char);
        });
      });
      return;
    }

    if (activeTab === "COMPACT" && selectedCompactOpossum) {
      // Render Compact Opossum Preview (3'0" shoulder height, perched-forward head posture)
      const scale = 0.72; // Compact scale (~72% of standard crafted opossum)
      const bodyColor = selectedCompactOpossum.bodyFurColor;
      const earColor = selectedCompactOpossum.outerEarColor;
      const innerEarColor = selectedCompactOpossum.innerEarColor || "#FFB6C1";

      // Tail
      ctx.strokeStyle = selectedCompactOpossum.tailColor || "#FFC0CB";
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 5);
      ctx.bezierCurveTo(cx - 90, cy + 18, cx - 110, cy - 25, cx - 130, cy - 5);
      ctx.stroke();

      // Body (Compact Jill)
      ctx.fillStyle = bodyColor;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 60 * scale * 1.25, 34 * scale * 1.25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Outline
      ctx.strokeStyle = "#4b5563";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 58 * scale * 1.25, 32 * scale * 1.25, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Head (Perched Forward: positioned lower-forward with 18 deg inclination)
      const hx = cx + 55 * scale * 1.25;
      const hy = cy - 8 * scale * 1.25; // Lower and perched forward
      const hw = 30 * scale * 1.25;
      const hh = 26 * scale * 1.25;

      ctx.fillStyle = "#f3f4f6"; // Classic opossum pale face
      ctx.beginPath();
      ctx.ellipse(hx, hy, hw, hh, 0.28, 0, Math.PI * 2); // 0.28 rad ≈ 16-18 deg tilt forward
      ctx.fill();
      ctx.strokeStyle = "#4b5563";
      ctx.stroke();

      // Ears (with registered outerEarColor!)
      const earX = hx - 12;
      const earY = hy - 18;
      // Outer Ear
      ctx.fillStyle = earColor;
      ctx.beginPath();
      ctx.ellipse(earX, earY, 11, 14, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#1f2937";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Inner Ear
      ctx.fillStyle = innerEarColor;
      ctx.beginPath();
      ctx.ellipse(earX + 1, earY + 1, 6, 9, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      const eyeX = hx + 10;
      const eyeY = hy - 4;
      ctx.fillStyle = selectedCompactOpossum.eyeColor || "#1A202C";
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(eyeX - 1, eyeY - 1, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      const noseX = hx + hw * 0.9;
      const noseY = hy + 6;
      ctx.fillStyle = selectedCompactOpossum.noseColor || "#FFB6C1";
      ctx.beginPath();
      ctx.arc(noseX, noseY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Feet
      ctx.strokeStyle = "#ffb6c1";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx + 25, cy + 22);
      ctx.lineTo(cx + 28, cy + 42);
      ctx.moveTo(cx - 25, cy + 22);
      ctx.lineTo(cx - 27, cy + 42);
      ctx.stroke();

      // Text details
      ctx.fillStyle = "#f59e0b";
      ctx.font = "bold 13px 'JetBrains Mono', monospace";
      ctx.fillText(`${selectedCompactOpossum.name.toUpperCase()} (Jill - 3'0" Steed)`, 25, 33);
      
      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#fbbf24";
      ctx.fillText(`Shoulder Height: 3'0" (36 in) - High Cadence (2.2 Hz)`, 25, 50);
      ctx.fillText(`Posture: Perched Forward (18° inclination)`, 25, 65);
      ctx.fillText(`Outer Ears: ${selectedCompactOpossum.outerEarColor}`, 25, 80);
      ctx.fillText(`Vocalizations: Procedural Natural SFX (Offline Synthesizer)`, 25, 95);
      return;
    }

    // Opossum drawing logic adapted from AI UI Category configuration
    const previewConfig = getOpossumPreviewConfig(selectedId);
    const scale = previewConfig.scale;

    // Tail
    ctx.strokeStyle = previewConfig.tailColor;
    ctx.lineWidth = previewConfig.tailLineWidth * scale;
    ctx.beginPath();
    ctx.moveTo(cx - 70, cy + 5);
    ctx.bezierCurveTo(cx - 120, cy + 20, cx - 140, cy - 30, cx - 165, cy - 10);
    ctx.stroke();

    // Spiral Tail Pattern
    if (previewConfig.tailHasSpiral) {
      ctx.save();
      ctx.strokeStyle = previewConfig.tailSpiralColor;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.moveTo(cx - 70, cy + 5);
      ctx.bezierCurveTo(cx - 120, cy + 20, cx - 140, cy - 30, cx - 165, cy - 10);
      ctx.stroke();
      ctx.restore();
    }

    // Body
    ctx.fillStyle = previewConfig.bodyColor;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 80 * scale, 45 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body Patterns
    if (previewConfig.bodyPattern === "diamonds" && previewConfig.bodyPatternColors.length > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, 80 * scale, 45 * scale, 0, 0, Math.PI * 2);
      ctx.clip();
      for (let ox = -80; ox <= 80; ox += 14) {
        for (let oy = -45; oy <= 45; oy += 14) {
          const cIdx = Math.abs(ox + oy) % previewConfig.bodyPatternColors.length;
          ctx.fillStyle = previewConfig.bodyPatternColors[cIdx];
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx + ox, cy + oy - 5);
          ctx.lineTo(cx + ox + 5, cy + oy);
          ctx.lineTo(cx + ox, cy + oy + 5);
          ctx.lineTo(cx + ox - 5, cy + oy);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();
    } else if (previewConfig.bodyPattern === "polka-dots" && previewConfig.bodyPatternColors.length > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, 80 * scale, 45 * scale, 0, 0, Math.PI * 2);
      ctx.clip();
      for (let ox = -80; ox <= 80; ox += 16) {
        for (let oy = -45; oy <= 45; oy += 16) {
          const dotX = cx + ox + (oy % 16 === 0 ? 8 : 0);
          const dotY = cy + oy;
          ctx.fillStyle = previewConfig.bodyPatternColors[0];
          ctx.strokeStyle = "#374151";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();
    } else if (previewConfig.bodyPattern === "flowers" && previewConfig.bodyPatternColors.length > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, 80 * scale, 45 * scale, 0, 0, Math.PI * 2);
      ctx.clip();
      for (let ox = -80; ox <= 80; ox += 20) {
        for (let oy = -45; oy <= 45; oy += 20) {
          const cIdx = Math.abs(ox + oy) % previewConfig.bodyPatternColors.length;
          ctx.fillStyle = previewConfig.bodyPatternColors[cIdx];
          const fx = cx + ox;
          const fy = cy + oy;
          for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5;
            ctx.beginPath();
            ctx.arc(fx + Math.cos(angle) * 5, fy + Math.sin(angle) * 5, 4, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = "#fbbf24";
          ctx.beginPath();
          ctx.arc(fx, fy, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // Outline
    ctx.strokeStyle = previewConfig.outlineColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 75 * scale, 40 * scale, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Head
    const hx = cx + 65 * scale;
    const hy = cy - 20 * scale;
    const hw = 40 * scale;
    const hh = previewConfig.headHeight * scale;

    ctx.fillStyle = previewConfig.faceColor;
    ctx.beginPath();
    if (selectedId === OpossumId.MELISSA || selectedId === OpossumId.SAFFRON_ROSE || selectedId === OpossumId.ARDEN_ROSIE || selectedId === OpossumId.JAHMELLA_ROSE || selectedId === OpossumId.DAGMAR_KONE_REYNOLDS) {
      ctx.ellipse(hx, hy - 10, hw, hh - 5, -0.1, 0, Math.PI * 2);
    } else {
      ctx.ellipse(hx + 5, hy, hw, hh - 5, 0.1, 0, Math.PI * 2);
    }
    ctx.fill();

    // Accessories (Ear rings)
    if (previewConfig.hasEarRings) {
      ctx.strokeStyle = previewConfig.earRingsColor;
      ctx.lineWidth = 2.5;
      if (previewConfig.earRingsSide === "left" || previewConfig.earRingsSide === "both") {
        ctx.beginPath();
        ctx.arc(hx - 25, hy - 15, 6, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (previewConfig.earRingsSide === "right" || previewConfig.earRingsSide === "both") {
        ctx.beginPath();
        ctx.arc(hx + 25, hy - 15, 6, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Necklaces and heart-shaped charms (dynamic rendering!)
    if (previewConfig.hasNecklace) {
      ctx.strokeStyle = previewConfig.necklaceColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(hx, hy + 15, 30, 0, Math.PI, false);
      ctx.stroke();
      
      if (previewConfig.hasHeartCharm) {
        ctx.fillStyle = previewConfig.heartCharmColor;
        const nxc = hx;
        const nyc = hy + 45;
        ctx.beginPath();
        ctx.moveTo(nxc, nyc);
        ctx.bezierCurveTo(nxc - 6, nyc - 5, nxc - 9, nyc + 2, nxc, nyc + 9);
        ctx.bezierCurveTo(nxc + 9, nyc + 2, nxc + 6, nyc - 5, nxc, nyc);
        ctx.fill();
      }
    }

    // Nose
    ctx.fillStyle = previewConfig.noseColor;
    const nx = hx + (selectedId === OpossumId.MELISSA || selectedId === OpossumId.SAFFRON_ROSE || selectedId === OpossumId.ARDEN_ROSIE || selectedId === OpossumId.JAHMELLA_ROSE || selectedId === OpossumId.DAGMAR_KONE_REYNOLDS ? 35 : 42) * scale;
    const ny = hy + (selectedId === OpossumId.MELISSA || selectedId === OpossumId.SAFFRON_ROSE || selectedId === OpossumId.ARDEN_ROSIE || selectedId === OpossumId.JAHMELLA_ROSE || selectedId === OpossumId.DAGMAR_KONE_REYNOLDS ? -12 : -2) * scale;
    ctx.beginPath();
    ctx.arc(nx, ny, 9, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    const ex = hx - 10 * scale;
    const ey = hy - (selectedId === OpossumId.MELISSA || selectedId === OpossumId.SAFFRON_ROSE || selectedId === OpossumId.ARDEN_ROSIE || selectedId === OpossumId.JAHMELLA_ROSE || selectedId === OpossumId.DAGMAR_KONE_REYNOLDS ? 32 : 24) * scale;
    ctx.fillStyle = previewConfig.earColor;
    ctx.beginPath();
    ctx.arc(ex, ey, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#111827"; // Inner ear shading
    ctx.beginPath();
    ctx.arc(ex, ey, 10, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    const eyeColor = currentOpossum.eyeColor === "Green" || currentOpossum.eyeColor === "Light-Green" || currentOpossum.eyeColor === "Light Green" ? "#86efac" : currentOpossum.eyeColor === "Light-Blue" || currentOpossum.eyeColor === "Blue" || currentOpossum.eyeColor === "Sky Blue" ? "#7dd3fc" : "#3b82f6";
    const eyeX = hx + 15 * scale;
    const eyeY = hy - (selectedId === OpossumId.MELISSA || selectedId === OpossumId.SAFFRON_ROSE || selectedId === OpossumId.ARDEN_ROSIE || selectedId === OpossumId.JAHMELLA_ROSE || selectedId === OpossumId.DAGMAR_KONE_REYNOLDS ? 14 : 4) * scale;
    ctx.fillStyle = eyeColor;
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(eyeX - 1.5, eyeY - 1.5, 1, 0, Math.PI * 2);
    ctx.fill();

    // Feet
    ctx.strokeStyle = "#ffb6c1";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx + 40, cy + 30);
    ctx.lineTo(cx + 45, cy + 55);
    ctx.moveTo(cx - 40, cy + 30);
    ctx.lineTo(cx - 42, cy + 55);
    ctx.stroke();

    // Text details
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 13px 'JetBrains Mono', monospace";
    ctx.fillText(`${currentOpossum.name.toUpperCase()} (Gender: ${currentOpossum.gender})`, 25, 33);
    
    ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#a3e635";
    ctx.fillText(`Width: ${currentOpossum.width} in`, 25, 50);
    ctx.fillText(`Length: ${currentOpossum.length} in`, 25, 65);
    ctx.fillText(`Head Height: ${currentOpossum.headHeight} in`, 25, 80);
    ctx.fillText(`Colors: ${currentOpossum.color} body, ${currentOpossum.innerEarColor} ears`, 25, 95);

  }, [selectedId, currentOpossum, activeTab, selectedAIOpossum, selectedCompactOpossum]);

  return (
    <main className="flex-grow max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12">
        <p className="text-green-300 text-sm md:text-base leading-relaxed font-sans mb-1">
          Each opossum is unique, so... choose wisely.
        </p>
      </div>

      <div className="md:col-span-7 flex flex-col gap-4">
        <div
          id="Image_Frame"
          className="w-full h-[320px] bg-black border border-green-800 rounded relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,250,0,0.15)]"
        >
          <canvas
            ref={canvasRef}
            width={540}
            height={318}
            className="w-full h-full block"
          />
        </div>

        <OpossumSelectionTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          showAITab={hasAnyKey}
          showCompactTab={isShortRider}
        />

        {activeTab === "CRAFTED" ? (
          <>
            <OpossumSelectionCrafted 
              selectedId={selectedId} 
              onSelect={onSelect} 
              characters={visibleCraftedOpossums}
            />
            <OpossumSelectionPagination
              currentPage={craftedCurrentPage}
              totalPages={craftedTotalPages}
              onPageChange={setCraftedCurrentPage}
              maxNumericButtons={6}
            />
          </>
        ) : activeTab === "COMPACT" ? (
          <CompactOpossumSelection
            selectedOpossumId={selectedCompactOpossum?.id}
            onSelectCompactOpossum={handleCompactSelect}
          />
        ) : (
          <AIGeneratedView onAISelect={handleAISelect} />
        )}
      </div>

      <div className="md:col-span-5 bg-zinc-950 border border-green-900 p-6 rounded flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className={`text-xl font-bold tracking-tight border-b border-green-900 pb-2 ${activeTab === "CRAFTED" ? "text-green-300" : activeTab === "COMPACT" ? "text-amber-300" : (selectedAIOpossum?.sex === "Jill" ? "text-green-300" : "text-blue-300")}`}>
            {activeTab === "CRAFTED" ? "Opossum Description" : activeTab === "COMPACT" ? "Compact Jill Profile" : "AI Specification"}
          </h2>
          <div className="text-sm text-green-400 space-y-3 leading-relaxed">
            {activeTab === "CRAFTED" ? (
              <>
                <p className="font-semibold text-green-200">Meet {currentOpossum.name}:</p>
                <p>{currentOpossum.description}</p>
                <p>
                  She features a body length of {currentOpossum.length} inches representing
                  absolute scale, with a shoulder width of {currentOpossum.width} inches and
                  a registered shoulder height of {currentOpossum.shoulderHeight}. 
                  {(() => {
                    const { feet, inches } = calculateMaxRiderHeight(currentOpossum);
                    return ` Perfect spacing accommodates rider heights of up to ${feet} feet and ${inches} inches comfortably.`;
                  })()}
                </p>
                <p>
                  {getOpossumAestheticDescription(currentOpossum)}
                </p>
                <div className="bg-black/60 p-3 rounded border border-green-950 font-mono text-[11px] space-y-1 text-green-500">
                  <p>• Body width: {currentOpossum.width} inches</p>
                  <p>• Shoulder height: {currentOpossum.shoulderHeight}</p>
                  <p>• Head height: {currentOpossum.headHeight} inches</p>
                  <p>• Eye color: {currentOpossum.eyeColor}</p>
                  <p>• Inner ear detail: {currentOpossum.innerEarColor}</p>
                  <p>• Tail Color: {currentOpossum.tailColor}</p>
                  <p>• Pose: {currentOpossum.headOrientation}</p>
                </div>
              </>
            ) : activeTab === "COMPACT" ? (
              selectedCompactOpossum ? (
                <>
                  <p className="font-semibold text-amber-300">{selectedCompactOpossum.name} (Jill):</p>
                  <p className="text-stone-300">
                    A compact 3'0" shoulder height Jill opossum steed featuring perched-forward head posture (18° inclination) and high-cadence strides (2.2 Hz). Specially proportioned for bareback riding by Sean White and George Blake.
                  </p>
                  <div className="bg-black/60 p-3 rounded border border-amber-900/60 font-mono text-[11px] space-y-1 text-amber-400">
                    <p>• Steed ID: {selectedCompactOpossum.id}</p>
                    <p>• Shoulder Height: 3'0" (36 inches)</p>
                    <p>• Body Width: 29 inches | Length: 62 inches</p>
                    <p>• Body Fur: {selectedCompactOpossum.bodyFurColor}</p>
                    <p>• Outer Ears: {selectedCompactOpossum.outerEarColor}</p>
                    <p>• Inner Ears: {selectedCompactOpossum.innerEarColor}</p>
                    <p>• Head Posture: {selectedCompactOpossum.headPosture}</p>
                    <p>• Sound Architecture: Offline Procedural Synthesizer</p>
                    <p>• Elegant Chatter: Disabled (Natural Marsupial Audio)</p>
                  </div>
                </>
              ) : (
                <p className="italic text-zinc-600">Select a compact opossum color from the grid to view specifications.</p>
              )
            ) : selectedAIOpossum ? (
              <>
                <p className={`font-semibold ${selectedAIOpossum.sex === "Jill" ? "text-green-200" : "text-blue-200"}`}>Entity: {selectedAIOpossum.name}</p>
                <p className="text-zinc-400">
                  This AI-Generated {selectedAIOpossum.sex} has been synthesized through the Gemini network. 
                  It scales at {(selectedAIOpossum.size * 100).toFixed(0)}% of standard size.
                </p>
                <div className={`bg-black/60 p-3 rounded border ${selectedAIOpossum.sex === "Jill" ? "border-green-900 text-green-500" : "border-blue-900 text-blue-500"} font-mono text-[11px] space-y-1`}>
                  <p>• Entity ID: {selectedAIOpossum.id}</p>
                  <p>• Vocal Signature: {selectedAIOpossum.sex === "Jill" ? "Elegant Chatter" : "Robust Grunt"}</p>
                  <p>• Vocal Source: {selectedAIOpossum.vocalSource}</p>
                  <p>• Color Profile: {selectedAIOpossum.color}</p>
                  <p>• Network tier: {selectedAIOpossum.isPaid ? "UNLIMITED" : "FREE_TIER"}</p>
                  <p>• Vocal Modulation: {selectedAIOpossum.size > 1 ? "Lower Pitch" : "Higher Pitch"}</p>
                </div>
              </>
            ) : (
              <p className="italic text-zinc-600">Select an AI Entity from the network to view specifications.</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onBack}
            className="cursor-pointer flex-1 font-extrabold uppercase tracking-widest py-3.5 rounded-md transition-all text-base border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-black hover:scale-[1.01] active:translate-y-0.5"
          >
            &lt; Go Back
          </button>
          <button
            onClick={() => onStart(
              activeTab === "AI_GENERATED" 
                ? (selectedAIOpossum || undefined) 
                : activeTab === "COMPACT" 
                  ? (selectedCompactOpossum || undefined) 
                  : undefined
            )}
            className={`cursor-pointer flex-[2] font-extrabold uppercase tracking-widest py-3.5 rounded-md transition-all text-base filter drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] hover:scale-[1.01] active:translate-y-0.5
              ${activeTab === "CRAFTED" 
                ? "bg-green-500 hover:bg-green-400 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                : activeTab === "COMPACT"
                  ? (selectedCompactOpossum ? "bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]" : "bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50")
                  : (selectedAIOpossum 
                      ? (selectedAIOpossum.sex === "Jill" ? "bg-green-500 hover:bg-green-400 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]" : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]")
                      : "bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50")
              }
            `}
            disabled={
              (activeTab === "AI_GENERATED" && !selectedAIOpossum) ||
              (activeTab === "COMPACT" && !selectedCompactOpossum)
            }
          >
            Ride Now
          </button>
        </div>
      </div>
    </main>
  );
};
