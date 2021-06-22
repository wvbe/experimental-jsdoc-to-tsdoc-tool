import { parse, Block } from 'https://esm.sh/comment-parser';
import { getNicelyFormattedParamsFromTags } from './formatting.ts';

const MAX_LINE_WIDTH = 120;
const TAB_WIDTH = 4;
export async function getJsdocAstsForFile(filePath: string) {
	return getJsdocAstsForFileContents(await Deno.readTextFile(filePath));
}
export function getJsdocAstsForFileContents(fileContents: string): Block[] {
	return parse(fileContents);
}

export function getTsdocStringForJsdocAst(ast: Block): string {
	const indentation = '\n' + ast.source[0].tokens.start;
	const maxContentWidth = indentation
		.split('')
		.reduce((width, char) => width + (char === '\t' ? TAB_WIDTH : char.length), 0);
	let comment = indentation + '/**';

	if (ast.description) {
		comment += indentation + ' * ' + ast.description;
	}
	comment += [...getNicelyFormattedParamsFromTags(ast.tags)]
		.map(line => indentation + ' * ' + line)
		.join('');
	comment += indentation + ' */';
	return comment;
}
