// Borrowed from https://github.com/react-hook-form/react-hook-form/blob/274d8fb950f9944547921849fb6b3ee6e879e358/src/types/utils.ts#L86

export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;
type TupleKey<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
type ArrayKey = number;

type PathImpl<K extends string | number, V> = V extends Primitive ? `${K}` : `${K}` | `${K}.${Path<V>}`;

export type Path<T> = T extends ReadonlyArray<infer V>
	? IsTuple<T> extends true
		? {
				[K in TupleKey<T>]-?: PathImpl<K & string, T[K]>;
		  }[TupleKey<T>]
		: PathImpl<ArrayKey, V>
	: {
			[K in keyof T]-?: PathImpl<K & string, T[K]>;
	  }[keyof T];

/**
 * Picks selected properties from the object up to 3 levels deep
 * @param obj Original object
 * @param props Array of original object properties
 * @return obj Object with picked properties
 */
export const p = <T extends object>(obj: T, props: Path<T>[]) => {
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
