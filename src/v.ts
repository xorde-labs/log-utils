/**
 * Recursively dumps `obj` Object as comma-separated string of key=value pairs
 * Example: v({a:2,b:{c:3}}) = 'a=2, b=(c=3)
 * @param obj {any} Object to dump
 * @param ignoreProps {string[]=} (Optional) Properties to ignore, array of strings
 * @param max {number=} (Optional) Maximum amount of keys to show; _...more[N]_ will be added to replace exceeding key element
 * @param levels {number=} (Optional) Maximum levels of recursion
 */

interface IStringIndex {
	[key: string]: any;
}

export const v = <T>(
	obj: T & IStringIndex,
	ignoreProps?: (keyof T)[] & string[],
	max: number | null = null,
	levels: number | undefined = 10,
): string =>
	levels > 0
		? Object.keys(obj ?? {})
				.filter((f) => !(ignoreProps || []).includes(f))
				.map((m: string, i: number) => {
					if ((max && i < max) || !max)
						return typeof obj[m] == 'object' ? m + `=(${v(obj[m], ignoreProps, max, levels - 1)})` : m + '=' + obj[m];
					else if (max && i == max) return `...more[${Object.keys(obj).length - max}]`;
				})
				.filter((f) => f != null)
				.join(', ') || ''
		: 'MAX_RECURSIVE_LEVELS_REACHED';
