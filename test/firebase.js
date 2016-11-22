var assert = require('chai').assert;
var firebase = require('./mocks/firebase');

describe('Testing Firebase Mock', function () {

	before('setup db for engines', function () {
		firebase.store = {
			engines: {
				"aaaa" : {
					isp: 420
				}
			}
		};
	});

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

		it('can set initial db values', function () {
			firebase.database().ref().child("engines")
				.once()
				.then(function (ss) { console.log(ss.val());});
		});
	});
});
