export function createRuntime(iframe: HTMLIFrameElement) {
  return function run(entryCode: string) {
    iframe.srcdoc = `
      <html>
        <body>
          <div id="root"></div>

          <script type="module">
            const moduleCache = {}

            async function execute(code) {
              const fn = new Function("React", "exports", code)
              const exports = {}
              fn(React, exports)
              return exports
            }

            ${entryCode}
          </script>
        </body>
      </html>
    `;
  };
}
