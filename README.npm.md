# jsdoc-to-tsdoc

This is a prototype tool to convert [JSDoc](https://jsdoc.app/) to
[TSDoc](https://tsdoc.org/). It's a work-in-progress and probably not usable for
you yet.

The tool is written in [Deno](https://deno.land/) (Typescript) for simplicity,
and compiled to something that plays nice with NodeJS (as `@wvbe/jsdoc-to-tsdoc`).

# Usage

```sh
# Install to $PATH
npm install -g @wvbe/jsdoc-to-tsdoc

# Convert 1 file, write to the original location
jsdoc-to-tsdoc my-file.js my-file.js
jsdoc-to-tsdoc --in my-file.js --out my-file.js

# Convert one or many files and write in place
jsdoc-to-tsdoc --update-in-place --in my-file.js
jsdoc-to-tsdoc --update-in-place --glob "**/*.{js,jsx,ts,tsx}"
```

## How JSDoc is used as TSDoc

This project [creates an AST](https://www.npmjs.com/package/comment-parser) from
your JSDoclet, and serializes only the parts it is interested in. Tags that are
not implemented or ignored are therefore _removed_ in the TSDoc output.

Because the JSDoc and TSDoc specs are slightly different in some places;

- JSDoc `@summary` is used as the summary description in TSDoc. JSDoc
  `@description` is moved to TSDoc `@remarks`, unless there is no JSDoc
  `@summary`.
