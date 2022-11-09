import { p } from '../src';
import { circularObject, testObject } from './testObject';

/**
 *
 */
test('one_element-root_level', () => {
	expect(p(testObject, ['n'])).toEqual({
		n: testObject.n,
	});
});

/**
 *
 */
test('multi_elements-root_level', () => {
	expect(p(testObject, ['n', 'b'])).toEqual({
		n: testObject.n,
		b: testObject.b,
	});
});

/**
 *
 */
test('multi_elements-multi_levels', () => {
	expect(p(testObject, ['n', 'b', 'o.s', 'o.n', 'o.b'])).toEqual({
		n: testObject.n,
		b: testObject.b,
		o: {
			s: testObject.o.s,
			n: testObject.o.n,
			b: testObject.o.b,
		},
	});
});

test('circular_object', () => {
	const circular = circularObject();

	expect(p(circular, ['child'])).toEqual({ child: {} });
});
