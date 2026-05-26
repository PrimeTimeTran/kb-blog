counter = 0;
function onClick() {
  counter += 1;
  const root = document.getElementById('exhibit-title-relative-import');
  root.innerHTML = `Exhibit: ${counter}`;
}
