const why = require('why-is-node-running').default;

// If 'why' is an object that contains the function, you might need:
// const why = require('why-is-node-running').default || require('why-is-node-running');

console.log('Build finished, checking for active processes...');

// Most versions of this library export a function directly.
// If it still fails, log the module to see what it contains:
// console.log(why);

why();
