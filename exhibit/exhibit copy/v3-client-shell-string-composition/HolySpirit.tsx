async function GOOO() {
  const shell = await fetch('/starters/live-editor-shell.html?raw').then((r) => r.text());

  let initialCode = await fetch('/starters/poc.tsx?raw').then((r) => r.text());
  initialCode = await fetch('/starters/basic.tsx?raw').then((r) => r.text());
  // export const starterCode = initialCode;

  // export { shell };
}
