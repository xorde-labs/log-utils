import { p } from '../src';
import { obj } from './obj';

/**
 *
 */
test('one_element-root_level', () => {
	expect(p(obj, ['n']))
		.toEqual({
			n: obj.n,
		});
});

/**
 *
 */
test('multi_elements-root_level', () => {
	expect(p(obj, ['n', 'b']))
		.toEqual({
			n: obj.n,
			b: obj.b,
		});
});

/**
 *
 */
test('multi_elements-multi_levels', () => {
	expect(p(obj, ['n', 'b', 'o.s', 'o.n', 'o.b']))
		.toEqual({
			n: obj.n,
			b: obj.b,
			o: {
				s: obj.o.s,
				n: obj.o.n,
				b: obj.o.b,
			}
		});
});
