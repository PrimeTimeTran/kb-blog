import init, { counter_decrement, counter_get, counter_increment, counter_reset } from './wasm/exhibit_wasm.js';

await init();

console.log(counter_increment()); // 1
console.log(counter_increment()); // 2
console.log(counter_get()); // 2
console.log(counter_decrement()); // 1
counter_reset();
console.log(counter_get()); // 0
