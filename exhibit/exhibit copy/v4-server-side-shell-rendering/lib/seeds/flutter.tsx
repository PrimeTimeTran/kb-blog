export function seedFlutter() {
  return {
    '/lib/main.dart.ts': `
import { runApp } from "flutter_web";

import App from "./app.dart";

runApp(App);
`,

    '/lib/app.dart.ts': `
import { StatelessWidget, build } from "flutter_web";

export default class App extends StatelessWidget {
  build() {
    return build(
      "Container",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#0a0a0a",
          color: "white",
          fontFamily: "sans-serif",
        },
      },
      build("Column", {}, [
        build("Text", { value: "Hello Flutter" }),
        build("Counter")
      ])
    );
  }
}
`,

    '/lib/widgets/counter.dart.ts': `
import { StatefulWidget, useState, build } from "flutter_web";

export default class Counter extends StatefulWidget {
  createState() {
    return {
      count: 0,
    };
  }

  build(state, setState) {
    return build(
      "Button",
      {
        onClick: () => setState({ count: state.count + 1 }),
        style: {
          padding: "12px 20px",
          borderRadius: "8px",
          background: "#4f46e5",
          color: "white",
          border: "none",
        },
      },
      "Count: " + state.count
    );
  }
}
`,
  };
}
