'use client';

import { useEffect, useState } from 'react';

/* =========================================================
   CONFIG
========================================================= */

const DEBUG = true;

const ASSET_PATHS = ['/assets/bg1.svg', '/assets/bg2.svg', '/assets/bg3.svg'];

/* =========================================================
   TYPES
========================================================= */

type AssetMeta = {
  width?: number;
  height?: number;

  vbX: number;
  vbY: number;
  vbWidth: number;
  vbHeight: number;

  aspectRatio: number;

  groups: number;
  paths: number;
  images: number;
  defs: number;
  gradientRefs: number;
  clipPaths: number;
  masks: number;
  patterns: number;

  hasViewBox: boolean;
  hasWidthHeight: boolean;

  renderStrategy: 'viewBox' | 'width-height' | 'fallback';
};

type Asset = {
  path: string;
  svg: string;
  inner: string;
  viewBox: string;
  meta: AssetMeta;
};

/* =========================================================
   SVG HELPERS
========================================================= */

function extractViewBox(svgText: string) {
  return svgText.match(/viewBox="([^"]+)"/)?.[1] ?? '';
}

function extractInner(svgText: string) {
  return svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] ?? svgText;
}

function extractWidth(svgText: string) {
  const raw = svgText.match(/width="([^"]+)"/)?.[1];
  if (!raw) return undefined;
  return parseFloat(raw);
}

function extractHeight(svgText: string) {
  const raw = svgText.match(/height="([^"]+)"/)?.[1];
  if (!raw) return undefined;
  return parseFloat(raw);
}

function parseViewBox(viewBox: string) {
  const [x, y, width, height] = viewBox.split(/[ ,]+/).map(Number);

  return {
    x: x || 0,
    y: y || 0,
    width: width || 1000,
    height: height || 1000,
  };
}

/* =========================================================
   ANALYSIS
========================================================= */

function analyzeSVG(svgText: string): AssetMeta {
  const viewBox = extractViewBox(svgText);

  const width = extractWidth(svgText);
  const height = extractHeight(svgText);

  const hasViewBox = !!viewBox;
  const hasWidthHeight = !!width && !!height;

  let vbX = 0;
  let vbY = 0;
  let vbWidth = width || 1000;
  let vbHeight = height || 1000;

  if (hasViewBox) {
    const parsed = parseViewBox(viewBox);

    vbX = parsed.x;
    vbY = parsed.y;
    vbWidth = parsed.width;
    vbHeight = parsed.height;
  }

  const aspectRatio = vbWidth / vbHeight;

  let renderStrategy: AssetMeta['renderStrategy'] = 'fallback';

  if (hasViewBox) renderStrategy = 'viewBox';
  else if (hasWidthHeight) renderStrategy = 'width-height';

  return {
    width,
    height,

    vbX,
    vbY,
    vbWidth,
    vbHeight,

    aspectRatio,

    groups: (svgText.match(/<g/g) || []).length,
    paths: (svgText.match(/<path/g) || []).length,
    images: (svgText.match(/<image/g) || []).length,
    defs: (svgText.match(/<defs/g) || []).length,
    gradientRefs: (svgText.match(/url\(#/g) || []).length,
    clipPaths: (svgText.match(/clipPath/g) || []).length,
    masks: (svgText.match(/<mask/g) || []).length,
    patterns: (svgText.match(/<pattern/g) || []).length,

    hasViewBox,
    hasWidthHeight,

    renderStrategy,
  };
}

/* =========================================================
   GROUP DEBUGGING
========================================================= */

function debugGroups(svgText: string) {
  const groupMatches = [...svgText.matchAll(/<g[^>]*>/g)];

  console.log('================ GROUP STACK ================');

  groupMatches.forEach((g, i) => {
    console.log({
      group: i,
      zIndex: i,
      position: i === 0 ? 'BOTTOM' : i === groupMatches.length - 1 ? 'TOP' : 'MIDDLE',

      raw: g[0],
    });
  });

  console.log('============================================');
}

/* =========================================================
   COMPONENT
========================================================= */

export default function SVGRender() {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    async function load() {
      const loaded = await Promise.all(
        ASSET_PATHS.map(async (path) => {
          const svgText = await fetch(path).then((r) => r.text());

          const inner = extractInner(svgText);

          const viewBox = extractViewBox(svgText) || '0 0 1000 1000';

          const meta = analyzeSVG(svgText);

          if (DEBUG) {
            console.log('================ SVG DEBUG ================');
            console.log(path);
            console.log(meta);
            console.log('===========================================');

            debugGroups(svgText);

            const tinyStrokes = [...svgText.matchAll(/stroke-width="([^"]+)"/g)]
              .map((m) => Number(m[1]))
              .filter((v) => v < 1);

            console.log('tinyStrokes', tinyStrokes);
          }

          return {
            path,
            svg: svgText,
            inner,
            viewBox,
            meta,
          };
        }),
      );

      setAssets(loaded);
    }

    load();
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#111',
        position: 'relative',
      }}
    >
      {/* =====================================================
          STACKED LAYERS
      ===================================================== */}

      {assets.map((asset, i) => (
        <div
          key={asset.path}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: i,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          {/* 
             IMPORTANT:
             Using RAW SVG instead of nesting into another <svg>
             preserves:
             - clipPaths
             - masks
             - gradients
             - internal coordinate systems
             - preserveAspectRatio behavior
          */}

          <div
            style={{
              width: '100%',
              height: '100%',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            dangerouslySetInnerHTML={{
              __html: asset.svg.replace(
                '<svg',
                `<svg preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;overflow:visible;"`,
              ),
            }}
          />

          {/* =================================================
              DEBUG OVERLAY
          ================================================= */}

          {DEBUG && (
            <div
              style={{
                position: 'absolute',
                top: 12 + i * 120,
                left: 12,

                background: 'rgba(0,0,0,0.8)',
                color: '#0f0',
                fontSize: 12,
                padding: 12,
                borderRadius: 8,
                fontFamily: 'monospace',
                pointerEvents: 'none',
                whiteSpace: 'pre-wrap',
                maxWidth: 320,
              }}
            >
              {JSON.stringify(
                {
                  file: asset.path.split('/').pop(),
                  strategy: asset.meta.renderStrategy,
                  aspectRatio: asset.meta.aspectRatio.toFixed(3),
                  viewBox: asset.viewBox,
                  groups: asset.meta.groups,
                  paths: asset.meta.paths,
                  defs: asset.meta.defs,
                  gradients: asset.meta.gradientRefs,
                  clipPaths: asset.meta.clipPaths,
                  masks: asset.meta.masks,
                  patterns: asset.meta.patterns,
                },
                null,
                2,
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
