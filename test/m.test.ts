import { m } from '../src';

class cls {
	method_a = (suffix?: string) => {
		return m(suffix);
	}
}

const method_b = (suffix?: string) => {
	return m(suffix);
}

/**
 *
 */
test('class_method', () => {
	const obj = new cls();
	expect(obj.method_a()).toBe('cls.method_a');
});

/**
 *
 */
test('class_method_suffix', () => {
	const obj = new cls();
	expect(obj.method_a('suffix')).toBe('cls.method_asuffix');
});


/**
 *
 */
test('class_method', () => {
	expect(method_b()).toBe('method_b');
});

/**
 *
 */
test('class_method_suffix', () => {
	expect(method_b('suffix')).toBe('method_bsuffix');
});
