import why from 'why-is-node-running';

console.log('Build finished, checking for active processes...');

// This logs what is keeping the Node process alive
why();
