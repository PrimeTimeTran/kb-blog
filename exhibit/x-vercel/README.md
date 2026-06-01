You've built your app, you've tested, you've bundled and packaged.

Now it's time to deploy

But it fails

```sh
next.config.js
package.json
vercel.json
turbo.json
```

These are all able to define configurations and they are thus a surface for bugs.

When deploying to vercel. You'll often time that their servers hang/fail to bundle.

```sh
21:26:17.771 Build Completed in /vercel/output [1m]
21:26:20.783 Deploying outputs...
```

So you've setup a ghost process checker

```sh

```

You've bundled assets to prevent hangs due to heavy bundling issues

```sh

```

You've decided to build locally and deploy via their CLI

```sh

$ vercel build --prod --standalone
$ vercel deploy --prebuilt --prod
```
