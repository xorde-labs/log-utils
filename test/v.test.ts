import { v } from '../src';
import { testObject } from './testObject';

/**
 *
 */
test('simple', () => {
	expect(v(testObject)).toBe('n=1, b=true, o=(s=2, n=3, b=false)');
});

/**
 *
 */
test('with_max', () => {
	expect(v(testObject, [], 2)).toBe('n=1, b=true, ...more[1]');
});

/**
 *
 */
test('with_levels', () => {
	expect(v(testObject, [], null, 1)).toBe('n=1, b=true, o=(MAX_RECURSIVE_LEVELS_REACHED)');
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
