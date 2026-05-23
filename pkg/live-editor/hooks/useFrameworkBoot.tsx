import { useMemo, useState } from 'react';
// import { frameworkConfigs, Framework } from '../lib/frameworks';
import { frameworkConfigs } from '../lib/frameworks';

// import { reactSeed } from '../lib/seeds/react';
// import { nextSeed } from '../lib/seeds/next';

export type BootArtifact = {
  framework: Framework;
  files: Record<string, string>;
  entry: string;
  importMap: Record<string, string>;
};

export function useFrameworkBoot() {
  const [artifact, setArtifact] = useState<BootArtifact | null>(null);
  const [loading, setLoading] = useState(false);

  async function selectFramework(fw: Framework) {
    setLoading(true);

    // simulate async install (later: real dependency fetch)
    await new Promise((r) => setTimeout(r, 400));

    const seed = getSeed(fw);

    const newArtifact: BootArtifact = {
      framework: fw,
      files: seed,
      entry: getEntry(fw),
      importMap: frameworkConfigs[fw].importMap,
    };

    setArtifact(newArtifact);
    setLoading(false);
  }

  return {
    artifact,
    loading,
    selectFramework,
  };
}

function getSeed(fw: Framework) {
  switch (fw) {
    case 'react':
      return reactSeed();
    case 'next':
      return nextSeed();
    default:
      return reactSeed();
  }
}

function getEntry(fw: Framework) {
  switch (fw) {
    case 'react':
      return '/main.tsx';
    case 'next':
      return '/app/page.tsx';
    default:
      return '/main.tsx';
  }
}
