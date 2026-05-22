export function renderToIframe(App: any, iframe: HTMLIFrameElement) {
  const doc = `
    <!DOCTYPE html>
    <html>
      <body>
        <div id="root"></div>

        <script type="module">
          import React from "https://esm.sh/react";
          import { createRoot } from "https://esm.sh/react-dom/client";

          const App = window.__APP__;

          const root = createRoot(document.getElementById("root"));
          root.render(React.createElement(App));
        </script>
      </body>
    </html>
  `;

  iframe.srcdoc = doc;
  (iframe.contentWindow as any).__APP__ = App;
}
