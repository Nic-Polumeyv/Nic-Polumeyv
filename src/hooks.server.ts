import type { Handle } from '@sveltejs/kit';
import { assetPreload } from '@polumeyv/lib/kit/asset-preload';

export const handle: Handle = ({ event, resolve }) => resolve(event, assetPreload);
