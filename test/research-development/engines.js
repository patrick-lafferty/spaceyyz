var assert = require('chai').assert;
var fb = window.firebase = require('../mocks/firebase');
var firebase = window.firebase = fb.firebase;
var Promise = fb.Promise;

describe('ResearchEngine component for Research&Development menu', function () {

	//angular.mock.module.sharedInjector();

	var engineFactory = {
		getEngines: function () {
				return new Promise([
					{
					}
				]);
			},
		addEngine: function (engine) {}
		
	};

	beforeEach(function () {
		angular.mock.module('spaceyyz')
		angular.mock.module(function ($provide) {
			$provide.value('engineFactory', engineFactory);
		});
	});

	var $componentController;

	beforeEach(inject(function(_$componentController_) {
		$componentController = _$componentController_;
	}));

	describe('addEngine(engine)', function () {
		var researchEngine;

		beforeEach(function () {
			researchEngine = $componentController('researchEngine');
		});

		it('should exist', function () {
			assert.isDefined(researchEngine.addEngine);
			assert.isFunction(researchEngine.addEngine);
		});

		it('should add engine to collection', function () {
			var engine = {
				name: 'test',
				isp: {
					seaLevel: 262,
					vacuum: 380
				},
				thrust: {
					seaLevel: 4000,
					vacuum: 7000
				},
				description: 'testy test'
			};

			researchEngine.addEngine(engine);

			assert.include(researchEngine.engines.all, engine);
		});

	});
});
