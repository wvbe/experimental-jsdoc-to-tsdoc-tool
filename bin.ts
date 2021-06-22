import { getJsdocAstsForFile } from './src/replace.ts';

/**
 * What
 */

// skeet
console.log(await getJsdocAstsForFile(Deno.args[0]));
