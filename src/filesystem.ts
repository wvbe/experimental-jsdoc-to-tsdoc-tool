import { replaceJsdocWithTsdoc } from "./replace"
import { expandGlob } from "https://deno.land/std@0.116.0/fs/mod.ts"

export async function globFilesWithJsdoc(pattern: string): Promise<string[]> {
  const files: string[] = []
  for await (const file of expandGlob(pattern)) {
    files.push(file.path)
  }
  return files
}

export async function transformFile(fileIn: string, fileOut: string): Promise<void> {
  await Deno.writeTextFile(
    fileOut,
    replaceJsdocWithTsdoc(await Deno.readTextFile(fileIn), fileIn),
  )
}
