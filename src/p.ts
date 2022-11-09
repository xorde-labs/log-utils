// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/* prettier-ignore */ export type NestedKeyOf<ObjectType extends object> = { [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}` : `${Key}` }[keyof ObjectType & (string | number)];

const SEPARATOR = '.';

const separatorIdx = (path: string) => path.indexOf(SEPARATOR);

const leftFromIdx = (path: string, idx: number) => path.substring(0, idx);

const rightFromIdx = (path: string, idx: number) => path.substring(idx + 1);

/**
 * Returns a number of maximum count of separators occurred in either of a string in a string array.
 * @param paths
 */
const separatorsCountMax = (paths: string[] = []) => {
	return paths.map((path) => path.split(SEPARATOR).length).reduce((a, b) => Math.max(a, b), 0);
};

/**
 * Gets a value of a prop defined by a dot separated path.
 * @param obj
 * @param path
 * @param maxLevels
 */
const getPropValueFromPath = (obj: any, path: string, maxLevels: number): any => {
	const idx = separatorIdx(path);

	if (maxLevels <= 0) return undefined;

	return idx == -1
		? typeof obj[path] != 'object'
			? obj[path]
			: {}
		: getPropValueFromPath(obj[leftFromIdx(path, idx)], rightFromIdx(path, idx), maxLevels - 1);
};

/**
 * Modifies object in place by setting a prop value at path separator.
 * @param obj
 * @param path
 * @param value
 */
const setPropValueForPath = (obj: any, path: string, value: any): any => {
	const idx = separatorIdx(path);

	if (idx == -1) {
		obj[path] = value;
		return obj;
	} else {
		if (!Object.keys(obj).includes(leftFromIdx(path, idx)) || typeof obj[leftFromIdx(path, idx)] != 'object')
			obj[leftFromIdx(path, idx)] = {};
		return setPropValueForPath(obj[leftFromIdx(path, idx)], rightFromIdx(path, idx), value);
	}
};

/**
 * Picks selected properties from the object by path separated by dot, i.e. 'a.b.c'
 * @param obj Original object
 * @param propPaths Array of original object property paths
 * @param maxLevels
 * @return obj Object with picked properties
 */
export const p = <T extends object>(obj: T, propPaths: NestedKeyOf<T>[], maxLevels?: number) => {
	const accumulator = {};

	propPaths.forEach((propPath: any) => {
		const value = getPropValueFromPath(obj, propPath, maxLevels ?? separatorsCountMax(propPaths));

		if (value != undefined) {
			setPropValueForPath(accumulator, propPath, value);
		}
	});

	return accumulator;
};
