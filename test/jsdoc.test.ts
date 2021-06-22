import { assertEquals } from 'https://deno.land/std@0.99.0/testing/asserts.ts';
import { getJsdocAstsForFileContents, getTsdocStringForJsdocAst } from '../src/replace.ts';

function jsdoc(strs: TemplateStringsArray) {
	const asts = getJsdocAstsForFileContents(strs.join('').trimEnd());
	if (asts.length !== 1) {
		throw new Error(`Expected exactly 1 doclet, got ${asts.length}`);
	}
	return getTsdocStringForJsdocAst(asts[0]);
}

function tsdoc(strs: TemplateStringsArray) {
	return strs.join('').trimEnd();
}

Deno.test('Description', () => {
	assertEquals(
		jsdoc`
			/**
			 * Test
			 */
		`,
		tsdoc`
			/**
			 * Test
			 */
		`
	);
	assertEquals(
		jsdoc`
			/**
			 * This description
			 * has a multi-line
			 * paragraph
			 */
		`,
		tsdoc`
			/**
			 * This description has a multi-line paragraph
			 */
		`
	);
});

Deno.test('Parameter', () => {
	// Just a single parameter without description
	//   The TSDoc playground will complain if a param name is not followed by a hyphen.
	//   Mind you that this hyphen is, in the absence of a description, not followed by a space or
	//   any other character.
	assertEquals(
		jsdoc`
			/**
			 * @param {string} nerf
			 */
		`,
		tsdoc`
			/**
			 * @param nerf -
			 */
		`
	);

	// Just a single parameter with description
	assertEquals(
		jsdoc`
			/**
			 * @param {string} nerf Derp
			 */
		`,
		tsdoc`
			/**
			 * @param nerf - Derp
			 */
		`
	);

	// Several parameters, the names have different lengths and become nicely aligned in output
	assertEquals(
		jsdoc`
			/**
			 * @param {string} nerf Derp
			 * @param {string} nerfOfDifferentLength Derp
			 */
		`,
		tsdoc`
			/**
			 * @param nerf                  - Derp
			 * @param nerfOfDifferentLength - Derp
			 */
		`
	);
	// Optional parameters. Optionality is left out, because this lives in TS
	assertEquals(
		jsdoc`
			/**
			 * @param {string} [nerf] Derp
			 */
		`,
		tsdoc`
			/**
			 * @param nerf - Derp
			 */
		`
	);
	// Parameter defaults. Also left out, because (according to some) this should be part of TS
	//   https://github.com/microsoft/tsdoc/issues/151
	assertEquals(
		jsdoc`
			/**
			 * @param {string} [nerf='foo'] Derp
			 */
		`,
		tsdoc`
			/**
			 * @param nerf - Derp
			 */
		`
	);
});
