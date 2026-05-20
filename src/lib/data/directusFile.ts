import { getDirectusClient } from '$lib/server/directus';
import { readFile, readFiles } from '@directus/sdk';
import type DirectusFile from '$lib/types/directusFile';

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
	return file as unknown as DirectusFile;
}

export function getAssetUrl(
	fileOrString: string | DirectusFile | null | undefined,
	params?: AssetParams
): string {
	if (!fileOrString) {
		return '';
	}

	const id = typeof fileOrString === 'string' ? fileOrString : fileOrString.id;
	let path = `/api/assets/${id}`;
	if (params) {
		const searchParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) searchParams.set(key, String(value));
		});
		const queryString = searchParams.toString();
		if (queryString) {
			path += `?${queryString}`;
		}
	}

	return path;
}

export async function fetchFiles(fetch: typeof globalThis.fetch): Promise<DirectusFile[]> {
	const client = getDirectusClient(fetch);
	const files = await client.request(
		readFiles({
			fields: ['*']
		})
	);
	return files as unknown as DirectusFile[];
}
