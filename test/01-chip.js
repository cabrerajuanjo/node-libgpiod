const assert = require('node:assert');
const gpiod = require('..');

describe('libgpiod chip bindings', () => {
	it('should \'create\' a new chip by number', done => {
		const chip0 = new gpiod.Chip('0');
		assert.equal(40, chip0.getNumberOfLines());
		done();
	});

	it('should \'create\' a new chip by name', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		assert.equal(40, chip0.getNumberOfLines());
		done();
	});

	it('should \'create\' a new chip by path', done => {
		const chip0 = new gpiod.Chip('/dev/gpiochip0');
		assert.equal(40, chip0.getNumberOfLines());
		done();
	});

	it('should NOT \'create\' a chip because it does not exists', done => {
		try {
			const chip0 = new gpiod.Chip('/dev/gpiochippuden');
			assert.equal(40, chip0.getNumberOfLines());
		} catch {
			done();
		}
	});
});
