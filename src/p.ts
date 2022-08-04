// Thanks to https://stackoverflow.com/a/58436959/16323129 for a hint how to set specified depth

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

type Join<K, P> = K extends string | number
	? P extends string | number
		? `${K}${'' extends P ? '' : '.'}${P}`
		: never
	: never;

type Paths<T, D extends number = 10> = [D] extends [never]
	? never
	: T extends object
	? {
			[K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never;
	  }[keyof T]
	: never;

/**
 * Picks selected properties from the object up to 3 levels deep
 * @param obj Original object
 * @param props Array of original object properties
 * @return obj Object with picked properties
 */
export const p = <T extends object>(obj: T, props: Array<Paths<T, 3>>) => {
	const accumulator = {};

	props.forEach((prop: any) => {
		const separator = (path: string) => path.indexOf('.');
		const parent = (path: string, separator: number) => path.substring(0, separator);
		const child = (path: string, separator: number) => path.substring(separator + 1);
		const getNestedValue = (obj: any, path: string): any => {
			const s = separator(path);

			return s == -1 ? obj[path] : getNestedValue(obj[path.substring(0, s)], path.substring(s + 1));
		};
		const assignNestedValue = (obj: any, path: string, value: any): any => {
			const s = separator(path);

			if (s == -1) {
				obj[path] = value;
				return obj;
			} else {
				if (!Object.keys(obj).includes(parent(path, s)) || typeof obj[parent(path, s)] != 'object')
					obj[parent(path, s)] = {};
				return assignNestedValue(obj[parent(path, s)], child(path, s), value);
			}
		};
		const value = getNestedValue(obj, prop);
		if (value != undefined) {
			assignNestedValue(accumulator, prop, value);
		}
	});

	return accumulator;
};
