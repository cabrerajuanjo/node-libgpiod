const assert = require('node:assert');
const gpiod = require('../');

describe('libgpiod line bindings', () => {

	// undefined for our gpio-sim setup, GPIO17 for raspberry pi zero w
	const lineName = process.env.LINE_NAME ?? undefined

	it('should get a line from the chip', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		assert(chip0.getLine(17));
		done();
	});

	it('should NOT get a nonexistent line from the chip', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		try {
			new gpiod.Line(chip0, 1700);
		} catch {
			done();
		}
	});

	it('should set line value', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = new gpiod.Line(chip0, 17);
		line17.requestOutputMode();
		line17.setValue(1);
		setTimeout(() => {
			line17.release();
			done();
		}, 500);
	});

	it('should get line value', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = chip0.getLine(17);
		line17.requestInputMode();
		assert.equal(0, line17.getValue());
		line17.release();
		done();
	});

	it('should get line offset', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = chip0.getLine(17);
		const line13 = chip0.getLine(13);
		let offset = line17.getLineOffset();
		assert.equal(17, offset);
		offset = line13.getLineOffset();
		assert.equal(13, offset);
		line17.release();
		line13.release();
		done();
	});

	it('should get line name', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = chip0.getLine(17);
		const name = line17.getLineName();
		assert.equal(lineName, name);
		line17.release();
		done();
	});

	it('should blink line value', done => {
		const chip0 = new gpiod.Chip('gpiochip0');
		const line17 = new gpiod.Line(chip0, 17);
		line17.requestOutputMode();
		let count = 7;
		const interval = setInterval(() => {
			line17.setValue(count-- % 2);
			if (count == 0) {
				done();
				line17.release();
				clearInterval(interval);
			}
		}, 200);
	});

	it('should get line consumer', done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		let line13 = chip0.getLine(13);
		assert.equal(undefined, line13.getLineConsumer());

		line13.requestInputMode("foobar");
		let consumer = line13.getLineConsumer();
		assert.equal("foobar", consumer);
		line13.release();

		line13 = chip0.getLine(13);
		line13.requestInputMode("quix");
		consumer = line13.getLineConsumer();
		assert.equal("quix", consumer);
		line13.release();

		done();
	});

	it("should request input mode with flags", done => {
		const chip0 = new gpiod.Chip('gpiochip0');

		let line13 = chip0.getLine(13);

		line13.requestInputModeFlags("foobar", gpiod.LineFlags.GPIOD_LINE_REQUEST_FLAG_BIAS_PULL_DOWN);
		consumer = line13.getLineConsumer();
		assert.equal("foobar", consumer);
		line13.release();

		done();
	})
});
