var assert = require('chai').assert;

describe('testing-mocha', function () {
	describe('inner', function () {
		it('should execute', function () {
			assert.equal(1, 1, 'numbers are not equal');
		});
	});
});
