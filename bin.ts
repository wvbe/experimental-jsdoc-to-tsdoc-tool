import { convert, parseOptions } from "./src/index.ts"

// Using a module-level await would prevent Deno DNT from building it for NodeJS 😭
// An anonymous self-invoking function will do the trick for either.
( async () => {
  await convert(parseOptions(Deno.args))
} )().catch(error => console.error(`Error converting jsdoc to tsdoc`, error))
