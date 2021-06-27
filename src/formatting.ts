import { Spec } from "https://esm.sh/comment-parser";
import * as prettier from "https://esm.sh/prettier";
import markdownParser from "https://esm.sh/prettier/parser-markdown";

// Adopt, without changes, any custom block tag
export function serializeTag(
  specs: Spec[],
  jsdocTagName: string,
  options: {
    dataOnNextLine?: boolean;
    omitWhenEmpty?: boolean;
    tsdocTagName?: string;
  } = {},
) {
  const tags = specs.filter(
    (spec) =>
      spec.tag === jsdocTagName &&
      (!options.omitWhenEmpty || [spec.name, spec.description].some(Boolean)),
  );

  const tsdocTagName = options.tsdocTagName || jsdocTagName;

  return options.dataOnNextLine
    ? tags.reduce<string[]>(
      (lines, tag) =>
        lines.concat([`@${tsdocTagName}`, `${tag.name} ${tag.description}`]),
      [],
    )
    : tags.map((tag) =>
      `@${tsdocTagName} ${tag.name} ${tag.description}`.trim()
    );
}

export function formatMarkdown(md: string): string {
  return prettier
    .format(md, {
      plugins: [markdownParser],
      parser: "markdown",
      proseWrap: "always",
    })
    .trim();
}
