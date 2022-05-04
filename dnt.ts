/**
 * Running this script rebuilds it as a NodeJS compatible npm package.
 */

import { build, BuildOptions, emptyDir } from "https://deno.land/x/dnt/mod.ts"

const VERSION = Deno.args[0]
if (!VERSION) {
  throw new Error("Please specify a version, eg. \"deno run dnt.ts 1.0.0")
}
console.log(`Creating npm package for version ${ VERSION }`)

const dependencyMapping: BuildOptions["mappings"] = {
  "https://esm.sh/comment-parser@1.3.0": {
    name: "comment-parser",
    version: "1.3.0",
  },
  "https://esm.sh/prettier@2.5.0": {
    name: "prettier",
    version: "2.5.0",
  },
  "https://esm.sh/prettier@2.5.0/parser-markdown": {
    name: "prettier",
    version: "2.5.0",
    subPath: "parser-markdown.js",
  },
}

const packageJson: BuildOptions["package"] = {
  // package.json properties
  name: "@wvbe/jsdoc-to-tsdoc",
  version: VERSION,
  description: "A tool to convert JSDoc code blocks to TSDoc",
  license: "MIT",
  type: "module",
  bin: {
    "jsdoc-to-tsdoc": "./esm/bin.js",
  },
  exports: ["./esm/src/index.js"],
  types: "./types/src/index.d.ts",
  repository: {
    type: "git",
    url: "git+https://github.com/wvbe/experimental-jsdoc-to-tsdoc-tool.git",
  },
  bugs: {
    url: "https://github.com/wvbe/experimental-jsdoc-to-tsdoc-tool/issues",
  },
}

await emptyDir("./npm")

await build({
  entryPoints: [ "./bin.ts", "./src/index.ts" ],
  outDir: "./npm",
  typeCheck: false,
  test: false,
  skipSourceOutput: true,
  shims: {
    deno: true,
  },
  mappings: dependencyMapping,
  package: packageJson,
});

// Prepend the line that lets your system know that bin.js should be executed using node;
[ "./npm/esm/bin.js", "./npm/script/bin.js" ].forEach(script => {
  Deno.writeTextFile(script, "#!/usr/bin/env node\n\n" + Deno.readTextFileSync(script))
})

// Use the npm-friendly README.md
await Deno.copyFile("README.npm.md", "npm/README.md")
