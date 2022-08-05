import { v } from '../src';
import { obj } from './obj';


/**
 *
 */
test('simple', () => {
	expect(v(obj)).toBe('n=1, b=true, o=(s=2, n=3, b=false)');
});

/**
 *
 */
test('with_max', () => {
	expect(v(obj, [], 2)).toBe('n=1, b=true, ...more[1]');
});

/**
 *
 */
test('with_levels', () => {
	expect(v(obj, [], null, 1)).toBe('n=1, b=true, o=(MAX_RECURSIVE_LEVELS_REACHED)');
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
