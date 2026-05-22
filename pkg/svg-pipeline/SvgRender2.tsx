'use client';
import { useState } from 'react';

import { useAssets, useLayerModel, useScene } from './hooks';
import { Panel, LayersTab } from './components/Panel';

const DEBUG = true;
let ASSET_PATHS = [''];

ASSET_PATHS = ['/assets/bg-1-pyramids.svg'];
ASSET_PATHS = ['/assets/bg1.svg'];
ASSET_PATHS = ['/assets/bg2.svg'];
ASSET_PATHS = ['/assets/bg3.svg'];
ASSET_PATHS = ['/assets/bg4.svg'];
// ASSET_PATHS = ['/assets/bg4.svg']
// ASSET_PATHS = ['/assets/simple-a.svg']
// ASSET_PATHS = ['/assets/simple-b.svg']
// ASSET_PATHS = ['/assets/simple-c.svg']
// ASSET_PATHS = ['/assets/simple-d.svg']
ASSET_PATHS = ['/assets/e-single.svg'];
ASSET_PATHS = ['/assets/e-multi.svg'];
ASSET_PATHS = ['/assets/e-selection.svg'];
ASSET_PATHS = ['/assets/e-2-layers.svg'];

export default function SVGRender() {
  const assets = useAssets(ASSET_PATHS, DEBUG);
  const scenes = useScene(assets);

  return <SceneViewport scenes={scenes} />;
}
function SceneViewport({ scenes = [] }: any) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const activeScene = scenes?.[activeSceneIndex] ?? null;
  const layerModel = useLayerModel(activeScene?.svg ?? null);

  if (!scenes.length) {
    return (
      <div className="w-screen h-screen bg-[#111] flex items-center justify-center text-zinc-500">
        Loading scenes...
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#111]">
      <div className="absolute inset-0">
        {scenes.map((scene, i) => {
          const isActive = i === activeSceneIndex;

          return <SVGLayer index={i} key={scene.path} scene={scene} layerModel={isActive ? layerModel : null} />;
        })}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          <Panel
            className="top-0 right-0"
            defaultTab="layers"
            tabs={[
              {
                id: 'layers',
                label: 'Layers',
                content: <LayersTab layerModel={layerModel} />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
function SVGLayer({ index, layerModel }: any) {
  const { renderSVG, getHoverColor, bbox, svgRef } = layerModel;

  const hoverColor = getHoverColor() ?? '#00ff88';

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: index }}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: renderSVG().replace(
            '</svg>',
            bbox
              ? `
              <rect
                x="${bbox.x}"
                y="${bbox.y}"
                width="${bbox.width}"
                height="${bbox.height}"
                fill="none"
                stroke="${hoverColor || '00ff00'}"
                stroke-width=".2"
                pointer-events="none"
              />
            </svg>`
              : '</svg>',
          ),
        }}
      />
    </div>
  );
}
