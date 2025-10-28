import { WorkerEntrypoint } from 'cloudflare:workers';

export default class extends WorkerEntrypoint {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (pathname === '/') {
      // https://developers.cloudflare.com/workers/static-assets/binding/#fetch
      const assetResponse = await this.env.ASSETS.fetch('https://assets.local/index.html');
      return assetResponse;
    } else {
      const lines = [
        `<!DOCTYPE html>`,
        `<meta charset="UTF-8">`,
        `<title>File not found: ${escapeForHtml(pathname)}</title>`,
        `<h1>File not found: <code>${escapeForHtml(pathname)}</code></h1>`,
        `<a href="/">Go to start page</a>`
      ];
      return new Response(
        lines.join('\n'),
        {
          headers: {
            'content-type': 'text/html',
          },
        }
      );
    }
  }
}

function escapeForHtml(text) {
  return text
    .replace(/&/g, '&amp;') // first!
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;')
    ;
}