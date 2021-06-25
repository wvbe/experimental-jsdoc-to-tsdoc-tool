import { replaceJsdocWithTsdoc } from "./src/replace.ts";

async function transformFile(fileIn: string, fileOut: string): Promise<void> {
  await Deno.writeTextFile(
    fileOut,
    replaceJsdocWithTsdoc(await Deno.readTextFile(fileIn)),
  );
}

await transformFile(Deno.args[0], Deno.args[1]);
console.log("OK");
