import { Spec } from 'https://esm.sh/comment-parser';
import wrap from 'https://esm.sh/word-wrap';

export function getNicelyFormattedParamsFromTags(specs: Spec[]) {
	const params = specs.filter(spec => spec.tag === 'param');
	const maxNameLength = params.reduce((length, param) => Math.max(length, param.name.length), 0);
	return params.map(param =>
		`@param ${param.name + ' '.repeat(maxNameLength - param.name.length)} - ${
			param.description
		}`.trim()
	);
}

export function getNicelyWrappedDescription(description: string, width: number, linePrefix = '') {
	return wrap(description, { width: width, indent: linePrefix })
		.split('\n')
		.map(line => line.trimEnd())
		.join('\n');
}
