import { Spec } from "https://esm.sh/comment-parser";
import * as prettier from "https://esm.sh/prettier";
import markdownParser from "https://esm.sh/prettier/parser-markdown";

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

// @category
export function getNicelyFormattedCategoryFromTags(specs: Spec[]) {
  const categories = specs.filter((spec) => spec.tag === "category");
  if (categories.length > 1) {
    throw new Error("Much confuse, more than 1 @category statement");
  }
  return categories.map((category) =>
    ["@category", category.name, category.description].join(" ").trim()
  );
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

function formatMarkdown(md: string): string {
  return prettier
    .format(md, {
      plugins: [markdownParser],
      parser: "markdown",
      proseWrap: "always",
    })
    .trim();
}
// Descrpition
export function getDescriptionAndRemarks(description: string, specs: Spec[]) {
  const summary = specs.find((spec) => spec.tag === "summary");

  // In case a JSDoc description as well as @description are given, join them with newlines;
  const combinedDescription = specs
    .filter((spec) => spec.tag === "description")
    .reduce<string>(
      (desc, spec) =>
        desc + "\n\n" + formatMarkdown(spec.name + " " + spec.description),
      formatMarkdown(description),
    )
    .trim();

  return [
    `${summary?.name || ""} ${summary?.description || ""}`,
    summary && combinedDescription
      ? "\n@remarks\n" + combinedDescription
      : combinedDescription,
  ]
    .map((text) => text.trimEnd())
    .filter(Boolean)
    .reduce<string[]>((lines, text) => lines.concat(text.split("\n")), []);
}
