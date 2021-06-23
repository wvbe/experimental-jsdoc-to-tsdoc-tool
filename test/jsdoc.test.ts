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

Deno.test('@abstract', () =>
	assertEquals(
		jsdoc`
			/**
			 * @abstract
			 */
		`,
		tsdoc`
			/**
			 * @virtual
			 */
		`
	)
);
Deno.test('Description, simple', () =>
	assertEquals(
		jsdoc`
			/**
			 * Test 1
			 */
		`,
		tsdoc`
			/**
			 * Test 1
			 */
		`
	)
);

Deno.test('Description, long and line-wrapping', () =>
	assertEquals(
		jsdoc`
			/**
			 * This description with some really long lines. This description with some really long lines. This description with some really long lines. This description with some really
			 * long lines. This description
			 * with some really weird wrapping.
			 */
		`,
		// @TODO
		//   Wrap the output description
		tsdoc`
			/**
			 * This description with some really long lines. This description with some really long lines. This
			 * description with some really long lines. This description with some really long lines. This description
			 * with some really weird wrapping.
			 */
		`
	)
);

// Just a single parameter without description
//   The TSDoc playground will complain if a param name is not followed by a hyphen.
//   Mind you that this hyphen is, in the absence of a description, not followed by a space or
//   any other character.
Deno.test('Parameter, without description', () =>
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
	)
);

// Just a single parameter with description
Deno.test('Parameter, simple description', () =>
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
	)
);

// Several parameters, the names have different lengths and become nicely aligned in output
Deno.test('Parameter, alignment on name length', () =>
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
	)
);
// Optional parameters. Optionality is left out, because this lives in TS
Deno.test('Parameter, optionality is ignored', () =>
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
	)
);
// Parameter defaults. Also left out, because (according to some) this should be part of TS
//   https://github.com/microsoft/tsdoc/issues/151
Deno.test('Parameter, default value is ignored', () =>
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
	)
);

Deno.test('@fontosdk', () =>
	assertEquals(
		jsdoc`
			/**
			 * @fontosdk
			 */
		`,
		tsdoc`
			/**
			 * @fontosdk
			 */
		`
	)
);

Deno.test('@fontosdk and members', () =>
	assertEquals(
		jsdoc`
			/**
			 * @fontosdk members
			 */
		`,
		tsdoc`
			/**
			 * @fontosdk members
			 */
		`
	)
);

Deno.test('Return without a description', () =>
	assertEquals(
		jsdoc`
			/**
			 * @return {string}
			 */
		`,
		tsdoc`
			/**
			 */
		`
	)
);
Deno.test('Return', () =>
	assertEquals(
		jsdoc`
			/**
			 * @return {string} This is the return.
			 */
		`,
		tsdoc`
			/**
			 * @return This is the return.
			 */
		`
	)
);

Deno.test('Returns', () =>
	assertEquals(
		jsdoc`
			/**
			 * @returns {string[]} This is the return.
			 */
		`,
		tsdoc`
			/**
			 * @return This is the return.
			 */
		`
	)
);

Deno.test("See", () =>
	assertEquals(
		jsdoc`
			/**
			 * @see You need to see this.
			 * @see And this other too.
			 */
		`,
		tsdoc`
			/**
			 * @see You need to see this.
			 * @see And this other too.
			 */
		`
	)
);