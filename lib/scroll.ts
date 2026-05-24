type ScrollRoot = HTMLElement | Window;

let currentScrollRoot: ScrollRoot = window;

export function setScrollRoot(root: ScrollRoot) {
  currentScrollRoot = root;
}

export function getScrollRoot(): ScrollRoot {
  return currentScrollRoot;
}
