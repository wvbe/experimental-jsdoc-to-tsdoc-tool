import { Spec } from "https://esm.sh/comment-parser";
import * as prettier from "https://esm.sh/prettier";
import markdownParser from "https://esm.sh/prettier/parser-markdown";

// Adopt, without changes, any custom block tag
export function serializeTag(
  specs: Spec[],
  jsdocTagName: string,
  options: {
    includeTypeInfo?: boolean;
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

  if (tsdocTagName === "hideconstructor") {
    return ``;
  }

  return options.dataOnNextLine
    ? tags.reduce<string[]>(
      (lines, tag) =>
        lines.concat([
          `@${tsdocTagName}${options.includeTypeInfo ? ` {${tag.type}}` : ""}`,
          ...getMarkdownColumnLines(`${tag.name} ${tag.description}`, 80, [
            "",
          ]),
        ]),
      [],
    )
    : tags.reduce<string[]>(
      (lines, tag) =>
        lines.concat(
          getMarkdownColumnLines(
            `@${tsdocTagName}${
              options.includeTypeInfo ? ` {${tag.type}}` : ""
            } ${tag.name.trim()} ${tag.description.trim()}`.trim(),
            80,
            [""],
          ),
        ),
      [],
    );
}

export function getMarkdownColumnLines(
  md: string,
  maxWidth: number,
  prefixes: string[],
  rightPadChar?: string,
  skipHangingPrefixes?: boolean,
): string[] {
  const prefixLength = prefixes[0].length;
  const lastPrefix = prefixes[prefixes.length - 1];

  return formatMarkdown(md, {
    printWidth: maxWidth - prefixLength,
  })
    .split("\n")
    .reduce<string[]>((tsdocLines, mdLine, i, all) => {
      const tsdocLine = (prefixes[i] === undefined ? lastPrefix : prefixes[i]) +
        mdLine;

      // If rightPadChar is set, padRight to the expected width
      tsdocLines.push(
        rightPadChar === undefined || tsdocLine.length > maxWidth
          ? tsdocLine
          : tsdocLine + rightPadChar.repeat(maxWidth - tsdocLine.length),
      );

      if (
        skipHangingPrefixes ||
        prefixes.length <= all.length ||
        i < all.length - 1
      ) {
        return tsdocLines;
      }

      // If the list of prefixes is longer than markdown lines, add additional lines until all
      // prefixes are spent.

      // If rightPadChar is set, padRight to the expected width
      return tsdocLines.concat(
        prefixes
          .slice(all.length)
          .map((p) =>
            rightPadChar === undefined || p.length > maxWidth
              ? p
              : p + rightPadChar.repeat(maxWidth - p.length)
          ),
      );
    }, []);
}

export function formatMarkdown(
  md: string,
  prettierOptions?: prettier.Options,
): string {
  return prettier
    .format(md, {
      plugins: [markdownParser],
      parser: "markdown",
      proseWrap: "always",
      ...prettierOptions,
    })
    .trim();
}
