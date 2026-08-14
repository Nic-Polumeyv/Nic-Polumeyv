import type { Handle } from '@sveltejs/kit/hooks';
import { assetPreload } from '@polumeyv/kit/asset-preload';

export const handle: Handle = ({ event, resolve }) => resolve(event, assetPreload);
