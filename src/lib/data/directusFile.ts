import { getDirectusClient } from '$lib/server/directus';
import { readFile, readFiles } from '@directus/sdk';
import type DirectusFile from '$lib/types/directusFile';
import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

export interface AssetParams {
	width?: number;
	height?: number;
	quality?: number;
	fit?: 'cover' | 'contain' | 'inside' | 'outside';
	withoutEnlargement?: boolean;
	format?: 'jpg' | 'png' | 'webp' | 'avif' | 'gif' | 'tiff';
}

export async function fetchFileById(
	id: string,
	fetch: typeof globalThis.fetch
): Promise<DirectusFile | null> {
	const client = getDirectusClient(fetch);
	// Using generic request with readFile for specific file metadata
	const file = await client.request(readFile(id));
	return file as DirectusFile;
}

export function getAssetUrl(
	fileOrString: string | DirectusFile | null | undefined,
	params?: AssetParams
): string {
	if (!fileOrString) {
		return '';
	}

	const id = typeof fileOrString === 'string' ? fileOrString : fileOrString.id;
	const url = new URL(`${PUBLIC_DIRECTUS_URL}/assets/${id}`);

	if (params) {
		Object.entries(params).forEach(([key, values]) => {
			if (values !== undefined) url.searchParams.set(key, String(values));
		});
	}

	return url.toString();
}

export async function fetchFiles(fetch: typeof globalThis.fetch): Promise<DirectusFile[]> {
	const client = getDirectusClient(fetch);
	const files = await client.request(
		readFiles({
			fields: ['*']
		})
	);
	return files as DirectusFile[];
}
