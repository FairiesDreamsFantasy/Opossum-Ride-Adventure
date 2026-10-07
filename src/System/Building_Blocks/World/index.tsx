import { SkySystem } from "./Sky";
import { ThreeDSystem } from "./3-D";
import { TwoDSystem } from "./2-D";
import { PolygonsRegistry } from "./Polygons";
import { PixelationSystem } from "./Pixelations";
import { ColorPalette } from "./Color_Palette";
import { GeometrySystem } from "./Geometry";
import { WorldAnimationsSystem } from "./Animations";

/**
 * World System Index
 * Central orchestration for all environmental, spatial, and animation systems
 * housed in System/Building_Blocks/World.
 */
export const WorldSystem = {
  Sky: SkySystem,
  ThreeD: ThreeDSystem,
  TwoD: TwoDSystem,
  Polygons: PolygonsRegistry,
  Pixelations: PixelationSystem,
  Colors: ColorPalette,
  Geometry: GeometrySystem,
  Animations: WorldAnimationsSystem
};
