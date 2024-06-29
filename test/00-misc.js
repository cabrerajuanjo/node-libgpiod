const assert = require('node:assert');
const gpiod = require('..');

describe('libgpiod miscellaneous bindings', () => {
	it('should get libgpiod version', done => {
		assert.ok(gpiod.version());
		done();
	});

	it('should get line instant value', done => {
		const value = gpiod.getInstantLineValue(0, 17);
		assert.equal(0, value);
		done();
	});

	it('should NOT get line instant value due wrong chip name', done => {
		try {
			gpiod.getInstantLineValue('/dev/gpiochipZero', 17);
		} catch {
			done();
		}
	});

	it('should blink line with instant value', done => {
		let count = 7;
		const interval = setInterval(() => {
			gpiod.setInstantLineValue('/dev/gpiochip0', 17, count-- % 2);
			if (count === 0) {
				clearInterval(interval);
				done();
			}
		}, 70);
	});
});
