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
export function getNicelyFormattedFontosdkFromTags(specs: Spec[]) {
	const fontosdks = specs.filter(spec => spec.tag === 'fontosdk');
	if (!fontosdks.length) {
		return [];
	}
	if (fontosdks.length > 1) {
		throw new Error('Much confuse, more than 1 @fontosdks statement');
	}
	return fontosdks.map(fontosdk => ['@fontosdk', fontosdk.name].join(' ').trim());
}
export function getNicelyWrappedDescription(description: string, width: number, linePrefix = '') {
	return wrap(description, { width: width, indent: linePrefix })
		.split('\n')
		.map(line => line.trimEnd())
		.join('\n');
}
