# Using Cloudflare Workers for static hosting

## Why not use Cloudflare Pages?

* Pages will eventually be replaced by Workers.
* By default, Pages does the following forwarding, which is problematic for many sites because it changes existing URLs:
  * `some-file.html` → `some-file`

## Using a Worker for static file hosting

* Basic how-to in the official docs: [“Deploy a static site”](https://developers.cloudflare.com/workers/static-assets/get-started/#deploy-a-static-site)
  * Adding git only creates a local repository

Additional JSON in `wrangler.jsonc`:

```json
"main": "./worker/index.js",
"assets": {
  "directory": "./public/",
  "html_handling": "none",
  "binding": "ASSETS",
  "run_worker_first": [
    "/"
  ]
},
```

Why is this needed?

* `html_handling` switches off the aforementioned forwarding ([source](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/#disable-html-handling)).
* However, that also means that `/` won’t lead to `/index.html` being served. For that, we need a Worker – which runs first (before any assets are served) but only if the requested path is `/` ([source](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/#run-worker-before-each-request))
* `main` points to the Worker.
* `binding` configures a name that the Worker uses via `this.env.ASSETS`.
