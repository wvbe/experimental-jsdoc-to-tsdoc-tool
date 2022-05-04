import { globFilesWithJsdoc, transformFile } from "./filesystem.ts"
import type { Options } from "./types.ts"
import { InvalidGlobError, InvalidInputError, InvalidOutputError } from "./errors.ts"

export async function convert(options: Options) {
  if (options.globbingPattern) {
    if (!options.updateInPlace) {
      throw new InvalidGlobError()
    }
    const files = await globFilesWithJsdoc(options.globbingPattern)
    console.log(`${ options.globbingPattern } --> ${ files.length } files`)
    await Promise.all(files.map((file) => transformFile(file, file)))
  }
  else if (options.inputFile) {
    if (options.outputFile) {
      console.log(`${ options.inputFile } --> ${ options.outputFile }`)
      await transformFile(options.inputFile, options.outputFile)
    }
    else if (options.updateInPlace) {
      console.log(`${ options.inputFile } --> ${ options.inputFile }`)
      await transformFile(options.inputFile, options.inputFile)
    }
    else {
      // to STDOUT?
      throw new InvalidOutputError()
    }
  }
  else {
    throw new InvalidInputError()
  }
  console.log("OK")
}
