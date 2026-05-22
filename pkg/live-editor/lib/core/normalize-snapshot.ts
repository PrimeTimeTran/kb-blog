export function normalizeSnapshot(snapshot: { files: Record<string, string>; entry?: string; focus?: string }) {
  const files = snapshot.files ?? {};

  // 1. resolve entry priority
  const entry = snapshot.entry || snapshot.focus || '/app/page.tsx';

  // 2. validate entry exists
  if (!files[entry]) {
    throw new Error(`[SNAPSHOT] entry not found: ${entry}`);
  }

  return {
    files,
    entry,
  };
}
