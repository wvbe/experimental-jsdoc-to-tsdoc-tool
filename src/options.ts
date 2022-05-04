import type { Options } from "./types.ts"

export function parseOptions(args: string[]) {
  const options: Options = {
    updateInPlace: false,
  }
  let i = 0
  while (i < args.length) {
    const next = args[i++]
    console.log("N", next)
    switch (next) {
      case "-u":
      case "--update-in-place":
        options.updateInPlace = true
        continue

      case "-g":
      case "--glob":
        options.globbingPattern = args[i++]
        if (!options.globbingPattern) {
          throw new Error("Globbing pattern cannot be empty")
        }
        continue

      case "-i":
      case "--in":
        options.inputFile = args[i++]
        if (!options.inputFile) {
          throw new Error("Input file cannot be empty")
        }
        continue

      case "-o":
      case "--out":
        options.outputFile = args[i++]
        if (!options.outputFile) {
          throw new Error("Output file cannot be empty")
        }
        continue

      default:
        if (!options.inputFile) {
          options.inputFile = next
        }
        else if (!options.outputFile) {
          options.outputFile = next
        }
        else {
          console.log(options)
          throw new Error("Too many arguments")
        }
    }
  }
  return options
}
