export function preprocessEmbeds(source, index) {
  return source.replace(/!\[\[(.+?)\]\]/g, (_, raw) => {
    const clean = raw.replace(/\.md$/, '');

    const parts = clean.split('/');
    const leaf = parts[parts.length - 1];

    // 1. exact match (best case)
    let resolved = index?.[clean] || index?.[clean + '.md'] || index?.[leaf];

    // 2. fallback: suffix match inside index (draft handling)
    if (!resolved) {
      const matchKey = Object.keys(index).find((k) => k.endsWith('/' + clean));
      if (matchKey) resolved = matchKey;
    }

    // IMPORTANT: use resolved OR fallback clean path
    const finalId = resolved ?? clean;

    return `<Embed id="${finalId}" />`;
  });
}
