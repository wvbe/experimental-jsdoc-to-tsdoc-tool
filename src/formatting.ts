import { Spec } from "https://esm.sh/comment-parser";
import wrap from "https://esm.sh/word-wrap";

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
  width: number,
  linePrefix = "",
) {
  return wrap(description, { width: width, indent: linePrefix })
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}
