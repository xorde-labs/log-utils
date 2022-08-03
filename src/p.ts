/**
 * Picks selected properties from the object
 * @param obj Original object
 * @param props Array of original object properties
 * @return obj Object with picked properties
 */
type NestedKeyOf<ObjectType extends object> =
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		/* prettier-ignore */ [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}` : `${Key}`;
	}[keyof ObjectType &
		(string | number)];

export const p = <T extends object>(obj: T, props: (NestedKeyOf<T> & (string | number))[]) => {
	const accumulator = {};
	props.forEach((prop: any) => {
		const separator = (path: string) => path.indexOf('.');
		const parent = (path: string, separator: number) => path.substring(0, separator);
		const child = (path: string, separator: number) => path.substring(separator + 1);
		const getNestedValue = (obj: any, path: string): any => {
			const s = separator(path);
			// console.debug('s:', s, 'path:', path);
			return s == -1 ? obj[path] : getNestedValue(obj[path.substring(0, s)], path.substring(s + 1));
		};
		const assignNestedValue = (obj: any, path: string, value: any): any => {
			const s = separator(path);
			// console.debug('obj:', obj, 'path:', path, 'value:', value, 'parent:', parent(path, s));
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
	// console.debug('p:', accumulator);
	return accumulator;
};
