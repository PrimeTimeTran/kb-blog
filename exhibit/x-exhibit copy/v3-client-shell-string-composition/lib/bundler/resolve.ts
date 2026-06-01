export function resolve(from: string, to: string) {
  if (to.startsWith('/')) return to;

  const parts = from.split('/').slice(0, -1);
  const combined = [...parts, to].join('/');

  return normalize(combined);
}

function normalize(path: string) {
  const stack: string[] = [];

  for (const part of path.split('/')) {
    if (part === '..') stack.pop();
    else if (part !== '.' && part !== '') stack.push(part);
  }

  return '/' + stack.join('/');
}
