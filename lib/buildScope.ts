import * as Babel from '@babel/standalone';

function stripModuleSyntax(code) {
  return code
    .replace(/import[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
    .replace(/export\s+default\s+/g, '')
    .replace(/export\s+/g, '');
}

function compile(code, name) {
  const result = Babel.transform(code, {
    filename: `virtual/${name}.tsx`,
    presets: ['react', 'typescript'],
  });

  return result.code;
}

export function buildRegistry(registry, React) {
  const scope = {};

  for (const [name, code] of Object.entries(registry)) {
    const js = compile(stripModuleSyntax(code), name);

    scope[name] = new Function(
      'React',
      `
        ${js}
        return ${name}
      `,
    )(React);
  }

  return scope;
}
