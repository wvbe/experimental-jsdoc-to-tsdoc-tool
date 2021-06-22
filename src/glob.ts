import { expandGlob } from 'https://deno.land/std@0.99.0/fs/mod.ts';
import { dirname, basename } from 'https://deno.land/std@0.99.0/path/mod.ts';
const FILES_WITH_JSDOC = '**/*.{js,jsx,ts,tsx}';

export async function globFilesWithJsdoc() {
	const files: string[] = [];
	for await (const file of expandGlob(FILES_WITH_JSDOC)) {
		files.push(file.path);
	}
	return files;
}
