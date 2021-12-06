import { Spec } from "https://esm.sh/comment-parser@1.3.0";
import { MAX_CHARACTER_WIDTH } from "./constants.ts";

import {
  formatMarkdown,
  getMarkdownColumnLines,
  serializeTag,
} from "./formatting.ts";

export function getVirtualTags(specs: Spec[]) {
  return serializeTag(specs, "abstract", { tsdocTagName: "virtual" });
}

export function getDeprecatedTags(specs: Spec[]) {
  return serializeTag(specs, "deprecated");
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
  return serializeTag(specs, "see", {
    transformLine: (x: string) => {
      if (x.match(/\s/)) {
        return x;
      }
      return `{@link ${x}}`;
    },
  });
}

export function getParamTags(specs: Spec[]) {
  const params = specs.filter((spec) => spec.tag === "param");
  const maxNameLength = params.reduce(
    (length, param) => Math.max(length, param.name.length),
    0,
  );
  return params.reduce<string[]>((lines, param) => {
    const prefix = `@param ${
      param.name +
      " ".repeat(maxNameLength - param.name.length)
    } - `;
    return lines.concat(
      getMarkdownColumnLines(
        param.description,
        MAX_CHARACTER_WIDTH,
        [prefix, " ".repeat(prefix.length)],
        undefined,
        true,
      ),
    );
  }, []);
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
  const summaryText = formatMarkdown(
    `${summary?.name || ""} ${summary?.description || ""}`.trim(),
  ).trimEnd();

  // In case a JSDoc description as well as @description are given, join them with newlines;
  const combinedDescription = specs
    .filter((spec) => spec.tag === "description")
    .reduce<string>(
      (desc, spec) =>
        desc + "\n\n" + formatMarkdown(spec.name + " " + spec.description),
      formatMarkdown(description),
    ).trim();

  const lines = [];
  if (summaryText) {
    lines.push(...summaryText.split("\n"));
  }
  if (summaryText && combinedDescription) {
    lines.push("");
  }
  if (combinedDescription) {
    if (combinedDescription.trim().match(/^{@inheritDoc [^\}]+\}$/g)) {
      lines.push(...combinedDescription.split("\n"));
    } else {
      lines.push("@remarks", ...combinedDescription.split("\n"));
    }
  }

  return lines;
}
