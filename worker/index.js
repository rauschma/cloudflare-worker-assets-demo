import { WorkerEntrypoint } from 'cloudflare:workers';

export default class extends WorkerEntrypoint {
  async fetch(_request) {
    // https://developers.cloudflare.com/workers/static-assets/binding/#fetch
    const assetResponse = await this.env.ASSETS.fetch('https://assets.local/index.html');
    return assetResponse;
  }
}
