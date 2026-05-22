import { useMemo } from 'react';

import { extractLayers } from '../lib';

export function useScene(assets: any[]) {
  return useMemo(() => {
    return assets.map((asset) => {
      const layers = extractLayers(asset.svg).map((l: any) => ({
        ...l,
        visible: true,
      }));

      return {
        ...asset,
        layers,
        layerMap: Object.fromEntries(layers.map((l) => [l.id, l])),
      };
    });
  }, [assets]);
}
