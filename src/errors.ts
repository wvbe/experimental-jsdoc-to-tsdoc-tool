export class InvalidInputError extends Error {
  constructor() {
    super("Invalid input, please use either --in or --glob")
  }
}

export class InvalidOutputError extends Error {
  constructor() {
    super("You must use --update-in-place if not using --out")
  }
}

export class InvalidGlobError extends Error {
  constructor() {
    super( "Globbing only supported with the --update-in-place flag.")
  }
}
