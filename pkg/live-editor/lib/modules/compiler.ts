import * as Babel from '@babel/standalone';

export function compile(code: string) {
  return Babel.transform(code, {
    presets: ['react'],
    sourceType: 'module',
  }).code!;
}
