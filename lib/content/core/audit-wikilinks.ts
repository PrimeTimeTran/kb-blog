import { KB_DIR } from '@/lib/paths';
import fs from 'fs';
import path from 'path';
import { walk } from '@/lib/fs';

const IGNORE_DIRS = [path.resolve(KB_DIR, 'project', 'node_modules')];

type Entry = {
  path: string;
  title: string;
};

function normalizeKey(input = '') {
  return input
    .replace(/\.mdx?$/, '')
    .replace(/^\//, '')
    .replace(/\\/g, '/')
    .trim()
    .toLowerCase();
}

function extractWikiLinks(content: string) {
  return [...content.matchAll(/\[\[(.+?)\]\]/g)].map((m) => m[1]);
}

function parseWikiLink(raw: string) {
  const pipeIndex = raw.indexOf('|');

  const left = pipeIndex === -1 ? raw.trim() : raw.slice(0, pipeIndex).trim();

  const hashIndex = left.indexOf('#');

  const filePart = hashIndex === -1 ? left : left.slice(0, hashIndex);

  const anchor = hashIndex === -1 ? undefined : left.slice(hashIndex + 1);

  return {
    raw,
    path: normalizeKey(filePart),
    anchor,
  };
}

function buildIndex(files: string[]) {
  const exact = new Map<string, Entry>();
  const basenameMap = new Map<string, Entry[]>();

  for (const file of files) {
    const relative = path.relative(KB_DIR, file);

    const normalized = normalizeKey(relative);

    const entry: Entry = {
      path: normalized,
      title: path.basename(normalized),
    };

    exact.set(normalized, entry);

    const base = normalizeKey(path.basename(normalized));

    if (!basenameMap.has(base)) {
      basenameMap.set(base, []);
    }

    basenameMap.get(base)!.push(entry);
  }

  return {
    exact,
    basenameMap,
  };
}

function resolveLink(linkPath: string, lookup: ReturnType<typeof buildIndex>) {
  const normalized = normalizeKey(linkPath);

  // exact path
  const exact = lookup.exact.get(normalized);

  if (exact) {
    return {
      status: 'exact',
      entry: exact,
    };
  }

  // basename fallback
  const base = normalizeKey(path.basename(normalized));

  const matches = lookup.basenameMap.get(base) || [];

  if (matches.length === 1) {
    return {
      status: 'basename',
      entry: matches[0],
    };
  }

  if (matches.length > 1) {
    return {
      status: 'ambiguous',
      matches,
    };
  }

  return {
    status: 'missing',
  };
}

export function auditWikiLinks() {
  console.log('\n[wiki-audit] scanning vault...');

  const files = walk(KB_DIR, { ignoreDirs: IGNORE_DIRS });

  console.log(`[wiki-audit] found ${files.length} markdown files\n`);

  const lookup = buildIndex(files);

  const resolved: any[] = [];
  const ambiguous: any[] = [];
  const missing: any[] = [];

  for (const file of files) {
    const relativeFile = normalizeKey(path.relative(KB_DIR, file));

    const content = fs.readFileSync(file, 'utf8');

    const links = extractWikiLinks(content);

    for (const raw of links) {
      const parsed = parseWikiLink(raw);

      const result = resolveLink(parsed.path, lookup);

      if (result.status === 'exact' || result.status === 'basename') {
        const finalUrl = `/kb/${result.entry.path}${parsed.anchor ? `#${parsed.anchor}` : ''}`;

        resolved.push({
          from: relativeFile,
          raw,
          resolvedBy: result.status,
          finalUrl,
        });

        continue;
      }

      if (result.status === 'ambiguous') {
        ambiguous.push({
          from: relativeFile,
          raw,
          candidates: result.matches.map((x) => x.path),
        });

        continue;
      }

      missing.push({
        from: relativeFile,
        raw,
      });
    }
  }

  console.log('\n================ RESOLVED ================\n');
  console.table(resolved);

  console.log('\n================ AMBIGUOUS ================\n');

  if (ambiguous.length) {
    console.table(ambiguous);
  } else {
    console.log('none');
  }

  console.log('\n================ MISSING ================\n');

  if (missing.length) {
    console.table(missing);
  } else {
    console.log('none');
  }

  console.log('\n================ SUMMARY ================\n');

  console.log({
    resolved: resolved.length,
    ambiguous: ambiguous.length,
    missing: missing.length,
  });

  fs.writeFileSync(
    './wikilink-audit.json',
    JSON.stringify(
      {
        ambiguous,
        missing,
        resolved,
      },
      null,
      2,
    ),
  );
}
