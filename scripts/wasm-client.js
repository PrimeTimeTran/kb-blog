import init, { build_edges, count_chars, json_echo, ping, reverse, simple_hash, upper } from './pkg/exhibit_utils.js';

await init();

console.log(ping('hello'));
console.log(reverse('rust'));
console.log(upper('mini'));
console.log(count_chars('hello world'));

console.log(json_echo(JSON.stringify({ a: 1, b: 2 })));

console.log(
  build_edges(
    JSON.stringify({
      'a.ts': ['b.ts', 'c.ts'],
      'b.ts': [],
    }),
  ),
);

console.log(simple_hash('cache-key'));
