import { Spec } from "https://esm.sh/comment-parser";

// @abstract
export function getNicelyFormattedAbstractFromTags(specs: Spec[]) {
  const tags = specs.filter((spec) => spec.tag === "abstract");
  if (!tags.length) {
    return [];
  }
  if (tags.length > 1) {
    throw new Error("Much confuse, more than 1 @abstract statement");
  }
  return ["@virtual"];
}

// @deprecated
export function getNicelyFormattedDeprecatedFromTags(specs: Spec[]) {
  const deprecated = specs.filter((spec) => spec.tag === "deprecated");
  if (deprecated.length > 1) {
    throw new Error("Much confuse, more than 1 @deprecated statement");
  }
  return deprecated.map((deprecated) =>
    `@deprecated ${deprecated.name} ${deprecated.description}`.trim()
  );
}

// @fontosdk
export function getNicelyFormattedFontosdkFromTags(specs: Spec[]) {
  const fontosdks = specs.filter((spec) => spec.tag === "fontosdk");
  if (fontosdks.length > 1) {
    throw new Error("Much confuse, more than 1 @fontosdk statement");
  }
  return fontosdks.map((fontosdk) =>
    ["@fontosdk", fontosdk.name].join(" ").trim()
  );
}

// @internal
export function getNicelyFormattedInternalFromTags(specs: Spec[]) {
  const internalTags = specs.filter((spec) => spec.tag === "internal");
  if (internalTags.length > 1) {
    throw new Error("Much confuse, more than 1 @internal statement");
  }
  return internalTags.map((internal) =>
    ["@internal", internal.name, internal.description].join(" ").trim()
  );
}

// @param
export function getNicelyFormattedParamsFromTags(specs: Spec[]) {
  const params = specs.filter((spec) => spec.tag === "param");
  const maxNameLength = params.reduce(
    (length, param) => Math.max(length, param.name.length),
    0,
  );
  return params.map((param) =>
    `@param ${param.name +
      " ".repeat(maxNameLength - param.name.length)} - ${param.description}`
      .trim()
  );
}

// @return
export function getNicelyFormattedReturnFromTags(specs: Spec[]) {
  const returnValues = specs.filter((spec) =>
    spec.tag === "return" || spec.tag === "returns"
  );
  if (returnValues.length > 1) {
    throw new Error("Much confuse, more than 1 @return statement");
  }
  if (!returnValues[0]?.description) {
    return [];
  }
  return returnValues.map((returnValue) =>
    `@return ${returnValue.name} ${returnValue.description}`.trim()
  );
}

// @see
export function getNicelyFormattedSeeFromTags(specs: Spec[]) {
  const seeTags = specs.filter((spec) => spec.tag === "see");
  return seeTags.map((see) => `@see ${see.name} ${see.description}`.trim());
}

// Descrpition
export function getNicelyWrappedDescription(
  description: string,
  specs: Spec[],
) {
  const concatted = specs.filter((spec) => spec.tag === "description").reduce<
    string
  >(
    (desc, spec) => desc + "\n\n" + spec.name + " " + spec.description,
    description,
  ).trim();
  return concatted.length ? concatted.split("\n") : [];
}
