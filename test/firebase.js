var assert = require('chai').assert;
var firebase = require('./mocks/firebase');

describe('Testing Firebase Mock', function () {
	beforeEach(angular.mock.module('spaceyyz'));

	it('should exist', function () {
		assert.isDefined(firebase);
	});

	describe('.database()', function () {
		it('should exist', function () {
			assert.isDefined(firebase.database);
			assert.isFunction(firebase.database);
		});

		it('should run', function () {
			firebase.database();	
		});
	});
});
