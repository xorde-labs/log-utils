import { v } from '../src';

const defaultObject: any = {
	n: 1,
	b: true,
	o: {
		s: '2',
		n: 3,
		b: false,
	}
}

/**
 *
 */
test('simple', () => {
	expect(v(defaultObject)).toBe('n=1, b=true, o=(s=2, n=3, b=false)');
});

/**
 *
 */
test('with_max', () => {
	expect(v(defaultObject, [], 2)).toBe('n=1, b=true, ...more[1]');
});

/**
 *
 */
test('with_levels', () => {
	expect(v(defaultObject, [], null, 1)).toBe('n=1, b=true, o=(MAX_RECURSIVE_LEVELS_REACHED)');
});

/**
 *
 */
test('empty_object', () => {
	expect(v({}, [], null, 1)).toBe('');
});

/**
 *
 */
test('undefined_object', () => {
	expect(v(<any>undefined, [], null, 1)).toBe('');
});
