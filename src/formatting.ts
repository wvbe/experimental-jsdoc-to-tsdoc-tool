import { Spec } from 'https://esm.sh/comment-parser';

export function getNicelyFormattedParamsFromTags(specs: Spec[]) {
	const params = specs.filter(spec => spec.tag === 'param');
	const maxNameLength = params.reduce((length, param) => Math.max(length, param.name.length), 0);
	return params.map(param =>
		`@param ${param.name + ' '.repeat(maxNameLength - param.name.length)} - ${
			param.description
		}`.trim()
	);
}
