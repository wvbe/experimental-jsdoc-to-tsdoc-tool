import { Spec } from "https://esm.sh/comment-parser";
import { formatMarkdown, serializeTag } from "./formatting.ts";

export function getVirtualTags(specs: Spec[]) {
  return serializeTag(specs, "abstract", { tsdocTagName: "virtual" });
}
export function getConstTags(specs: Spec[]) {
  return serializeTag(specs, "const");
}

export function getDeprecatedTags(specs: Spec[]) {
  return serializeTag(specs, "deprecated");
}

export function getDoctypeTags(specs: Spec[]) {
  return serializeTag(specs, "doctype");
}

export function getExampleTags(specs: Spec[]) {
  const tags = specs.filter((spec) => spec.tag === "example");
  return tags.reduce<string[]>((lines, param) => {
    let text = `${param.name} ${param.description}`;
    if (!text.trim()) {
      // Skip @example altogether if it has no content
      return lines;
    }
    if (!text.includes(`\`\`\``)) {
      // If @example did not already contain a Markdown codeblock, assume that the
      // entire @example content must in fact be a markdown codeblock
      text = `\`\`\`${text}\n\`\`\``;
    }

    return lines.concat([`@example`, ...formatMarkdown(text).split("\n")]);
  }, []);
}

export function getHideconstructorTags(specs: Spec[]) {
  return serializeTag(specs, "hideconstructor", { tsdocTagName: "internal" });
}

export function getInternalTags(specs: Spec[]) {
  return serializeTag(specs, "internal");
}

export function getReturnsTags(specs: Spec[]) {
  return [
    ...serializeTag(specs, "return", {
      tsdocTagName: "returns",
      omitWhenEmpty: true,
    }),
    ...serializeTag(specs, "returns", {
      tsdocTagName: "returns",
      omitWhenEmpty: true,
    }),
  ];
}

export function getSeeTags(specs: Spec[]) {
  return serializeTag(specs, "see");
}

export function getParamTags(specs: Spec[]) {
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

export function getReactTags(specs: Spec[]) {
  return serializeTag(specs, "react");
}

export function getThrowsTags(specs: Spec[]) {
  const tags = specs.filter((spec) => spec.tag === "throws");
  return tags.reduce<string[]>(
    (lines, param) =>
      lines.concat(
        [
          `@throws ${param.type ? `{@link ${param.type}}` : ""}`.trim(),
          ...formatMarkdown(`${param.name} ${param.description}`).split("\n"),
        ].filter(Boolean),
      ),
    [],
  );
}

export function getTypeTags(specs: Spec[]) {
  const types = specs.filter((spec) => spec.tag === "type");
  return types.map((type) => {
    return `@type {${type.type}}`.trim();
  });
}

// Descrpition
export function getDescriptionAndRemarksTag(
  description: string,
  specs: Spec[],
) {
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
