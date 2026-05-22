console.log('utils loading');
await import('/test-utils.js');

export function utils(fromClient) {
  console.log('Utils', fromClient);
  const FOO = 'BAR';
  return {
    FOO,
  };
}
