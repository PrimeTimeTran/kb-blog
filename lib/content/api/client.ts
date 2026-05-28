// lib/content/api/client.ts
import { createContentClient, registry } from '../core/registry';

export const content = createContentClient(registry);

export { createContentClient };
